#!/usr/bin/env node

/**
 * Content migration script: Hugo → Astro Starlight
 *
 * Processes every .md file in content/ through 4 passes:
 *   1. Front matter transformation
 *   2. Shortcode → MDX component conversion
 *   3. Link rewriting
 *   4. File moves + rename to .mdx
 *
 * Usage:
 *   node scripts/migrate.mjs                    # dry-run (prints changes)
 *   node scripts/migrate.mjs --write            # apply changes
 *   node scripts/migrate.mjs --write --section guides  # only migrate guides/
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "node:fs";
import { resolve, dirname, basename, relative, join, extname } from "node:path";
import { execSync } from "node:child_process";
import { parseArgs } from "node:util";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const yaml = require("js-yaml");

const ROOT = resolve(import.meta.dirname, "..");
const CONTENT_DIR = join(ROOT, "content");
const DEST_DIR = join(ROOT, "src", "content", "docs");
const INCLUDES_SRC = join(ROOT, "content", "includes");
const INCLUDES_DEST = join(ROOT, "src", "components", "includes");

// ── CLI args ──

const { values: args } = parseArgs({
  options: {
    write: { type: "boolean", default: false },
    section: { type: "string", default: "" },
    verbose: { type: "boolean", default: false },
  },
});

// ── IA move mapping ──
// Maps source paths (relative to content/) to destination paths (relative to src/content/docs/)

const IA_MOVES = {
  // Move 1: Admin section extraction
  "manuals/accounts/": "admin/accounts/",
  "manuals/admin/": "admin/organizations/",
  "manuals/billing/": "admin/billing/",
  "manuals/subscription/": "admin/subscription/",
  "manuals/support/": "admin/support/",
  "manuals/security/": "admin/security/",
  "manuals/enterprise/": "admin/enterprise/",

  // Move 2: AI products promotion (flat peers)
  "manuals/ai/model-runner/": "model-runner/",
  "manuals/ai/gordon/": "gordon/",
  "manuals/ai/mcp-catalog-and-toolkit/": "mcp-catalog-toolkit/",
  "manuals/ai/docker-agent/": "docker-agent/",
  "manuals/ai/sandboxes/": "sandboxes/",
  "manuals/ai/compose/": "compose/ai/",
  "manuals/ai/": "ai/", // catch remaining AI index pages

  // Move 3: Product docs to top level (strip manuals/)
  "manuals/docker-hub/": "hub/",
  "manuals/sandbox/": "sandboxes/",
  "manuals/build-cloud/": "build-cloud/",
  "manuals/build/": "build/",
  "manuals/compose/": "compose/",
  "manuals/desktop/": "desktop/",
  "manuals/engine/": "engine/",
  "manuals/extensions/": "extensions/",
  "manuals/offload/": "offload/",
  "manuals/scout/": "scout/",
  "manuals/dhi/": "dhi/",
  "manuals/testcontainers.md": "testcontainers.md",
  "manuals/": "", // manuals index → top level

  // Move 4: Reference (mostly stays)
  "reference/": "reference/",

  // Move 5: Guides (unchanged)
  "guides/": "guides/",

  // Move 6: Get started
  "get-started/": "get-started/",

  // Other
  "tags/": "tags/",
};

// Sections to skip (vendored CLI stubs, includes handled separately)
const SKIP_PATHS = [
  "reference/cli/docker/",  // generated from YAML, not migrated
  "reference/cli/sbx/",     // generated from YAML
  "reference/samples/",     // removed per IA proposal
  "includes/",              // handled separately as MDX components
];

// ── Redirect map (populated during migration) ──

const redirects = [];       // {from, to}
const migrationMap = [];    // {oldPath, newPath}

// ── Helpers ──

function findFiles(dir, ext = ".md") {
  const result = [];
  const output = execSync(
    `find "${dir}" -name "*${ext}" -type f`,
    { encoding: "utf-8" }
  );
  for (const line of output.trim().split("\n")) {
    if (line) result.push(line);
  }
  return result;
}

function log(msg) {
  if (args.verbose) console.log(msg);
}

// ── Pass 1: Front matter transformation ──

function transformFrontMatter(fm) {
  const result = {};
  const extracted = { aliases: [], gridData: null };

  // Keep these as-is (drop null/undefined values, handle case variants)
  const title = fm.title || fm.Title;
  if (title) result.title = title;
  if (fm.description && fm.description !== "null" && fm.description !== null) result.description = fm.description;
  if (fm.keywords) result.keywords = fm.keywords;
  if (fm.draft) result.draft = fm.draft;

  // linkTitle or linktitle → sidebar.label
  const linkTitle = fm.linkTitle || fm.linktitle;
  if (linkTitle) {
    result.sidebar = result.sidebar || {};
    result.sidebar.label = linkTitle;
  }

  // weight → sidebar.order
  if (fm.weight != null) {
    result.sidebar = result.sidebar || {};
    result.sidebar.order = fm.weight;
  }

  // params.sidebar.badge → sidebar.badge
  if (fm.params?.sidebar?.badge) {
    result.sidebar = result.sidebar || {};
    const b = fm.params.sidebar.badge;
    // Map Hugo colors to Starlight badge variants
    const badgeVariantMap = {
      blue: "note",
      violet: "caution",
      green: "success",
      amber: "tip",
      red: "danger",
      gray: "default",
    };
    if (typeof b === "string") {
      result.sidebar.badge = { text: b, variant: "default" };
    } else {
      const variant = badgeVariantMap[b.color] || "default";
      result.sidebar.badge = { text: b.text || "", variant };
    }
  }

  // params.sidebar.group → group (custom field)
  if (fm.params?.sidebar?.group) {
    result.group = fm.params.sidebar.group;
  }

  // params.notoc → tableOfContents: false
  if (fm.params?.notoc) {
    result.tableOfContents = false;
  }

  // Extract aliases for redirect map
  if (fm.aliases) {
    extracted.aliases = Array.isArray(fm.aliases) ? fm.aliases : [fm.aliases];
  }

  // Extract grid data for inline conversion
  if (fm.grid) {
    extracted.gridData = fm.grid;
  }
  // Also check other front-matter keys that grid might reference
  for (const key of Object.keys(fm)) {
    if (Array.isArray(fm[key]) && fm[key][0]?.title && fm[key][0]?.link) {
      extracted[key] = fm[key];
    }
  }

  // Flag pages that Hugo doesn't render
  extracted.skipRender = fm.build?.render === "never";

  return { frontMatter: result, extracted };
}

// ── Pass 2: Shortcode → MDX conversion ──

function convertShortcodes(content) {
  const imports = new Set();
  let result = content;

  // ── Tabs ──
  // {{< tabs >}} or {{< tabs group="X" >}}
  result = result.replace(
    /\{\{<\s*tabs(?:\s+group="([^"]*)")?\s*>\}\}/g,
    (_, group) => {
      imports.add('import { Tabs, TabItem } from "@astrojs/starlight/components";');
      return group ? `<Tabs syncKey="${group}">` : "<Tabs>";
    }
  );
  result = result.replace(/\{\{<\s*\/tabs\s*>\}\}/g, "</Tabs>");

  // {{< tab name="X" >}} → <TabItem label="X">
  result = result.replace(
    /\{\{<\s*tab\s+name="([^"]*)"\s*>\}\}/g,
    (_, name) => `<TabItem label="${name}">`
  );
  result = result.replace(/\{\{<\s*\/tab\s*>\}\}/g, "</TabItem>");

  // ── Summary bar ──
  result = result.replace(
    /\{\{<\s*summary-bar\s+feature_name="([^"]*)"\s*>\}\}/g,
    (_, name) => {
      imports.add('import SummaryBar from "@components/SummaryBar.astro";');
      return `<SummaryBar featureName="${name}" />`;
    }
  );

  // ── Param (version constants) ──
  // {{% param "X" %}} or {{% param X %}} — note: used inside code blocks too
  result = result.replace(
    /\{\{%\s*param\s+"?([^"%}\s]+)"?\s*%\}\}/g,
    (_, name) => {
      imports.add('import Version from "@components/Version.astro";');
      return `<Version name="${name}" />`;
    }
  );

  // ── Release date ──
  result = result.replace(
    /\{\{<\s*release-date\s+date="([^"]*)"\s*>\}\}/g,
    (_, date) => {
      imports.add('import ReleaseDate from "@components/ReleaseDate.astro";');
      return `<ReleaseDate date="${date}" />`;
    }
  );

  // ── Button ──
  // {{< button text="X" url="Y" >}} or {{< button url=`Y` text="X" >}}
  result = result.replace(
    /\{\{<\s*button\s+(?:text="([^"]*)"\s+url=[""`]([^""`]*)[""`]|url=[""`]([^""`]*)[""`]\s+text="([^"]*)")\s*>\}\}/g,
    (_, text1, url1, url2, text2) => {
      imports.add('import { LinkButton } from "@astrojs/starlight/components";');
      const text = text1 || text2;
      const url = url1 || url2;
      return `<LinkButton href="${url}">${text}</LinkButton>`;
    }
  );

  // ── Badge ──
  // {{< badge color=X text="Y" >}}
  result = result.replace(
    /\{\{<\s*badge\s+color=(\w+)\s+text="([^"]*)"\s*>\}\}/g,
    (_, color, text) => {
      imports.add('import { Badge } from "@astrojs/starlight/components";');
      // Map Hugo colors to Starlight variants
      const variantMap = {
        blue: "note",
        violet: "caution",
        green: "success",
        amber: "tip",
        red: "danger",
        gray: "default",
      };
      const variant = variantMap[color] || "default";
      return `<Badge text="${text}" variant="${variant}" />`;
    }
  );

  // ── YouTube embed ──
  // Handles both quoted {{< youtube-embed "ID" >}} and unquoted {{< youtube-embed ID >}}
  result = result.replace(
    /\{\{<\s*youtube-embed\s+"?([^">\s]+)"?\s*>\}\}/g,
    (_, id) => {
      imports.add('import YouTube from "@components/YouTube.astro";');
      return `<YouTube id="${id}" />`;
    }
  );

  // ── Inline image ──
  result = result.replace(
    /\{\{<\s*inline-image\s+src="([^"]*)"\s+alt="([^"]*)"\s*>\}\}/g,
    (_, src, alt) => `<img src="${src}" alt="${alt}" style="display:inline;height:1.2em;vertical-align:middle;" />`
  );

  // ── Accordion ──
  result = result.replace(
    /\{\{<\s*accordion\s+title="([^"]*)"\s*>\}\}/g,
    (_, title) => `<details>\n<summary>${title}</summary>\n`
  );
  result = result.replace(/\{\{<\s*\/accordion\s*>\}\}/g, "\n</details>");

  // ── Experimental (both {{< and {{% variants) ──
  result = result.replace(
    /\{\{[<%]\s*experimental(?:\s+title="([^"]*)")?\s*[%>]\}\}/g,
    (_, title) => {
      imports.add('import { Aside } from "@astrojs/starlight/components";');
      const t = title || "Experimental";
      return `<Aside type="caution" title="${t}">`;
    }
  );
  result = result.replace(/\{\{[<%]\s*\/experimental\s*[%>]\}\}/g, "</Aside>");

  // ── Restricted (both variants) ──
  result = result.replace(
    /\{\{[<%]\s*restricted(?:\s+title="([^"]*)")?\s*[%>]\}\}/g,
    (_, title) => {
      imports.add('import { Aside } from "@astrojs/starlight/components";');
      const t = title || "Early Access";
      return `<Aside type="tip" title="${t}">`;
    }
  );
  result = result.replace(/\{\{[<%]\s*\/restricted\s*[%>]\}\}/g, "</Aside>");

  // ── Labspace launch ──
  result = result.replace(
    /\{\{<\s*labspace-launch\s+image="([^"]*)"(?:\s+model-download="([^"]*)")?(?:\s+browserUrl="([^"]*)")?\s*>\}\}/g,
    (_, image, modelDownload, browserUrl) => {
      imports.add('import LabspaceLaunch from "@components/LabspaceLaunch.astro";');
      const props = [`image="${image}"`];
      if (modelDownload === "true") props.push("modelDownload");
      if (browserUrl) props.push(`browserUrl="${browserUrl}"`);
      return `<LabspaceLaunch ${props.join(" ")} />`;
    }
  );

  // ── Desktop install v2 ──
  result = result.replace(
    /\{\{<\s*desktop-install-v2\s+([^>]*)\s*>\}\}/g,
    (_, params) => {
      imports.add('import DesktopInstall from "@components/DesktopInstall.astro";');
      const props = [];
      if (/\ball\b/.test(params)) props.push("all");
      if (/\bwin\b/.test(params) && !/win_arm/.test(params)) props.push("win");
      if (/\bmac\b/.test(params)) props.push("mac");
      if (/\blinux\b/.test(params)) props.push("linux");
      const buildPath = params.match(/build_path="([^"]*)"/);
      if (buildPath) props.push(`buildPath="${buildPath[1]}"`);
      const winArm = params.match(/win_arm_release="([^"]*)"/);
      if (winArm) props.push(`winArmRelease="${winArm[1]}"`);
      return `<DesktopInstall ${props.join(" ")} />`;
    }
  );

  // ── Desktop install v1 (older) ──
  result = result.replace(
    /\{\{<\s*desktop-install\s+([^>]*)\s*>\}\}/g,
    (_, params) => {
      imports.add('import DesktopInstall from "@components/DesktopInstall.astro";');
      const props = [];
      if (/\ball\b/.test(params)) props.push("all");
      if (/\bwin\b/.test(params)) props.push("win");
      if (/\bmac\b/.test(params)) props.push("mac");
      if (/\blinux\b/.test(params)) props.push("linux");
      return `<DesktopInstall ${props.join(" ")} />`;
    }
  );

  // ── CTA ──
  result = result.replace(
    /\{\{<\s*cta\s+header="([^"]*)"\s+body="([^"]*)"\s+url="([^"]*)"\s+cta="([^"]*)"\s*>\}\}/g,
    (_, header, body, url, cta) => {
      imports.add('import CallToAction from "@components/CallToAction.astro";');
      return `<CallToAction header="${header}" url="${url}" cta="${cta}">\n${body}\n</CallToAction>`;
    }
  );

  // ── Grid ──
  // {{< grid >}} or {{< grid items="X" >}} or {{< grid items=X >}}
  // These read from front matter — handled in pass 4 with gridData
  result = result.replace(
    /\{\{<\s*grid(?:\s+items=[""]?(\w+)[""]?)?(?:\s+cols=(\d+))?\s*>\}\}/g,
    (_, items, cols) => {
      // Placeholder — will be replaced with inline CardGrid in the grid pass
      return `<!-- GRID:${items || "grid"}:${cols || "3"} -->`;
    }
  );

  // ── Sectionlinks ──
  result = result.replace(
    /\{\{[<%]\s*sectionlinks\s*[%>]\}\}/g,
    "<!-- SECTIONLINKS -->"
  );

  // ── Include ──
  result = result.replace(
    /\{\{%\s*include\s+"([^"]*)"\s*%\}\}/g,
    (_, filename) => {
      const componentName = filename
        .replace(/\.md$/, "")
        .replace(/[\/\-\.]/g, "_")
        .replace(/^_+|_+$/g, "");
      const importName = `Include_${componentName}`;
      imports.add(`import ${importName} from "@includes/${filename.replace(/\.md$/, ".mdx")}";`);
      return `<${importName} />`;
    }
  );

  // ── Card (self-closing) ──
  // {{< card title="X" description="Y" link="Z" icon="I" >}}
  result = result.replace(
    /\{\{<\s*card\s+([^>]*)\s*>\}\}/g,
    (_, params) => {
      imports.add('import { LinkCard } from "@astrojs/starlight/components";');
      const title = params.match(/title="([^"]*)"/)?.[1] || "";
      const desc = params.match(/description="([^"]*)"/)?.[1] || "";
      const link = params.match(/link="([^"]*)"/)?.[1] || "";
      return `<LinkCard title="${title}" description="${desc}" href="${link}" />`;
    }
  );

  // ── Hugo inline shortcodes (convert to HTML comments) ──
  // These are Hugo-specific template functions that can't be converted automatically.
  // {{< name.inline >}}...{{< /name.inline >}}, {{% name.inline %}}...{{% /name.inline %}}
  result = result.replace(
    /\{\{[<%]\s*(\w+\.inline)\s*(?:"[^"]*"\s*)?(?:\/\s*)?[%>]\}\}[\s\S]*?\{\{[<%]\s*\/\1\s*[%>]\}\}/g,
    (match) => `<!-- TODO: Convert Hugo inline shortcode -->\n<!-- ${match.replace(/--/g, "- -")} -->`
  );
  // Self-closing inline shortcodes
  result = result.replace(
    /\{\{[<%]\s*\w+\.inline\s*(?:"[^"]*"\s*)?\/\s*[%>]\}\}/g,
    (match) => `<!-- TODO: Convert Hugo inline shortcode: ${match.replace(/--/g, "- -")} -->`
  );

  // ── Figure (rare, 2 occurrences) ──
  result = result.replace(
    /\{\{<\s*figure\s+src="([^"]*)"\s*(?:alt="([^"]*)")?\s*(?:title="([^"]*)")?\s*>\}\}/g,
    (_, src, alt, title) => {
      const altText = alt || title || "";
      return `![${altText}](${src})`;
    }
  );

  // ── Escape curly braces in heading ID attributes for MDX ──
  // Hugo uses {#id} for custom heading IDs. MDX interprets {} as JS expressions.
  // Convert to Starlight-compatible HTML id attributes or just remove them.
  if (imports.size > 0) {
    // Remove {#id} attributes from headings (Astro auto-generates IDs)
    result = result.replace(
      /^(#{1,6}\s+.*?)\s*\{#[\w-]+\}\s*$/gm,
      "$1"
    );
    // Remove {.class} attributes from headings
    result = result.replace(
      /^(#{1,6}\s+.*?)\s*\{\.[\w-]+\}\s*$/gm,
      "$1"
    );
  }

  // ── Escape bare < in prose for MDX compatibility ──
  // MDX interprets < as JSX. Common cases:
  // - <-> (arrows), <= (comparison), <kdb> (typos)
  // These need escaping ONLY in .mdx files
  if (imports.size > 0) {
    // Escape < that's followed by non-letter, non-slash, or invalid tag names
    // This catches <->, <=, <3, etc. but preserves <div>, <Tabs>, </Tabs>
    result = result.replace(
      /<(?![A-Za-z/!])/g,
      "&lt;"
    );
    // Fix common HTML typos that look like JSX
    result = result.replace(/<(kdb|Kdb)>/g, "<kbd>");
  }

  // ── HTML comments → MDX comments (only for .mdx files) ──
  // HTML <!-- --> comments are invalid in MDX, convert to {/* */}
  if (imports.size > 0) {
    // Handle both single-line and multi-line comments
    result = result.replace(
      /<!--([\s\S]*?)-->/g,
      (match, inner) => {
        // Clean the inner content for MDX compatibility
        const cleaned = inner.replace(/--/g, "- -").trim();
        return `{/* ${cleaned} */}`;
      }
    );
  }

  return { content: result, imports };
}

// ── Pass 3: Link rewriting ──

function rewriteLinks(content, sourceRelPath) {
  // Remove .md extensions from markdown links
  // [text](path.md) → [text](path/)
  // [text](path.md#anchor) → [text](path/#anchor)
  let result = content.replace(
    /\]\(([^)]*?)\.md(#[^)]*?)?\)/g,
    (match, path, anchor) => {
      // Don't touch external URLs
      if (path.startsWith("http")) return match;
      // Don't touch anchored-only links
      if (path === "") return match;
      return `](${path}/${anchor || ""})`;
    }
  );

  // Convert _index.md references to just the directory
  result = result.replace(/_index\//g, "");

  return result;
}

// ── Path mapping ──

function mapPath(relPath) {
  // Try each IA move from most specific to least
  const entries = Object.entries(IA_MOVES).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [from, to] of entries) {
    if (relPath.startsWith(from)) {
      return to + relPath.slice(from.length);
    }
  }

  // No mapping found — keep as-is
  return relPath;
}

function computePublishedUrl(relPath) {
  // Hugo strips /manuals/ prefix and converts _index.md → /
  let url = "/" + relPath;
  url = url.replace(/^\/manuals\//, "/");
  url = url.replace(/_index\.md$/, "");
  url = url.replace(/\.md$/, "/");
  if (!url.endsWith("/")) url += "/";
  return url;
}

function computeNewUrl(destRelPath) {
  let url = "/" + destRelPath;
  url = url.replace(/_index\.mdx?$/, "");
  url = url.replace(/index\.mdx?$/, "");
  url = url.replace(/\.mdx?$/, "/");
  if (!url.endsWith("/")) url += "/";
  return url;
}

// ── YAML front matter parser ──

function parseFrontMatter(content) {
  // Handle front matter delimiters with optional trailing spaces
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: content, raw: "" };

  const raw = match[1];
  const body = match[2];

  let fm = {};
  try {
    fm = yaml.load(raw) || {};
  } catch {
    // If YAML parsing fails, return empty front matter
    fm = {};
  }

  return { fm, body, raw };
}

function serializeFrontMatter(fm) {
  // Use js-yaml to produce valid YAML
  const yamlStr = yaml.dump(fm, {
    lineWidth: -1,       // Don't wrap lines
    quotingType: '"',    // Use double quotes
    forceQuotes: false,  // Only quote when needed
    noRefs: true,        // No YAML anchors
  }).trimEnd();
  return `---\n${yamlStr}\n---`;
}

// ── Main migration logic ──

function migrateFile(filePath) {
  const relPath = relative(CONTENT_DIR, filePath);

  // Skip vendored/generated content
  if (SKIP_PATHS.some((p) => relPath.startsWith(p))) {
    log(`SKIP ${relPath} (vendored/generated)`);
    return null;
  }

  const content = readFileSync(filePath, "utf-8");

  // Parse front matter (keep raw YAML to preserve it mostly intact)
  const { fm, body, raw } = parseFrontMatter(content);

  // Pass 1: Transform front matter
  const { frontMatter, extracted } = transformFrontMatter(fm);

  // Skip pages Hugo doesn't render (build.render: never)
  if (extracted.skipRender) {
    log(`SKIP ${relPath} (render: never)`);
    return null;
  }

  // Pass 2: Convert shortcodes
  const { content: convertedBody, imports } = convertShortcodes(body);

  // Pass 3: Rewrite links
  const rewrittenBody = rewriteLinks(convertedBody, relPath);

  // Determine if file needs MDX (has imports)
  // Large files (>2000 lines) stay as .md to avoid MDX parsing issues with
  // angle brackets, HTML entities, etc. in prose. Imports are stripped.
  const lineCount = rewrittenBody.split("\n").length;
  const isLargeFile = lineCount > 2000;
  const needsMdx = imports.size > 0 && !isLargeFile;
  if (isLargeFile && imports.size > 0) {
    log(`NOTE ${relPath}: large file (${lineCount} lines), keeping as .md (${imports.size} imports stripped)`);
  }

  // Build the import block
  const importBlock = imports.size > 0
    ? "\n" + Array.from(imports).sort().join("\n") + "\n"
    : "";

  // Reassemble the file
  // For now, keep the raw front matter mostly intact and add transformed fields
  // A more sophisticated approach would fully reparse and reserialize
  const newFrontMatter = serializeFrontMatter(frontMatter);
  const newContent = `${newFrontMatter}\n${importBlock}\n${rewrittenBody}`;

  // Pass 4: Compute destination path
  const destRelPath = mapPath(relPath);
  // Rename _index.md → index.md (Astro convention) and .md → .mdx if needed
  let destFileName = destRelPath;
  destFileName = destFileName.replace(/_index\.md$/, "index.md");
  if (needsMdx) {
    destFileName = destFileName.replace(/\.md$/, ".mdx");
  }
  const destPath = join(DEST_DIR, destFileName);

  // Collect redirects from aliases
  const newUrl = computeNewUrl(destFileName);
  for (const alias of extracted.aliases) {
    redirects.push({ from: alias, to: newUrl });
  }

  // Collect migration map entry
  const oldUrl = computePublishedUrl(relPath);
  if (oldUrl !== newUrl) {
    migrationMap.push({ oldPath: relPath, newPath: destFileName, oldUrl, newUrl });
    redirects.push({ from: oldUrl, to: newUrl });
  }

  return {
    relPath,
    destPath,
    destFileName,
    content: newContent,
    needsMdx,
    importsCount: imports.size,
  };
}

// ── Execute ──

console.log("Docker Docs Migration: Hugo → Astro Starlight");
console.log("=".repeat(50));
console.log(`Mode: ${args.write ? "WRITE" : "DRY RUN"}`);
console.log(`Source: ${CONTENT_DIR}`);
console.log(`Destination: ${DEST_DIR}`);
if (args.section) console.log(`Section: ${args.section}`);
console.log("");

// Find all markdown files
let files = findFiles(CONTENT_DIR);
if (args.section) {
  files = files.filter((f) =>
    relative(CONTENT_DIR, f).startsWith(args.section)
  );
}

console.log(`Found ${files.length} markdown files`);

let migrated = 0;
let skipped = 0;
let errors = 0;
let mdxCount = 0;

for (const file of files) {
  try {
    const result = migrateFile(file);
    if (!result) {
      skipped++;
      continue;
    }

    migrated++;
    if (result.needsMdx) mdxCount++;

    if (args.write) {
      mkdirSync(dirname(result.destPath), { recursive: true });
      writeFileSync(result.destPath, result.content, "utf-8");
      log(`WRITE ${result.destFileName}`);
    } else {
      log(`WOULD WRITE ${result.destFileName} (${result.importsCount} imports)`);
    }
  } catch (err) {
    errors++;
    console.error(`ERROR ${relative(CONTENT_DIR, file)}: ${err.message}`);
  }
}

console.log("\n" + "=".repeat(50));
console.log(`Migrated: ${migrated}`);
console.log(`  MDX files: ${mdxCount}`);
console.log(`  MD files: ${migrated - mdxCount}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors}`);
console.log(`Redirects collected: ${redirects.length}`);
console.log(`URL changes: ${migrationMap.length}`);

// Write redirect and migration map files
if (args.write) {
  const redirectsPath = join(ROOT, "src", "data", "redirects-migration.json");
  mkdirSync(dirname(redirectsPath), { recursive: true });
  writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2), "utf-8");
  console.log(`\nRedirects written to: ${redirectsPath}`);

  const mapPath = join(ROOT, "migration-map.json");
  writeFileSync(mapPath, JSON.stringify(migrationMap, null, 2), "utf-8");
  console.log(`Migration map written to: ${mapPath}`);
}

// Report remaining Hugo shortcodes (should be zero)
if (args.write) {
  try {
    const remaining = execSync(
      `grep -rn '{{[<%]' "${DEST_DIR}" --include="*.md" --include="*.mdx" 2>/dev/null | grep -v 'node_modules' | wc -l`,
      { encoding: "utf-8" }
    ).trim();
    if (remaining !== "0") {
      console.log(`\n⚠ Remaining Hugo shortcodes: ${remaining} (run grep to find them)`);
    } else {
      console.log("\nAll shortcodes converted successfully.");
    }
  } catch {
    // grep returns 1 if no matches — that's fine
    console.log("\nAll shortcodes converted successfully.");
  }
}

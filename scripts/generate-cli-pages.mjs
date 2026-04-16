#!/usr/bin/env node

/**
 * CLI reference page generator.
 *
 * Reads YAML data files from src/data/cli/ and src/data/sbx_cli/,
 * generates Markdown pages under src/content/docs/reference/cli/.
 *
 * Run before `astro build` or `astro dev`:
 *   node scripts/generate-cli-pages.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const yaml = require("js-yaml");

const ROOT = resolve(import.meta.dirname, "..");
const CLI_DATA = join(ROOT, "src", "data", "cli");
const SBX_DATA = join(ROOT, "src", "data", "sbx_cli");
const OUTPUT = join(ROOT, "src", "content", "docs", "reference", "cli");

const SKIP_DEFAULTS = new Set([
  "[]", "map[]", "false", "0", "0s", "default", "''", '""', "",
]);

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Docker CLI ──

function generateDockerCliBody(doc, allDocs) {
  const parts = [];

  // Metadata table
  parts.push('<table class="cli-meta">');
  parts.push("<tbody>");
  if (doc.short) {
    parts.push(`<tr><th>Description</th><td>${escapeHtml(doc.short)}</td></tr>`);
  }
  if (doc.usage) {
    parts.push(`<tr><th>Usage</th><td><code>${escapeHtml(doc.usage)}</code></td></tr>`);
  }
  if (doc.aliases) {
    const aliases = doc.aliases
      .split(", ")
      .filter((a) => a !== doc.command)
      .map((a) => `<code>${escapeHtml(a)}</code>`)
      .join(" ");
    if (aliases) {
      parts.push(`<tr><th>Aliases</th><td>${aliases}</td></tr>`);
    }
  }
  parts.push("</tbody></table>");
  parts.push("");

  if (doc.deprecated) {
    parts.push("> [!WARNING]");
    parts.push("> This command is deprecated.");
    parts.push("");
  }

  if (doc.experimental || doc.experimentalcli) {
    parts.push("> [!CAUTION]");
    parts.push("> **This command is experimental.**");
    parts.push("> Experimental features are intended for testing and feedback.");
    parts.push("");
  }

  if (doc.long) {
    parts.push("## Description");
    parts.push("");
    parts.push(doc.long);
    parts.push("");
  }

  // Options
  const opts = (doc.options || []).filter((o) => !o.hidden);
  if (opts.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of opts) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.option}\``
        : `\`--${opt.option}\``;
      const optCell = opt.details_url ? `[${name}](${opt.details_url})` : name;
      const defVal = opt.default_value && !SKIP_DEFAULTS.has(opt.default_value)
        ? `\`${opt.default_value}\``
        : "";
      const badges = [];
      if (opt.min_api_version) badges.push(`**API ${opt.min_api_version}+**`);
      if (opt.deprecated) badges.push("**Deprecated**");
      if (opt.experimental) badges.push("*experimental (daemon)*");
      if (opt.experimentalcli) badges.push("*experimental (CLI)*");
      const desc = [...badges, (opt.description || "").replace(/\n/g, " ")].filter(Boolean).join(" ");
      parts.push(`| ${optCell} | ${defVal} | ${desc} |`);
    }
    parts.push("");
  }

  // Subcommands
  if (doc.cname && doc.cname.length > 0) {
    parts.push("## Subcommands");
    parts.push("");
    parts.push("| Command | Description |");
    parts.push("|---------|-------------|");
    for (const childName of doc.cname) {
      const childDoc = allDocs.get(childName);
      const short = childDoc?.short || "";
      const slug = childName.replace(/ /g, "/");
      parts.push(`| [\`${childName}\`](/reference/cli/${slug}/) | ${short} |`);
    }
    parts.push("");
  }

  // Examples
  if (doc.examples) {
    parts.push("## Examples");
    parts.push("");
    parts.push(doc.examples);
    parts.push("");
  }

  return parts.join("\n");
}

// ── SBX CLI ──

function generateSbxCliBody(doc) {
  const parts = [];

  if (doc.usage) {
    parts.push("## Synopsis");
    parts.push("");
    parts.push("```");
    parts.push(doc.usage);
    parts.push("```");
    parts.push("");
  }

  if (doc.description) {
    parts.push("## Description");
    parts.push("");
    parts.push(doc.description);
    parts.push("");
  }

  // Child commands
  const children = (doc.see_also || [])
    .map((entry) => {
      const idx = entry.indexOf(" - ");
      return idx === -1
        ? { command: entry.trim(), description: "" }
        : { command: entry.slice(0, idx).trim(), description: entry.slice(idx + 3).trim() };
    })
    .filter((sa) => sa.command.startsWith(doc.name + " "));

  if (children.length > 0) {
    parts.push("## Commands");
    parts.push("");
    parts.push("| Command | Description |");
    parts.push("|---------|-------------|");
    for (const child of children) {
      const slug = "reference/cli/" + child.command.replace(/\s+/g, "_").replace(/_/g, "-");
      parts.push(`| [\`${child.command}\`](/${slug}/) | ${child.description} |`);
    }
    parts.push("");
  }

  const filterHelp = (opts) => (opts || []).filter((o) => o.name !== "help");

  const visibleOpts = filterHelp(doc.options);
  if (visibleOpts.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of visibleOpts) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.name}\``
        : `\`--${opt.name}\``;
      const dv = opt.default_value;
      const defVal = dv && dv !== "false" && dv !== "" && dv !== "[]" ? `\`${dv}\`` : "";
      const desc = (opt.usage || "").replace(/\n/g, " ");
      parts.push(`| ${name} | ${defVal} | ${desc} |`);
    }
    parts.push("");
  }

  const inherited = filterHelp(doc.inherited_options);
  if (inherited.length > 0) {
    parts.push("## Global Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of inherited) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.name}\``
        : `\`--${opt.name}\``;
      const dv = opt.default_value;
      const defVal = dv && dv !== "false" && dv !== "" && dv !== "[]" ? `\`${dv}\`` : "";
      const desc = (opt.usage || "").replace(/\n/g, " ");
      parts.push(`| ${name} | ${defVal} | ${desc} |`);
    }
    parts.push("");
  }

  if (doc.example) {
    const lines = doc.example.split("\n");
    const minIndent = lines
      .filter((l) => l.trim().length > 0)
      .reduce((min, l) => Math.min(min, (l.match(/^ */)?.[0].length ?? 0)), Infinity);
    const dedented = lines.map((l) => l.slice(minIndent)).join("\n").trimEnd();
    parts.push("## Examples");
    parts.push("");
    parts.push("```bash");
    parts.push(dedented);
    parts.push("```");
    parts.push("");
  }

  return parts.join("\n");
}

// ── Serialize front matter ──

function writePage(filePath, fm, body) {
  const fmStr = yaml.dump(fm, { lineWidth: -1, quotingType: '"', noRefs: true }).trimEnd();
  const content = `---\n${fmStr}\n---\n\n${body}\n`;
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf-8");
}

// ── Main ──

console.log("Generating CLI reference pages...");

// Load all Docker CLI YAML
const allDockerDocs = new Map();
let dockerCount = 0;

for (const folder of readdirSync(CLI_DATA)) {
  const folderPath = join(CLI_DATA, folder);
  let files;
  try {
    files = readdirSync(folderPath).filter((f) => f.endsWith(".yaml"));
  } catch {
    continue;
  }

  for (const file of files) {
    const content = readFileSync(join(folderPath, file), "utf-8");
    const doc = yaml.load(content);
    if (doc?.command) {
      allDockerDocs.set(doc.command, doc);
    }
  }
}

// Generate Docker CLI pages
for (const [, doc] of allDockerDocs) {
  if (doc.hidden) continue;

  // Skip aliases (from _content.gotmpl logic)
  if (doc.aliases) {
    const cmdWords = doc.command.split(" ").length;
    const isAlias = doc.aliases.split(", ").some((a) => a.split(" ").length > cmdWords);
    if (isAlias) continue;
  }

  const slug = doc.command.replace(/ /g, "/");
  const hasSubcommands = doc.cname && doc.cname.length > 0;
  const filename = hasSubcommands ? "index.md" : slug.split("/").pop() + ".md";
  const dirPath = hasSubcommands
    ? join(OUTPUT, slug)
    : join(OUTPUT, slug.split("/").slice(0, -1).join("/"));
  const filePath = join(dirPath, filename);

  const body = generateDockerCliBody(doc, allDockerDocs);
  writePage(filePath, {
    title: doc.command,
    description: doc.short || `Reference for ${doc.command}`,
    sidebar: { label: doc.command.split(" ").pop() },
  }, body);

  dockerCount++;
}

// Generate SBX CLI pages
let sbxCount = 0;
try {
  const sbxFiles = readdirSync(SBX_DATA).filter(
    (f) => f.startsWith("sbx") && f.endsWith(".yaml"),
  );

  for (const file of sbxFiles) {
    const content = readFileSync(join(SBX_DATA, file), "utf-8");
    const doc = yaml.load(content);
    if (!doc?.name) continue;

    const base = file.replace(".yaml", "").replace(/_/g, "-");
    const hasChildren = (doc.see_also || []).some((sa) =>
      sa.startsWith(doc.name + " "),
    );

    const dirPath = join(OUTPUT, base);
    const filename = hasChildren ? "index.md" : base + ".md";
    const filePath = hasChildren ? join(dirPath, "index.md") : join(OUTPUT, filename);

    const body = generateSbxCliBody(doc);
    writePage(filePath, {
      title: doc.name,
      description: doc.synopsis || `Reference for ${doc.name}`,
      sidebar: { label: doc.name.split(" ").pop() || doc.name },
    }, body);

    sbxCount++;
  }
} catch {
  // sbx_cli dir may not exist
}

// Generate redirect pages for common shortcuts
const redirects = {
  "docker/ps": { target: "/reference/cli/docker/container/ls/", title: "docker ps" },
  "docker/run": { target: "/reference/cli/docker/container/run/", title: "docker run" },
  "docker/exec": { target: "/reference/cli/docker/container/exec/", title: "docker exec" },
  "docker/build": { target: "/reference/cli/docker/buildx/build/", title: "docker build" },
  "docker/images": { target: "/reference/cli/docker/image/ls/", title: "docker images" },
  "docker/pull": { target: "/reference/cli/docker/image/pull/", title: "docker pull" },
  "docker/push": { target: "/reference/cli/docker/image/push/", title: "docker push" },
  "docker/info": { target: "/reference/cli/docker/system/info/", title: "docker info" },
};

let redirectCount = 0;
for (const [path, { target, title }] of Object.entries(redirects)) {
  const filePath = join(OUTPUT, path + ".md");
  writePage(filePath, {
    title,
    description: `Shortcut for ${title}. See the canonical page.`,
    sidebar: { label: title.split(" ").pop() },
  }, `This command is a shortcut. See [\`${title}\`](${target}).`);
  redirectCount++;
}

console.log(`Generated ${dockerCount} Docker CLI pages`);
console.log(`Generated ${sbxCount} SBX CLI pages`);
console.log(`Generated ${redirectCount} redirect pages`);
console.log(`Total: ${dockerCount + sbxCount + redirectCount} pages`);

/**
 * Astro integration: markdown output format.
 *
 * Post-build hook that writes a `.md` file for every documentation page into
 * the `dist/` directory alongside the HTML output. This powers:
 *
 * - "View Markdown" / "Open in Claude" features
 * - Content negotiation (`Accept: text/markdown`) via Lambda@Edge
 *
 * Also generates clean markdown for CLI reference pages from the YAML source
 * data, so CLI docs get proper structured markdown (not just raw YAML pass-through).
 */
import type { AstroIntegration } from "astro";
import {
  readdirSync,
  readFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

/* ── YAML types ── */

// Docker CLI YAML schema (engine, buildx, compose, model, scout, etc.)
type DockerOption = {
  option: string;
  shorthand?: string;
  default_value?: string;
  description?: string;
  hidden?: boolean;
  deprecated?: boolean;
  experimental?: boolean;
  experimentalcli?: boolean;
  min_api_version?: string;
  details_url?: string;
};

type DockerCliDoc = {
  command: string;
  short?: string;
  long?: string;
  usage?: string;
  aliases?: string;
  options?: DockerOption[];
  inherited_options?: DockerOption[];
  cname?: string[];
  examples?: string;
  deprecated?: boolean;
  experimental?: boolean;
  experimentalcli?: boolean;
};

// SBX CLI YAML schema (different field names)
type SbxOption = {
  name: string;
  shorthand?: string;
  default_value?: string;
  usage?: string;
};

type SbxCliDoc = {
  name: string;
  synopsis?: string;
  description?: string;
  usage?: string;
  options?: SbxOption[];
  inherited_options?: SbxOption[];
  see_also?: string[];
  example?: string;
};

/* ── CLI slug helpers ── */

function commandToSlug(command: string): string {
  return "reference/cli/" + command.replace(/ /g, "/");
}

/* ── CLI markdown generation ── */

const SKIP_DEFAULTS = new Set([
  "[]",
  "map[]",
  "false",
  "0",
  "0s",
  "default",
  "''",
  '""',
  "",
]);

/* ── Docker CLI markdown generation ── */

function formatDockerOption(opt: DockerOption): string {
  const flag = opt.shorthand
    ? `-${opt.shorthand}, --${opt.option}`
    : `--${opt.option}`;
  let desc = (opt.description || "").trim().replace(/\n/g, " ");
  const dv = opt.default_value;
  if (dv && !SKIP_DEFAULTS.has(dv)) {
    desc += ` (default: ${dv})`;
  }
  return `| \`${flag}\` | ${desc} |`;
}

function generateDockerCliMarkdown(
  doc: DockerCliDoc,
  allDocs: Map<string, DockerCliDoc>,
): string {
  const parts: string[] = [];

  parts.push(`# ${doc.command}`);
  parts.push("");

  if (doc.short) {
    parts.push(doc.short);
    parts.push("");
  }

  if (doc.usage) {
    parts.push("## Synopsis");
    parts.push("");
    parts.push("```");
    parts.push(doc.usage);
    parts.push("```");
    parts.push("");
  }

  if (doc.long) {
    parts.push("## Description");
    parts.push("");
    parts.push(doc.long.trim());
    parts.push("");
  }

  // Subcommands
  if (doc.cname && doc.cname.length > 0) {
    parts.push("## Commands");
    parts.push("");
    parts.push("| Command | Description |");
    parts.push("| --- | --- |");
    for (const childName of doc.cname) {
      const childDoc = allDocs.get(childName);
      const short = childDoc?.short || "";
      const slug = commandToSlug(childName);
      parts.push(`| [\`${childName}\`](/${slug}/) | ${short} |`);
    }
    parts.push("");
  }

  // Options
  const visibleOptions = (doc.options || []).filter((o) => !o.hidden);
  if (visibleOptions.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Flag | Description |");
    parts.push("| --- | --- |");
    for (const opt of visibleOptions) {
      parts.push(formatDockerOption(opt));
    }
    parts.push("");
  }

  // Inherited options
  const visibleInherited = (doc.inherited_options || []).filter(
    (o) => !o.hidden,
  );
  if (visibleInherited.length > 0) {
    parts.push("## Global Options");
    parts.push("");
    parts.push("| Flag | Description |");
    parts.push("| --- | --- |");
    for (const opt of visibleInherited) {
      parts.push(formatDockerOption(opt));
    }
    parts.push("");
  }

  if (doc.examples) {
    parts.push("## Examples");
    parts.push("");
    parts.push(doc.examples.trim());
    parts.push("");
  }

  return parts.join("\n");
}

/* ── SBX CLI markdown generation ── */

function formatSbxOption(opt: SbxOption): string {
  const flag = opt.shorthand
    ? `-${opt.shorthand}, --${opt.name}`
    : `--${opt.name}`;
  let desc = (opt.usage || "").trim().replace(/\n/g, " ");
  const dv = opt.default_value;
  if (dv && !SKIP_DEFAULTS.has(dv)) {
    desc += ` (default: ${dv})`;
  }
  return `| \`${flag}\` | ${desc} |`;
}

function sbxSlugFromName(name: string): string {
  return "reference/cli/" + name.replace(/\s+/g, "-");
}

function generateSbxCliMarkdown(doc: SbxCliDoc): string {
  const parts: string[] = [];

  parts.push(`# ${doc.name}`);
  parts.push("");

  if (doc.synopsis) {
    parts.push(doc.synopsis);
    parts.push("");
  }

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
    parts.push(doc.description.trim());
    parts.push("");
  }

  // Child commands from see_also
  const children = (doc.see_also || [])
    .map((entry) => {
      const idx = entry.indexOf(" - ");
      return idx === -1
        ? { command: entry.trim(), description: "" }
        : {
            command: entry.slice(0, idx).trim(),
            description: entry.slice(idx + 3).trim(),
          };
    })
    .filter((sa) => sa.command.startsWith(doc.name + " "));

  if (children.length > 0) {
    parts.push("## Commands");
    parts.push("");
    parts.push("| Command | Description |");
    parts.push("| --- | --- |");
    for (const child of children) {
      const slug = sbxSlugFromName(child.command);
      parts.push(`| [\`${child.command}\`](/${slug}/) | ${child.description} |`);
    }
    parts.push("");
  }

  const filterHelp = (opts: SbxOption[]) =>
    (opts || []).filter((o) => o.name !== "help");

  const visibleOpts = filterHelp(doc.options || []);
  if (visibleOpts.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Flag | Description |");
    parts.push("| --- | --- |");
    for (const opt of visibleOpts) {
      parts.push(formatSbxOption(opt));
    }
    parts.push("");
  }

  const inherited = filterHelp(doc.inherited_options || []);
  if (inherited.length > 0) {
    parts.push("## Global Options");
    parts.push("");
    parts.push("| Flag | Description |");
    parts.push("| --- | --- |");
    for (const opt of inherited) {
      parts.push(formatSbxOption(opt));
    }
    parts.push("");
  }

  if (doc.example) {
    // Dedent the example block (SBX YAML often has leading whitespace)
    const lines = doc.example.split("\n");
    const minIndent = lines
      .filter((l) => l.trim().length > 0)
      .reduce(
        (min, l) => Math.min(min, l.match(/^ */)![0].length),
        Infinity,
      );
    const dedented = lines
      .map((l) => l.slice(minIndent))
      .join("\n")
      .trimEnd();
    parts.push("## Examples");
    parts.push("");
    parts.push("```bash");
    parts.push(dedented);
    parts.push("```");
    parts.push("");
  }

  return parts.join("\n");
}

/* ── Frontmatter parser ── */

function parseFrontmatter(content: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data = (yaml.load(match[1]) as Record<string, unknown>) || {};
  const stringData: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      stringData[key] = value.trim();
    }
  }

  return { data: stringData, body: match[2] };
}

/* ── Slug from file path ── */

function docsSlugFromPath(filePath: string, docsDir: string): string {
  let rel = relative(docsDir, filePath).replace(/\.(md|mdx)$/, "");
  if (rel.endsWith("/index") || rel === "index") {
    rel = rel.replace(/\/?index$/, "");
  }
  return rel;
}

/* ── Recursive directory walker ── */

function walkDir(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

/* ── Integration ── */

export default function markdownOutput(): AstroIntegration {
  let projectRoot: string;

  return {
    name: "markdown-output",
    hooks: {
      "astro:config:done": ({ config }) => {
        projectRoot = fileURLToPath(config.root);
      },

      "astro:build:done": async ({ dir }) => {
        const start = Date.now();
        const outDir = fileURLToPath(dir);
        const writes: Promise<void>[] = [];
        const createdDirs = new Set<string>();

        // Ensure parent directory exists (sync for correctness, cached)
        function ensureDir(filePath: string) {
          const dir = dirname(filePath);
          if (!createdDirs.has(dir)) {
            mkdirSync(dir, { recursive: true });
            createdDirs.add(dir);
          }
        }

        // ── Process content docs ──
        const docsDir = resolve(projectRoot, "src/content/docs");
        const docFiles = walkDir(docsDir).filter(
          (f) => f.endsWith(".md") || f.endsWith(".mdx"),
        );

        for (const filePath of docFiles) {
          const raw = readFileSync(filePath, "utf-8");
          const { data, body } = parseFrontmatter(raw);
          const slug = docsSlugFromPath(filePath, docsDir);
          const title = data.title || slug;

          const cleanBody = body.replace(/^import\s+.*$/gm, "").trim();
          const md = `# ${title}\n\n${cleanBody}\n`;

          const outPath = slug
            ? join(outDir, `${slug}.md`)
            : join(outDir, "index.md");
          ensureDir(outPath);
          writes.push(writeFile(outPath, md, "utf-8"));
        }

        // ── Process Docker CLI YAML docs ──
        const cliDir = resolve(projectRoot, "src/data/cli");
        const dockerYamlFiles = walkDir(cliDir).filter((f) =>
          f.endsWith(".yaml"),
        );

        const allDockerDocs = new Map<string, DockerCliDoc>();
        for (const file of dockerYamlFiles) {
          const raw = readFileSync(file, "utf-8");
          const doc = yaml.load(raw) as DockerCliDoc;
          if (doc?.command) {
            allDockerDocs.set(doc.command, doc);
          }
        }

        for (const [, doc] of allDockerDocs) {
          const slug = commandToSlug(doc.command);
          const md = generateDockerCliMarkdown(doc, allDockerDocs);
          const outPath = join(outDir, `${slug}.md`);
          ensureDir(outPath);
          writes.push(writeFile(outPath, md, "utf-8"));
        }

        // ── Process SBX CLI YAML docs ──
        const sbxDir = resolve(projectRoot, "src/data/sbx_cli");
        const sbxYamlFiles = walkDir(sbxDir).filter((f) =>
          f.endsWith(".yaml"),
        );

        for (const file of sbxYamlFiles) {
          const raw = readFileSync(file, "utf-8");
          const doc = yaml.load(raw) as SbxCliDoc;
          if (!doc?.name) continue;

          const slug = sbxSlugFromName(doc.name);
          const md = generateSbxCliMarkdown(doc);
          const outPath = join(outDir, `${slug}.md`);
          ensureDir(outPath);
          writes.push(writeFile(outPath, md, "utf-8"));
        }

        await Promise.all(writes);
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(
          `  markdown-output: wrote ${writes.length} markdown files in ${elapsed}s`,
        );
      },
    },
  };
}

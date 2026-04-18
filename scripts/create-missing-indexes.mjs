#!/usr/bin/env node
/**
 * Create stub index.md files for content directories that lack one.
 *
 * Starlight's autogenerate uses the directory name verbatim as the
 * group label when a directory has no index.md, which shows up in
 * breadcrumbs and the sidebar as ugly raw slugs
 * ("troubleshoot-and-support", "faqs", "api"). A stub index.md with a
 * proper `title` fixes that.
 *
 * Usage:
 *   node scripts/create-missing-indexes.mjs --dry-run
 *   node scripts/create-missing-indexes.mjs
 *
 * Ignores:
 *   - guides/ (flat files, handled separately)
 *   - reference/cli/ (CLI reference has its own generator/sidebar)
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ARGS = process.argv.slice(2);
const DRY = ARGS.includes("--dry-run");

const REPO = path.resolve(new URL("..", import.meta.url).pathname);
const DOCS = path.join(REPO, "src/content/docs");

// Segments that need special casing instead of naive title-casing.
const ACRONYMS = new Set([
  "api",
  "cli",
  "sdk",
  "dvp",
  "sso",
  "faq",
  "faqs",
  "ui",
  "os",
  "io",
  "url",
  "http",
  "https",
  "mcp",
  "acp",
  "rag",
  "llm",
  "ai",
  "ide",
  "ci",
  "cd",
  "ssh",
  "tls",
  "dns",
  "vpn",
  "vm",
  "wsl",
]);

// Small common words that should stay lowercase in the middle of a
// multi-word label (e.g. "single-sign-on" -> "Single sign-on").
const SMALL = new Set([
  "and",
  "or",
  "of",
  "the",
  "a",
  "an",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "as",
  "is",
]);

function labelize(slug) {
  const words = slug.split(/[-_]/);
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (ACRONYMS.has(lower)) {
        // Special: "faqs" → "FAQs", "apis" → "APIs" (trailing "s" lowercase)
        if (lower.endsWith("s") && ACRONYMS.has(lower.slice(0, -1))) {
          return lower.slice(0, -1).toUpperCase() + "s";
        }
        return lower.toUpperCase();
      }
      if (i > 0 && SMALL.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function hasIndex(dir) {
  return (
    fs.existsSync(path.join(dir, "index.md")) ||
    fs.existsSync(path.join(dir, "index.mdx"))
  );
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const full = path.join(dir, e.name);
    // Skip reference/cli — has its own generator/sidebar.
    const rel = path.relative(DOCS, full);
    if (rel === "reference/cli" || rel.startsWith("reference/cli/")) continue;
    // Skip guides — flat files now, no nested dirs expected.
    if (rel === "guides" || rel.startsWith("guides/")) continue;
    // Skip tags/ — not in the sidebar, vestigial.
    if (rel === "tags" || rel.startsWith("tags/")) continue;
    if (!hasIndex(full)) out.push(full);
    walk(full, out);
  }
  return out;
}

function main() {
  const dirs = walk(DOCS);
  console.log(
    `Found ${dirs.length} directory(ies) without index.md${DRY ? " (dry run)" : ""}\n`,
  );

  let created = 0;
  for (const dir of dirs) {
    const slug = path.basename(dir);
    const title = labelize(slug);
    const parentSlug = path.basename(path.dirname(dir));
    const parentLabel = labelize(parentSlug);

    const fm = {
      title,
      description: `${title} documentation for ${parentLabel}.`,
    };
    const fmYaml = yaml
      .dump(fm, { lineWidth: 1000, noRefs: true, quotingType: '"' })
      .trimEnd();
    const content = `---\n${fmYaml}\n---\n`;
    const target = path.join(dir, "index.md");
    console.log(
      `  + ${path.relative(DOCS, target)}  (title: "${title}")`,
    );
    if (!DRY) fs.writeFileSync(target, content, "utf8");
    created++;
  }

  console.log(`\n${created} stub(s) ${DRY ? "would be created" : "created"}.`);
}

main();

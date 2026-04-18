#!/usr/bin/env node
/**
 * Apply sidebar.order frontmatter across all products.
 *
 * For each (section, entry) in the plan, resolve `entry` to either
 *   <section>/<entry>.md
 *   <section>/<entry>.mdx
 *   <section>/<entry>/index.md
 *   <section>/<entry>/index.mdx
 * and set `sidebar.order` in the frontmatter. If the entry is a
 * directory without an index file, log a warning (Starlight will fall
 * back to alphabetical for that group).
 *
 * Usage:
 *   node scripts/apply-sidebar-order.mjs --dry-run
 *   node scripts/apply-sidebar-order.mjs
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ARGS = process.argv.slice(2);
const DRY = ARGS.includes("--dry-run");

const REPO = path.resolve(new URL("..", import.meta.url).pathname);
const DOCS = path.join(REPO, "src/content/docs");

const PLAN = {
  "get-started": {
    overview: 1,
    install: 2,
    "build-your-first-app": 3,
    "next-steps": 4,
  },
  engine: {
    install: 1,
    containers: 2,
    network: 3,
    storage: 4,
    daemon: 5,
    cli: 6,
    api: 7,
    logging: 8,
    "manage-resources": 9,
    security: 10,
    swarm: 11,
    extend: 12,
    deprecated: 95,
    "release-notes": 99,
  },
  build: {
    concepts: 1,
    building: 2,
    cache: 3,
    dockerfile: 4,
    buildkit: 5,
    builders: 6,
    bake: 7,
    ci: 8,
    exporters: 9,
    metadata: 10,
    debug: 11,
    checks: 12,
    policies: 13,
    "release-notes": 99,
  },
  compose: {
    intro: 1,
    install: 2,
    gettingstarted: 3,
    "how-tos": 4,
    "compose-file": 5,
    bridge: 6,
    ai: 7,
    "compose-sdk": 8,
    "trust-model": 9,
    "legacy-versions": 10,
    "support-and-feedback": 90,
    "release-notes": 99,
  },
  desktop: {
    setup: 1,
    "use-desktop": 2,
    features: 3,
    "settings-and-maintenance": 4,
    extensions: 5,
    enterprise: 6,
    uninstall: 90,
    "troubleshoot-and-support": 91,
    "cert-revoke-solution": 92,
    "previous-versions": 98,
    "release-notes": 99,
  },
  "model-runner": {
    "get-started": 1,
    configuration: 2,
    "inference-engines": 3,
    "ide-integrations": 4,
    "openwebui-integration": 5,
    examples: 6,
    "api-reference": 7,
  },
  gordon: {
    concepts: 1,
    "how-to": 2,
    "use-cases": 3,
  },
  "mcp-catalog-toolkit": {
    "get-started": 1,
    toolkit: 2,
    catalog: 3,
    "hub-mcp": 4,
    "mcp-gateway": 5,
    "dynamic-mcp": 6,
    profiles: 7,
    "e2b-sandboxes": 8,
    cli: 9,
    faqs: 95,
  },
  "docker-agent": {
    tutorial: 1,
    "model-providers": 2,
    "local-models": 3,
    rag: 4,
    evals: 5,
    "sharing-agents": 6,
    integrations: 7,
    "best-practices": 8,
    reference: 9,
  },
  sandboxes: {
    "get-started": 1,
    architecture: 2,
    usage: 3,
    "docker-desktop": 4,
    cli: 5,
    agents: 6,
    security: 7,
    troubleshooting: 90,
    faq: 95,
  },
  hub: {
    quickstart: 1,
    repos: 2,
    "image-library": 3,
    usage: 4,
    settings: 5,
    api: 6,
    troubleshoot: 90,
    "release-notes": 99,
  },
  scout: {
    quickstart: 1,
    install: 2,
    explore: 3,
    "how-tos": 4,
    "deep-dive": 5,
    policy: 6,
    integrations: 7,
    "release-notes": 99,
  },
  dhi: {
    "get-started": 1,
    "core-concepts": 2,
    features: 3,
    "how-to": 4,
    explore: 5,
    migration: 6,
    resources: 90,
    troubleshoot: 91,
  },
  "build-cloud": {
    setup: 1,
    usage: 2,
    "builder-settings": 3,
    optimization: 4,
    ci: 5,
    "release-notes": 99,
  },
  offload: {
    about: 1,
    quickstart: 2,
    configuration: 3,
    usage: 4,
    optimize: 5,
    troubleshoot: 90,
    feedback: 91,
  },
  admin: {
    accounts: 1,
    organizations: 2,
    subscription: 3,
    billing: 4,
    security: 5,
    enterprise: 6,
    support: 90,
  },
  reference: {
    cli: 1,
    glossary: 90,
  },
};

function resolveEntry(section, entry) {
  const base = path.join(DOCS, section, entry);
  const candidates = [
    `${base}.md`,
    `${base}.mdx`,
    path.join(base, "index.md"),
    path.join(base, "index.mdx"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function titleCase(slug) {
  return slug
    .split(/[-_]/)
    .map((w) => (w.length <= 3 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

// Create a stub index.md for a directory so Starlight's autogenerate
// picks up the sidebar.order from its frontmatter. Body is intentionally
// minimal — the page serves as a landing spot for the sidebar group.
function createStubIndex(section, entry, order) {
  const dir = path.join(DOCS, section, entry);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;
  const target = path.join(dir, "index.md");
  const title = titleCase(entry);
  const fm = {
    title,
    description: `${title} documentation for ${titleCase(section)}.`,
    sidebar: { order },
  };
  const fmYaml = yaml
    .dump(fm, { lineWidth: 1000, noRefs: true, quotingType: '"' })
    .trimEnd();
  const content = `---\n${fmYaml}\n---\n`;
  if (!DRY) fs.writeFileSync(target, content, "utf8");
  return target;
}

function applyOrder(file, order) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    console.error(`  ! no frontmatter: ${path.relative(DOCS, file)}`);
    return false;
  }
  const fm = yaml.load(m[1]) ?? {};
  const existing = fm.sidebar?.order;
  if (existing === order) return null; // no change
  fm.sidebar = { ...(fm.sidebar ?? {}), order };
  const newYaml = yaml
    .dump(fm, { lineWidth: 1000, noRefs: true, quotingType: '"' })
    .trimEnd();
  const body = m[2];
  const updated = `---\n${newYaml}\n---\n${body}`;
  if (!DRY) fs.writeFileSync(file, updated, "utf8");
  return existing;
}

function main() {
  let applied = 0;
  let skipped = 0;
  let missing = 0;
  const missingEntries = [];

  for (const [section, entries] of Object.entries(PLAN)) {
    console.log(`\n• ${section}`);
    for (const [entry, order] of Object.entries(entries)) {
      let file = resolveEntry(section, entry);
      if (!file) {
        const stub = createStubIndex(section, entry, order);
        if (stub) {
          console.log(`    ✎ ${entry} (stub index.md + order=${order})`);
          applied++;
          continue;
        }
        console.log(`    ? ${entry}  (not found, no directory either)`);
        missing++;
        missingEntries.push(`${section}/${entry}`);
        continue;
      }
      const result = applyOrder(file, order);
      const rel = path.relative(DOCS, file);
      if (result === null) {
        console.log(`    = ${entry}  (already order=${order})`);
        skipped++;
      } else if (result === undefined) {
        console.log(`    + ${entry} = ${order}  [${rel}]`);
        applied++;
      } else {
        console.log(`    ↻ ${entry}: ${result} → ${order}  [${rel}]`);
        applied++;
      }
    }
  }

  console.log(
    `\n${applied} applied, ${skipped} unchanged, ${missing} missing${DRY ? " (dry run)" : ""}`,
  );
  if (missingEntries.length) {
    console.log(
      `\nMissing entries (dir exists but has no index.md/mdx to hold the order):`,
    );
    for (const m of missingEntries) console.log(`  ${m}`);
  }
}

main();

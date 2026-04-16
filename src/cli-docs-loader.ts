import { readdirSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

/* ── Types ── */

/** Docker CLI YAML schema (docker/cli, docker/buildx, docker/compose, etc.) */
interface DockerCliOption {
  option: string;
  shorthand?: string;
  value_type?: string;
  default_value?: string;
  description?: string;
  details_url?: string;
  deprecated?: boolean;
  hidden?: boolean;
  experimental?: boolean;
  experimentalcli?: boolean;
  kubernetes?: boolean;
  swarm?: boolean;
  min_api_version?: string;
}

interface DockerCliDoc {
  command: string;
  aliases?: string;
  short?: string;
  long?: string;
  usage?: string;
  pname?: string;
  plink?: string;
  cname?: string[];
  clink?: string[];
  options?: DockerCliOption[];
  examples?: string;
  deprecated?: boolean;
  experimental?: boolean;
  experimentalcli?: boolean;
  kubernetes?: boolean;
  swarm?: boolean;
  hidden?: boolean;
}

/** SBX CLI YAML schema (cobra/doc style) */
interface SbxCliOption {
  name: string;
  shorthand?: string;
  default_value?: string;
  usage?: string;
}

interface SbxCliDoc {
  name: string;
  synopsis?: string;
  description?: string;
  usage?: string;
  options?: SbxCliOption[];
  inherited_options?: SbxCliOption[];
  example?: string;
  see_also?: string[];
}

/* ── Helpers ── */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

/* ── Docker CLI body generation ── */

function generateDockerCliBody(doc: DockerCliDoc, allDocs: Map<string, DockerCliDoc>): string {
  const parts: string[] = [];

  // Metadata table
  parts.push('<table class="cli-meta">');
  parts.push("<tbody>");
  if (doc.short) {
    parts.push(
      `<tr><th>Description</th><td>${escapeHtml(doc.short)}</td></tr>`,
    );
  }
  if (doc.usage) {
    parts.push(
      `<tr><th>Usage</th><td><code>${escapeHtml(doc.usage)}</code></td></tr>`,
    );
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
  parts.push("</tbody>");
  parts.push("</table>");
  parts.push("");

  // Deprecation warning
  if (doc.deprecated) {
    parts.push("> [!WARNING]");
    parts.push("> This command is deprecated.");
    parts.push(">");
    parts.push(
      "> It may be removed in a future Docker version.",
    );
    parts.push("");
  }

  // Experimental notice
  if (doc.experimental || doc.experimentalcli) {
    parts.push("> [!CAUTION]");
    parts.push("> **This command is experimental.**");
    parts.push(">");
    parts.push(
      "> Experimental features are intended for testing and feedback.",
    );
    parts.push("");
  }

  // Kubernetes/Swarm badges
  if (doc.kubernetes) {
    parts.push(
      "This command works with the Kubernetes orchestrator.",
    );
    parts.push("");
  }
  if (doc.swarm) {
    parts.push(
      "This command works with the Swarm orchestrator.",
    );
    parts.push("");
  }

  // Description
  if (doc.long) {
    parts.push("## Description");
    parts.push("");
    parts.push(doc.long);
    parts.push("");
  }

  // Options table
  const visibleOptions = (doc.options || []).filter((o) => !o.hidden);
  if (visibleOptions.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of visibleOptions) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.option}\``
        : `\`--${opt.option}\``;
      const optLink = opt.details_url
        ? `[${name}](${opt.details_url})`
        : name;

      const defaultVal =
        opt.default_value && !SKIP_DEFAULTS.has(opt.default_value)
          ? `\`${opt.default_value}\``
          : "";

      const badges: string[] = [];
      if (opt.min_api_version)
        badges.push(`**API ${opt.min_api_version}+**`);
      if (opt.deprecated) badges.push("**Deprecated**");
      if (opt.experimental) badges.push("*experimental (daemon)*");
      if (opt.experimentalcli) badges.push("*experimental (CLI)*");
      if (opt.kubernetes) badges.push("Kubernetes");
      if (opt.swarm) badges.push("Swarm");

      const desc = [
        ...badges,
        (opt.description || "").replace(/\n/g, " "),
      ]
        .filter(Boolean)
        .join(" ");

      parts.push(`| ${optLink} | ${defaultVal} | ${desc} |`);
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
      parts.push(
        `| [\`${childName}\`](/reference/cli/${slug}/) | ${short} |`,
      );
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

/* ── SBX CLI body generation ── */

function generateSbxCliBody(doc: SbxCliDoc): string {
  const parts: string[] = [];

  parts.push('<div class="manpage">');
  parts.push("");

  if (doc.usage) {
    parts.push("## Synopsis");
    parts.push("");
    parts.push(`\`\`\`\n${doc.usage}\n\`\`\``);
    parts.push("");
  }

  if (doc.description) {
    parts.push("## Description");
    parts.push("");
    parts.push(doc.description);
    parts.push("");
  }

  // Child commands from see_also
  const children = (doc.see_also || [])
    .map((entry) => {
      const idx = entry.indexOf(" - ");
      if (idx === -1) return { command: entry.trim(), description: "" };
      return {
        command: entry.slice(0, idx).trim(),
        description: entry.slice(idx + 3).trim(),
      };
    })
    .filter((sa) => sa.command.startsWith(doc.name + " "));

  if (children.length > 0) {
    parts.push("## Commands");
    parts.push("");
    parts.push("| Command | Description |");
    parts.push("|---------|-------------|");
    for (const child of children) {
      const slug =
        "reference/cli/" + child.command.replace(/\s+/g, "_").replace(/_/g, "-");
      parts.push(
        `| [\`${child.command}\`](/${slug}/) | ${child.description} |`,
      );
    }
    parts.push("");
  }

  // Options
  const filterHelp = (opts: SbxCliOption[]) =>
    opts.filter((o) => o.name !== "help");

  const visibleOptions = filterHelp(doc.options || []);
  if (visibleOptions.length > 0) {
    parts.push("## Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of visibleOptions) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.name}\``
        : `\`--${opt.name}\``;
      const dv = opt.default_value;
      const defaultVal =
        dv && dv !== "false" && dv !== "" && dv !== "[]"
          ? `\`${dv}\``
          : "";
      const desc = (opt.usage || "").replace(/\n/g, " ");
      parts.push(`| ${name} | ${defaultVal} | ${desc} |`);
    }
    parts.push("");
  }

  // Global/inherited options
  const visibleInherited = filterHelp(doc.inherited_options || []);
  if (visibleInherited.length > 0) {
    parts.push("## Global Options");
    parts.push("");
    parts.push("| Option | Default | Description |");
    parts.push("|--------|---------|-------------|");
    for (const opt of visibleInherited) {
      const name = opt.shorthand
        ? `\`-${opt.shorthand}\`, \`--${opt.name}\``
        : `\`--${opt.name}\``;
      const dv = opt.default_value;
      const defaultVal =
        dv && dv !== "false" && dv !== "" && dv !== "[]"
          ? `\`${dv}\``
          : "";
      const desc = (opt.usage || "").replace(/\n/g, " ");
      parts.push(`| ${name} | ${defaultVal} | ${desc} |`);
    }
    parts.push("");
  }

  // Examples
  if (doc.example) {
    const lines = doc.example.split("\n");
    const minIndent = lines
      .filter((l) => l.trim().length > 0)
      .reduce(
        (min, l) => Math.min(min, l.match(/^ */)?.[0].length ?? 0),
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

  parts.push("</div>");
  return parts.join("\n");
}

/* ── Main loader ── */

export function cliDocsLoader() {
  return {
    name: "cli-docs-loader",
    load: async (ctx: {
      store: {
        set: (entry: {
          id: string;
          data: Record<string, unknown>;
          body?: string;
          rendered?: { html: string; metadata?: Record<string, unknown> };
        }) => void;
      };
      parseData: (opts: {
        id: string;
        data: Record<string, unknown>;
      }) => Promise<Record<string, unknown>>;
      generateId: (opts: { entry: string; collection: string }) => string;
      renderMarkdown: (
        content: string,
      ) => Promise<{ html: string; metadata?: Record<string, unknown> }>;
      config: { root: URL };
    }) => {
      const projectRoot = fileURLToPath(ctx.config.root);

      // ── Load Docker CLI YAML ──
      const cliDir = resolve(projectRoot, "src/data/cli");
      const allDockerDocs = new Map<string, DockerCliDoc>();

      // First pass: load all Docker CLI YAML files
      for (const folder of readdirSync(cliDir)) {
        const folderPath = join(cliDir, folder);
        try {
          const files = readdirSync(folderPath).filter((f) =>
            f.endsWith(".yaml"),
          );
          for (const file of files) {
            const content = readFileSync(join(folderPath, file), "utf-8");
            const doc = yaml.load(content) as DockerCliDoc;
            if (doc?.command) {
              allDockerDocs.set(doc.command, doc);
            }
          }
        } catch {
          // Not a directory, skip
        }
      }

      // Second pass: generate pages (applying skip logic from _content.gotmpl)
      for (const [, doc] of allDockerDocs) {
        // Skip hidden commands
        if (doc.hidden) continue;

        // Skip alias/shortcut commands: if any alias has more words than
        // the command, a canonical version exists elsewhere
        if (doc.aliases) {
          const cmdWords = doc.command.split(" ").length;
          const isAlias = doc.aliases
            .split(", ")
            .some((a) => a.split(" ").length > cmdWords);
          if (isAlias) continue;
        }

        const slug = "reference/cli/" + doc.command.replace(/ /g, "/");
        const body = generateDockerCliBody(doc, allDockerDocs);

        const data = await ctx.parseData({
          id: slug,
          data: {
            title: doc.command,
            description: doc.short || undefined,
            sidebar: { label: doc.command },
          },
        });

        const rendered = await ctx.renderMarkdown(body);
        ctx.store.set({ id: slug, data, body, rendered });
      }

      // ── Load SBX CLI YAML ──
      const sbxDir = resolve(projectRoot, "src/data/sbx_cli");
      try {
        const sbxFiles = readdirSync(sbxDir).filter(
          (f) => f.startsWith("sbx") && f.endsWith(".yaml"),
        );

        for (const file of sbxFiles) {
          const content = readFileSync(join(sbxDir, file), "utf-8");
          const doc = yaml.load(content) as SbxCliDoc;
          if (!doc?.name) continue;

          const base = file.replace(".yaml", "");
          const slug = "reference/cli/" + base.replace(/_/g, "-");
          const body = generateSbxCliBody(doc);

          const data = await ctx.parseData({
            id: slug,
            data: {
              title: doc.name,
              description: doc.synopsis || undefined,
              sidebar: { label: doc.name },
            },
          });

          const rendered = await ctx.renderMarkdown(body);
          ctx.store.set({ id: slug, data, body, rendered });
        }
      } catch {
        // sbx_cli directory may not exist
      }

      // ── Sidebar redirect entries ──
      // Common shortcuts that redirect to canonical pages
      const redirects: Record<string, string> = {
        "reference/cli/docker/ps": "/reference/cli/docker/container/ls/",
        "reference/cli/docker/run": "/reference/cli/docker/container/run/",
        "reference/cli/docker/exec": "/reference/cli/docker/container/exec/",
        "reference/cli/docker/build": "/reference/cli/docker/buildx/build/",
        "reference/cli/docker/images": "/reference/cli/docker/image/ls/",
        "reference/cli/docker/pull": "/reference/cli/docker/image/pull/",
        "reference/cli/docker/push": "/reference/cli/docker/image/push/",
        "reference/cli/docker/info": "/reference/cli/docker/system/info/",
      };

      for (const [id, target] of Object.entries(redirects)) {
        // Only create redirect if the command was skipped as an alias
        const cmdName = id.replace("reference/cli/", "").replace(/\//g, " ");
        if (!allDockerDocs.has(cmdName)) continue;

        const data = await ctx.parseData({
          id,
          data: {
            title: cmdName,
            sidebar: {
              label: cmdName,
              attrs: { "data-redirect": target },
            },
          },
        });

        const body = `This command is an alias. See [\`${cmdName}\`](${target}).`;
        const rendered = await ctx.renderMarkdown(body);
        ctx.store.set({ id, data, body, rendered });
      }
    },
  };
}

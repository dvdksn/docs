import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

/* ── Types ── */

type YamlOption = {
  name: string;
  shorthand?: string;
  default_value?: string;
  usage?: string;
};

type CliDoc = {
  name: string;
  synopsis?: string;
  description?: string;
  usage?: string;
  options?: YamlOption[];
  inherited_options?: YamlOption[];
  example?: string;
  see_also?: string[];
};

/* ── Helpers ── */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugFromFilename(base: string): string {
  return 'reference/cli/' + base.replace(/_/g, '-');
}

function commandSlug(command: string): string {
  const slug = command.replace(/\s+/g, '_');
  const name = slugFromFilename(slug).split('/').pop()!;
  return `../${name}/`;
}

function manpageId(command: string): string {
  return command.replace(/\s+/g, '-').toUpperCase();
}

/** Parse a see_also entry like "sbx network log - Show network logs" */
function parseSeeAlso(entry: string): { command: string; description: string } {
  const idx = entry.indexOf(' - ');
  if (idx === -1) return { command: entry.trim(), description: '' };
  return {
    command: entry.slice(0, idx).trim(),
    description: entry.slice(idx + 3).trim(),
  };
}

/** Extract child commands from see_also (commands that extend the current one) */
function getChildCommands(
  doc: CliDoc,
): { command: string; description: string }[] {
  if (!doc.see_also) return [];
  const name = doc.name;
  return doc.see_also
    .map(parseSeeAlso)
    .filter(sa => sa.command.startsWith(name + ' '));
}

/** Filter out auto-generated help options */
function filterOptions(opts: YamlOption[]): YamlOption[] {
  return opts.filter(o => o.name !== 'help');
}

/* ── Option rendering (HTML definition list) ── */

function optionDt(opt: YamlOption): string {
  const parts: string[] = [];
  if (opt.shorthand) {
    parts.push(`<code>-${escapeHtml(opt.shorthand)}</code>, `);
  }
  parts.push(`<code>--${escapeHtml(opt.name)}</code>`);
  return parts.join('');
}

function optionDd(opt: YamlOption): string {
  let desc = escapeHtml((opt.usage || '').trim().replace(/\n/g, ' '));
  const dv = opt.default_value;
  if (dv && dv !== 'false' && dv !== '' && dv !== '[]') {
    desc += ` (default: ${escapeHtml(dv)})`;
  }
  return desc;
}

function optionsDl(opts: YamlOption[]): string {
  const lines: string[] = ['<dl class="manpage-opts">'];
  for (const opt of opts) {
    lines.push(`<dt>${optionDt(opt)}</dt>`);
    lines.push(`<dd>${optionDd(opt)}</dd>`);
  }
  lines.push('</dl>');
  return lines.join('\n');
}

/* ── Body generation (man-page structure) ── */

function generateBody(doc: CliDoc): string {
  const parts: string[] = [];
  const id = manpageId(doc.name);

  // Manpage wrapper
  parts.push('<div class="manpage">');
  parts.push('');

  // SYNOPSIS
  if (doc.usage) {
    parts.push('## Synopsis');
    parts.push('');
    parts.push(
      `<div class="manpage-synopsis">${escapeHtml(doc.usage)}</div>`,
    );
    parts.push('');
  }

  // DESCRIPTION
  if (doc.description) {
    parts.push('## Description');
    parts.push('');
    parts.push(doc.description);
    parts.push('');
  }

  // COMMANDS (child commands from see_also)
  const children = getChildCommands(doc);
  if (children.length > 0) {
    parts.push('## Commands');
    parts.push('');
    const cmdLines: string[] = ['<dl class="manpage-commands">'];
    for (const child of children) {
      const slug = commandSlug(child.command);
      const displayName = escapeHtml(child.command);
      const desc = escapeHtml(child.description);
      cmdLines.push(
        `<dt><a href="${slug}"><code>${displayName}</code></a></dt>`,
      );
      cmdLines.push(`<dd>${desc}</dd>`);
    }
    cmdLines.push('</dl>');
    parts.push(cmdLines.join('\n'));
    parts.push('');
  }

  // OPTIONS
  const visibleOptions = filterOptions(doc.options || []);
  if (visibleOptions.length > 0) {
    parts.push('## Options');
    parts.push('');
    parts.push(optionsDl(visibleOptions));
    parts.push('');
  }

  // GLOBAL OPTIONS (inherited)
  const visibleInherited = filterOptions(doc.inherited_options || []);
  if (visibleInherited.length > 0) {
    parts.push('## Global Options');
    parts.push('');
    parts.push(optionsDl(visibleInherited));
    parts.push('');
  }

  // EXAMPLES
  if (doc.example) {
    const lines = doc.example.split('\n');
    const minIndent = lines
      .filter(l => l.trim().length > 0)
      .reduce((min, l) => Math.min(min, l.match(/^ */)?.[0].length ?? 0), Infinity);
    const dedented = lines.map(l => l.slice(minIndent)).join('\n').trimEnd();
    parts.push('## Examples');
    parts.push('');
    parts.push('```bash');
    parts.push(dedented);
    parts.push('```');
    parts.push('');
  }

  // Footer bar + wrapper close
  parts.push(
    `<div class="manpage-foot"><span>Docker Sandboxes</span><span>2025</span><span>${id}(1)</span></div>`,
  );
  parts.push('');
  parts.push('</div>');

  return parts.join('\n');
}

/* ── Loader ── */

export function cliDocsLoader() {
  return {
    name: 'cli-docs-loader',
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
      renderMarkdown: (
        content: string,
      ) => Promise<{ html: string; metadata?: Record<string, unknown> }>;
      config: { root: URL };
    }) => {
      const projectRoot = fileURLToPath(ctx.config.root);
      const dataDir = resolve(projectRoot, 'src/data/cli');

      const files = readdirSync(dataDir).filter(
        f => f.startsWith('sbx') && f.endsWith('.yaml'),
      );

      // First pass — load all YAML
      const entries: { file: string; doc: CliDoc }[] = [];

      for (const file of files) {
        const filePath = resolve(dataDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const doc = yaml.load(content) as CliDoc;
        if (!doc || !doc.name) continue;
        entries.push({ file, doc });
      }

      // Second pass — generate pages
      for (const { file, doc } of entries) {
        const base = file.replace('.yaml', '');
        const id = slugFromFilename(base);

        const title = doc.name;
        const description = doc.synopsis || undefined;
        const body = generateBody(doc);

        const data = await ctx.parseData({
          id,
          data: {
            title,
            ...(description ? { description } : {}),
            sidebar: { label: title },
          },
        });

        const rendered = await ctx.renderMarkdown(body);

        ctx.store.set({ id, data, body, rendered });
      }
    },
  };
}


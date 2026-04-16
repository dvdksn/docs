# Astro Migration Status

Status as of 2026-04-16. This document helps a fresh session continue
the Hugo → Astro Starlight migration.

## What's done

### 1. Bootstrap (complete)

- Astro 5.10.1 + Starlight 0.34.4 configured in `astro.config.mjs`
- Docker theme in `src/styles/theme.css` (vanilla CSS, Starlight custom properties)
- Sidebar with 5 top-level sections and metadata-driven product grouping
- Vite path aliases: `@components`, `@data`, `@includes`, `@styles`
- Zod v3 pinned as direct dependency (workaround for Zod v3/v4 conflict
  between Astro core and @astrojs/sitemap)
- Fonts: Roboto Flex + Roboto Mono (copy from `static/assets/fonts/`
  to `public/fonts/` at build time)

### 2. Component library (complete)

Custom components in `src/components/`:

| Component | Replaces | Notes |
|---|---|---|
| `SummaryBar.astro` | `{{< summary-bar >}}` | Reads `src/data/summary.yaml` |
| `Version.astro` | `{{% param "X" %}}` | Reads `src/data/versions.ts` |
| `ReleaseDate.astro` | `{{< release-date >}}` | Styled italic date |
| `YouTube.astro` | `{{< youtube-embed >}}` | Lazy iframe |
| `LabspaceLaunch.astro` | `{{< labspace-launch >}}` | Step instructions |
| `DesktopInstall.astro` | `{{< desktop-install-v2 >}}` | Download links |
| `CallToAction.astro` | `{{< cta >}}` | CTA block |

Starlight built-ins used directly (no wrapper needed):
- `Tabs` / `TabItem`, `Card` / `CardGrid` / `LinkCard`, `LinkButton`,
  `Badge`, `Aside`

### 3. Content migration (complete, with known issues)

`scripts/migrate.mjs` processes Hugo pages through 4 passes:
1. Front matter transformation
2. Shortcode → MDX conversion
3. Link rewriting
4. File moves + .md → .mdx rename

Results: 1,088 pages migrated, 1,626 redirects collected, 216 URL changes.

### 4. IA reorganization (complete)

- Admin section extracted (accounts, billing, subscription, security, enterprise)
- AI products promoted to flat peers (model-runner, gordon, mcp-catalog-toolkit, etc.)
- docker-hub renamed to hub
- All products at top level (no `manuals/` directory)
- reference/samples removed

### 5. CLI reference (complete)

`scripts/generate-cli-pages.mjs` generates 396 pages from YAML data.

### 6. Include files (complete)

45 snippets converted to `src/components/includes/*.mdx`.

---

## What's NOT done (priority order)

### 1. Get a clean build (BLOCKING)

`npx astro build` fails on MDX runtime errors. Root causes:

**MDX strictness** — Hugo markdown uses patterns MDX can't handle:
- `{#id}` and `{key=value}` heading/block attributes → JS expressions in MDX
- Bare `<` in prose (`<->`, `<=`) → parsed as JSX
- `<details>/<summary>` inside lists → nesting violations
- HTML comments in .mdx files → need `{/* */}` syntax

**Image paths** — Relative image references break after IA file moves.
Partial fix in `scripts/fix-image-paths.mjs`.

**Page-level params** — `{{% param "X" %}}` where X is page-specific
(not in `src/data/versions.ts`). Manually fixed for engine install pages.

**~30 files converted back to .md** as workaround (losing component imports).

**Recommended approach:** Consider converting ALL files to .md and using
remark plugins for component injection instead of MDX imports. This avoids
all MDX strictness issues at the cost of a different component integration
pattern. Alternatively, systematically fix the remaining ~20 MDX errors.

### 2. Vendored upstream content

Hugo modules (`hugo.yaml` lines 294-379) vendor content from 6 upstream repos.
Need a replacement:
- `scripts/sync-upstream.sh` to fetch/copy at pinned versions
- `upstream-versions.json` replacing `go.mod` for version pins
- Mount mapping in `hugo.yaml` → copy destinations in Astro tree

### 3. Special features

- **Gordon AI chat** — `gordon.astro` (root) is a working Astro component.
  Needs branding update + Starlight layout integration.
- **Redirects endpoint** — `src/pages/redirects.json.ts` producing JSON
  for Lambda@Edge. Data in `src/data/redirects-migration.json` + `data/redirects.yml`.
- **Search** — Pagefind built into Starlight. Needs custom ranking weights.
- **Markdown export** — "View Markdown" / "Open in Claude" feature.
- **Output formats** — `metadata.json`, `llms.txt`, `robots.txt`, `sitemap.xml`.
- **Code blocks** — Prompt stripping for `$`/`>` prefixes (Expressive Code plugin).

### 4. Build pipeline & CI

- Update `Dockerfile` (drop Go/Hugo, Astro build)
- Update `docker-bake.hcl` targets
- Update GitHub Actions workflows
- Update `compose.yaml` for local dev

---

## Key files

| File | Purpose |
|---|---|
| `astro.config.mjs` | Starlight config, sidebar, Vite aliases |
| `src/content.config.ts` | Content collection schema |
| `src/styles/theme.css` | Docker design tokens → Starlight CSS vars |
| `src/data/versions.ts` | Site-wide version constants |
| `src/data/summary.yaml` | Feature availability matrix |
| `src/data/cli/` | Docker CLI YAML data |
| `scripts/migrate.mjs` | Main migration script (4-pass) |
| `scripts/generate-cli-pages.mjs` | CLI reference page generator |
| `scripts/fix-image-paths.mjs` | Relative → absolute image paths |
| `scripts/fix-mdx-errors.mjs` | Iterative MDX error fixer |
| `migration-map.json` | Old → new path mapping |
| `src/data/redirects-migration.json` | Collected redirects |
| `gordon.astro` | Gordon chat reference implementation |
| `technical-audit.md` | Technical observations about the migration |
| `information-architecture-proposal.md` | IA reorganization spec |

## Commands

```sh
npm install                          # Install deps (required first time)
npx astro build                      # Build (currently fails on MDX errors)
npx astro dev                        # Dev server on port 4321
node scripts/migrate.mjs --write     # Re-run content migration from Hugo source
node scripts/generate-cli-pages.mjs  # Re-generate CLI reference pages
node scripts/fix-image-paths.mjs     # Fix relative image paths
node scripts/fix-mdx-errors.mjs      # Iteratively convert failing MDX → .md
```

## Architecture decisions

- **No Tailwind** — vanilla CSS with Astro scoped styles
- **No Alpine.js** — Starlight built-ins + client-side `<script>` tags
- **No manuals/ directory** — products at top level, "Manuals" is sidebar grouping only
- **CLI pages as static .md** — generated pre-build by script, not content collection loader
- **Images in public/** — served statically with absolute paths (not Astro asset imports)
- **MDX only when needed** — files with component imports use .mdx, rest stay .md

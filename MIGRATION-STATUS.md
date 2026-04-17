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
- **Get started** consolidated from 3 overlapping tracks (docker-concepts,
  introduction, workshop — ~25 pages) into a single linear journey (overview,
  install, build-your-first-app, next-steps — 4 pages)
- **Compose file reference** split: 9 explanatory files moved to `compose/`,
  reference/compose-file/ now contains pure spec only (services, networks,
  volumes, build, deploy, configs, secrets, version-and-name)
- **Broken `/manuals/` links** fixed across 390 files (~1,100 occurrences)

### 5. CLI reference (complete)

`scripts/generate-cli-pages.mjs` generates 396 pages from YAML data.

### 6. Include files (complete)

45 snippets converted to `src/components/includes/*.mdx`.

---

## What's NOT done (priority order)

### 1. ~~Get a clean build~~ (DONE)

Build passes: 1,596 pages, zero errors.

Fix applied: escaped `{ip, ...}` in `reference/compose-file/merge.mdx`
(MDX was parsing curly braces as JS expression).

Remaining non-blocking warnings: unknown code languages in Expressive Code
(`Dockerfile` needs lowercase, `goat`/`rego`/`env`/`dockerignore` not bundled).

### 2. ~~Vendored upstream content~~ (DONE)

Replaced Hugo module vendoring with:
- `upstream-versions.json` — pinned versions for 6 upstream repos (replaces `go.mod`)
- `scripts/sync-upstream.sh` — fetches from GitHub at pinned refs with sparse checkout
- Content copied from `_vendor/` into Astro tree with front matter cleaned up

All 6 repos synced:
- moby/moby: version-history.md
- moby/buildkit: Dockerfile reference, 21 build-checks, toml config, 2 attestation docs
- docker/buildx: bake reference + stdlib
- docker/cli: engine extend (8 plugins), deprecated, run, dockerd
- docker/compose: 48 CLI YAML data files → src/data/cli/compose/
- docker/model-runner: 34 CLI YAML data files → src/data/cli/model/

CLI page generator now produces 468 pages (was 396+41).

### 3. ~~Special features~~ (mostly DONE)

Completed:
- **Redirects endpoint** — `src/pages/redirects.json.ts` merges migration
  redirects + vanity redirects into flat JSON for Lambda@Edge (2,335 redirects).
- **Metadata JSON** — `src/pages/metadata.json.ts` outputs `{url, title,
  description, keywords}` for each page (1,595 entries).
- **llms.txt** — `src/pages/llms.txt.ts` generates plain-text page listing
  grouped by section for LLM context.
- **robots.txt** — `src/pages/robots.txt.ts` with prod/staging awareness.
- **sitemap.xml** — `@astrojs/sitemap` integration (built into Starlight).
- **Markdown export** — `src/integrations/markdown-output.ts` post-build
  integration writes `.md` files to `dist/` for every page + CLI reference
  (2,105 files). Powers "View Markdown" / "Open in Claude" via Lambda@Edge
  content negotiation.
- **Code block prompt stripping** — `src/plugins/ec-prompt-strip.ts`
  Expressive Code plugin strips `$`/`>` prefixes from copy button clipboard
  content for shell-like code blocks.

- **Gordon AI chat** — integrated into Starlight layout via component
  overrides. `src/components/AskAI.astro` (panel), Header override (trigger
  button), PageFrame override (slide-out panel). Streaming SSE, session
  persistence, markdown rendering with syntax highlighting, feedback.
- **Search** — Pagefind built into Starlight, using defaults.

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
| `upstream-versions.json` | Pinned versions for 6 upstream repos |
| `scripts/sync-upstream.sh` | Fetch/copy vendored content from upstream |
| `scripts/migrate.mjs` | Main migration script (4-pass) |
| `scripts/generate-cli-pages.mjs` | CLI reference page generator |
| `scripts/fix-image-paths.mjs` | Relative → absolute image paths |
| `scripts/fix-mdx-errors.mjs` | Iterative MDX error fixer |
| `migration-map.json` | Old → new path mapping |
| `src/data/redirects-migration.json` | Collected redirects (migration) |
| `src/data/redirects-vanity.json` | Vanity/manual redirects (from data/redirects.yml) |
| `src/pages/redirects.json.ts` | Redirects endpoint for Lambda@Edge |
| `src/pages/metadata.json.ts` | Page metadata endpoint for search |
| `src/pages/llms.txt.ts` | LLM context page listing |
| `src/pages/robots.txt.ts` | Robots.txt with prod/staging awareness |
| `src/integrations/markdown-output.ts` | Post-build markdown file generation |
| `src/plugins/ec-prompt-strip.ts` | Expressive Code prompt-stripping plugin |
| `src/components/AskAI.astro` | Gordon AI chat panel component |
| `src/components/overrides/Header.astro` | Starlight Header + Ask AI trigger |
| `src/components/overrides/PageFrame.astro` | Starlight PageFrame + slide-out panel |
| `gordon.astro` | Gordon chat reference implementation (original) |
| `technical-audit.md` | Technical observations about the migration |
| `information-architecture-proposal.md` | IA reorganization spec |

## Commands

```sh
npm install                          # Install deps (required first time)
npx astro build                      # Build (1,596 pages, zero errors)
./scripts/sync-upstream.sh           # Re-sync vendored content from upstream repos
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

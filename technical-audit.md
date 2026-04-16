# Technical Audit: docs.docker.com

Structural observations for the planned migration from Hugo to
Astro/Starlight. Focuses on architectural patterns and systems that
transcend the framework choice — things to resolve or consciously carry
forward, not Hugo-specific implementation details.

---

## 1. CLI reference data pipeline

### What it is

387 YAML files from 6 upstream repos (docker/cli, docker/buildx,
docker/compose, moby/buildkit, docker/model-runner, plus sandbox CLI),
vendored into `data/cli/` and rendered into pages by Hugo data templates.
Content pages in `content/reference/cli/` are thin stubs — just front
matter pointing to a YAML file, no body content.

### Why it matters

This is the heaviest content pipeline on the site. The upstream repos own
the data (YAML), and docs.docker.com owns the rendering. That split means:

- CLI docs cannot be improved without upstream PRs to separate repos
- Upstream schema changes can break rendering
- Any framework migration must solve this same problem from scratch — there
  is no direct Astro equivalent to Hugo's data-template rendering

### Questions to resolve

- Should upstream repos produce markdown/MDX directly instead of YAML?
  That would decouple docs from a specific rendering pipeline entirely.
- Or: pre-process YAML to MDX at build time via a script, keeping the
  current upstream contract but making the docs framework-agnostic.
- Or: use Astro content collections to load CLI YAML as structured data
  and render with an Astro layout (closest to the current approach).

---

## 2. Vendored upstream content

### What it is

6 Hugo modules vendored in `_vendor/`, managed by Hugo's module system
with CI validation and dedicated sync workflows:

| Module | Content |
|--------|---------|
| moby/moby/api | Engine API changelog, version docs |
| moby/buildkit | Dockerfile reference, build checks |
| docker/cli | CLI docs (extend, deprecated, run, dockerd) |
| docker/buildx | Bake reference and stdlib |
| docker/compose/v5 | Compose CLI reference YAML |
| docker/model-runner | Model Runner CLI YAML |

A `data/frontmatter.yaml` workaround provides Hugo front matter for
upstream files that don't have it natively.

### Why it matters

This content is read-only. Quality issues require upstream PRs to different
repos. The Hugo module system handles syncing and mounting, but Astro has
no equivalent. The migration needs a replacement strategy: git submodules,
build-time fetch scripts, or npm packages published by upstream repos.

More fundamentally: is the vendor-and-render model the right one? Some of
this content could live in docker/docs directly, with a CI check to verify
it stays in sync with upstream — rather than being mounted at build time.
That would remove the "can't edit locally" friction and simplify the build.

---

## 3. Feature availability matrix (summary-bar / summary.yaml)

### What it is

A centralized YAML file (`data/summary.yaml`, 275 lines, ~50 features)
that tracks subscription tiers, availability status (Beta/GA/Experimental),
and version requirements for Docker features. A `summary-bar` shortcode
(85 lines, used on 186 pages) renders this data as an availability bar on
feature documentation pages.

### Why it matters

Someone must manually keep this YAML in sync with product changes across
multiple teams. It's a coordination bottleneck: if a feature graduates from
Beta to GA and nobody updates the YAML, the docs are wrong.

### Questions to resolve

- Is this data accurate today? Is anyone actively maintaining it?
- Is it useful to readers, or is it metadata that docs authors care about
  more than users?
- Could it be simplified to front matter fields (`tier: business`,
  `status: beta`) on each page, making pages self-contained and removing
  the centralized lookup table?
- Or: could it be automated — derived from product metadata or an API
  rather than manually maintained?

---

## 4. Redirect corpus

### What it is

Redirects are split across two systems:

- `data/redirects.yml` (1,258 lines) — vanity URLs using the `/go/`
  prefix, used by Docker products for in-app help links, CLI output, and
  marketing
- Hugo aliases in front matter — ad-hoc page-level redirects scattered
  across content files

### Why it matters

The `/go/` redirects are contractual. Docker CLIs, Desktop UI, Hub, and
marketing materials link to these URLs. They must survive any migration
intact. The front-matter aliases are more ad-hoc and have accumulated over
years of content reorganization.

### Questions to resolve

- Audit which redirects are still needed. Some may point to pages that
  have been removed or reorganized.
- Consolidate into one system rather than two. In Astro, redirects can
  live in `astro.config.mjs` or be handled by the deployment platform
  (CloudFront/Lambda@Edge). A single source of truth is easier to maintain.
- The IA reorganization will generate a significant number of new redirects.
  Plan for this — the redirect file will grow substantially.

---

## 5. Markdown export system

### What it is

A system that generates a plain-markdown version of every docs page:

1. Hugo generates a parallel `.md` output file for each page (via a custom
   `markdown` output format)
2. 14 of the 19 shortcodes have `.markdown.md` variants that produce plain
   markdown instead of HTML
3. `hack/flatten-and-resolve.js` (236 lines) post-processes the output to
   resolve includes and fix relative links
4. `md-dropdown.html` (126 lines) provides "View Markdown" and "Open in
   Claude" actions on every page

### Why it matters

This is a non-trivial maintenance cost. Every new shortcode needs a
parallel markdown variant. The flatten-and-resolve script is custom
tooling that must be maintained. The system spans templates, shortcodes,
build scripts, and frontend UI.

The feature is being carried forward (solution already planned), but it
should be reimplemented with less coupling in the new framework. The
current approach of parallel shortcode variants is the main pain point —
in Astro/MDX, a component can render differently based on context without
needing a separate file.

# Astro migration — breaking structural decisions

A running log of deliberate structural / URL-affecting decisions made
during the Hugo → Astro Starlight migration. Every item here produced or
required **redirects** (tracked in `src/data/redirects-migration.json`)
because published URLs changed.

Read this alongside `MIGRATION-STATUS.md`, which covers the engineering
plumbing (build, scripts, components) rather than the IA.

---

## 1. `manuals/` prefix removed site-wide

Hugo source lived under `content/manuals/<product>/…` but the live site
stripped `/manuals/` from published URLs. Astro no longer has that
rewrite — product content lives at `src/content/docs/<product>/…`
directly. Internal `/manuals/…` links (~1,100 occurrences across ~390
files) were rewritten during migration.

**URL impact:** none for end users (the public URL never contained
`/manuals/`). The source-tree move is breaking for anyone following old
contribution docs.

---

## 2. Admin section extracted as a top-level peer

The old tree buried account, billing, subscription, security, and
enterprise content under mixed product sections. These are now
consolidated under `admin/` with its own top-level sidebar group.

**URL impact:** URLs for admin topics moved. Covered by migration
redirects.

---

## 3. AI products promoted to flat, top-level peers

Previously nested under a generic "AI" parent folder. Now each AI
product sits as its own top-level section with its own sidebar subgroup:

- `model-runner/`
- `gordon/`
- `mcp-catalog-toolkit/`
- `docker-agent/`
- `sandboxes/`

**URL impact:** yes — redirects added.

---

## 4. `docker-hub/` renamed to `hub/`

Straight rename, matching the public product name.

**URL impact:** all `/docker-hub/…` URLs redirect to `/hub/…`.

---

## 5. `reference/samples/` removed

The "samples" subsection of the reference was pruned. Content either
moved into guides/use-case material or was retired entirely.

**URL impact:** removed URLs redirect to the nearest replacement or to
`/guides/`.

---

## 6. Get started consolidated (~25 pages → 4)

Three overlapping learning tracks (`docker-concepts`, `introduction`,
`workshop`) were merged into a single linear onboarding path:

```
get-started/
├── overview.md
├── install.md
├── build-your-first-app.md
└── next-steps.md
```

**URL impact:** large redirect map — every page from the three old
tracks points at the best-matching new page (or an anchor on one).

---

## 7. Compose file reference split

The monolithic "Compose file" section mixed spec material with
explanatory guides. Split into two:

- `compose/…` — narrative how-tos, intro, patterns, troubleshooting
  (9 explanatory files moved here from the old reference)
- `reference/compose-file/` — pure spec only: `services`, `networks`,
  `volumes`, `build`, `deploy`, `configs`, `secrets`, `version-and-name`

**Rationale:** spec pages are reference material; explanatory pages are
not. Mixing them made the reference sidebar noisy and the explanations
hard to find.

**URL impact:** 9 pages moved from `reference/compose-file/…` to
`compose/…`. Redirects cover every move.

---

## 8. Multi-page guides consolidated into single pages

Every multi-page guide (e.g. `guides/dotnet/`, `guides/python/`,
`guides/angular/`, `testcontainers-*`) was folded from a directory of
chapter files into a single consolidated page with H2 section anchors.

**Script:** `scripts/consolidate-guides.mjs`.

**What it does:**

- Finds directories with `index.md`/`index.mdx` + sibling chapter files.
- Demotes each chapter's headings by one level (fence-aware — doesn't
  touch `#` inside code blocks).
- Extracts and dedupes MDX imports, hoisting them to the top of the
  consolidated file.
- Rewrites relative sibling links like `](run-tests/)` →
  `](#run-tests)`, so internal chapter cross-references become anchors.
- Emits plain ATX `## Label` headings so `rehype-slug` auto-generates
  matching ids (Starlight's TOC reads the markdown AST and ignores raw
  HTML, so raw `<h2 id=…>` would silently break the TOC).
- Appends `{from, to}` redirects so the old chapter URL lands on the
  anchor: `/guides/dotnet/run-tests/` → `/guides/dotnet/#run-tests`.

**Result:** 48 guides consolidated, 181 chapter redirects emitted.

**Rationale:** multi-page guides had no built-in chapter navigation
after the Hugo → Astro move (Starlight's sidebar doesn't auto-render
sibling chapter links the way the Hugo theme did). Rather than
re-implement that chrome, collapse the content to a single page with a
right-rail TOC — which is the standard Starlight pattern.

**One chained-redirect flattening pass followed** (133 entries) so that
pre-existing URLs already redirecting into the old multi-page structure
now point directly at the new anchors instead of relying on two hops
(the CDN only follows one).

---

## 9. Guide directory wrappers flattened to single files

After consolidation, every guide lived at
`guides/<name>/index.{md,mdx}`. Starlight's `autogenerate` creates a
sidebar group for every directory, even one holding a single `index`
file — which produced noise in the breadcrumb (`Guides / angular /
Angular guide`) and in the sidebar tree.

**Script:** `scripts/flatten-guide-dirs.mjs`.

Every single-file guide directory was flattened:

```
guides/angular/index.mdx  →  guides/angular.mdx
guides/dotnet/index.mdx   →  guides/dotnet.mdx
…
```

54 directories were collapsed. Two had URL-changing side effects and
got explicit redirects:

| From | To | Why |
|---|---|---|
| `/guides/frameworks/laravel/` | `/guides/laravel/` | Dropped the vestigial `frameworks/` wrapper (only contained `laravel`) |
| `/guides/genai-claude-code-mcp/claude-code-mcp-guide/` | `/guides/genai-claude-code-mcp/` | The single file wasn't named `index.md`, so the published URL carried the chapter slug; flattening collapses it to the directory slug |

All other flattens kept the same public URL (Astro serves both
`guides/<name>/index.mdx` and `guides/<name>.mdx` at `/guides/<name>/`
under `trailingSlash: "always"`).

**Rationale:** single-file wrappers add a meaningless extra segment to
the breadcrumb and create a sidebar group with exactly one entry.
Flat files produce the breadcrumb we actually want: `Guides / Angular
language-specific guide`.

---

## Redirect accounting

All of the above feed into `src/data/redirects-migration.json`, which
`src/pages/redirects.json.ts` merges with
`src/data/redirects-vanity.json` into the Lambda@Edge redirect map.

Current total: ~1,800 migration redirects, of which ~313 are
guide-related (consolidation + flattening).

---

## Things we deliberately did **not** redirect

- Source-tree moves that don't change the public URL (`manuals/`
  prefix, `index.mdx` → flat file). No redirect needed.
- Anchors that migrated cleanly because the heading text didn't change
  (the slug algorithm is stable across the move).

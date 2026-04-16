# Information Architecture Proposal: docs.docker.com

## Top-level sections

```
1. Get started       Single holistic beginner journey
2. Guides            Browsable collection, lightly categorized
3. Manuals           Product/technology documentation (flat, metadata-grouped)
4. Admin & billing   Account, org, enterprise, subscription management
5. Reference         Pure lookup material (CLI, API, specs)
```

## 1. Get started

**Goal:** One linear path from "what is Docker?" to "I built and ran
something." Replaces the current three overlapping tracks (concepts,
introduction, workshop).

### Proposed structure

```
get-started/
  overview/                  # What is Docker, containers, images, registries
  install/                   # Get Docker Desktop
  build-your-first-app/      # Hands-on: Dockerfile, build, run, multi-container
  next-steps/                # Where to go from here
```

### Content migration

| Current | Destination |
|---|---|
| `docker-concepts/the-basics/*` | Folded into `overview/` |
| `docker-concepts/building-images/*` | Folded into `build-your-first-app/` |
| `docker-concepts/running-containers/*` | Folded into `build-your-first-app/` |
| `introduction/*` | Merged into the linear journey |
| `workshop/*` (10-step tutorial) | Core hands-on material absorbed into `build-your-first-app/`; retire as standalone |
| `docker-overview.md` | Becomes the basis of `overview/` |
| `resources.md` | Folded into `next-steps/` |

### Rationale

A new user currently has to choose between three paths with significant
overlap. A single guided journey removes that decision point entirely.

## 2. Guides

**Goal:** Browsable, self-contained collection of guides. Lightweight
categorization for discoverability. Not a priority to redesign deeply now.

### Proposed structure

```
guides/
  _index.md               # Landing page with filtering (tags, languages)
  <language-guides>/       # 16 language-specific guides (unchanged)
  <framework-guides>/      # Laravel, etc. (unchanged)
  <testcontainers-*>/      # 20+ Testcontainers guides (unchanged)
  <product-guides>/        # Build Cloud, Compose, Scout guides (unchanged)
  <topic-guides>/          # AI/ML, databases, monitoring, admin setup, etc. (unchanged)
```

### Changes from current state

- Existing tag/language filtering stays.
- Consider adding a "category" facet over time.
- No structural changes to individual guides.

## 3. Manuals

**Replaces the current Manuals section with a clean product directory.**
Every product/technology is a direct child of `manuals/`. No intermediate
grouping directories. Grouping on the landing page and sidebar is driven by
front matter metadata (`params.sidebar.group`), not URL hierarchy.

### Products (all direct children of `manuals/`)

```
manuals/
  engine/                  group: "Development tools"
  build/                   group: "Development tools"
  compose/                 group: "Development tools"
  desktop/                 group: "Development tools"
  extensions/              group: "Development tools"

  model-runner/            group: "AI"
  gordon/                  group: "AI"
  mcp-catalog-toolkit/     group: "AI"
  docker-agent/            group: "AI"
  sandboxes/               group: "AI"

  hub/                     group: "Supply chain & images"
  scout/                   group: "Supply chain & images"
  dhi/                     group: "Supply chain & images"

  build-cloud/             group: "Cloud services"
  offload/                 group: "Cloud services"
```

15 products total. All flat peers. The `group` value controls landing page
layout and sidebar grouping using the existing `params.sidebar.group`
mechanism. Group names are mutable metadata and can be renamed, split, or
merged without URL changes.

### What moves OUT of Manuals

| Current location | Destination |
|---|---|
| `manuals/accounts/` | `admin/accounts/` |
| `manuals/admin/` | `admin/organizations/` |
| `manuals/billing/` | `admin/billing/` |
| `manuals/subscription/` | `admin/subscription/` |
| `manuals/support/` | `admin/support/` |
| `manuals/security/` (developer 2FA, tokens) | `admin/security/` |
| `manuals/enterprise/` (deploy, security, troubleshoot) | `admin/enterprise/` |
| `manuals/unassociated-machines/` | `admin/organizations/` |

### What moves IN to Manuals

- Explanatory content currently in `reference/compose-file/` (how networks
  work, how volumes work, etc.) migrates to `manuals/compose/` as
  conceptual/how-to content.
- `reference/sandboxes/sdk/` moves to `manuals/sandboxes/sdk/`.

### AI products

Currently these live under `manuals/ai/<product>`. In the new structure,
they promote to `manuals/<product>/` as flat peers. The `manuals/ai/compose/`
page (AI workloads with Compose) moves to `manuals/compose/` as a subsection
about AI workloads.

## 4. Admin & billing

**New top-level section.** Everything related to managing Docker as a
platform.

### Proposed structure

```
admin/
  accounts/                # Docker account management
  organizations/           # Org and company administration, unassociated machines
  billing/                 # Billing and payments
  subscription/            # Plans, features, licensing
  support/                 # Support options
  security/                # Developer security: 2FA, access tokens, PATs
  enterprise/              # Enterprise deployment, Settings Management, ECI,
                           #   air-gapped containers, registry access management,
                           #   enterprise troubleshooting
```

### Boundary principle with Manuals

"Using or troubleshooting a feature as a developer" goes in Manuals (the
product section). "Configuring or enforcing a feature as an admin" goes in
Admin. Cross-references connect the two.

Example: Troubleshooting why you cannot pull an image because Image Access
Management is enabled goes in `manuals/desktop/` (developer-facing
troubleshooting). Setting up and configuring Image Access Management goes in
`admin/enterprise/` (admin-facing configuration).

## 5. Reference

**Goal:** Pure lookup material. You know what you're looking for; you need
the syntax or spec.

### Proposed structure

```
reference/
  cli/                     # All CLIs: docker, compose, buildx, dockerd, sbx (vendored)
  api/                     # All APIs: Engine, Hub, DVP, Registry, Extensions SDK
  dockerfile/              # Dockerfile specification (vendored from BuildKit)
  compose-file/            # Compose file specification (rewritten as pure property index)
  glossary.md
```

### What moves out

| Current | Destination |
|---|---|
| `reference/samples/` | Removed (unmaintained) |
| `reference/sandboxes/sdk/` | `manuals/sandboxes/sdk/` |
| Compose file explanatory content | `manuals/compose/` |

### Compose file rewrite

The current Compose file reference pages mix specification with explanation.
The ideal state:

- **`reference/compose-file/`**: Property index only. Each top-level element
  page lists attributes, types, defaults, short syntax examples. You come
  here to look up `services.<name>.deploy.resources.limits.cpus`.
- **`manuals/compose/`**: Absorbs the conceptual and how-to content. "How
  networking works in Compose," "when to use named volumes vs bind mounts,"
  "configuring multi-stage builds in Compose."

## Visual summary

```
CURRENT                          PROPOSED
-------------------------------  -------------------------------
Get started                      Get started
  - concepts (15 pages)            single linear journey
  - introduction (5 pages)           overview
  - workshop (10 pages)              install
                                     build
                                     next steps

Guides (flat bucket)             Guides (flat bucket, as-is)

Manuals                          Manuals
  - 10 products                    15 products, flat peers
  - 3 open source                  grouped by front matter metadata
  - 3 AI tools
  - 5 platform/admin items       Admin & billing (NEW)
  - 1 enterprise section           accounts, orgs, billing
                                   subscription, support
Reference                         security (developer)
  - CLI                            enterprise
  - API
  - Compose file (hybrid)       Reference (cleaned)
  - Dockerfile                    CLI
  - Samples                       API
  - Sandboxes SDK                 Dockerfile
                                  Compose file (pure spec)
                                  Glossary
```

## Design decisions

1. **Flat product hierarchy.** No intermediate grouping directories in the
   URL structure. All products are direct children of `manuals/`. Grouping
   on the landing page and sidebar is driven by front matter metadata, not
   URL hierarchy. Group names can change without URL changes.

2. **Admin & billing as a top-level section.** Admin content serves a
   different audience (admins, procurement, IT) at a different moment
   (managing the platform, not using it). Separating it declutters Manuals
   and gives admins a predictable place to find their content.

3. **Reference is strictly lookup material.** If you need to understand when
   or why to use something, that content belongs in Manuals. Reference is
   for looking up syntax, specs, and API signatures.

4. **Compose file reference requires a rewrite.** The current content mixes
   specification with explanation. Splitting it is the highest-effort item
   in this proposal but necessary for the reference section to be coherent.

5. **Extensions SDK stays bundled with the Extensions product.** The SDK is
   only relevant in the context of the Extensions product and is niche
   enough to not warrant separate treatment in Reference.

6. **Single Get started journey.** Three overlapping beginner paths
   consolidate into one linear flow. The workshop content is good but
   largely redundant with the concepts and introduction tracks.

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "node:url";
import { pluginPromptStrip } from "./src/plugins/ec-prompt-strip.ts";
import markdownOutput from "./src/integrations/markdown-output.ts";

export default defineConfig({
  site: "https://docs.docker.com",
  trailingSlash: "always",
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@includes": fileURLToPath(
          new URL("./src/components/includes", import.meta.url),
        ),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      },
    },
  },
  integrations: [
    starlight({
      title: "Docker Docs",
      logo: {
        dark: "./src/assets/docker-docs-logo-dark.svg",
        light: "./src/assets/docker-docs-logo-light.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.ico",
      customCss: ["./src/styles/theme.css"],
      components: {
        Header: "./src/components/overrides/Header.astro",
        PageFrame: "./src/components/overrides/PageFrame.astro",
        PageSidebar: "./src/components/overrides/PageSidebar.astro",
        PageTitle: "./src/components/overrides/PageTitle.astro",
        Pagination: "./src/components/overrides/Pagination.astro",
        Sidebar: "./src/components/overrides/Sidebar.astro",
      },
      expressiveCode: {
        plugins: [pluginPromptStrip()],
        // Register languages not included in the default Shiki bundle
        shiki: {
          langs: [
            // Rego (Open Policy Agent) — used in Docker Scout policy docs.
            // No Shiki grammar exists; register as a plaintext alias so
            // Expressive Code doesn't warn on every build.
            {
              name: "rego",
              scopeName: "source.rego",
              patterns: [],
            },
          ],
        },
      },
      sidebar: [
        {
          label: "Get started",
          collapsed: true,
          autogenerate: { directory: "get-started" },
        },
        {
          label: "Guides",
          collapsed: true,
          autogenerate: { directory: "guides" },
        },
        // Products below use explicit items rather than
        // `autogenerate: { directory: "<product>" }` because several
        // subdirectories lack an index.md — Starlight autogenerate would
        // otherwise use the raw directory name (e.g. "manage-resources")
        // as the group label in the sidebar and breadcrumbs. Passing an
        // explicit `label` alongside `autogenerate` overrides that, and
        // keeps the intermediate group pageless (no empty landing page).
        {
          label: "Development tools",
          collapsed: true,
          items: [
            {
              label: "Docker Engine",
              collapsed: true,
              items: [
                { label: "Overview", link: "/engine/" },
                { label: "Install", collapsed: true, autogenerate: { directory: "engine/install" } },
                { label: "Containers", collapsed: true, autogenerate: { directory: "engine/containers" } },
                { label: "Network", collapsed: true, autogenerate: { directory: "engine/network" } },
                { label: "Storage", collapsed: true, autogenerate: { directory: "engine/storage" } },
                { label: "Daemon", collapsed: true, autogenerate: { directory: "engine/daemon" } },
                { label: "CLI", collapsed: true, autogenerate: { directory: "engine/cli" } },
                { label: "API", collapsed: true, autogenerate: { directory: "engine/api" } },
                { label: "Logging", collapsed: true, autogenerate: { directory: "engine/logging" } },
                { label: "Manage resources", collapsed: true, autogenerate: { directory: "engine/manage-resources" } },
                { label: "Security", collapsed: true, autogenerate: { directory: "engine/security" } },
                { label: "Swarm", collapsed: true, autogenerate: { directory: "engine/swarm" } },
                { label: "Extend", collapsed: true, autogenerate: { directory: "engine/extend" } },
                { label: "Deprecated", link: "/engine/deprecated/" },
                { label: "Release notes", collapsed: true, autogenerate: { directory: "engine/release-notes" } },
              ],
            },
            {
              label: "Docker Build",
              collapsed: true,
              items: [
                { label: "Overview", link: "/build/" },
                { label: "Concepts", collapsed: true, autogenerate: { directory: "build/concepts" } },
                { label: "Building", collapsed: true, autogenerate: { directory: "build/building" } },
                { label: "Cache", collapsed: true, autogenerate: { directory: "build/cache" } },
                { label: "Dockerfile", link: "/build/dockerfile/" },
                { label: "BuildKit", collapsed: true, autogenerate: { directory: "build/buildkit" } },
                { label: "Builders", collapsed: true, autogenerate: { directory: "build/builders" } },
                { label: "Bake", collapsed: true, autogenerate: { directory: "build/bake" } },
                { label: "CI", collapsed: true, autogenerate: { directory: "build/ci" } },
                { label: "Exporters", collapsed: true, autogenerate: { directory: "build/exporters" } },
                { label: "Metadata", collapsed: true, autogenerate: { directory: "build/metadata" } },
                { label: "Debug", collapsed: true, autogenerate: { directory: "build/debug" } },
                { label: "Build checks", link: "/build/checks/" },
                { label: "Policies", collapsed: true, autogenerate: { directory: "build/policies" } },
                { label: "Release notes", link: "/build/release-notes/" },
              ],
            },
            {
              label: "Docker Compose",
              collapsed: true,
              items: [
                { label: "Overview", link: "/compose/" },
                { label: "Introduction", collapsed: true, autogenerate: { directory: "compose/intro" } },
                { label: "Install", collapsed: true, autogenerate: { directory: "compose/install" } },
                { label: "Getting started", link: "/compose/gettingstarted/" },
                { label: "How-tos", collapsed: true, autogenerate: { directory: "compose/how-tos" } },
                { label: "Compose file", collapsed: true, autogenerate: { directory: "compose/compose-file" } },
                { label: "Bridge", collapsed: true, autogenerate: { directory: "compose/bridge" } },
                { label: "AI", collapsed: true, autogenerate: { directory: "compose/ai" } },
                { label: "Compose SDK", link: "/compose/compose-sdk/" },
                { label: "Trust model", link: "/compose/trust-model/" },
                { label: "Legacy versions", link: "/compose/legacy-versions/" },
                { label: "Support and feedback", collapsed: true, autogenerate: { directory: "compose/support-and-feedback" } },
                { label: "Release notes", link: "/compose/release-notes/" },
              ],
            },
            {
              label: "Docker Desktop",
              collapsed: true,
              items: [
                { label: "Overview", link: "/desktop/" },
                { label: "Setup", collapsed: true, autogenerate: { directory: "desktop/setup" } },
                { label: "Use Desktop", collapsed: true, autogenerate: { directory: "desktop/use-desktop" } },
                { label: "Features", collapsed: true, autogenerate: { directory: "desktop/features" } },
                { label: "Settings and maintenance", collapsed: true, autogenerate: { directory: "desktop/settings-and-maintenance" } },
                { label: "Extensions", collapsed: true, autogenerate: { directory: "desktop/extensions" } },
                { label: "Enterprise", collapsed: true, autogenerate: { directory: "desktop/enterprise" } },
                { label: "Uninstall", link: "/desktop/uninstall/" },
                { label: "Troubleshoot and support", collapsed: true, autogenerate: { directory: "desktop/troubleshoot-and-support" } },
                { label: "Cert revoke solution", link: "/desktop/cert-revoke-solution/" },
                { label: "Previous versions", collapsed: true, autogenerate: { directory: "desktop/previous-versions" } },
                { label: "Release notes", link: "/desktop/release-notes/" },
              ],
            },
          ],
        },
        {
          label: "Agents and AI",
          collapsed: true,
          items: [
            { label: "Docker Model Runner", collapsed: true, autogenerate: { directory: "model-runner" } },
            {
              label: "Gordon",
              collapsed: true,
              items: [
                { label: "Overview", link: "/gordon/" },
                { label: "Concepts", collapsed: true, autogenerate: { directory: "gordon/concepts" } },
                { label: "How-to", collapsed: true, autogenerate: { directory: "gordon/how-to" } },
                { label: "Use cases", link: "/gordon/use-cases/" },
              ],
            },
            { label: "MCP Catalog & Toolkit", collapsed: true, autogenerate: { directory: "mcp-catalog-toolkit" } },
            {
              label: "Docker Agent",
              collapsed: true,
              items: [
                { label: "Overview", link: "/docker-agent/" },
                { label: "Tutorial", link: "/docker-agent/tutorial/" },
                { label: "Model providers", link: "/docker-agent/model-providers/" },
                { label: "Local models", link: "/docker-agent/local-models/" },
                { label: "RAG", link: "/docker-agent/rag/" },
                { label: "Evals", link: "/docker-agent/evals/" },
                { label: "Sharing agents", link: "/docker-agent/sharing-agents/" },
                { label: "Integrations", collapsed: true, autogenerate: { directory: "docker-agent/integrations" } },
                { label: "Best practices", link: "/docker-agent/best-practices/" },
                { label: "Reference", collapsed: true, autogenerate: { directory: "docker-agent/reference" } },
              ],
            },
            {
              label: "Docker Sandboxes",
              collapsed: true,
              items: [
                { label: "Overview", link: "/sandboxes/" },
                { label: "Get started", link: "/sandboxes/get-started/" },
                { label: "Architecture", link: "/sandboxes/architecture/" },
                { label: "Usage", link: "/sandboxes/usage/" },
                { label: "Docker Desktop", link: "/sandboxes/docker-desktop/" },
                { label: "CLI", collapsed: true, autogenerate: { directory: "sandboxes/cli" } },
                { label: "Agents", collapsed: true, autogenerate: { directory: "sandboxes/agents" } },
                { label: "Security", collapsed: true, autogenerate: { directory: "sandboxes/security" } },
                { label: "Troubleshooting", link: "/sandboxes/troubleshooting/" },
                { label: "FAQ", link: "/sandboxes/faq/" },
              ],
            },
          ],
        },
        {
          label: "Supply chain & images",
          collapsed: true,
          items: [
            {
              label: "Docker Hub",
              collapsed: true,
              items: [
                { label: "Overview", link: "/hub/" },
                { label: "Quickstart", link: "/hub/quickstart/" },
                { label: "Repos", collapsed: true, autogenerate: { directory: "hub/repos" } },
                { label: "Image library", collapsed: true, autogenerate: { directory: "hub/image-library" } },
                { label: "Usage", collapsed: true, autogenerate: { directory: "hub/usage" } },
                { label: "Settings", link: "/hub/settings/" },
                { label: "API", collapsed: true, autogenerate: { directory: "hub/api" } },
                { label: "Troubleshoot", link: "/hub/troubleshoot/" },
                { label: "Release notes", link: "/hub/release-notes/" },
              ],
            },
            {
              label: "Docker Scout",
              collapsed: true,
              items: [
                { label: "Overview", link: "/scout/" },
                { label: "Quickstart", link: "/scout/quickstart/" },
                { label: "Install", link: "/scout/install/" },
                { label: "Explore", collapsed: true, autogenerate: { directory: "scout/explore" } },
                { label: "How-tos", collapsed: true, autogenerate: { directory: "scout/how-tos" } },
                { label: "Deep dive", collapsed: true, autogenerate: { directory: "scout/deep-dive" } },
                { label: "Policy", collapsed: true, autogenerate: { directory: "scout/policy" } },
                { label: "Integrations", collapsed: true, autogenerate: { directory: "scout/integrations" } },
                { label: "Release notes", collapsed: true, autogenerate: { directory: "scout/release-notes" } },
              ],
            },
            { label: "Docker Hub Image Insights", collapsed: true, autogenerate: { directory: "dhi" } },
          ],
        },
        {
          label: "Cloud services",
          collapsed: true,
          items: [
            { label: "Docker Build Cloud", collapsed: true, autogenerate: { directory: "build-cloud" } },
            { label: "Docker Offload", collapsed: true, autogenerate: { directory: "offload" } },
          ],
        },
        {
          label: "Admin & billing",
          collapsed: true,
          autogenerate: { directory: "admin" },
        },
        // The CLI reference has its own standalone tabbed sidebar (see
        // Sidebar.astro's CLI branch) that consumes this autogenerated tree
        // directly. For non-CLI pages, Sidebar.astro collapses this whole
        // group into a single link to /reference/ so the huge CLI subtree
        // doesn't pollute the main site nav.
        {
          label: "Reference",
          collapsed: true,
          autogenerate: { directory: "reference" },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/docker/docs",
        },
      ],
    }),
    markdownOutput(),
  ],
});

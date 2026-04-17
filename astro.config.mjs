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
        {
          label: "Development tools",
          collapsed: true,
          items: [
            { label: "Docker Engine", collapsed: true, autogenerate: { directory: "engine" } },
            { label: "Docker Build", collapsed: true, autogenerate: { directory: "build" } },
            { label: "Docker Compose", collapsed: true, autogenerate: { directory: "compose" } },
            { label: "Docker Desktop", collapsed: true, autogenerate: { directory: "desktop" } },
            { label: "Docker Extensions", collapsed: true, autogenerate: { directory: "extensions" } },
          ],
        },
        {
          label: "AI",
          collapsed: true,
          items: [
            { label: "Docker Model Runner", collapsed: true, autogenerate: { directory: "model-runner" } },
            { label: "Gordon", collapsed: true, autogenerate: { directory: "gordon" } },
            { label: "MCP Catalog & Toolkit", collapsed: true, autogenerate: { directory: "mcp-catalog-toolkit" } },
            { label: "Docker Agent", collapsed: true, autogenerate: { directory: "docker-agent" } },
            { label: "Docker Sandboxes", collapsed: true, autogenerate: { directory: "sandboxes" } },
          ],
        },
        {
          label: "Supply chain & images",
          collapsed: true,
          items: [
            { label: "Docker Hub", collapsed: true, autogenerate: { directory: "hub" } },
            { label: "Docker Scout", collapsed: true, autogenerate: { directory: "scout" } },
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

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from "node:url";

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
      customCss: ["./src/styles/theme.css"],
      // Pagefind search is enabled by default in Starlight
      // Configure sidebar with metadata-driven product grouping
      sidebar: [
        { label: "Get started", autogenerate: { directory: "get-started" } },
        { label: "Guides", autogenerate: { directory: "guides" } },
        {
          label: "Manuals",
          items: [
            {
              label: "Development tools",
              items: [
                {
                  label: "Docker Engine",
                  autogenerate: { directory: "engine" },
                },
                {
                  label: "Docker Build",
                  autogenerate: { directory: "build" },
                },
                {
                  label: "Docker Compose",
                  autogenerate: { directory: "compose" },
                },
                {
                  label: "Docker Desktop",
                  autogenerate: { directory: "desktop" },
                },
                {
                  label: "Docker Extensions",
                  autogenerate: { directory: "extensions" },
                },
              ],
            },
            {
              label: "AI",
              items: [
                {
                  label: "Docker Model Runner",
                  autogenerate: { directory: "model-runner" },
                },
                {
                  label: "Gordon",
                  autogenerate: { directory: "gordon" },
                },
                {
                  label: "MCP Catalog & Toolkit",
                  autogenerate: { directory: "mcp-catalog-toolkit" },
                },
                {
                  label: "Docker Agent",
                  autogenerate: { directory: "docker-agent" },
                },
                {
                  label: "Docker Sandboxes",
                  autogenerate: { directory: "sandboxes" },
                },
              ],
            },
            {
              label: "Supply chain & images",
              items: [
                {
                  label: "Docker Hub",
                  autogenerate: { directory: "hub" },
                },
                {
                  label: "Docker Scout",
                  autogenerate: { directory: "scout" },
                },
                {
                  label: "Docker Hub Image Insights",
                  autogenerate: { directory: "dhi" },
                },
              ],
            },
            {
              label: "Cloud services",
              items: [
                {
                  label: "Docker Build Cloud",
                  autogenerate: { directory: "build-cloud" },
                },
                {
                  label: "Docker Offload",
                  autogenerate: { directory: "offload" },
                },
              ],
            },
          ],
        },
        {
          label: "Admin & billing",
          autogenerate: { directory: "admin" },
        },
        { label: "Reference", autogenerate: { directory: "reference" } },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/docker/docs",
        },
      ],
    }),
  ],
});

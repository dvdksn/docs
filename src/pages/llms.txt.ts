/**
 * Generates llms.txt at build time.
 *
 * Plain-text listing of all documentation pages grouped by top-level section.
 * Format follows the llms.txt convention for LLM context.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("docs");
  const base = site?.origin ?? "https://docs.docker.com";

  // Group pages by top-level section
  const groups = new Map<string, Array<{ url: string; title: string; description: string }>>();

  for (const page of pages) {
    if (page.data.sidebar?.hidden === true) continue;

    const slug = page.id.replace(/\.(mdx?|md)$/, "").replace(/\/index$/, "");
    const section = slug.split("/")[0] || "root";
    const url = slug ? `${base}/${slug}/` : `${base}/`;
    const title = page.data.title;
    const description = page.data.description ?? "";

    if (!groups.has(section)) {
      groups.set(section, []);
    }
    groups.get(section)!.push({ url, title, description });
  }

  // Sort sections and pages within sections
  const sortedSections = [...groups.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  );

  let output = "# Docker Documentation\n";

  for (const [section, pages] of sortedSections) {
    const heading = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ");
    output += `\n## ${heading}\n`;

    const sorted = pages.sort((a, b) => a.url.localeCompare(b.url));
    for (const page of sorted) {
      output += `- [${page.title}](${page.url})`;
      if (page.description) {
        output += `: ${page.description.replace(/\n/g, " ").trim()}`;
      }
      output += "\n";
    }
  }

  return new Response(output, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

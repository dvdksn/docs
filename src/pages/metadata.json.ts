/**
 * Generates metadata.json at build time.
 *
 * Output: array of { url, title, description, keywords } for each page.
 * Used by Docker's global search infrastructure.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("docs");
  const base = site?.origin ?? "https://docs.docker.com";

  const metadata = pages
    .filter((page) => page.data.sidebar?.hidden !== true)
    .map((page) => {
      // Build URL: content collection id maps to path
      // e.g. "engine/install.mdx" → "/engine/install/"
      const slug = page.id.replace(/\.(mdx?|md)$/, "").replace(/\/index$/, "");
      const url = slug ? `${base}/${slug}/` : `${base}/`;

      return {
        url,
        title: page.data.title,
        description: page.data.description ?? "",
        keywords: Array.isArray(page.data.keywords)
          ? page.data.keywords.join(", ")
          : (page.data.keywords ?? ""),
      };
    });

  return new Response(JSON.stringify(metadata, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};

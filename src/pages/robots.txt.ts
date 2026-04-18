/**
 * Generates robots.txt at build time.
 *
 * In production: allow crawling, disallow /admin/organizations/unassociated-machines/.
 * In non-production: disallow everything to prevent indexing previews.
 */
import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const isProd = import.meta.env.PROD;
  const siteUrl = site?.origin ?? "https://docs.docker.com";

  const body = isProd
    ? `User-agent: *
Disallow: /admin/organizations/unassociated-machines/

Sitemap: ${siteUrl}/sitemap-index.xml
`
    : `# Disable all indexing on staging websites and previews to prevent
# them showing up in search results.
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

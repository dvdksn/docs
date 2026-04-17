/**
 * Generates redirects.json at build time.
 *
 * Merges two sources:
 * 1. redirects-migration.json — collected during Hugo→Astro content migration
 *    Format: [{ from: "/old/", to: "/new/" }, ...]
 * 2. redirects-vanity.json — manual/vanity redirects (converted from data/redirects.yml)
 *    Format: { "/source/": "/target/" }
 *
 * Output: flat { "/old-path/": "/new-path/" } consumed by Lambda@Edge.
 */
import type { APIRoute } from "astro";
import migrationRedirects from "@data/redirects-migration.json";
import vanityRedirects from "@data/redirects-vanity.json";

export const prerender = true;

export const GET: APIRoute = () => {
  const redirects: Record<string, string> = {};

  // 1. Migration redirects (from → to)
  for (const entry of migrationRedirects as Array<{
    from: string;
    to: string;
  }>) {
    redirects[entry.from] = entry.to;
  }

  // 2. Vanity/manual redirects (source → target, already flat)
  for (const [source, target] of Object.entries(
    vanityRedirects as Record<string, string>,
  )) {
    redirects[source] = target;
  }

  return new Response(JSON.stringify(redirects, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};

#!/usr/bin/env node

/**
 * Converts relative image paths in migrated content to absolute paths.
 *
 * Images are now served from public/ with Hugo's published URL structure.
 * This script rewrites paths like `./images/foo.png` or `../images/bar.webp`
 * to absolute paths like `/desktop/images/foo.png`.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, join, dirname, relative, posix } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const DOCS_DIR = join(ROOT, "src", "content", "docs");

// Find all content files
const files = execSync(
  `find "${DOCS_DIR}" -name "*.md" -o -name "*.mdx"`,
  { encoding: "utf-8" }
).trim().split("\n").filter(Boolean);

let fixedFiles = 0;
let fixedPaths = 0;

for (const filePath of files) {
  let content = readFileSync(filePath, "utf-8");
  const relToDocsDir = relative(DOCS_DIR, filePath);
  const dirInDocs = dirname(relToDocsDir);
  let changed = false;

  // Fix markdown image syntax: ![alt](images/foo.png), ![alt](./images/foo.png "title")
  // Matches any relative path (not starting with / or http) to an image file
  // Handles optional query strings (?border=true) and title strings
  content = content.replace(
    /!\[([^\]]*)\]\((?!\/|https?:\/\/)([^\s?)]+\.(png|webp|svg|gif|avif|jpg|jpeg))(\?[^\s)]*)?(\s+"[^"]*")?\)/gi,
    (match, alt, relPath, ext, query, title) => {
      const resolved = posix.normalize(posix.join(dirInDocs, relPath));
      const absPath = "/" + resolved;
      fixedPaths++;
      changed = true;
      return `![${alt}](${absPath}${title || ""})`;
    }
  );

  // Fix HTML img tags: src="images/foo.png", src="./images/foo.png", src="../images/foo.png"
  content = content.replace(
    /src="(?!\/|https?:\/\/)([^"]+\.(png|webp|svg|gif|avif|jpg|jpeg))"/gi,
    (match, relPath, ext) => {
      const resolved = posix.normalize(posix.join(dirInDocs, relPath));
      const absPath = "/" + resolved;
      fixedPaths++;
      changed = true;
      return `src="${absPath}"`;
    }
  );

  if (changed) {
    writeFileSync(filePath, content, "utf-8");
    fixedFiles++;
  }
}

console.log(`Fixed ${fixedPaths} image paths in ${fixedFiles} files`);

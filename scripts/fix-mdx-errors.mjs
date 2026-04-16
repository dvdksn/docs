#!/usr/bin/env node

/**
 * Finds MDX files that fail parsing and converts them back to .md.
 * Removes import statements and renames .mdx → .md.
 *
 * Usage: node scripts/fix-mdx-errors.mjs
 */

import { readFileSync, writeFileSync, renameSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const DOCS_DIR = join(ROOT, "src", "content", "docs");

// Try building and collect error files
let errorFiles = new Set();
let attempts = 0;
const MAX_ATTEMPTS = 20;

while (attempts < MAX_ATTEMPTS) {
  attempts++;
  try {
    const output = execSync("npx astro build 2>&1", {
      encoding: "utf-8",
      cwd: ROOT,
      timeout: 300000,
    });

    if (output.includes("[build] Complete!")) {
      console.log(`Build succeeded after ${attempts} attempts.`);
      console.log(`Fixed ${errorFiles.size} files.`);
      break;
    }

    // Extract error file
    const match = output.match(/file:\s*(\/[^\s:]+\.mdx):(\d+)/);
    if (match) {
      const filePath = match[1];
      if (errorFiles.has(filePath)) {
        console.log(`Already tried fixing ${filePath}, giving up.`);
        break;
      }
      errorFiles.add(filePath);

      // Convert .mdx → .md (strip imports, rename)
      let content = readFileSync(filePath, "utf-8");
      // Remove import lines
      content = content.replace(/^import\s+.*;\s*$/gm, "");
      // Remove MDX comments
      content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
      // Convert back any escaped angle brackets that were meant for HTML comments
      // Write as .md
      const mdPath = filePath.replace(/\.mdx$/, ".md");
      writeFileSync(mdPath, content, "utf-8");
      // Remove the .mdx
      writeFileSync(filePath, "", "utf-8"); // can't delete during build
      execSync(`rm "${filePath}"`, { cwd: ROOT });
      console.log(`[${attempts}] Fixed: ${filePath.replace(ROOT + "/", "")} → .md`);
    } else {
      console.log("Build failed but couldn't extract error file.");
      console.log(output.slice(-500));
      break;
    }
  } catch (err) {
    // Build error — extract from stderr
    const output = err.stdout || err.message || "";
    const match = output.match(/file:\s*(\/[^\s:]+\.mdx):(\d+)/);
    if (match) {
      const filePath = match[1];
      if (errorFiles.has(filePath)) {
        console.log(`Already tried fixing ${filePath}, giving up.`);
        break;
      }
      errorFiles.add(filePath);

      let content = readFileSync(filePath, "utf-8");
      content = content.replace(/^import\s+.*;\s*$/gm, "");
      content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
      const mdPath = filePath.replace(/\.mdx$/, ".md");
      writeFileSync(mdPath, content, "utf-8");
      execSync(`rm "${filePath}"`, { cwd: ROOT });
      console.log(`[${attempts}] Fixed: ${filePath.replace(ROOT + "/", "")} → .md`);
    } else {
      console.log("Build error, couldn't parse:");
      console.log((output || "").slice(-500));
      break;
    }
  }
}

if (attempts >= MAX_ATTEMPTS) {
  console.log(`Reached max attempts (${MAX_ATTEMPTS}).`);
}

console.log(`\nTotal files converted from .mdx to .md: ${errorFiles.size}`);
for (const f of errorFiles) {
  console.log(`  - ${f.replace(ROOT + "/", "")}`);
}

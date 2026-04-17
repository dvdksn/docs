/**
 * Expressive Code plugin: prompt stripping for copy button.
 *
 * When a user clicks the copy button on a code block, the `$` and `>`
 * prompt prefixes are stripped from each line. This matches the Hugo site's
 * behavior where shell commands are displayed with prompt characters but
 * copied without them.
 *
 * Works by modifying the `data-code` attribute on the copy button element
 * in the rendered HAST, which is what Expressive Code's copy handler reads.
 */
import { definePlugin } from "@expressive-code/core";

/** Languages where prompt stripping makes sense */
const SHELL_LANGUAGES = new Set([
  "bash",
  "sh",
  "shell",
  "console",
  "terminal",
  "zsh",
  "powershell",
  "ps",
  "cmd",
  "bat",
  "text",
  "txt",
  "plaintext",
  "",
]);

const PROMPT_RE = /^[\$>]\s+/gm;

/**
 * Recursively find elements matching a test in a HAST tree.
 */
function findAll(
  node: any,
  test: (n: any) => boolean,
  results: any[] = [],
): any[] {
  if (test(node)) results.push(node);
  if (node.children) {
    for (const child of node.children) {
      findAll(child, test, results);
    }
  }
  return results;
}

export function pluginPromptStrip() {
  return definePlugin({
    name: "prompt-strip",
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        // Only strip prompts for shell-like languages
        const lang = codeBlock.language.toLowerCase();
        if (!SHELL_LANGUAGES.has(lang)) return;

        // Check if the code actually has prompt characters
        const code = codeBlock.code;
        if (!PROMPT_RE.test(code)) return;
        PROMPT_RE.lastIndex = 0;

        // Find copy buttons in the rendered AST and update data-code
        const buttons = findAll(
          renderData.blockAst,
          (n: any) =>
            n.type === "element" &&
            n.tagName === "button" &&
            n.properties?.["data-code"] != null,
        );

        for (const btn of buttons) {
          const encoded = btn.properties["data-code"] as string;
          // data-code uses \u007f as newline separator
          const decoded = encoded.replace(/\u007f/g, "\n");
          const stripped = decoded.replace(PROMPT_RE, "");
          btn.properties["data-code"] = stripped.replace(/\n/g, "\u007f");
        }
      },
    },
  });
}

---
title: docker mcp feature enable
description: Enable an experimental feature
sidebar:
  label: enable
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Enable an experimental feature</td></tr>
<tr><th>Usage</th><td><code>docker mcp feature enable &lt;feature-name&gt;</code></td></tr>
</tbody></table>

## Description

Enable an experimental feature.

Available features:
  oauth-interceptor      Enable GitHub OAuth flow interception for automatic authentication
  mcp-oauth-dcr          Enable Dynamic Client Registration (DCR) for automatic OAuth client setup
  dynamic-tools          Enable internal MCP management tools (mcp-find, mcp-add, mcp-remove)
	profiles               Enable profile management (docker mcp profile <subcommand>)
  tool-name-prefix       Prefix all tool names with server name to avoid conflicts


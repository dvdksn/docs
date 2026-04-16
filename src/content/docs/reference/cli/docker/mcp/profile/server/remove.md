---
title: docker mcp profile server remove
description: Remove MCP servers from a profile
sidebar:
  label: remove
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove MCP servers from a profile</td></tr>
<tr><th>Usage</th><td><code>docker mcp profile server remove &lt;profile-id&gt; --name &lt;name1&gt; --name &lt;name2&gt; ...</code></td></tr>
<tr><th>Aliases</th><td><code>docker mcp profile server rm</code></td></tr>
</tbody></table>

## Description

Remove MCP servers from a profile by server name.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--name` |  | Server name to remove (can be specified multiple times) |

## Examples

 # Remove servers by name
  docker mcp profile server remove dev-tools --name github --name slack

  # Remove a single server
  docker mcp profile server remove dev-tools --name github


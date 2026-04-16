---
title: docker mcp catalog server remove
description: Remove MCP servers from a catalog
sidebar:
  label: remove
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove MCP servers from a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog server remove &lt;oci-reference&gt; --name &lt;name1&gt; --name &lt;name2&gt; ...</code></td></tr>
<tr><th>Aliases</th><td><code>docker mcp catalog server rm</code></td></tr>
</tbody></table>

## Description

Remove MCP servers from a catalog by server name.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--name` |  | Server name to remove (can be specified multiple times) |

## Examples

  # Remove servers by name
  docker mcp catalog server remove mcp/my-catalog:latest --name github --name slack

  # Remove a single server
  docker mcp catalog server remove mcp/my-catalog:latest --name github


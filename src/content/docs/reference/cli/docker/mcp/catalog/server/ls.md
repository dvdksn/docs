---
title: docker mcp catalog server ls
description: List servers in a catalog
sidebar:
  label: ls
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List servers in a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog server ls &lt;oci-reference&gt;</code></td></tr>
<tr><th>Aliases</th><td><code>docker mcp catalog server list</code></td></tr>
</tbody></table>

## Description

List all servers in a catalog.

Use --filter to search for servers matching a query (case-insensitive substring matching on server names).
Filters use key=value format (e.g., name=github).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--filter` |  | Filter output (e.g., name=github) |
| `--format` | `human` | Supported: json, yaml, human. |

## Examples

  # List all servers in a catalog
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest

  # Filter servers by name
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest --filter name=github

  # Combine multiple filters (using short flag)
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest -f name=slack -f name=github

  # Output in JSON format
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest --format json


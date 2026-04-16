---
title: docker mcp catalog server add
description: Add MCP servers to a catalog
sidebar:
  label: add
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Add MCP servers to a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog server add &lt;oci-reference&gt; [--server &lt;ref1&gt; --server &lt;ref2&gt; ...]</code></td></tr>
</tbody></table>

## Description

Add MCP servers to a catalog using various URI schemes.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--server` |  | Server to include specified with a URI: https:// (MCP Registry reference) or docker:// (Docker Image reference) or catalog:// (Catalog reference) or file:// (Local file path). Can be specified multiple times.  |

## Examples

  # Add servers from another catalog
  docker mcp catalog server add mcp/my-catalog:latest --server catalog://mcp/docker-mcp-catalog:latest/github

  # Add servers with OCI references
  docker mcp catalog server add mcp/my-catalog:latest --server docker://my-server:latest

  # Add servers with MCP Registry references
  docker mcp catalog server add mcp/my-catalog:latest --server https://registry.modelcontextprotocol.io/v0/servers/71de5a2a-6cfb-4250-a196-f93080ecc860

  # Mix server references
  docker mcp catalog server add mcp/my-catalog:latest --server catalog://mcp/docker-mcp-catalog:latest/github --server docker://my-server:latest


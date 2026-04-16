---
title: docker mcp profile server add
description: Add MCP servers to a profile
sidebar:
  label: add
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Add MCP servers to a profile</td></tr>
<tr><th>Usage</th><td><code>docker mcp profile server add &lt;profile-id&gt; [--server &lt;ref1&gt; --server &lt;ref2&gt; ...]</code></td></tr>
</tbody></table>

## Description

Add MCP servers to a profile.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--server` |  | Server to include specified with a URI: https:// (MCP Registry reference) or docker:// (Docker Image reference) or catalog:// (Catalog reference) or file:// (Local file path). Can be specified multiple times.  |

## Examples

  # Add servers from a catalog
  docker mcp profile server add dev-tools --server catalog://mcp/docker-mcp-catalog/github+obsidian

  # Add servers with OCI references
  docker mcp profile server add my-profile --server docker://my-server:latest

  # Add servers with MCP Registry references
  docker mcp profile server add my-profile --server http://registry.modelcontextprotocol.io/v0/servers/71de5a2a-6cfb-4250-a196-f93080ecc860

  # Mix server references
  docker mcp profile server add dev-tools --server catalog://mcp/docker-mcp-catalog/github+obsidian --server docker://my-server:latest


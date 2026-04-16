---
title: docker mcp catalog create
description: |
  Create a new catalog from a profile, legacy catalog, or community registry
sidebar:
  label: create
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a new catalog from a profile, legacy catalog, or community registry
</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog create &lt;oci-reference&gt; [--server &lt;ref1&gt; --server &lt;ref2&gt; ...] [--from-profile &lt;profile-id&gt;] [--from-legacy-catalog &lt;url&gt;] [--from-community-registry &lt;hostname&gt;] [--title &lt;title&gt;]</code></td></tr>
</tbody></table>

## Description

Create a new catalog from a profile, legacy catalog, or community registry


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--from-community-registry` |  | Community registry hostname to fetch servers from (e.g. registry.modelcontextprotocol.io)  |
| `--from-legacy-catalog` |  | Legacy catalog URL to create the catalog from |
| `--from-profile` |  | Profile ID to create the catalog from |
| `--server` |  | Server to include specified with a URI: https:// (MCP Registry reference) or docker:// (Docker Image reference) or catalog:// (Catalog reference) or file:// (Local file path). Can be specified multiple times.  |
| `--title` |  | Title of the catalog |


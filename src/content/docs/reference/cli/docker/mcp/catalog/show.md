---
title: docker mcp catalog show
description: Show a catalog
sidebar:
  label: show
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Show a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog show &lt;oci-reference&gt; [--pull &lt;pull-option&gt;]</code></td></tr>
</tbody></table>

## Description

Show a catalog

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `human` | Supported: json, yaml, human. |
| `--no-tools` |  | Exclude tools from output (deprecated, use --yq instead) |
| `--pull` | `never` | Supported: missing, never, always, initial, exists, or duration (e.g. '1h', '1d'). Duration represents time since last update.  |
| `--yq` |  | YQ expression to apply to the output |


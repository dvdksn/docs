---
title: docker compose volumes
description: List volumes
sidebar:
  label: volumes
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List volumes</td></tr>
<tr><th>Usage</th><td><code>docker compose volumes [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

List volumes

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `table` | Format output using a custom template: 'table':            Print output in table format with column headers (default) 'table TEMPLATE':   Print output in table format using the given Go template 'json':             Print in JSON format 'TEMPLATE':         Print output using the given Go template. Refer to https://docs.docker.com/go/formatting/ for more information about formatting output with templates |
| `-q`, `--quiet` |  | Only display volume names |


---
title: docker mcp catalog ls
description: List all configured catalogs
sidebar:
  label: ls
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List all configured catalogs</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog ls</code></td></tr>
</tbody></table>

## Description

List all configured catalogs including Docker's official catalog and any locally managed catalogs.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` |  | Output format. Supported: "json", "yaml". |

## Examples

  # List all catalogs
  docker mcp catalog ls

  # List catalogs in JSON format
  docker mcp catalog ls --format=json


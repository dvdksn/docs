---
title: docker dhi catalog list
description: List available Docker Hardened Images
sidebar:
  label: list
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List available Docker Hardened Images</td></tr>
<tr><th>Usage</th><td><code>docker dhi catalog list</code></td></tr>
</tbody></table>

## Description

List all available Docker Hardened Images and Helm charts in the catalog

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--filter` |  | Filter by name (case-insensitive substring match) |
| `--fips` |  | Filter to FIPS compliant images (use --fips=false to exclude) |
| `--json` |  | Output in JSON format |
| `--stig` |  | Filter to STIG certified images (use --stig=false to exclude) |
| `--type` |  | Filter by type (image, helm, chart, or helm-chart) |


---
title: docker dhi mirror list
description: List all mirrored Docker Hardened Images
sidebar:
  label: list
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List all mirrored Docker Hardened Images</td></tr>
<tr><th>Usage</th><td><code>docker dhi mirror list</code></td></tr>
</tbody></table>

## Description

List all Docker Hardened Images currently being mirrored to your organization's registry.

Shows the source repositories, destination repositories, and mirroring status.

Examples:
  # List all mirrored repositories
  docker dhi mirror list --org myorg

  # List only image repositories
  docker dhi mirror list --org myorg --type image

  # List only helm chart repositories
  docker dhi mirror list --org myorg --type helm-chart

  # Search for a specific repository by name
  docker dhi mirror list --org myorg --filter dhi-python

  # Output in JSON format
  docker dhi mirror list --org myorg --json

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--filter` |  | Filter by repository name (partial match) |
| `--json` |  | Output in JSON format |
| `--type` |  | Filter by repository type (image or helm-chart) |


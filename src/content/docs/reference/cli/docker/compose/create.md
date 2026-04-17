---
title: docker compose create
description: Creates containers for a service
sidebar:
  label: create
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Creates containers for a service</td></tr>
<tr><th>Usage</th><td><code>docker compose create [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Creates containers for a service

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--build` |  | Build images before starting containers |
| `--force-recreate` |  | Recreate containers even if their configuration and image haven't changed  |
| `--no-build` |  | Don't build an image, even if it's policy |
| `--no-recreate` |  | If containers already exist, don't recreate them. Incompatible with --force-recreate.  |
| `--pull` | `policy` | Pull image before running ("always"|"missing"|"never"|"build") |
| `--quiet-pull` |  | Pull without printing progress information |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `--scale` |  | Scale SERVICE to NUM instances. Overrides the `scale` setting in the Compose file if present.  |
| `-y`, `--yes` |  | Assume "yes" as answer to all prompts and run non-interactively |


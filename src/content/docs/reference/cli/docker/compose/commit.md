---
title: docker compose commit
description: Create a new image from a service container's changes
sidebar:
  label: commit
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a new image from a service container's changes</td></tr>
<tr><th>Usage</th><td><code>docker compose commit [OPTIONS] SERVICE [REPOSITORY[:TAG]]</code></td></tr>
</tbody></table>

## Description

Create a new image from a service container's changes

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--author` |  | Author (e.g., "John Hannibal Smith <hannibal@a-team.com>") |
| `-c`, `--change` |  | Apply Dockerfile instruction to the created image |
| `--index` |  | index of the container if service has multiple replicas. |
| `-m`, `--message` |  | Commit message |
| `-p`, `--pause` | `true` | Pause container during commit |


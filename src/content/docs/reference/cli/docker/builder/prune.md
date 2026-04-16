---
title: docker builder prune
description: Remove build cache
sidebar:
  label: prune
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove build cache</td></tr>
<tr><th>Usage</th><td><code>docker builder prune</code></td></tr>
</tbody></table>

## Description

Remove build cache

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--all` |  | Remove all unused build cache, not just dangling ones |
| `--filter` |  | Provide filter values (e.g. `until=24h`) |
| `-f`, `--force` |  | Do not prompt for confirmation |
| `--keep-storage` |  | Amount of disk space to keep for cache |


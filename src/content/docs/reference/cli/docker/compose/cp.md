---
title: docker compose cp
description: Copy files/folders between a service container and the local filesystem
sidebar:
  label: cp
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Copy files/folders between a service container and the local filesystem</td></tr>
<tr><th>Usage</th><td><code>docker compose cp [OPTIONS] SERVICE:SRC_PATH DEST_PATH|-
	docker compose cp [OPTIONS] SRC_PATH|- SERVICE:DEST_PATH</code></td></tr>
</tbody></table>

## Description

Copy files/folders between a service container and the local filesystem

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--all` |  | Include containers created by the run command |
| `-a`, `--archive` |  | Archive mode (copy all uid/gid information) |
| `-L`, `--follow-link` |  | Always follow symbol link in SRC_PATH |
| `--index` |  | Index of the container if service has multiple replicas |


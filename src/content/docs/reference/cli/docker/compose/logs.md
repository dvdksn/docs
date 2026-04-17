---
title: docker compose logs
description: View output from containers
sidebar:
  label: logs
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>View output from containers</td></tr>
<tr><th>Usage</th><td><code>docker compose logs [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Displays log output from services

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--follow` |  | Follow log output |
| `--index` |  | index of the container if service has multiple replicas |
| `--no-color` |  | Produce monochrome output |
| `--no-log-prefix` |  | Don't print prefix in logs |
| `--since` |  | Show logs since timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes)  |
| `-n`, `--tail` | `all` | Number of lines to show from the end of the logs for each container  |
| `-t`, `--timestamps` |  | Show timestamps |
| `--until` |  | Show logs before a timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes)  |


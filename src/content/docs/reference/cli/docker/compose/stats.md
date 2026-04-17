---
title: docker compose stats
description: Display a live stream of container(s) resource usage statistics
sidebar:
  label: stats
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Display a live stream of container(s) resource usage statistics</td></tr>
<tr><th>Usage</th><td><code>docker compose stats [OPTIONS] [SERVICE]</code></td></tr>
</tbody></table>

## Description

Display a live stream of container(s) resource usage statistics

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--all` |  | Show all containers (default shows just running) |
| `--format` |  | Format output using a custom template: 'table':            Print output in table format with column headers (default) 'table TEMPLATE':   Print output in table format using the given Go template 'json':             Print in JSON format 'TEMPLATE':         Print output using the given Go template. Refer to https://docs.docker.com/engine/cli/formatting/ for more information about formatting output with templates |
| `--no-stream` |  | Disable streaming stats and only pull the first result |
| `--no-trunc` |  | Do not truncate output |


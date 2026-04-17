---
title: docker compose attach
description: |
  Attach local standard input, output, and error streams to a service's running container
sidebar:
  label: attach
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Attach local standard input, output, and error streams to a service's running container
</td></tr>
<tr><th>Usage</th><td><code>docker compose attach [OPTIONS] SERVICE</code></td></tr>
</tbody></table>

## Description

Attach local standard input, output, and error streams to a service's running container


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--detach-keys` |  | Override the key sequence for detaching from a container. |
| `--index` |  | index of the container if service has multiple replicas. |
| `--no-stdin` |  | Do not attach STDIN |
| `--sig-proxy` | `true` | Proxy all received signals to the process |


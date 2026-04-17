---
title: docker compose port
description: Print the public port for a port binding
sidebar:
  label: port
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Print the public port for a port binding</td></tr>
<tr><th>Usage</th><td><code>docker compose port [OPTIONS] SERVICE PRIVATE_PORT</code></td></tr>
</tbody></table>

## Description

Prints the public port for a port binding

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--index` |  | Index of the container if service has multiple replicas |
| `--protocol` | `tcp` | tcp or udp |


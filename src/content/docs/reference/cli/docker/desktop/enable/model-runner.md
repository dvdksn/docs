---
title: docker desktop enable model-runner
description: Manage Docker Model Runner settings
sidebar:
  label: model-runner
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Manage Docker Model Runner settings</td></tr>
<tr><th>Usage</th><td><code>docker desktop enable model-runner [OPTIONS]</code></td></tr>
</tbody></table>

## Description

Enable and manage Docker Model Runner settings used by 'docker model'

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--no-tcp` |  | Disable TCP connection. Cannot be used with --tcp. |
| `--tcp` | `12434` | Enable or change TCP port for connection (1-65535). Cannot be used with --no-tcp.  |
| `--cors` | `all` | CORS configuration. Can be `all`, `none`, or comma-separated list of allowed origins. |
| `--gpu` |  | Enable GPU support for Model Runner (Windows only). |


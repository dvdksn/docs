---
title: docker checkpoint create
description: Create a checkpoint from a running container
sidebar:
  label: create
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a checkpoint from a running container</td></tr>
<tr><th>Usage</th><td><code>docker checkpoint create [OPTIONS] CONTAINER CHECKPOINT</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

Create a checkpoint from a running container

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--checkpoint-dir` |  | Use a custom checkpoint storage directory |
| `--leave-running` |  | Leave the container running after checkpoint |


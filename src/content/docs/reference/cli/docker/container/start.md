---
title: docker container start
description: Start one or more stopped containers
sidebar:
  label: start
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Start one or more stopped containers</td></tr>
<tr><th>Usage</th><td><code>docker container start [OPTIONS] CONTAINER [CONTAINER...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker start</code></td></tr>
</tbody></table>

## Description

Start one or more stopped containers

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--attach` |  | Attach STDOUT/STDERR and forward signals |
| `--checkpoint` |  | *experimental (daemon)* Restore from this checkpoint |
| `--checkpoint-dir` |  | *experimental (daemon)* Use a custom checkpoint storage directory |
| `--detach-keys` |  | Override the key sequence for detaching a container |
| `-i`, `--interactive` |  | Attach container's STDIN |

## Examples

```console
$ docker start my_container
```


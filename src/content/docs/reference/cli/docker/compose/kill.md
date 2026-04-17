---
title: docker compose kill
description: Force stop service containers
sidebar:
  label: kill
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Force stop service containers</td></tr>
<tr><th>Usage</th><td><code>docker compose kill [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Forces running containers to stop by sending a `SIGKILL` signal. Optionally the signal can be passed, for example:

```console
$ docker compose kill -s SIGINT
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `-s`, `--signal` | `SIGKILL` | SIGNAL to send to the container |


---
title: docker compose rm
description: Removes stopped service containers
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Removes stopped service containers</td></tr>
<tr><th>Usage</th><td><code>docker compose rm [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Removes stopped service containers.

By default, anonymous volumes attached to containers are not removed. You can override this with `-v`. To list all
volumes, use `docker volume ls`.

Any data which is not in a volume is lost.

Running the command with no options also removes one-off containers created by `docker compose run`:

```console
$ docker compose rm
Going to remove djangoquickstart_web_run_1
Are you sure? [yN] y
Removing djangoquickstart_web_run_1 ... done
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Don't ask to confirm removal |
| `-s`, `--stop` |  | Stop the containers, if required, before removing |
| `-v`, `--volumes` |  | Remove any anonymous volumes attached to containers |


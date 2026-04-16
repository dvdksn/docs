---
title: docker context ls
description: List contexts
sidebar:
  label: ls
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List contexts</td></tr>
<tr><th>Usage</th><td><code>docker context ls [OPTIONS]</code></td></tr>
<tr><th>Aliases</th><td><code>docker context list</code></td></tr>
</tbody></table>

## Description

List contexts

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` |  | Format output using a custom template: 'table':            Print output in table format with column headers (default) 'table TEMPLATE':   Print output in table format using the given Go template 'json':             Print in JSON format 'TEMPLATE':         Print output using the given Go template. Refer to https://docs.docker.com/go/formatting/ for more information about formatting output with templates |
| `-q`, `--quiet` |  | Only show context names |

## Examples

Use `docker context ls` to print all contexts. The currently active context is
indicated with an `*`:

```console
$ docker context ls

NAME                DESCRIPTION                               DOCKER ENDPOINT                      ORCHESTRATOR
default *           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock          swarm
production                                                    tcp:///prod.corp.example.com:2376
staging                                                       tcp:///stage.corp.example.com:2376
```


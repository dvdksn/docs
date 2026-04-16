---
title: docker volume rm
description: Remove one or more volumes
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more volumes</td></tr>
<tr><th>Usage</th><td><code>docker volume rm [OPTIONS] VOLUME [VOLUME...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker volume remove</code></td></tr>
</tbody></table>

## Description

Remove one or more volumes. You can't remove a volume that's in use by a container.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | **API 1.25+** Force the removal of one or more volumes |

## Examples

```console
$ docker volume rm hello

hello
```


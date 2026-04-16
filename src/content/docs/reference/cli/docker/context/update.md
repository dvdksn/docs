---
title: docker context update
description: Update a context
sidebar:
  label: update
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Update a context</td></tr>
<tr><th>Usage</th><td><code>docker context update [OPTIONS] CONTEXT</code></td></tr>
</tbody></table>

## Description

Updates an existing `context`.
See [context create](/reference/cli/docker/context/create/).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--description` |  | Description of the context |
| `--docker` |  | set the docker endpoint |

## Examples

### Update an existing context

```console
$ docker context update \
    --description "some description" \
    --docker "host=tcp://myserver:2376,ca=~/ca-file,cert=~/cert-file,key=~/key-file" \
    my-context
```


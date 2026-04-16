---
title: docker container wait
description: Block until one or more containers stop, then print their exit codes
sidebar:
  label: wait
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Block until one or more containers stop, then print their exit codes</td></tr>
<tr><th>Usage</th><td><code>docker container wait CONTAINER [CONTAINER...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker wait</code></td></tr>
</tbody></table>

## Description

Block until one or more containers stop, then print their exit codes

## Examples

Start a container in the background.

```console
$ docker run -dit --name=my_container ubuntu bash
```

Run `docker wait`, which should block until the container exits.

```console
$ docker wait my_container
```

In another terminal, stop the first container. The `docker wait` command above
returns the exit code.

```console
$ docker stop my_container
```

This is the same `docker wait` command from above, but it now exits, returning
`0`.

```console
$ docker wait my_container

0
```


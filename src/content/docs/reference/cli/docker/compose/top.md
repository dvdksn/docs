---
title: docker compose top
description: Display the running processes
sidebar:
  label: top
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Display the running processes</td></tr>
<tr><th>Usage</th><td><code>docker compose top [SERVICES...]</code></td></tr>
</tbody></table>

## Description

Displays the running processes

## Examples

```console
$ docker compose top
example_foo_1
UID    PID      PPID     C    STIME   TTY   TIME       CMD
root   142353   142331   2    15:33   ?     00:00:00   ping localhost -c 5
```


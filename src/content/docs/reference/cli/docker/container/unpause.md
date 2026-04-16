---
title: docker container unpause
description: Unpause all processes within one or more containers
sidebar:
  label: unpause
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Unpause all processes within one or more containers</td></tr>
<tr><th>Usage</th><td><code>docker container unpause CONTAINER [CONTAINER...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker unpause</code></td></tr>
</tbody></table>

## Description

The `docker unpause` command un-suspends all processes in the specified containers.
On Linux, it does this using the freezer cgroup.

See the
[freezer cgroup documentation](https://www.kernel.org/doc/Documentation/cgroup-v1/freezer-subsystem.txt)
for further details.

## Examples

```console
$ docker unpause my_container
my_container
```


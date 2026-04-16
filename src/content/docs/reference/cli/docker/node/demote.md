---
title: docker node demote
description: Demote one or more nodes from manager in the swarm
sidebar:
  label: demote
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Demote one or more nodes from manager in the swarm</td></tr>
<tr><th>Usage</th><td><code>docker node demote NODE [NODE...]</code></td></tr>
</tbody></table>

## Description

Demotes an existing manager so that it is no longer a manager.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the [Swarm mode
> section](/engine/swarm/) in the documentation.

## Examples

```console
$ docker node demote <node name>
```


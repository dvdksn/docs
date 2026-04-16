---
title: docker node promote
description: Promote one or more nodes to manager in the swarm
sidebar:
  label: promote
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Promote one or more nodes to manager in the swarm</td></tr>
<tr><th>Usage</th><td><code>docker node promote NODE [NODE...]</code></td></tr>
</tbody></table>

## Description

Promotes a node to manager. This command can only be executed on a manager node.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.

## Examples

```console
$ docker node promote <node name>
```


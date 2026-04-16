---
title: docker service rm
description: Remove one or more services
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more services</td></tr>
<tr><th>Usage</th><td><code>docker service rm SERVICE [SERVICE...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker service remove</code></td></tr>
</tbody></table>

## Description

Removes the specified services from the swarm.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.

## Examples

Remove the `redis` service:

```console
$ docker service rm redis

redis

$ docker service ls

ID  NAME  MODE  REPLICAS  IMAGE
```

> [!WARNING]
> Unlike `docker rm`, this command does not ask for confirmation before removing
> a running service.


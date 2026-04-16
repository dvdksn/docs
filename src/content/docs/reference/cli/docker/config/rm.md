---
title: docker config rm
description: Remove one or more configs
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more configs</td></tr>
<tr><th>Usage</th><td><code>docker config rm CONFIG [CONFIG...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker config remove</code></td></tr>
</tbody></table>

## Description

Removes the specified configs from the Swarm.

For detailed information about using configs, refer to [store configuration data using Docker Configs](/engine/swarm/configs/).

> [!NOTE]
> This is a cluster management command, and must be executed on a Swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.

## Examples

This example removes a config:

```console
$ docker config rm my_config
sapth4csdo5b6wz2p5uimh5xg
```

> [!WARNING]
> This command doesn't ask for confirmation before removing a config.
{ .warning }


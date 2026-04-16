---
title: docker network disconnect
description: Disconnect a container from a network
sidebar:
  label: disconnect
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Disconnect a container from a network</td></tr>
<tr><th>Usage</th><td><code>docker network disconnect [OPTIONS] NETWORK CONTAINER</code></td></tr>
</tbody></table>

## Description

Disconnects a container from a network. The container must be running to
disconnect it from the network.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Force the container to disconnect from a network |

## Examples

```console
$ docker network disconnect multi-host-network container1
```


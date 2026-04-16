---
title: docker network rm
description: Remove one or more networks
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more networks</td></tr>
<tr><th>Usage</th><td><code>docker network rm NETWORK [NETWORK...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker network remove</code></td></tr>
</tbody></table>

## Description

Removes one or more networks by name or identifier. To remove a network,
you must first disconnect any containers connected to it.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Do not error if the network does not exist |

## Examples

### Remove a network

To remove the network named 'my-network':

```console
$ docker network rm my-network
```

### Remove multiple networks

To delete multiple networks in a single `docker network rm` command, provide
multiple network names or ids. The following example deletes a network with id
`3695c422697f` and a network named `my-network`:

```console
$ docker network rm 3695c422697f my-network
```

When you specify multiple networks, the command attempts to delete each in turn.
If the deletion of one network fails, the command continues to the next on the
list and tries to delete that. The command reports success or failure for each
deletion.


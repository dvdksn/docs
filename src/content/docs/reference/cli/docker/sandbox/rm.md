---
title: docker sandbox rm
description: Remove one or more sandboxes
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more sandboxes</td></tr>
<tr><th>Usage</th><td><code>docker sandbox rm SANDBOX [SANDBOX...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker sandbox remove</code></td></tr>
</tbody></table>

## Description

Remove one or more sandboxes and all their associated resources.

This command will:
- Check if the sandbox exists
- Remove the sandbox and clean up its associated resources

## Examples

### Remove a sandbox

```console
$ docker sandbox rm abc123def
abc123def
```

### Remove multiple sandboxes

```console
$ docker sandbox rm abc123def def456ghi
abc123def
def456ghi
```

### Remove all sandboxes

```console
$ docker sandbox rm $(docker sandbox ls -q)
```


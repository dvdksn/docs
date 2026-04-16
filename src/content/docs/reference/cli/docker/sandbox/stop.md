---
title: docker sandbox stop
description: Stop one or more sandboxes without removing them
sidebar:
  label: stop
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Stop one or more sandboxes without removing them</td></tr>
<tr><th>Usage</th><td><code>docker sandbox stop SANDBOX [SANDBOX...]</code></td></tr>
</tbody></table>

## Description

Stop one or more sandboxes without removing them. The sandboxes can be restarted later.


## Examples

### Stop a sandbox

```console
$ docker sandbox stop my-sandbox
my-sandbox
```

### Stop multiple sandboxes

```console
$ docker sandbox stop sandbox1 sandbox2
sandbox1
sandbox2
```

### Stop all running sandboxes

```console
$ docker sandbox stop $(docker sandbox ls -q)
```


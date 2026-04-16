---
title: docker sandbox network
description: Manage sandbox networking
sidebar:
  label: network
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Manage sandbox networking</td></tr>
<tr><th>Usage</th><td><code>docker sandbox network</code></td></tr>
</tbody></table>

## Description

Manage sandbox networking

## Subcommands

| Command | Description |
|---------|-------------|
| [`docker sandbox network log`](/reference/cli/docker/sandbox/network/log/) | Show network logs |
| [`docker sandbox network proxy`](/reference/cli/docker/sandbox/network/proxy/) | Manage proxy configuration for a sandbox |

## Examples

### View network logs

```console
$ docker sandbox network log
```

### Configure proxy for a sandbox

```console
$ docker sandbox network proxy my-sandbox --block-host example.com
```

See the subcommands for more details:
- [`docker sandbox network log`](/reference/cli/docker/sandbox/network/log/) - Show network logs
- [`docker sandbox network proxy`](/reference/cli/docker/sandbox/network/proxy/) - Manage proxy configuration


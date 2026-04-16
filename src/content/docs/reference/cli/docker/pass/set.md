---
title: docker pass set
description: Set a secret
sidebar:
  label: set
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Set a secret</td></tr>
<tr><th>Usage</th><td><code>docker pass set NAME=VALUE</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

Secrets can also be created from STDIN:

```console
<some command> | docker pass set <name>
```


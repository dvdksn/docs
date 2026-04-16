---
title: docker scout config
description: Manage Docker Scout configuration
sidebar:
  label: config
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Manage Docker Scout configuration</td></tr>
<tr><th>Usage</th><td><code>docker scout config [KEY] [VALUE]</code></td></tr>
</tbody></table>

## Description

`docker scout config` allows you to list, get and set Docker Scout configuration.

Available configuration key:

- `organization`: Namespace of the Docker organization to be used by default.

## Examples

### List existing configuration

```console
$ docker scout config
organization=my-org-namespace
```

### Print configuration value

```console
$ docker scout config organization
my-org-namespace
```

### Set configuration value

```console
$ docker scout config organization my-org-namespace
    ✓ Successfully set organization to my-org-namespace
```


---
title: docker plugin push
description: Push a plugin to a registry
sidebar:
  label: push
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Push a plugin to a registry</td></tr>
<tr><th>Usage</th><td><code>docker plugin push [OPTIONS] PLUGIN[:TAG]</code></td></tr>
</tbody></table>

## Description

After you have created a plugin using `docker plugin create` and the plugin is
ready for distribution, use `docker plugin push` to share your images to Docker
Hub or a self-hosted registry.

Registry credentials are managed by [docker login](/reference/cli/docker/login/).

## Examples

The following example shows how to push a sample `user/plugin`.

```console
$ docker plugin ls

ID             NAME                    DESCRIPTION                  ENABLED
69553ca1d456   user/plugin:latest      A sample plugin for Docker   false

$ docker plugin push user/plugin
```


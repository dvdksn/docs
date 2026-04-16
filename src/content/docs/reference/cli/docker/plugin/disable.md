---
title: docker plugin disable
description: Disable a plugin
sidebar:
  label: disable
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Disable a plugin</td></tr>
<tr><th>Usage</th><td><code>docker plugin disable [OPTIONS] PLUGIN</code></td></tr>
</tbody></table>

## Description

Disables a plugin. The plugin must be installed before it can be disabled,
see [`docker plugin install`](/reference/cli/docker/plugin/install/). Without the `-f` option,
a plugin that has references (e.g., volumes, networks) cannot be disabled.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Force the disable of an active plugin |

## Examples

The following example shows that the `sample-volume-plugin` plugin is installed
and enabled:

```console
$ docker plugin ls

ID            NAME                                    DESCRIPTION                ENABLED
69553ca1d123  tiborvass/sample-volume-plugin:latest   A test plugin for Docker   true
```

To disable the plugin, use the following command:

```console
$ docker plugin disable tiborvass/sample-volume-plugin

tiborvass/sample-volume-plugin

$ docker plugin ls

ID            NAME                                    DESCRIPTION                ENABLED
69553ca1d123  tiborvass/sample-volume-plugin:latest   A test plugin for Docker   false
```


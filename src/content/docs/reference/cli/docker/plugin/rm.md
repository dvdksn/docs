---
title: docker plugin rm
description: Remove one or more plugins
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove one or more plugins</td></tr>
<tr><th>Usage</th><td><code>docker plugin rm [OPTIONS] PLUGIN [PLUGIN...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker plugin remove</code></td></tr>
</tbody></table>

## Description

Removes a plugin. You cannot remove a plugin if it is enabled, you must disable
a plugin using the [`docker plugin disable`](/reference/cli/docker/plugin/disable/) before removing
it, or use `--force`. Use of `--force` is not recommended, since it can affect
functioning of running containers using the plugin.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Force the removal of an active plugin |

## Examples

The following example disables and removes the `sample-volume-plugin:latest`
plugin:

```console
$ docker plugin disable tiborvass/sample-volume-plugin

tiborvass/sample-volume-plugin

$ docker plugin rm tiborvass/sample-volume-plugin:latest

tiborvass/sample-volume-plugin
```


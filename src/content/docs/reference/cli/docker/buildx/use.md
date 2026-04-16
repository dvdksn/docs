---
title: docker buildx use
description: Set the current builder instance
sidebar:
  label: use
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Set the current builder instance</td></tr>
<tr><th>Usage</th><td><code>docker buildx use [OPTIONS] NAME</code></td></tr>
</tbody></table>

## Description

Switches the current builder instance. Build commands invoked after this command
will run on a specified builder. Alternatively, a context name can be used to
switch to the default builder of that context.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--default` |  | Set builder as default for current context |
| `--global` |  | Builder persists context changes |

## Examples

### Override the configured builder instance (--builder) {#builder}

Same as [`buildx --builder`](/reference/cli/docker/buildx/#builder).


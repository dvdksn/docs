---
title: docker buildx imagetools
description: Commands to work on images in registry
sidebar:
  label: imagetools
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Commands to work on images in registry</td></tr>
<tr><th>Usage</th><td><code>docker buildx imagetools</code></td></tr>
</tbody></table>

## Description

The `imagetools` commands contains subcommands for working with manifest lists
in container registries. These commands are useful for inspecting manifests
to check multi-platform configuration and attestations.

## Subcommands

| Command | Description |
|---------|-------------|
| [`docker buildx imagetools create`](/reference/cli/docker/buildx/imagetools/create/) | Create a new image based on source images |
| [`docker buildx imagetools inspect`](/reference/cli/docker/buildx/imagetools/inspect/) | Show details of an image in the registry |

## Examples

### Override the configured builder instance (--builder) {#builder}

Same as [`buildx --builder`](/reference/cli/docker/buildx/#builder).


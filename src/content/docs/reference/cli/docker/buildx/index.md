---
title: docker buildx
description: Docker Buildx
sidebar:
  label: buildx
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Docker Buildx</td></tr>
<tr><th>Usage</th><td><code>docker buildx</code></td></tr>
</tbody></table>

## Description

Extended build capabilities with BuildKit

## Options

| Option | Default | Description |
|--------|---------|-------------|
| [`--builder`](#builder) |  | Override the configured builder instance |
| `-D`, `--debug` |  | Enable debug logging |

## Subcommands

| Command | Description |
|---------|-------------|
| [`docker buildx bake`](/reference/cli/docker/buildx/bake/) | Build from a file |
| [`docker buildx build`](/reference/cli/docker/buildx/build/) | Start a build |
| [`docker buildx create`](/reference/cli/docker/buildx/create/) | Create a new builder instance |
| [`docker buildx dap`](/reference/cli/docker/buildx/dap/) | Start debug adapter protocol compatible debugger |
| [`docker buildx debug`](/reference/cli/docker/buildx/debug/) | Start debugger |
| [`docker buildx dial-stdio`](/reference/cli/docker/buildx/dial-stdio/) | Proxy current stdio streams to builder instance |
| [`docker buildx du`](/reference/cli/docker/buildx/du/) | Disk usage |
| [`docker buildx history`](/reference/cli/docker/buildx/history/) | Commands to work on build records |
| [`docker buildx imagetools`](/reference/cli/docker/buildx/imagetools/) | Commands to work on images in registry |
| [`docker buildx inspect`](/reference/cli/docker/buildx/inspect/) | Inspect current builder instance |
| [`docker buildx ls`](/reference/cli/docker/buildx/ls/) | List builder instances |
| [`docker buildx policy`](/reference/cli/docker/buildx/policy/) | Commands for working with build policies |
| [`docker buildx prune`](/reference/cli/docker/buildx/prune/) | Remove build cache |
| [`docker buildx rm`](/reference/cli/docker/buildx/rm/) | Remove one or more builder instances |
| [`docker buildx stop`](/reference/cli/docker/buildx/stop/) | Stop builder instance |
| [`docker buildx use`](/reference/cli/docker/buildx/use/) | Set the current builder instance |
| [`docker buildx version`](/reference/cli/docker/buildx/version/) | Show buildx version information |

## Examples

### Override the configured builder instance (--builder) {#builder}

You can also use the `BUILDX_BUILDER` environment variable.


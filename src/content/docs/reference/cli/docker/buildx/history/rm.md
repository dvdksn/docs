---
title: docker buildx history rm
description: Remove build records
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove build records</td></tr>
<tr><th>Usage</th><td><code>docker buildx history rm [OPTIONS] [REF...]</code></td></tr>
</tbody></table>

## Description

Remove one or more build records from the current builder’s history. You can
remove specific builds by ID or offset, or delete all records at once using
the `--all` flag.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| [`--all`](#all) |  | Remove all build records |

## Examples

### Remove a specific build

```console
# Using a build ID
docker buildx history rm qu2gsuo8ejqrwdfii23xkkckt

# Or using a relative offset
docker buildx history rm ^1
```

### Remove multiple builds

```console
# Using build IDs
docker buildx history rm qu2gsuo8ejqrwdfii23xkkckt qsiifiuf1ad9pa9qvppc0z1l3

# Or using relative offsets
docker buildx history rm ^1 ^2
```

### Remove all build records from the current builder (--all) {#all}

```console
docker buildx history rm --all
```


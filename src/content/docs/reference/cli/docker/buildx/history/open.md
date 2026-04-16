---
title: docker buildx history open
description: Open a build record in Docker Desktop
sidebar:
  label: open
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Open a build record in Docker Desktop</td></tr>
<tr><th>Usage</th><td><code>docker buildx history open [OPTIONS] [REF]</code></td></tr>
</tbody></table>

## Description

Open a build record in Docker Desktop for visual inspection. This requires
Docker Desktop to be installed and running on the host machine.

## Examples

### Open the most recent build in Docker Desktop

```console
docker buildx history open
```

By default, this opens the most recent build on the current builder.

### Open a specific build

```console
# Using a build ID
docker buildx history open qu2gsuo8ejqrwdfii23xkkckt

# Or using a relative offset
docker buildx history open ^1
```


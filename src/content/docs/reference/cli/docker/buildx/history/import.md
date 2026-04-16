---
title: docker buildx history import
description: Import build records into Docker Desktop
sidebar:
  label: import
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Import build records into Docker Desktop</td></tr>
<tr><th>Usage</th><td><code>docker buildx history import [OPTIONS] -</code></td></tr>
</tbody></table>

## Description

Import a build record from a `.dockerbuild` archive into Docker Desktop. This
lets you view, inspect, and analyze builds created in other environments or CI
pipelines.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| [`-f`, `--file`](#file) |  | Import from a file path |

## Examples

### Import a `.dockerbuild` archive from standard input

```console
docker buildx history import < mybuild.dockerbuild
```

### Import a build archive from a file (--file) {#file}

```console
docker buildx history import --file ./artifacts/backend-build.dockerbuild
```

### Open a build manually

By default, the `import` command automatically opens the imported build in Docker
Desktop. You don't need to run `open` unless you're opening a specific build
or re-opening it later.

If you've imported multiple builds, you can open one manually:

```console
docker buildx history open ci-build
```


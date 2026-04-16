---
title: docker buildx history trace
description: Show the OpenTelemetry trace of a build record
sidebar:
  label: trace
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Show the OpenTelemetry trace of a build record</td></tr>
<tr><th>Usage</th><td><code>docker buildx history trace [OPTIONS] [REF]</code></td></tr>
</tbody></table>

## Description

View the OpenTelemetry trace for a completed build. This command loads the
trace into a Jaeger UI viewer and opens it in your browser.

This helps analyze build performance, step timing, and internal execution flows.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| [`--addr`](#addr) | `127.0.0.1:0` | Address to bind the UI server |
| [`--compare`](#compare) |  | Compare with another build record |

## Examples

### Open the OpenTelemetry trace for the most recent build

This command starts a temporary Jaeger UI server and opens your default browser
to view the trace.

```console
docker buildx history trace
```

### Open the trace for a specific build

```console
# Using a build ID
docker buildx history trace qu2gsuo8ejqrwdfii23xkkckt

# Or using a relative offset
docker buildx history trace ^1
```

### Run the Jaeger UI on a specific port (--addr) {#addr}

```console
# Using a build ID
docker buildx history trace qu2gsuo8ejqrwdfii23xkkckt --addr 127.0.0.1:16686

# Or using a relative offset
docker buildx history trace ^1 --addr 127.0.0.1:16686
```

### Compare two build traces (--compare) {#compare}

Compare two specific builds by name:

```console
# Using build IDs
docker buildx history trace --compare=qu2gsuo8ejqrwdfii23xkkckt qsiifiuf1ad9pa9qvppc0z1l3

# Or using a single relative offset
docker buildx history trace --compare=^1
```

When you use a single reference with `--compare`, it compares that build
against the most recent one.


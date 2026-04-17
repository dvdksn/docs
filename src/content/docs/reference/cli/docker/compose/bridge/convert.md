---
title: docker compose bridge convert
description: |
  Convert compose files to Kubernetes manifests, Helm charts, or another model
sidebar:
  label: convert
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Convert compose files to Kubernetes manifests, Helm charts, or another model
</td></tr>
<tr><th>Usage</th><td><code>docker compose bridge convert</code></td></tr>
</tbody></table>

## Description

Convert compose files to Kubernetes manifests, Helm charts, or another model


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o`, `--output` | `out` | The output directory for the Kubernetes resources |
| `--templates` |  | Directory containing transformation templates |
| `-t`, `--transformation` |  | Transformation to apply to compose model (default: docker/compose-bridge-kubernetes)  |


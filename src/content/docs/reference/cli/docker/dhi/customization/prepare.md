---
title: docker dhi customization prepare
description: Prepare a new customization YAML file from a DHI base image tag
sidebar:
  label: prepare
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Prepare a new customization YAML file from a DHI base image tag</td></tr>
<tr><th>Usage</th><td><code>docker dhi customization prepare &lt;dhi-repository&gt; &lt;tag&gt;</code></td></tr>
</tbody></table>

## Description

Prepare a new customization YAML file by fetching tag details from a Docker Hardened Images repository.
This creates a scaffold YAML file that can be used with the create command.

The repository argument must be a DHI source repository name, not a mirrored destination repository.
Supported formats:
  - golang
  - dhi/golang
  - dhi.io/golang

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--destination` |  | Destination repository (e.g. myorg/dhi-golang) |
| `-n`, `--name` |  | Name for the customization |
| `-o`, `--output` |  | Output file path (if not specified, outputs to stdout) |


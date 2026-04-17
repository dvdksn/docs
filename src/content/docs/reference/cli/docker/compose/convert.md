---
title: docker compose convert
description: Converts the compose file to platform's canonical format
sidebar:
  label: convert
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Converts the compose file to platform's canonical format</td></tr>
<tr><th>Usage</th><td><code>docker compose convert [OPTIONS] [SERVICE...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker compose config</code></td></tr>
</tbody></table>

## Description

`docker compose convert` renders the actual data model to be applied on the target platform. When used with the Docker engine,
it merges the Compose files set by `-f` flags, resolves variables in the Compose file, and expands short-notation into
the canonical format.

To allow smooth migration from docker-compose, this subcommand declares alias `docker compose config`

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `yaml` | Format the output. Values: [yaml | json] |
| `--hash` |  | Print the service config hash, one per line. |
| `--images` |  | Print the image names, one per line. |
| `--no-consistency` |  | Don't check model consistency - warning: may produce invalid Compose output  |
| `--no-interpolate` |  | Don't interpolate environment variables. |
| `--no-normalize` |  | Don't normalize compose model. |
| `-o`, `--output` |  | Save to file (default to stdout) |
| `--profiles` |  | Print the profile names, one per line. |
| `-q`, `--quiet` |  | Only validate the configuration, don't print anything. |
| `--resolve-image-digests` |  | Pin image tags to digests. |
| `--services` |  | Print the service names, one per line. |
| `--volumes` |  | Print the volume names, one per line. |


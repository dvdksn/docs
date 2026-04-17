---
title: docker compose build
description: Build or rebuild services
sidebar:
  label: build
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Build or rebuild services</td></tr>
<tr><th>Usage</th><td><code>docker compose build [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Services are built once and then tagged, by default as `project-service`.

If the Compose file specifies an
[image](https://github.com/compose-spec/compose-spec/blob/main/spec.md#image) name,
the image is tagged with that name, substituting any variables beforehand. See
[variable interpolation](https://github.com/compose-spec/compose-spec/blob/main/spec.md#interpolation).

If you change a service's `Dockerfile` or the contents of its build directory,
run `docker compose build` to rebuild it.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--build-arg` |  | Set build-time variables for services |
| `--builder` |  | Set builder to use |
| `--check` |  | Check build configuration |
| `-m`, `--memory` |  | Set memory limit for the build container. Not supported by BuildKit.  |
| `--no-cache` |  | Do not use cache when building the image |
| `--print` |  | Print equivalent bake file |
| `--provenance` |  | Add a provenance attestation |
| `--pull` |  | Always attempt to pull a newer version of the image |
| `--push` |  | Push service images |
| `-q`, `--quiet` |  | Suppress the build output |
| `--sbom` |  | Add a SBOM attestation |
| `--ssh` |  | Set SSH authentications used when building service images. (use 'default' for using your default SSH Agent)  |
| `--with-dependencies` |  | Also build dependencies (transitively) |


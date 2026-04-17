---
title: docker compose publish
description: Publish compose application
sidebar:
  label: publish
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Publish compose application</td></tr>
<tr><th>Usage</th><td><code>docker compose publish [OPTIONS] REPOSITORY[:TAG]</code></td></tr>
</tbody></table>

## Description

Publish compose application

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--app` |  | Published compose application (includes referenced images) |
| `--oci-version` |  | OCI image/artifact specification version (automatically determined by default)  |
| `--resolve-image-digests` |  | Pin image tags to digests |
| `--with-env` |  | Include environment variables in the published OCI artifact |
| `-y`, `--yes` |  | Assume "yes" as answer to all prompts |


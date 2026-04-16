---
title: docker scout attestation list
description: List attestations for image
sidebar:
  label: list
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List attestations for image</td></tr>
<tr><th>Usage</th><td><code>docker scout attestation list OPTIONS IMAGE</code></td></tr>
<tr><th>Aliases</th><td><code>docker scout attest list</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

The docker scout attestation list command lists attestations for images.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `list` | Output format: - list: list of attestations of the image - json: json representation of the attestation list (default "json") |
| `--org` |  | Namespace of the Docker organization |
| `-o`, `--output` |  | Write the report to a file |
| `--platform` |  | Platform of image to analyze |
| `--predicate-type` |  | Predicate-type for attestations |
| `--ref` |  | Reference to use if the provided tarball contains multiple references. Can only be used with archive |


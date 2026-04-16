---
title: docker scout attestation add
description: Add attestation to image
sidebar:
  label: add
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Add attestation to image</td></tr>
<tr><th>Usage</th><td><code>docker scout attestation add OPTIONS IMAGE [IMAGE...]</code></td></tr>
<tr><th>Aliases</th><td><code>docker scout attest add</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

The docker scout attestation add command adds attestations to images.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--file` |  | File location of attestations to attach |
| `--org` |  | Namespace of the Docker organization |
| `--predicate-type` |  | Predicate-type for attestations |
| `--referrer` |  | Use OCI referrer API for pushing attestation |
| `--referrer-repository` | `registry.scout.docker.com` | Repository to push referrer to |


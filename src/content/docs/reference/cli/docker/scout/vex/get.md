---
title: docker scout vex get
description: Get VEX attestation for image
sidebar:
  label: get
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Get VEX attestation for image</td></tr>
<tr><th>Usage</th><td><code>docker scout vex get OPTIONS IMAGE</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

The docker scout vex get command gets a VEX attestation for images.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--key` | `https://registry.scout.docker.com/keyring/dhi/latest.pub` | Signature key to use for verification |
| `--org` |  | Namespace of the Docker organization |
| `-o`, `--output` |  | Write the report to a file |
| `--platform` |  | Platform of image to analyze |
| `--ref` |  | Reference to use if the provided tarball contains multiple references. Can only be used with archive |
| `--skip-tlog` |  | Skip signature verification against public transaction log |
| `--verify` |  | Verify the signature on the attestation |


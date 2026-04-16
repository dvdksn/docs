---
title: docker sandbox save
description: Save a snapshot of the sandbox as a template
sidebar:
  label: save
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Save a snapshot of the sandbox as a template</td></tr>
<tr><th>Usage</th><td><code>docker sandbox save SANDBOX TAG</code></td></tr>
</tbody></table>

## Description

Save a snapshot of the sandbox as a template.

By default, the image is loaded into the host's Docker daemon (requires Docker to be running).
Use --output to save the image to a tar file instead.

Examples:
  # Load into host Docker (requires host Docker running)
  docker sandbox save my-sandbox myimage:v1.0

  # Save to file (works without host Docker)
  docker sandbox save my-sandbox myimage:v1.0 --output /tmp/myimage.tar

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o`, `--output` |  | Save image to specified tar file instead of loading into host Docker  |


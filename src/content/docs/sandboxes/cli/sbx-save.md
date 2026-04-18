---
title: sbx save
description: Save a snapshot of the sandbox as a template
sidebar:
  label: save
---

## Synopsis

```
sbx save SANDBOX TAG [flags]
```

## Description

Save a snapshot of the sandbox as a template.

By default, the image is loaded into the host's Docker daemon (requires Docker to be running).
Use --output to save the image to a tar file instead.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o`, `--output` |  | Save image to specified tar file instead of loading into host Docker  |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Load into host Docker (requires host Docker running)
sbx save my-sandbox myimage:v1.0

# Save to file (works without host Docker)
sbx save my-sandbox myimage:v1.0 --output /tmp/myimage.tar
```


---
title: docker compose push
description: Push service images
sidebar:
  label: push
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Push service images</td></tr>
<tr><th>Usage</th><td><code>docker compose push [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Pushes images for services to their respective registry/repository.

The following assumptions are made:
- You are pushing an image you have built locally
- You have access to the build key

Examples

```yaml
services:
  service1:
    build: .
    image: localhost:5000/yourimage  ## goes to local registry

  service2:
    build: .
    image: your-dockerid/yourimage  ## goes to your repository on Docker Hub
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--ignore-push-failures` |  | Push what it can and ignores images with push failures |
| `--include-deps` |  | Also push images of services declared as dependencies |
| `-q`, `--quiet` |  | Push without printing progress information |


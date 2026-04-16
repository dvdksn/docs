---
title: docker scout repo enable
description: Enable Docker Scout
sidebar:
  label: enable
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Enable Docker Scout</td></tr>
<tr><th>Usage</th><td><code>docker scout repo enable [REPOSITORY]</code></td></tr>
</tbody></table>

## Description

The docker scout repo enable command enables Docker Scout on repositories.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--all` |  | Enable all repositories of the organization. Can not be used with --filter.  |
| `--filter` |  | Regular expression to filter repositories by name |
| `--integration` |  | Name of the integration to use for enabling an image |
| `--org` |  | Namespace of the Docker organization |
| `--registry` |  | Container Registry |

## Examples

### Enable a specific repository

```console
$ docker scout repo enable my/repository
```

### Enable all repositories of the organization

```console
$ docker scout repo enable --all
```

### Enable some repositories based on a filter

```console
$ docker scout repo enable --filter namespace/backend
```

### Enable a repository from a specific registry

```console
$ docker scout repo enable my/repository --registry 123456.dkr.ecr.us-east-1.amazonaws.com
```


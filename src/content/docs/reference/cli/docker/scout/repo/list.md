---
title: docker scout repo list
description: List Docker Scout repositories
sidebar:
  label: list
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List Docker Scout repositories</td></tr>
<tr><th>Usage</th><td><code>docker scout repo list</code></td></tr>
</tbody></table>

## Description

The docker scout repo list command shows all repositories in an organization.

If ORG is not provided the default configured organization will be used.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--filter` |  | Regular expression to filter repositories by name |
| `--only-disabled` |  | Filter to disabled repositories only |
| `--only-enabled` |  | Filter to enabled repositories only |
| `--only-registry` |  | Filter to a specific registry only: - hub.docker.com - ecr (AWS ECR) |
| `--org` |  | Namespace of the Docker organization |


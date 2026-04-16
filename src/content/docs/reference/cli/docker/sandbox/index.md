---
title: docker sandbox
description: Docker Sandbox
sidebar:
  label: sandbox
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Docker Sandbox</td></tr>
<tr><th>Usage</th><td><code>docker sandbox</code></td></tr>
</tbody></table>

## Description

Local sandbox environments for AI agents, using Docker.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Subcommands

| Command | Description |
|---------|-------------|
| [`docker sandbox create`](/reference/cli/docker/sandbox/create/) | Create a sandbox for an agent |
| [`docker sandbox exec`](/reference/cli/docker/sandbox/exec/) | Execute a command inside a sandbox |
| [`docker sandbox ls`](/reference/cli/docker/sandbox/ls/) | List VMs |
| [`docker sandbox network`](/reference/cli/docker/sandbox/network/) | Manage sandbox networking |
| [`docker sandbox reset`](/reference/cli/docker/sandbox/reset/) | Reset all VM sandboxes and clean up state |
| [`docker sandbox rm`](/reference/cli/docker/sandbox/rm/) | Remove one or more sandboxes |
| [`docker sandbox run`](/reference/cli/docker/sandbox/run/) | Run an agent in a sandbox |
| [`docker sandbox save`](/reference/cli/docker/sandbox/save/) | Save a snapshot of the sandbox as a template |
| [`docker sandbox stop`](/reference/cli/docker/sandbox/stop/) | Stop one or more sandboxes without removing them |
| [`docker sandbox version`](/reference/cli/docker/sandbox/version/) | Show sandbox version information |


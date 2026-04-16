---
title: docker sandbox ls
description: List VMs
sidebar:
  label: ls
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List VMs</td></tr>
<tr><th>Usage</th><td><code>docker sandbox ls [OPTIONS]</code></td></tr>
<tr><th>Aliases</th><td><code>docker sandbox list</code></td></tr>
</tbody></table>

## Description

List all VMs managed by sandboxd with their sandboxes

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--json` |  | Output in JSON format |
| [`-q`, `--quiet`](#quiet) |  | Only display VM names |

## Examples

### List all VMs

```console
$ docker sandbox ls
VM ID         NAME       STATUS    WORKSPACE                    SOCKET PATH                           SANDBOXES    AGENTS
abc123def     claude-vm  running   /home/user/my-project        /Users/.../docker-1764682554072.sock  2           claude
def456ghi     gemini-vm  stopped   /home/user/ml-projects
```

### Show only VM names (--quiet) {#quiet}

```text
--quiet
```

Output only VM names:

```console
$ docker sandbox ls --quiet
claude-vm
gemini-vm
```

### JSON output (--json)

```text
--json
```

Output detailed VM information in JSON format:

```console
$ docker sandbox ls --json
{
  "vms": [
    {
      "name": "claude-vm",
      "agent": "claude",
      "status": "running",
      "socket_path": "/Users/user/.docker/sandboxes/vm/claude-vm/docker-1234567890.sock",
      "sandbox_count": 2,
      "workspaces": [
        "/home/user/my-project",
        "/home/user/another-project"
      ]
    },
    {
      "name": "gemini-vm",
      "agent": "gemini",
      "status": "stopped",
      "sandbox_count": 0
    }
  ]
}
```


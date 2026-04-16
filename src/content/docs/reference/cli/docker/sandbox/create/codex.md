---
title: docker sandbox create codex
description: Create a sandbox for codex
sidebar:
  label: codex
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a sandbox for codex</td></tr>
<tr><th>Usage</th><td><code>docker sandbox create codex WORKSPACE [EXTRA_WORKSPACE...]</code></td></tr>
</tbody></table>

## Description

Create a sandbox with access to a host workspace for codex.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start codex after creation.

## Examples

### Create a Codex sandbox in the current directory

```console
$ docker sandbox create codex .
```

### Create with an absolute path

```console
$ docker sandbox create codex /home/user/my-project
```

### Create and then run

```console
$ docker sandbox create --name my-codex codex ~/my-project
$ docker sandbox run my-codex
```


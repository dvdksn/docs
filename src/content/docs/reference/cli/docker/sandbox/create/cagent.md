---
title: docker sandbox create cagent
description: Create a sandbox for cagent
sidebar:
  label: cagent
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a sandbox for cagent</td></tr>
<tr><th>Usage</th><td><code>docker sandbox create cagent WORKSPACE [EXTRA_WORKSPACE...]</code></td></tr>
</tbody></table>

## Description

Create a sandbox with access to a host workspace for cagent.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start cagent after creation.

## Examples

### Create a Cagent sandbox in the current directory

```console
$ docker sandbox create cagent .
```

### Create with an absolute path

```console
$ docker sandbox create cagent /home/user/my-project
```

### Create and then run

```console
$ docker sandbox create --name my-cagent cagent ~/my-project
$ docker sandbox run my-cagent
```


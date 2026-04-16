---
title: docker sandbox create gemini
description: Create a sandbox for gemini
sidebar:
  label: gemini
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a sandbox for gemini</td></tr>
<tr><th>Usage</th><td><code>docker sandbox create gemini WORKSPACE [EXTRA_WORKSPACE...]</code></td></tr>
</tbody></table>

## Description

Create a sandbox with access to a host workspace for gemini.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start gemini after creation.

## Examples

### Create a Gemini sandbox in the current directory

```console
$ docker sandbox create gemini .
```

### Create with an absolute path

```console
$ docker sandbox create gemini /home/user/my-project
```

### Create and then run

```console
$ docker sandbox create --name my-gemini gemini ~/my-project
$ docker sandbox run my-gemini
```


---
title: docker sandbox create copilot
description: Create a sandbox for copilot
sidebar:
  label: copilot
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a sandbox for copilot</td></tr>
<tr><th>Usage</th><td><code>docker sandbox create copilot WORKSPACE [EXTRA_WORKSPACE...]</code></td></tr>
</tbody></table>

## Description

Create a sandbox with access to a host workspace for copilot.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start copilot after creation.


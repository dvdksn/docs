---
title: docker mcp catalog rm
description: Remove a catalog
sidebar:
  label: rm
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Remove a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog rm &lt;name&gt;</code></td></tr>
</tbody></table>

## Description

Remove a locally configured catalog. This will delete the catalog and all its server definitions.
The Docker official catalog cannot be removed.

## Examples

  # Remove a catalog
  docker mcp catalog rm old-servers


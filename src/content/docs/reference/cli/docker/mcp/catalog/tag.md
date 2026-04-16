---
title: docker mcp catalog tag
description: Create a tagged copy of a catalog
sidebar:
  label: tag
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Create a tagged copy of a catalog</td></tr>
<tr><th>Usage</th><td><code>docker mcp catalog tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]</code></td></tr>
</tbody></table>

## Description

Create a new catalog by tagging an existing catalog with a new name or version.
This creates a copy of the source catalog with a new reference, similar to Docker image tagging.

## Examples

  # Tag a catalog with a new version
  docker mcp catalog tag mcp/my-catalog:v1 mcp/my-catalog:v2

  # Create a tagged copy with a different name
  docker mcp catalog tag mcp/team-catalog:latest mcp/prod-catalog:v1.0

  # Tag without explicit version (uses latest)
  docker mcp catalog tag mcp/my-catalog mcp/my-catalog:backup


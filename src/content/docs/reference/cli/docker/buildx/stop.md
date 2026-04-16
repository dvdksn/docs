---
title: docker buildx stop
description: Stop builder instance
sidebar:
  label: stop
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Stop builder instance</td></tr>
<tr><th>Usage</th><td><code>docker buildx stop [NAME]</code></td></tr>
</tbody></table>

## Description

Stops the specified or current builder. This does not prevent buildx build to
restart the builder. The implementation of stop depends on the driver.

## Examples

### Override the configured builder instance (--builder) {#builder}

Same as [`buildx --builder`](/reference/cli/docker/buildx/#builder).


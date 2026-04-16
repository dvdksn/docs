---
title: docker context use
description: Set the current docker context
sidebar:
  label: use
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Set the current docker context</td></tr>
<tr><th>Usage</th><td><code>docker context use CONTEXT</code></td></tr>
</tbody></table>

## Description

Set the default context to use, when `DOCKER_HOST`, `DOCKER_CONTEXT` environment
variables and `--host`, `--context` global options aren't set.
To disable usage of contexts, you can use the special `default` context.


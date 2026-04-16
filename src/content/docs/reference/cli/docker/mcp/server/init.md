---
title: docker mcp server init
description: Initialize a new MCP server project
sidebar:
  label: init
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Initialize a new MCP server project</td></tr>
<tr><th>Usage</th><td><code>docker mcp server init &lt;directory&gt;</code></td></tr>
</tbody></table>

## Description

Initialize a new MCP server project in the specified directory with boilerplate code, Dockerfile, and compose.yaml


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--language` | `go` | Programming language for the server (currently only 'go' is supported)  |
| `--template` | `basic` | Template to use (basic, chatgpt-app-basic) |


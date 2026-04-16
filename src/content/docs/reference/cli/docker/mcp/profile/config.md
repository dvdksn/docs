---
title: docker mcp profile config
description: Update the configuration of a profile
sidebar:
  label: config
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Update the configuration of a profile</td></tr>
<tr><th>Usage</th><td><code>docker mcp profile config &lt;profile-id&gt; [--set &lt;config-arg1&gt; &lt;config-arg2&gt; ...] [--get &lt;config-key1&gt; &lt;config-key2&gt; ...] [--del &lt;config-arg1&gt; &lt;config-arg2&gt; ...]</code></td></tr>
</tbody></table>

## Description

Update the configuration of a profile

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--del` |  | Delete configuration values: <key> (can be specified multiple times)  |
| `--format` | `human` | Supported: json, yaml, human. |
| `--get` |  | Get configuration values: <key> (can be specified multiple times) |
| `--get-all` |  | Get all configuration values |
| `--set` |  | Set configuration values: <key>=<value> (repeatable). Value may be JSON to set typed values (arrays, numbers, booleans, objects).  |


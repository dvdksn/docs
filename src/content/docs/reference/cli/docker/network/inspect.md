---
title: docker network inspect
description: Display detailed information on one or more networks
sidebar:
  label: inspect
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Display detailed information on one or more networks</td></tr>
<tr><th>Usage</th><td><code>docker network inspect [OPTIONS] NETWORK [NETWORK...]</code></td></tr>
</tbody></table>

## Description

Returns information about one or more networks. By default, this command renders
all results in a JSON object.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--format` |  | Format output using a custom template: 'json':             Print in JSON format 'TEMPLATE':         Print output using the given Go template. Refer to https://docs.docker.com/go/formatting/ for more information about formatting output with templates |
| `-v`, `--verbose` |  | Verbose output for diagnostics |


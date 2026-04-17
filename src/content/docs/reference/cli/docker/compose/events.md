---
title: docker compose events
description: Receive real time events from containers
sidebar:
  label: events
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Receive real time events from containers</td></tr>
<tr><th>Usage</th><td><code>docker compose events [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Stream container events for every container in the project.

With the `--json` flag, a json object is printed one per line with the format:

```json
{
    "time": "2015-11-20T18:01:03.615550",
    "type": "container",
    "action": "create",
    "id": "213cf7...5fc39a",
    "service": "web",
    "attributes": {
      "name": "application_web_1",
      "image": "alpine:edge"
    }
}
```

The events that can be received using this can be seen [here](/reference/cli/docker/system/events/#object-types).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--json` |  | Output events as a stream of json objects |
| `--since` |  | Show all events created since timestamp |
| `--until` |  | Stream events until this timestamp |


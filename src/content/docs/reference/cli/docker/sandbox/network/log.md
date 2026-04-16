---
title: docker sandbox network log
description: Show network logs
sidebar:
  label: log
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Show network logs</td></tr>
<tr><th>Usage</th><td><code>docker sandbox network log</code></td></tr>
</tbody></table>

## Description

Show network logs

## Options

| Option | Default | Description |
|--------|---------|-------------|
| [`--json`](#json) |  | Output in JSON format |
| [`--limit`](#limit) |  | Maximum number of log entries to show |
| [`-q`, `--quiet`](#quiet) |  | Only display log entries |

## Examples

### Show network logs

```console
$ docker sandbox network log
2026-01-29T10:15:23Z sandbox=my-sandbox request GET https://api.example.com/data allowed
2026-01-29T10:15:24Z sandbox=my-sandbox request POST https://api.example.com/submit allowed
2026-01-29T10:15:25Z sandbox=my-sandbox request GET https://blocked.example.com/ denied
```

### Show only log entries (--quiet) {#quiet}

```text
--quiet
```

Suppress headers and only show log entries:

```console
$ docker sandbox network log --quiet
2026-01-29T10:15:23Z sandbox=my-sandbox request GET https://api.example.com/data allowed
2026-01-29T10:15:24Z sandbox=my-sandbox request POST https://api.example.com/submit allowed
```

### Limit number of entries (--limit) {#limit}

```text
--limit N
```

Show only the last N log entries:

```console
$ docker sandbox network log --limit 10
```

### JSON output (--json) {#json}

Output logs in JSON format for parsing:

```console
$ docker sandbox network log --json
{
  "entries": [
    {
      "timestamp": "2026-01-29T10:15:23Z",
      "sandbox": "my-sandbox",
      "type": "request",
      "method": "GET",
      "url": "https://api.example.com/data",
      "action": "allowed"
    }
  ]
}
```


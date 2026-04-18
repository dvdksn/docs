---
title: sbx policy log
description: Show sandbox policy logs
sidebar:
  label: log
---

## Synopsis

```
sbx policy log [SANDBOX] [flags]
```

## Description

Show policy logs for all sandboxes, or filter by a specific sandbox name.

Displays which hosts were allowed or blocked by the proxy, along with the
matching rule, proxy type, and request count. Useful for debugging connectivity
issues or auditing network activity.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--json` |  | Output in JSON format |
| `--limit` | `0` | Maximum number of log entries to show |
| `-q`, `--quiet` |  | Only display log entries |
| `--type` | `all` | Filter logs by type: "all" or "network" (default "all") |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Show all policy logs
sbx policy log

# Show logs for a specific sandbox
sbx policy log my-sandbox

# Output in JSON format
sbx policy log --json

# Show the last 20 entries
sbx policy log --limit 20
```


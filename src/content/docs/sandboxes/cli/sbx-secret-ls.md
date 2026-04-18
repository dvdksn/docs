---
title: sbx secret ls
description: List stored secrets
sidebar:
  label: ls
---

## Synopsis

```
sbx secret ls [sandbox] [OPTIONS] [flags]
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-g`, `--global` |  | Only list global secrets |
| `--service` |  | Filter by secret service name |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# List all secrets
sbx secret ls

# List only global secrets
sbx secret ls -g

# List secrets for a specific sandbox
sbx secret ls my-sandbox

# Filter by service
sbx secret ls --service github
```


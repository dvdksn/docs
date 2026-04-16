---
title: sbx policy reset
description: Reset policies to defaults
sidebar:
  label: reset
---

## Synopsis

```
sbx policy reset [flags]
```

## Description

Remove all custom policies and restart the daemon to restore defaults.

This deletes the local policy store and stops the daemon. When the daemon
restarts (automatically on next command), the default policy is installed.

If sandboxes are currently running, they will be stopped when the daemon
shuts down. You will be prompted for confirmation unless --force is used.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Skip confirmation prompt |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Reset policies (prompts if sandboxes are running)
sbx policy reset

# Reset policies without confirmation
sbx policy reset --force
```


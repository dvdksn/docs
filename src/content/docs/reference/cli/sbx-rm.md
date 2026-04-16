---
title: sbx rm
description: Remove one or more sandboxes
sidebar:
  label: rm
---

## Synopsis

```
sbx rm [SANDBOX...] [flags]
```

## Description

Remove one or more sandboxes and all associated resources.

Stops running sandboxes, removes their containers, cleans up any Git
worktrees, and deletes sandbox state. This action cannot be undone.

Use --all to remove every sandbox (requires confirmation).
Use --force to skip confirmation prompts (for non-interactive scripts).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--all` |  | Remove all sandboxes |
| `-f`, `--force` |  | Skip confirmation prompts |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


---
title: sbx policy ls
description: List sandbox policies
sidebar:
  label: ls
---

## Synopsis

```
sbx policy ls [flags]
```

## Description

List all active policies.

Displays the policy name (or ID if no name is set), type, decision
(allow/deny), and the associated resources for each rule.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--type` | `all` | Filter policies by type: "all" or "network" (default "all") |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# List all policies
sbx policy ls

# List only network policies
sbx policy ls --type network
```


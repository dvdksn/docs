---
title: sbx policy allow
description: Add an allow policy for sandboxes
sidebar:
  label: allow
---

## Synopsis

```
sbx policy allow COMMAND
```

## Description

Add a policy that permits sandboxes to access specified resources.

Allowed resources are accessible to all sandboxes. If a resource matches both
an allow and a deny rule, the deny rule takes precedence.

## Commands

| Command | Description |
|---------|-------------|
| [`sbx policy allow network`](/sandboxes/cli/sbx-policy-allow-network/) | Allow network access to specified hosts |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


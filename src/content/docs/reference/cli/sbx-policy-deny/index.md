---
title: sbx policy deny
description: Add a deny policy for sandboxes
sidebar:
  label: deny
---

## Synopsis

```
sbx policy deny COMMAND
```

## Description

Add a policy that blocks sandboxes from accessing specified resources.

Deny rules always take precedence over allow rules. If a resource matches
both an allow and a deny rule, the request is blocked.

## Commands

| Command | Description |
|---------|-------------|
| [`sbx policy deny network`](/reference/cli/sbx-policy-deny-network/) | Deny network access to specified hosts |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


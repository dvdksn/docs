---
title: sbx policy
description: Manage sandbox policies
sidebar:
  label: policy
---

## Synopsis

```
sbx policy COMMAND
```

## Description

Manage persistent access policies for sandboxes.

Policies are rules stored locally that control what sandboxes can access.
They apply globally across all sandboxes and persist across restarts.
Use subcommands to allow, deny, list, or remove policies.

## Commands

| Command | Description |
|---------|-------------|
| [`sbx policy allow`](/reference/cli/sbx-policy-allow/) | Add an allow policy for sandboxes |
| [`sbx policy deny`](/reference/cli/sbx-policy-deny/) | Add a deny policy for sandboxes |
| [`sbx policy log`](/reference/cli/sbx-policy-log/) | Show sandbox policy logs |
| [`sbx policy ls`](/reference/cli/sbx-policy-ls/) | List sandbox policies |
| [`sbx policy reset`](/reference/cli/sbx-policy-reset/) | Reset policies to defaults |
| [`sbx policy rm`](/reference/cli/sbx-policy-rm/) | Remove a policy |
| [`sbx policy set-default`](/reference/cli/sbx-policy-set-default/) | Set the default network policy |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


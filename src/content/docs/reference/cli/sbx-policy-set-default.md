---
title: sbx policy set-default
description: Set the default network policy
sidebar:
  label: set-default
---

## Synopsis

```
sbx policy set-default <allow-all|balanced|deny-all> [flags]
```

## Description

Set the default network policy for all sandboxes.

This must be run before adding custom allow/deny rules or starting a sandbox
for the first time. The default policy determines the baseline network access.

Available policies:
  allow-all   All outbound network traffic is allowed
  balanced    Common dev traffic allowed (AI services, package registries, etc.)
  deny-all    All outbound network traffic is blocked

After setting defaults, use "sbx policy allow/deny" to add custom rules.
Use "sbx policy reset" to clear all policies and start over.

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Set balanced defaults (recommended)
sbx policy set-default balanced

# Allow all traffic
sbx policy set-default allow-all

# Block everything, then allow specific sites
sbx policy set-default deny-all
sbx policy allow network api.example.com:443
```


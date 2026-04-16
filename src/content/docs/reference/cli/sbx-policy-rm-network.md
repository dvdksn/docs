---
title: sbx policy rm network
description: Remove a network policy
sidebar:
  label: network
---

## Synopsis

```
sbx policy rm network [flags]
```

## Description

Remove a network policy by rule ID, resource, or both.

Use "sbx policy ls" to see active policies and their IDs/resources.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--id` |  | Remove by rule ID |
| `--resource` |  | Remove by resource value(s), comma-separated |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Remove a rule by resource
sbx policy rm network --resource api.example.com

# Remove a rule by ID
sbx policy rm network --id 2d3c1f0e-4a73-4e05-bc9d-f2f9a4b50d67

# Remove by ID and resource using one filter
sbx policy rm network --id 2d3c1f0e-4a73-4e05-bc9d-f2f9a4b50d67 --resource "api.example.com,cdn.example.com"
```


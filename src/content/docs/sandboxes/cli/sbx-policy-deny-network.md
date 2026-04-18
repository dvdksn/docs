---
title: sbx policy deny network
description: Deny network access to specified hosts
sidebar:
  label: network
---

## Synopsis

```
sbx policy deny network RESOURCES [flags]
```

## Description

Block sandbox network access to the specified hosts.

RESOURCES is a comma-separated list of hostnames, domains, or IP addresses.
Deny rules always take precedence over allow rules.

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Block access to a host
sbx policy deny network ads.example.com

# Block all outbound traffic
sbx policy deny network "**"
```


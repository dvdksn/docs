---
title: sbx policy allow network
description: Allow network access to specified hosts
sidebar:
  label: network
---

## Synopsis

```
sbx policy allow network RESOURCES [flags]
```

## Description

Allow sandbox network access to the specified hosts.

RESOURCES is a comma-separated list of hostnames, domains, or IP addresses.
Supports exact domains (example.com), wildcard subdomains (*.example.com),
and optional port suffixes (example.com:443). Use "**" to allow all hosts.

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Allow access to a single host
sbx policy allow network api.example.com

# Allow access to multiple hosts
sbx policy allow network "api.example.com,cdn.example.com"

# Allow all subdomains of a host
sbx policy allow network "*.npmjs.org"

# Allow all outbound traffic
sbx policy allow network "**"
```


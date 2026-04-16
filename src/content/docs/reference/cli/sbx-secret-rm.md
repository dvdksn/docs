---
title: sbx secret rm
description: Remove a secret
sidebar:
  label: rm
---

## Synopsis

```
sbx secret rm [-g | sandbox] [service] [flags]
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Delete without confirmation prompt |
| `-g`, `--global` |  | Use global secret scope |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Remove a global secret
sbx secret rm -g github

# Remove a sandbox-scoped secret
sbx secret rm my-sandbox openai

# Remove without confirmation prompt
sbx secret rm -g github -f

# Remove OpenAI or Anthropic credential(s) from global scope (OAuth and/or API key)
sbx secret rm -g openai
sbx secret rm -g anthropic
```


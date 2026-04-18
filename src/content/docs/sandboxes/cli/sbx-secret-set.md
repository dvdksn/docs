---
title: sbx secret set
description: Create or update a secret
sidebar:
  label: set
---

## Synopsis

```
sbx secret set [-g | sandbox] [service] [flags]
```

## Description

Create or update a secret for a service.

Available services: anthropic, aws, github, google, groq, mistral, nebius, openai, xai

When no arguments are provided, an interactive prompt guides you through
scope and service selection.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  | Overwrite an existing secret when --token is used |
| `-g`, `--global` |  | Use global secret scope |
| `--oauth` |  | Start OAuth flow and store OAuth tokens (openai/global only) |
| `-t`, `--token` |  | Secret value (less secure: visible in shell history) |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |

## Examples

```bash
# Store a GitHub token globally (available to all sandboxes)
sbx secret set -g github

# Store an OpenAI key for a specific sandbox
sbx secret set my-sandbox openai

# Non-interactive via stdin (e.g., from a secret manager or env var)
echo "$ANTHROPIC_API_KEY" | sbx secret set -g anthropic

# Start OpenAI OAuth flow and store global OAuth tokens
sbx secret set -g openai --oauth
```


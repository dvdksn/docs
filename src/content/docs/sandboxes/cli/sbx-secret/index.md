---
title: sbx secret
description: Manage stored secrets
sidebar:
  label: secret
---

## Description

Manage stored secrets for sandbox environments.

Secrets are stored per service name (e.g., "github", "anthropic", "openai").
When a sandbox starts, the proxy uses stored secrets to authenticate API
requests on behalf of the agent. The secret is never exposed directly to the
agent.

Secrets can be scoped globally (shared across all sandboxes) or to a
specific sandbox.

## Commands

| Command | Description |
|---------|-------------|
| [`sbx secret ls`](/sandboxes/cli/sbx-secret-ls/) | List stored secrets |
| [`sbx secret rm`](/sandboxes/cli/sbx-secret-rm/) | Remove a secret |
| [`sbx secret set`](/sandboxes/cli/sbx-secret-set/) | Create or update a secret |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


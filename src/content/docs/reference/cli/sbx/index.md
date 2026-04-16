---
title: sbx
description: Manage AI coding agent sandboxes.
sidebar:
  label: sbx
---

## Synopsis

```
sbx
```

## Description

Docker Sandboxes creates isolated sandbox environments for AI agents, powered by Docker.

Run without a command to launch interactive mode, or pass a command for CLI usage.

## Commands

| Command | Description |
|---------|-------------|
| [`sbx completion`](/reference/cli/sbx-completion/) | Generate the autocompletion script for the specified shell |
| [`sbx create`](/reference/cli/sbx-create/) | Create a sandbox for an agent |
| [`sbx exec`](/reference/cli/sbx-exec/) | Execute a command inside a sandbox |
| [`sbx login`](/reference/cli/sbx-login/) | Sign in to Docker |
| [`sbx logout`](/reference/cli/sbx-logout/) | Sign out of Docker |
| [`sbx ls`](/reference/cli/sbx-ls/) | List sandboxes |
| [`sbx policy`](/reference/cli/sbx-policy/) | Manage sandbox policies |
| [`sbx ports`](/reference/cli/sbx-ports/) | Manage sandbox port publishing |
| [`sbx reset`](/reference/cli/sbx-reset/) | Reset all sandboxes and clean up state |
| [`sbx rm`](/reference/cli/sbx-rm/) | Remove one or more sandboxes |
| [`sbx run`](/reference/cli/sbx-run/) | Run an agent in a sandbox |
| [`sbx save`](/reference/cli/sbx-save/) | Save a snapshot of the sandbox as a template |
| [`sbx secret`](/reference/cli/sbx-secret/) | Manage stored secrets |
| [`sbx stop`](/reference/cli/sbx-stop/) | Stop one or more sandboxes without removing them |
| [`sbx version`](/reference/cli/sbx-version/) | Show Docker Sandboxes version information |

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


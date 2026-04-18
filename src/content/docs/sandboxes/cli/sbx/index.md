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
| [`sbx completion`](/sandboxes/cli/sbx-completion/) | Generate the autocompletion script for the specified shell |
| [`sbx create`](/sandboxes/cli/sbx-create/) | Create a sandbox for an agent |
| [`sbx exec`](/sandboxes/cli/sbx-exec/) | Execute a command inside a sandbox |
| [`sbx login`](/sandboxes/cli/sbx-login/) | Sign in to Docker |
| [`sbx logout`](/sandboxes/cli/sbx-logout/) | Sign out of Docker |
| [`sbx ls`](/sandboxes/cli/sbx-ls/) | List sandboxes |
| [`sbx policy`](/sandboxes/cli/sbx-policy/) | Manage sandbox policies |
| [`sbx ports`](/sandboxes/cli/sbx-ports/) | Manage sandbox port publishing |
| [`sbx reset`](/sandboxes/cli/sbx-reset/) | Reset all sandboxes and clean up state |
| [`sbx rm`](/sandboxes/cli/sbx-rm/) | Remove one or more sandboxes |
| [`sbx run`](/sandboxes/cli/sbx-run/) | Run an agent in a sandbox |
| [`sbx save`](/sandboxes/cli/sbx-save/) | Save a snapshot of the sandbox as a template |
| [`sbx secret`](/sandboxes/cli/sbx-secret/) | Manage stored secrets |
| [`sbx stop`](/sandboxes/cli/sbx-stop/) | Stop one or more sandboxes without removing them |
| [`sbx version`](/sandboxes/cli/sbx-version/) | Show Docker Sandboxes version information |

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


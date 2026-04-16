---
title: sbx completion fish
description: Generate the autocompletion script for fish
sidebar:
  label: fish
---

## Synopsis

```
sbx completion fish [flags]
```

## Description

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

	sbx completion fish | source

To load completions for every new session, execute once:

	sbx completion fish > ~/.config/fish/completions/sbx.fish

You will need to start a new shell for this setup to take effect.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--no-descriptions` |  | disable completion descriptions |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


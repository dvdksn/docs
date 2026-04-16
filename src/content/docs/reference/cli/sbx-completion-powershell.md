---
title: sbx completion powershell
description: Generate the autocompletion script for powershell
sidebar:
  label: powershell
---

## Synopsis

```
sbx completion powershell [flags]
```

## Description

Generate the autocompletion script for powershell.

To load completions in your current shell session:

	sbx completion powershell | Out-String | Invoke-Expression

To load completions for every new session, add the output of the above command
to your powershell profile.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--no-descriptions` |  | disable completion descriptions |

## Global Options

| Option | Default | Description |
|--------|---------|-------------|
| `-D`, `--debug` |  | Enable debug logging |


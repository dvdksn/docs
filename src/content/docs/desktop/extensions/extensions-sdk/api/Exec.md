---
title: "Interface: Exec"
description: Docker extension API reference
keywords: Docker, extensions, sdk, API, reference
---

## Callable

### Exec

▸ **Exec**(`cmd`, `args`, `options?`): `Promise`<[`ExecResult`](ExecResult/)\>

Executes a command.

**`Since`**

0.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `options?` | [`ExecOptions`](ExecOptions/) | The list of options. |

#### Returns

`Promise`<[`ExecResult`](ExecResult/)\>

A promise that will resolve once the command finishes.

### Exec

▸ **Exec**(`cmd`, `args`, `options`): [`ExecProcess`](ExecProcess/)

Streams the result of a command if `stream` is specified in the `options` parameter.

Specify the `stream` if the output of your command is too long or if you need to stream things indefinitely (for example container logs).

**`Since`**

0.2.2

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `options` | [`SpawnOptions`](SpawnOptions/) | The list of options. |

#### Returns

[`ExecProcess`](ExecProcess/)

The spawned process.

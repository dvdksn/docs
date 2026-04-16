---
title: "Interface: ExecResult"
description: Docker extension API reference
keywords: Docker, extensions, sdk, API, reference
---

**`Since`**

0.2.0

## Hierarchy

- [`RawExecResult`](RawExecResult/)

  ↳ **`ExecResult`**

## Methods

### lines

▸ **lines**(): `string`[]

Split output lines.

#### Returns

`string`[]

The list of lines.

___

### parseJsonLines

▸ **parseJsonLines**(): `any`[]

Parse each output line as a JSON object.

#### Returns

`any`[]

The list of lines where each line is a JSON object.

___

### parseJsonObject

▸ **parseJsonObject**(): `any`

Parse a well-formed JSON output.

#### Returns

`any`

The JSON object.

## Properties

### cmd

• `Optional` `Readonly` **cmd**: `string`

#### Inherited from

[RawExecResult](RawExecResult/).[cmd](RawExecResult/#cmd)

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

[RawExecResult](RawExecResult/).[killed](RawExecResult/#killed)

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

[RawExecResult](RawExecResult/).[signal](RawExecResult/#signal)

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

[RawExecResult](RawExecResult/).[code](RawExecResult/#code)

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

[RawExecResult](RawExecResult/).[stdout](RawExecResult/#stdout)

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

[RawExecResult](RawExecResult/).[stderr](RawExecResult/#stderr)

---
title: docker mcp secret set
description: Set a secret in the local OS Keychain
sidebar:
  label: set
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Set a secret in the local OS Keychain</td></tr>
<tr><th>Usage</th><td><code>docker mcp secret set key[=value]</code></td></tr>
</tbody></table>

## Description

Set a secret in the local OS Keychain

## Examples

### Pass the secret via STDIN

```console
echo my-secret-password > pwd.txt
cat pwd.txt | docker mcp secret set postgres_password
```


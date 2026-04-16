---
title: docker pass
description: Manage your local OS keychain secrets.
sidebar:
  label: pass
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Manage your local OS keychain secrets.</td></tr>
<tr><th>Usage</th><td><code>docker pass set|get|ls|rm</code></td></tr>
</tbody></table>

> [!CAUTION]
> **This command is experimental.**
> Experimental features are intended for testing and feedback.

## Description

Docker Pass is a helper that allows you to store secrets securely in your
local OS keychain and inject them into containers later.

On Windows: Uses the Windows Credential Manager API.

On macOS: Uses macOS Keychain services API.

On Linux: `org.freedesktop.secrets` API (requires DBus and `gnome-keyring` or
`kdewallet` to be installed).

## Subcommands

| Command | Description |
|---------|-------------|
| [`docker pass set`](/reference/cli/docker/pass/set/) | Set a secret |
| [`docker pass get`](/reference/cli/docker/pass/get/) | Get a secret |
| [`docker pass ls`](/reference/cli/docker/pass/ls/) | List secrets |
| [`docker pass rm`](/reference/cli/docker/pass/rm/) | Remove a secret |

## Examples

### Using keychain secrets in containers

Create a secret:

```console
$ docker pass set GH_TOKEN=123456789
```

Creating a secret from STDIN:

```console
echo 123456789 > token.txt
cat token.txt | docker pass set GH_TOKEN
```

Run a container that uses the secret:

```console
$ docker run -e GH_TOKEN= -dt --name demo busybox
```

Inspect your secret from inside the container

```console
$ docker exec demo sh -c 'echo $GH_TOKEN'
123456789
```

Explicitly assigning a secret to another environment variable:

```console
$ docker run -e GITHUB_TOKEN=se://GH_TOKEN -dt --name demo busybox
```


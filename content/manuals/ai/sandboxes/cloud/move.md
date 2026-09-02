---
title: Move a sandbox
description: Transfer a Docker Sandbox filesystem between local and cloud environments and understand which state, files, policies, and secrets remain behind.
keywords: docker sandboxes, sbx move, cloud sandbox, local sandbox, migrate sandbox
weight: 50
---

The `sbx move` command transfers a filesystem snapshot between a local sandbox
and a cloud sandbox. Use it to continue from the captured filesystem in the
other environment, not as a live migration of the running sandbox.

## Transfer behavior

A move performs the following operations:

1. Captures the source sandbox filesystem as a template image
2. Transfers the image across the local and cloud boundary
3. Creates a destination sandbox from the image

The destination gets a different sandbox ID. The source isn't deleted, so the
two sandboxes have independent state after the transfer. Remove the source
separately after you verify the destination.

> [!IMPORTANT]
>
> Managed secrets don't transfer. Credentials written inside a sandbox by an
> agent's interactive sign-in are ordinary filesystem files and are included
> in the snapshot. Remove in-sandbox credentials before moving a sandbox.

Moving transfers filesystem data stored in the sandbox container. It doesn't
transfer:

- Running processes, memory, or open sockets
- Local workspace mounts, bind mounts, or clone-mode volumes
- Managed secrets from either secret store
- Other resources attached outside the sandbox filesystem

Changes made to either sandbox after the move aren't synchronized.

## Move from local to cloud

Move a local sandbox to the cloud:

```console
$ sbx move local-project --to cloud
```

The `move` command spans both backends, so don't add the global `--cloud` flag.
Use `--name` to set the destination name:

```console
$ sbx move local-project --to cloud --name cloud-project
```

Local workspace files are mounted outside the sandbox filesystem and don't
appear in the cloud destination. When the source has a workspace, the CLI
warns and asks for confirmation. The `--force` flag skips the prompt but
doesn't include those files.

The destination receives the applicable allow and deny network rules from the
local source. Secrets don't follow the network policy.

## Move from cloud to local

Move a cloud sandbox to the local runtime by ID or name:

```console
$ sbx move cloud-project --to local --name local-copy
```

The local destination starts with the host's default network policy. Cloud
network rules aren't copied back to the local runtime.

This direction requires a machine that meets the local sandbox requirements
because the command imports the snapshot and creates a local sandbox. The
cloud source remains available unless you remove it with `sbx --cloud rm`.

## Verify the result

List both backends after the move:

```console
$ sbx ls
$ sbx --cloud ls
```

Inspect the destination filesystem and reconfigure its secrets, ports,
volumes, and any other environment-specific resources before removing the
source.

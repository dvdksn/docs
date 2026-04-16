---
title: docker container export
description: Export a container's filesystem as a tar archive
sidebar:
  label: export
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Export a container's filesystem as a tar archive</td></tr>
<tr><th>Usage</th><td><code>docker container export [OPTIONS] CONTAINER</code></td></tr>
<tr><th>Aliases</th><td><code>docker export</code></td></tr>
</tbody></table>

## Description

The `docker export` command doesn't export the contents of volumes associated
with the container. If a volume is mounted on top of an existing directory in
the container, `docker export` exports the contents of the underlying
directory, not the contents of the volume.

Refer to [Backup, restore, or migrate data volumes](/engine/storage/volumes/#back-up-restore-or-migrate-data-volumes)
in the user guide for examples on exporting data in a volume.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o`, `--output` |  | Write to a file, instead of STDOUT |

## Examples

The following commands produce the same result.

```console
$ docker export red_panda > latest.tar
```

```console
$ docker export --output="latest.tar" red_panda
```


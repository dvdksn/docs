---
title: docker context export
description: Export a context to a tar archive FILE or a tar stream on STDOUT.
sidebar:
  label: export
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Export a context to a tar archive FILE or a tar stream on STDOUT.</td></tr>
<tr><th>Usage</th><td><code>docker context export [OPTIONS] CONTEXT [FILE|-]</code></td></tr>
</tbody></table>

## Description

Exports a context to a file that can then be used with `docker context import`.

The default output filename is `<CONTEXT>.dockercontext`. To export to `STDOUT`,
use `-` as filename, for example:

```console
$ docker context export my-context -
```


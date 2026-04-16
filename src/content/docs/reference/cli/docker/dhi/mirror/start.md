---
title: docker dhi mirror start
description: Start mirroring Docker Hardened Images
sidebar:
  label: start
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Start mirroring Docker Hardened Images</td></tr>
<tr><th>Usage</th><td><code>docker dhi mirror start</code></td></tr>
</tbody></table>

## Description

Start mirroring one or more Docker Hardened Images to your organization's registry.

Repository mappings are specified using the -r flag. The following formats are supported:

  source                  Only the source repository; destination is auto-generated as
                          <org>/dhi-<source-name>
  source,destination      Source and destination; namespaces are filled from config if omitted
  ns/source,ns/dest       Fully qualified source and destination

The source namespace defaults to "dhi" when not specified.
The destination namespace defaults to the configured organization (--org or config).

Examples:
  # These are all equivalent (assuming --org myorg):
  docker dhi mirror start --org myorg -r dhi/golang,myorg/dhi-golang
  docker dhi mirror start --org myorg -r golang,dhi-golang
  docker dhi mirror start --org myorg -r golang

  # Mirror multiple repositories
  docker dhi mirror start --org myorg -r golang -r python

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--dependencies` |  | Mirrors any existing dependencies |
| `--json` |  | Output in JSON format |
| `-r`, `--repo` |  | Repository mapping in format source,destination (can be specified multiple times)  |


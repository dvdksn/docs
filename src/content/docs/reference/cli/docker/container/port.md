---
title: docker container port
description: List port mappings or a specific mapping for the container
sidebar:
  label: port
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>List port mappings or a specific mapping for the container</td></tr>
<tr><th>Usage</th><td><code>docker container port CONTAINER [PRIVATE_PORT[/PROTO]]</code></td></tr>
<tr><th>Aliases</th><td><code>docker port</code></td></tr>
</tbody></table>

## Description

List port mappings or a specific mapping for the container

## Examples

### Show all mapped ports

You can find out all the ports mapped by not specifying a `PRIVATE_PORT`, or
just a specific mapping:

```console
$ docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                                            NAMES
b650456536c7        busybox:latest      top                 54 minutes ago      Up 54 minutes       0.0.0.0:1234->9876/tcp, 0.0.0.0:4321->7890/tcp   test

$ docker port test

7890/tcp -> 0.0.0.0:4321
9876/tcp -> 0.0.0.0:1234

$ docker port test 7890/tcp

0.0.0.0:4321

$ docker port test 7890/udp

2014/06/24 11:53:36 Error: No public port '7890/udp' published for test

$ docker port test 7890

0.0.0.0:4321
```


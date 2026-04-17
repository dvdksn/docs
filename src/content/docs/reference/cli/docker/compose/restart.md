---
title: docker compose restart
description: Restart service containers
sidebar:
  label: restart
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Restart service containers</td></tr>
<tr><th>Usage</th><td><code>docker compose restart [OPTIONS] [SERVICE...]</code></td></tr>
</tbody></table>

## Description

Restarts all stopped and running services, or the specified services only.

If you make changes to your `compose.yml` configuration, these changes are not reflected
after running this command. For example, changes to environment variables (which are added
after a container is built, but before the container's command is executed) are not updated
after restarting.

If you are looking to configure a service's restart policy, refer to
[restart](https://github.com/compose-spec/compose-spec/blob/main/spec.md#restart)
or [restart_policy](https://github.com/compose-spec/compose-spec/blob/main/deploy.md#restart_policy).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--no-deps` |  | Don't restart dependent services |
| `-t`, `--timeout` |  | Specify a shutdown timeout in seconds |


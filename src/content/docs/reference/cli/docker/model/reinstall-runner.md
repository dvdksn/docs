---
title: docker model reinstall-runner
description: Reinstall Docker Model Runner (Docker Engine only)
sidebar:
  label: reinstall-runner
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Reinstall Docker Model Runner (Docker Engine only)</td></tr>
<tr><th>Usage</th><td><code>docker model reinstall-runner</code></td></tr>
</tbody></table>

## Description

This command removes the existing Docker Model Runner container and reinstalls it with the specified configuration. Models and images are preserved during reinstallation.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--backend` |  | Specify backend (llama.cpp|vllm|diffusers). Default: llama.cpp |
| `--debug` |  | Enable debug logging |
| `--do-not-track` |  | Do not track models usage in Docker Model Runner |
| `--gpu` | `auto` | Specify GPU support (none|auto|cuda|rocm|musa|cann) |
| `--host` | `127.0.0.1` | Host address to bind Docker Model Runner |
| `--port` |  | Docker container port for Docker Model Runner (default: 12434 for Docker Engine, 12435 for Cloud mode)  |
| `--proxy-cert` |  | Path to a CA certificate file for proxy SSL inspection |
| `--tls` |  | Enable TLS/HTTPS for Docker Model Runner API |
| `--tls-cert` |  | Path to TLS certificate file (auto-generated if not provided) |
| `--tls-key` |  | Path to TLS private key file (auto-generated if not provided) |
| `--tls-port` |  | TLS port for Docker Model Runner (default: 12444 for Docker Engine, 12445 for Cloud mode)  |


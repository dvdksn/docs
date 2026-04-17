---
title: docker model package
description: Package a model into a Docker Model OCI artifact
sidebar:
  label: package
---

<table class="cli-meta">
<tbody>
<tr><th>Description</th><td>Package a model into a Docker Model OCI artifact</td></tr>
<tr><th>Usage</th><td><code>docker model package (--gguf &lt;path&gt; | --safetensors-dir &lt;path&gt; | --dduf &lt;path&gt; | --from &lt;model&gt;) [--license &lt;path&gt;...] [--mmproj &lt;path&gt;] [--context-size &lt;tokens&gt;] [--push] MODEL</code></td></tr>
</tbody></table>

## Description

Package a model into a Docker Model OCI artifact.

The model source must be one of:
  --gguf               A GGUF file (single file or first shard of a sharded model)
  --safetensors-dir    A directory containing .safetensors and configuration files
  --dduf               A .dduf (Diffusers Unified Format) archive
  --from               An existing packaged model reference

By default, the packaged artifact is loaded into the local Model Runner content store.
Use --push to publish the model to a registry instead.

MODEL specifies the target model reference (for example: myorg/llama3:8b).
When using --push, MODEL must be a registry-qualified reference.

Packaging behavior:

  GGUF
    --gguf must point to a .gguf file.
    For sharded models, point to the first shard. All shards must:
      • reside in the same directory
      • follow an indexed naming convention (e.g. model-00001-of-00015.gguf)
    All shards are automatically discovered and packaged together.

  Safetensors
    --safetensors-dir must point to a directory containing .safetensors files
    and required configuration files (e.g. model config, tokenizer files).
    All files under the directory (including nested subdirectories) are
    automatically discovered. Each file is packaged as a separate OCI layer.

  DDUF
    --dduf must point to a .dduf archive file.

  Repackaging
    --from repackages an existing model. You may override selected properties
    such as --context-size to create a variant of the original model.

  Multimodal models
    Use --mmproj to include a multimodal projector file.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--chat-template` |  | absolute path to chat template file (must be Jinja format) |
| `--context-size` |  | context size in tokens |
| `--dduf` |  | absolute path to DDUF archive file (Diffusers Unified Format) |
| `--from` |  | reference to an existing model to repackage |
| `--gguf` |  | absolute path to gguf file |
| `-l`, `--license` |  | absolute path to a license file |
| `--mmproj` |  | absolute path to multimodal projector file |
| `--push` |  | push to registry (if not set, the model is loaded into the Model Runner content store)  |
| `--safetensors-dir` |  | absolute path to directory containing safetensors files and config |


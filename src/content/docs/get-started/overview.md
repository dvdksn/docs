---
title: Docker overview
description: What Docker is, how it works, and why developers use containers to build, ship, and run applications.
keywords: docker, overview, containers, images, registry, architecture, what is docker
sidebar:
  label: Overview
  order: 1
---

Docker is an open platform for building, shipping, and running applications in
containers. Containers let you package an application with everything it needs —
code, runtime, libraries, configuration — so it runs reliably in any
environment.

## Why Docker?

Without Docker, setting up a development environment means installing the right
language runtimes, databases, and tools — and hoping the versions match what's
in production. Containers solve this problem:

- **Consistency.** The same container runs on your laptop, in CI, and in
  production. No more "works on my machine."
- **Isolation.** Each container is its own environment. Run different versions of
  Python, Node, or Postgres side by side without conflicts.
- **Speed.** Containers start in seconds, not minutes. They share the host
  kernel, so they're far lighter than virtual machines.
- **Portability.** A container image built on macOS runs the same way on Linux
  servers and cloud platforms.

## Key concepts

### Images

An **image** is a read-only template that defines what goes inside a container.
Think of it as a snapshot: it includes your application code, runtime, system
tools, and settings. Images are built from a **Dockerfile** — a text file with
step-by-step instructions.

Images are made of **layers**. Each instruction in a Dockerfile creates a layer.
When you change one instruction and rebuild, only the affected layers are
rebuilt, making builds fast.

### Containers

A **container** is a running instance of an image. You can start, stop, move,
and delete containers independently. Each container is isolated from the others
and from the host, with its own filesystem, network, and process tree.

Containers are **ephemeral** by default: when a container is removed, any
changes inside it are lost. To persist data, you use **volumes**.

### Registries

A **registry** is a service that stores and distributes images. [Docker
Hub](https://hub.docker.com) is the default public registry. When you run
`docker pull nginx`, Docker downloads the image from Docker Hub. When you run
`docker push`, it uploads your image so others can use it.

You can also use private registries for images you don't want to share publicly.

### Docker Compose

Most applications need more than one container — a web server, a database,
maybe a cache. **Docker Compose** lets you define a multi-container application
in a single YAML file and start everything with one command:

```console
$ docker compose up
```

Compose handles container creation, networking between services, and volume
mounting. You define the desired state in `compose.yaml` and Compose makes it
happen.

## Architecture

Docker uses a client-server architecture:

- **Docker daemon** (`dockerd`) manages containers, images, networks, and
  volumes on your machine.
- **Docker CLI** (`docker`) is the command-line tool you use to interact with the
  daemon.
- **Docker Desktop** bundles the daemon, CLI, Compose, and Kubernetes into a
  single application for macOS, Windows, and Linux.

When you run `docker run`, the CLI sends a request to the daemon, which pulls
the image (if needed), creates a container, and starts it.

## Next step

Ready to try it? [Install Docker](/get-started/install/) and run your first
container.

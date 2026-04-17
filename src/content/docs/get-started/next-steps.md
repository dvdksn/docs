---
title: Next steps
description: Where to go after completing the Docker getting started guide — language guides, optimization, and production patterns.
keywords: docker, next steps, guides, optimization, production, learning path
sidebar:
  label: Next steps
  order: 4
---

You've covered the Docker fundamentals: images, containers, volumes, Compose,
and publishing. Here's where to go next, depending on what you're building.

## Language-specific guides

Follow a step-by-step guide for your language. Each guide covers
containerization, local development, testing, and CI/CD.

- [Node.js](/guides/nodejs/)
- [Python](/guides/python/)
- [Go](/guides/golang/)
- [Java](/guides/java/)
- [C#/.NET](/guides/dotnet/)
- [Rust](/guides/rust/)
- [PHP](/guides/php/)
- [Ruby](/guides/ruby/)
- [C++](/guides/cpp/)

See [all guides](/guides/) for more languages and frameworks.

## Optimize your builds

The Dockerfile from the tutorial works, but there's room to improve:

- **Build cache.** Order Dockerfile instructions so that dependency installation
  is cached separately from code changes. Copy `package.json` before the rest of
  the source code to avoid reinstalling dependencies on every build. See [Build
  cache](/build/cache/).

- **Multi-stage builds.** Use one stage to compile your application and a
  separate, smaller stage for the runtime image. This reduces image size and
  removes build tools from production. See [Multi-stage
  builds](/build/building/multi-stage/).

- **Image layers.** Understand how layers work to minimize image size and build
  time. See [Layers](/build/concepts/overview/).

## Production patterns

- **Docker Compose in production.** Learn how to use Compose for deployments
  with [Compose in production](/compose/how-tos/production/).
- **Docker Scout.** Scan your images for vulnerabilities and get remediation
  advice. See [Docker Scout quickstart](/scout/quickstart/).
- **Docker Build Cloud.** Speed up builds with cloud-based builders. See
  [Docker Build Cloud](/build-cloud/).

## Explore the platform

- [Docker Desktop](/desktop/) — GUI for managing containers, images, and
  volumes.
- [Docker Hub](/hub/) — Find and share container images.
- [Docker Engine](/engine/) — The container runtime and API.

## Get help

- [Docker community forums](https://forums.docker.com/)
- [Docker Community Slack](https://dockr.ly/comm-slack)
- [Stack Overflow — docker tag](https://stackoverflow.com/tags/docker)

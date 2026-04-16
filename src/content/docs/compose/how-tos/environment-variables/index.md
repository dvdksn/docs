---
title: Environment variables in Compose
description: Explains how to set, use, and manage environment variables in Docker Compose.
keywords: compose, orchestration, environment, env file
sidebar:
  label: Use environment variables
  order: 40
---

Environment variables and interpolation in Docker Compose help you create reusable, flexible configurations. This makes Dockerized applications easier to manage and deploy across environments.

> [!TIP]
>
> Before using environment variables, read through all of the information first to get a full picture of environment variables in Docker Compose.

This section covers:

- [How to set environment variables within your container's environment](set-environment-variables/).
- [How environment variable precedence works within your container's environment](envvars-precedence/).
- [Pre-defined environment variables](envvars/).

It also covers: 
- How [interpolation](variable-interpolation/) can be used to set variables within your Compose file and how it relates to a container's environment.
- Some [best practices](best-practices/).

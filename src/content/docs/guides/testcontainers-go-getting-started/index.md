---
title: Getting started with Testcontainers for Go
description: Learn how to use Testcontainers for Go to test database interactions with a real PostgreSQL instance.
keywords: testcontainers, go, golang, testing, postgresql, integration testing
sidebar:
  label: Testcontainers for Go
---

<!-- Source: https://github.com/testcontainers/tc-guide-getting-started-with-testcontainers-for-go -->

In this guide, you will learn how to:

- Create a Go application with modules support
- Implement a Repository to manage customer data in a PostgreSQL database using the pgx driver
- Write integration tests using testcontainers-go
- Reuse containers across multiple tests using test suites

## Prerequisites

- Go 1.25+
- Your preferred IDE (VS Code, GoLand)
- A Docker environment supported by Testcontainers. For details, see
  the [testcontainers-go system requirements](https://golang.testcontainers.org/system_requirements/).

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

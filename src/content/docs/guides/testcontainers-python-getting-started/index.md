---
title: Getting started with Testcontainers for Python
description: Learn how to use Testcontainers for Python to test database interactions with a real PostgreSQL instance.
keywords: testcontainers, python, testing, postgresql, integration testing, pytest
sidebar:
  label: Testcontainers for Python
---

<!-- Source: https://github.com/testcontainers/tc-guide-getting-started-with-testcontainers-for-python -->

In this guide, you will learn how to:

- Create a Python application that uses PostgreSQL to store customer data
- Use `psycopg` to interact with the database
- Write integration tests using `testcontainers-python` and `pytest`
- Manage container lifecycle with pytest fixtures

## Prerequisites

- Python 3.10+
- pip
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

---
title: Testing Quarkus applications with Testcontainers
description: Learn how to test a Quarkus REST API using Testcontainers with PostgreSQL, Hibernate ORM with Panache, and REST Assured.
keywords: testcontainers, java, quarkus, testing, postgresql, rest api, rest assured, panache, dev services
sidebar:
  label: Quarkus
---

<!-- Source: https://github.com/testcontainers/tc-guide-testcontainers-in-quarkus-applications -->

In this guide, you'll learn how to:

- Create a Quarkus application with REST API endpoints
- Use Hibernate ORM with Panache and PostgreSQL for persistence
- Test the REST API using Quarkus Dev Services, which uses Testcontainers behind
  the scenes
- Test with services not supported by Dev Services using
  `QuarkusTestResourceLifecycleManager`

## Prerequisites

- Java 17+
- Maven or Gradle
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

---
title: Testing REST API integrations using MockServer
description: Learn how to test REST API integrations in a Spring Boot application using the Testcontainers MockServer module.
keywords: testcontainers, java, spring boot, testing, mockserver, rest api, rest assured
sidebar:
  label: MockServer
---

<!-- Source: https://github.com/testcontainers/tc-guide-testing-rest-api-integrations-using-mockserver -->

In this guide, you will learn how to:

- Create a Spring Boot application that talks to external REST APIs
- Test external API integrations using the Testcontainers MockServer module

## Prerequisites

- Java 17+
- Maven or Gradle
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

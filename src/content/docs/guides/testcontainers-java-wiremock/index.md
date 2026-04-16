---
title: Testing REST API integrations using WireMock
description: Learn how to test REST API integrations in a Spring Boot application using the Testcontainers WireMock module.
keywords: testcontainers, java, spring boot, testing, wiremock, rest api, rest assured
sidebar:
  label: WireMock
---

<!-- Source: https://github.com/testcontainers/tc-guide-testing-rest-api-integrations-using-wiremock -->

In this guide, you'll learn how to:

- Create a Spring Boot application that talks to external REST APIs
- Test external API integrations using WireMock with both the JUnit 5 extension
  and the Testcontainers WireMock module

## Prerequisites

- Java 17+
- Maven or Gradle
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

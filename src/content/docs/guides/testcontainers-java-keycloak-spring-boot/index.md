---
title: Securing Spring Boot microservice using Keycloak and Testcontainers
description: Learn how to secure a Spring Boot microservice using Keycloak and test it with the Testcontainers Keycloak module.
keywords: testcontainers, java, spring boot, testing, keycloak, security, oauth2, jwt
sidebar:
  label: Keycloak with Spring Boot
---

<!-- Source: https://github.com/testcontainers/tc-guide-securing-spring-boot-microservice-using-keycloak-and-testcontainers -->

In this guide, you'll learn how to:

- Create an OAuth 2.0 Resource Server using Spring Boot
- Secure API endpoints using Keycloak
- Test the APIs using the Testcontainers Keycloak module
- Run the application locally using the Testcontainers Keycloak module

## Prerequisites

- Java 17+
- Maven or Gradle
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

---
title: Testing Micronaut Kafka Listener using Testcontainers
description: Learn how to test a Micronaut Kafka listener using Testcontainers with Kafka and MySQL modules.
keywords: testcontainers, java, micronaut, testing, kafka, mysql, jpa, awaitility
sidebar:
  label: Micronaut Kafka
---

<!-- Source: https://github.com/testcontainers/tc-guide-testing-micronaut-kafka-listener -->

In this guide, you'll learn how to:

- Create a Micronaut application with Kafka integration
- Implement a Kafka listener and persist data in a MySQL database
- Test the Kafka listener using Testcontainers and Awaitility

## Prerequisites

- Java 17+
- Maven or Gradle
- A Docker environment supported by Testcontainers

> [!NOTE]
> If you're new to Testcontainers, visit the
> [Testcontainers overview](https://testcontainers.com/getting-started/) to learn more about
> Testcontainers and the benefits of using it.

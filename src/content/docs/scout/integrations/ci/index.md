---
title: Using Docker Scout in continuous integration
description: How to setup Docker Scout in continuous integration pipelines
keywords: scanning, vulnerabilities, Hub, supply chain, security, ci, continuous integration, github actions, gitlab
sidebar:
  label: Continuous Integration
---

You can analyze Docker images in continuous integration pipelines as you build
them using a GitHub action or the Docker Scout CLI plugin.

Available integrations:

- [GitHub Actions](gha/)
- [GitLab](gitlab/)
- [Microsoft Azure DevOps Pipelines](azure/)
- [Circle CI](circle-ci/)
- [Jenkins](jenkins/)

You can also add runtime integration as part of your CI/CD pipeline, which lets
you assign an image to an environment, such as `production` or `staging`, when
you deploy it. For more information, see [Environment monitoring](../environment/).

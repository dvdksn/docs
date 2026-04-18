---
title: Repositories
description: Learn how to manage repositories on Docker Hub
keywords: Docker Hub, Hub, repositories
sidebar:
  order: 2
---

A Docker Hub repository is a collection of container images, enabling you to
store, manage, and share Docker images publicly or privately. Each repository
serves as a dedicated space where you can store images associated with a
particular application, microservice, or project. Content in repositories is
organized by tags, which represent different versions of the same application,
allowing users to pull the right version when needed.

In this section, learn how to:

- [Create](./create/) a repository.
- Manage a repository, including how to manage:

   - [Repository information](./manage/information/): Add descriptions,
     overviews, and categories to help users understand the purpose and usage of
     your repository. Clear repository information aids discoverability and
     usability.

   - [Access](./manage/access/): Control who can access your repositories with
     flexible options. Make repositories public or private, add collaborators,
     and, for organizations, manage roles and teams to maintain security and
     control.

   - [Images](./manage/hub-images/): Repositories support diverse
     content types, including OCI artifacts, and allow version control through
     tagging. Push new images and manage existing content across repositories
     for flexibility.

   - [Image security insights](./manage/vulnerability-scanning/): Utilize
     continuous Docker Scout analysis and static vulnerability scanning to
     detect, understand, and address security issues within container images.

   - [Webhooks](./manage/webhooks/): Automate responses to repository events
     like image pushes or updates by setting up webhooks, which can trigger
     notifications or actions in external systems, streamlining workflows.

   - [Automated builds](./manage/builds/): Integrate with GitHub or
     Bitbucket for automated builds. Every code change triggers an image
     rebuild, supporting continuous integration and delivery.

   - [Trusted content](./manage/trusted-content/): Contribute to Docker
     Official Images or manage repositories in the Verified Publisher and
     Sponsored Open Source programs, including tasks like setting logos,
     accessing analytics, and enabling vulnerability scanning.

- [Archive](./archive/) an outdated or unsupported repository.
- [Delete](./delete/) a repository.

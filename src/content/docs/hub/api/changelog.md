---
title: Docker Hub API changelog
description: Docker Hub API changelog
keywords: docker hub, hub, whats new, release notes, api, changelog
sidebar:
  label: Changelog
  order: 2
---

Here you can learn about the latest changes, new features, bug fixes, and known
issues for Docker Service APIs.

---

## 2025-11-21

### Updates

- Add missing `expires_at` fields on [PAT management](/hub/api/latest/#tag/access-tokens) endpoints.

## 2025-09-25

### Updates

- Fix [Assign repository group](/hub/api/latest/#tag/repositories/operation/CreateRepositoryGroup) endpoints request/response

---

## 2025-09-19

### New

- Add [Create repository](/hub/api/latest/#tag/repositories/operation/CreateRepository) endpoints for a given `namespace`.
- Add [Get repository](/hub/api/latest/#tag/repositories/operation/GetRepository) endpoints for a given `namespace`.
- Add [Check repository](/hub/api/latest/#tag/repositories/operation/CheckRepository) endpoints for a given `namespace`.

### Deprecations

- [Deprecate POST /v2/repositories](/hub/api/deprecated/#deprecate-legacy-createrepository)
- [Deprecate POST /v2/repositories/{namespace}](/hub/api/deprecated/#deprecate-legacy-createrepository)
- [Deprecate GET /v2/repositories/{namespace}/{repository}](/hub/api/deprecated/#deprecate-legacy-getrepository)
- [Deprecate HEAD /v2/repositories/{namespace}/{repository}](/hub/api/deprecated/#deprecate-legacy-getrepository)

---

## 2025-07-29

### New

- Add [Update repository immutable tags settings](/hub/api/latest/#tag/repositories/operation/UpdateRepositoryImmutableTags) endpoints for a given `namespace` and `repository`.
- Add [Verify repository immutable tags](/hub/api/latest/#tag/repositories/operation/VerifyRepositoryImmutableTags) endpoints for a given `namespace` and `repository`.

---

## 2025-06-27

### New

- Add [List repositories](/hub/api/latest/#tag/repositories/operation/listNamespaceRepositories) endpoints for a given `namespace`.

### Deprecations

- [Deprecate /v2/repositories/{namespace}](/hub/api/deprecated/#deprecate-legacy-listnamespacerepositories)

---

## 2025-03-25

### New

- Add [APIs](/hub/api/latest/#tag/org-access-tokens) for organization access token (OATs) management.

---

## 2025-03-18

### New

- Add access to [audit logs](/hub/api/latest/#tag/audit-logs) for org
  access tokens.

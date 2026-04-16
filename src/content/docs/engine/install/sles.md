---
title: Docker Engine on SLES (s390x)
description: Information about Docker Engine availability on SLES. Docker packages are no longer available for SLES s390x architecture.
keywords: sles, install, uninstall, upgrade, update, s390x, ibm-z, not supported, unavailable
sidebar:
  label: SLES (s390x)
  order: 70
---

## Docker Engine is no longer available for SLES

> [!IMPORTANT]
>
> Docker Engine packages are **no longer available** for SUSE Linux Enterprise Server (SLES) on the **s390x** architecture (IBM Z).

IBM has made the decision to discontinue building and providing Docker Engine
packages for SLES s390x systems. Docker Inc. never directly built these packages
and was only involved in their deployment.

## What this means

- New Docker Engine installations are not available for SLES s390x
- Existing installations will continue to work but will not receive updates
- No new versions or security updates will be provided
- The Docker package repository for SLES s390x is no longer maintained

## If you have Docker currently installed

If you currently have Docker Engine installed on a SLES s390x system:

- Your existing Docker installation will continue to function
- No automatic updates will be available
- You should plan accordingly for your containerization needs
- Consider the security implications of running software without updates

## Next steps

For questions about this decision or alternative solutions, contact IBM support.


---
title: Deploy your Docker setup
description: Deploy your Docker setup across your company.
sidebar:
  order: 40
---

> [!WARNING]
>
> Communicate with your users before proceeding, and confirm that your IT and
> MDM teams are prepared to handle any unexpected issues, as these steps will
> affect all existing users signing into your Docker organization.

## Enforce SSO

Enforcing SSO means that anyone who has a Docker profile with an email address
that matches your verified domain must sign in using your SSO connection. Make
sure the Identity provider groups associated with your SSO connection cover all
the developer groups that you want to have access to the Docker subscription.

For instructions on how to enforce SSO, see [Enforce SSO](/admin/enterprise/security/single-sign-on/connect/).

## Deploy configuration settings and enforce sign-in to users

Have the MDM team deploy the configuration files for Docker to all users.

## Next steps

Congratulations, you've successfully completed the admin implementation process
for Docker.

To continue optimizing your Docker environment:

- Review your [organization's usage data](/admin/organization/insights/) to track adoption
- Monitor [Docker Scout findings](/scout/explore/analysis/) for security insights
- Explore [additional security features](/admin/enterprise/security/) to enhance your configuration

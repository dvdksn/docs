---
title: Checking your build configuration
description: Learn how to use build checks to validate your build configuration.
keywords: build, buildx, buildkit, checks, validate, configuration, lint
sidebar:
  label: Build checks
  order: 12
---


<SummaryBar featureName="Build checks" />

Build checks are a feature introduced in Dockerfile 1.8. It lets you validate
your build configuration and conduct a series of checks prior to executing your
build. Think of it as an advanced form of linting for your Dockerfile and build
options, or a dry-run mode for builds.

You can find the list of checks available, and a description of each, in the
[Rules](#rules) section below.

## How build checks work

Typically, when you run a build, Docker executes the build steps in your
Dockerfile and build options as specified. With build checks, rather than
executing the build steps, Docker checks the Dockerfile and options you provide
and reports any issues it detects.

Build checks are useful for:

- Validating your Dockerfile and build options before running a build.
- Ensuring that your Dockerfile and build options are up-to-date with the
  latest best practices.
- Identifying potential issues or anti-patterns in your Dockerfile and build
  options.

> [!TIP]
>
> To improve linting, code navigation, and vulnerability scanning of your Dockerfiles in Visual Studio Code
> see the [Docker DX](https://marketplace.visualstudio.com/items?itemName=docker.docker) extension.

## Build with checks

Build checks are supported in:

- Buildx version 0.15.0 and later
- [docker/build-push-action](https://github.com/docker/build-push-action) version 6.6.0 and later
- [docker/bake-action](https://github.com/docker/bake-action) version 5.6.0 and later

Invoking a build runs the checks by default, and displays any violations in the
build output. For example, the following command both builds the image and runs
the checks:

```console
$ docker build .
[+] Building 3.5s (11/11) FINISHED
...

1 warning found (use --debug to expand):
  - Lint Rule 'JSONArgsRecommended': JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 7)

```

In this example, the build ran successfully, but a
[JSONArgsRecommended](/build/checks/json-args-recommended/) warning
was reported, because `CMD` instructions should use JSON array syntax.

With the GitHub Actions, the checks display in the diff view of pull requests.

```yaml
name: Build and push Docker images
on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build and push
        uses: docker/build-push-action@<Version name="build_push_action_version" />
```

![GitHub Actions build check annotations](/build/images/gha-check-annotations.png)

### More verbose output

Check warnings for a regular `docker build` display a concise message
containing the rule name, the message, and the line number of where in the
Dockerfile the issue originated. If you want to see more detailed information
about the checks, you can use the `--debug` flag. For example:

```console
$ docker --debug build .
[+] Building 3.5s (11/11) FINISHED
...

 1 warning found:
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 4)
JSON arguments recommended for ENTRYPOINT/CMD to prevent unintended behavior related to OS signals
More info: https://docs.docker.com/go/dockerfile/rule/json-args-recommended/
Dockerfile:4
--------------------
   2 |
   3 |     FROM alpine
   4 | >>> CMD echo "Hello, world!"
   5 |
--------------------

```

With the `--debug` flag, the output includes a link to the documentation for
the check, and a snippet of the Dockerfile where the issue was found.

## Check a build without building

To run build checks without actually building, you can use the `docker build`
command as you typically would, but with the addition of the `--check` flag.
Here's an example:

```console
$ docker build --check .
```

Instead of executing the build steps, this command only runs the checks and
reports any issues it finds. If there are any issues, they will be reported in
the output. For example:

```text
[+] Building 1.5s (5/5) FINISHED
=> [internal] connecting to local controller
=> [internal] load build definition from Dockerfile
=> => transferring dockerfile: 253B
=> [internal] load metadata for docker.io/library/node:22
=> [auth] library/node:pull token for registry-1.docker.io
=> [internal] load .dockerignore
=> => transferring context: 50B
JSONArgsRecommended - https://docs.docker.com/go/dockerfile/rule/json-args-recommended/
JSON arguments recommended for ENTRYPOINT/CMD to prevent unintended behavior related to OS signals
Dockerfile:7
--------------------
5 |
6 |     COPY index.js .
7 | >>> CMD node index.js
8 |
--------------------
```

This output with `--check` shows the [verbose message](#more-verbose-output)
for the check.

Unlike a regular build, if any violations are reported when using the `--check`
flag, the command exits with a non-zero status code.

## Fail build on check violations

Check violations for builds are reported as warnings, with exit code 0, by
default. You can configure Docker to fail the build when violations are
reported, using a `check=error=true` directive in your Dockerfile. This will
cause the build to error out when after the build checks are run, before the
actual build gets executed.

```dockerfile {title=Dockerfile,linenos=true,hl_lines=2}
# syntax=docker/dockerfile:1
# check=error=true

FROM alpine
CMD echo "Hello, world!"
```

Without the `# check=error=true` directive, this build would complete with an
exit code of 0. However, with the directive, build check violation results in
non-zero exit code:

```console
$ docker build .
[+] Building 1.5s (5/5) FINISHED
...

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 5)
Dockerfile:1
--------------------
   1 | >>> # syntax=docker/dockerfile:1
   2 |     # check=error=true
   3 |
--------------------
ERROR: lint violation found for rules: JSONArgsRecommended
$ echo $?
1
```

You can also set the error directive on the CLI by passing the
`BUILDKIT_DOCKERFILE_CHECK` build argument:

```console
$ docker build --check --build-arg "BUILDKIT_DOCKERFILE_CHECK=error=true" .
```

## Skip checks

By default, all checks are run when you build an image. If you want to skip
specific checks, you can use the `check=skip` directive in your Dockerfile.
The `skip` parameter takes a CSV string of the check IDs you want to skip.
For example:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=skip=JSONArgsRecommended,StageNameCasing

FROM alpine AS BASE_STAGE
CMD echo "Hello, world!"
```

Building this Dockerfile results in no check violations.

You can also skip checks by passing the `BUILDKIT_DOCKERFILE_CHECK` build
argument with a CSV string of check IDs you want to skip. For example:

```console
$ docker build --check --build-arg "BUILDKIT_DOCKERFILE_CHECK=skip=JSONArgsRecommended,StageNameCasing" .
```

To skip all checks, use the `skip=all` parameter:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=skip=all
```

## Combine error and skip parameters for check directives

To both skip specific checks and error on check violations, pass both the
`skip` and `error` parameters separated by a semi-colon (`;`) to the `check`
directive in your Dockerfile or in a build argument. For example:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=skip=JSONArgsRecommended,StageNameCasing;error=true
```

```console
$ docker build --check --build-arg "BUILDKIT_DOCKERFILE_CHECK=skip=JSONArgsRecommended,StageNameCasing;error=true" .
```

## Experimental checks

Before checks are promoted to stable, they may be available as experimental
checks. Experimental checks are disabled by default. See the [Rules](#rules)
section below for the full list — experimental checks are marked as such.

To enable all experimental checks, set the `BUILDKIT_DOCKERFILE_CHECK` build
argument to `experimental=all`:

```console
$ docker build --check --build-arg "BUILDKIT_DOCKERFILE_CHECK=experimental=all" .
```

You can also enable experimental checks in your Dockerfile using the `check`
directive:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=experimental=all
```

To selectively enable experimental checks, you can pass a CSV string of the
check IDs you want to enable, either to the `check` directive in your Dockerfile
or as a build argument. For example:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=experimental=JSONArgsRecommended,StageNameCasing
```

Note that the `experimental` directive takes precedence over the `skip`
directive, meaning that experimental checks will run regardless of the `skip`
directive you have set. For example, if you set `skip=all` and enable
experimental checks, the experimental checks will still run:

```dockerfile {title=Dockerfile}
# syntax=docker/dockerfile:1
# check=skip=all;experimental=all
```

## Rules

| Name | Description |
| --- | --- |
| [StageNameCasing](/build/checks/stage-name-casing/) | Stage names should be lowercase |
| [FromAsCasing](/build/checks/from-as-casing/) | The 'as' keyword should match the case of the 'from' keyword |
| [NoEmptyContinuation](/build/checks/no-empty-continuation/) | Empty continuation lines will become errors in a future release |
| [ConsistentInstructionCasing](/build/checks/consistent-instruction-casing/) | All commands within the Dockerfile should use the same casing (either upper or lower) |
| [DuplicateStageName](/build/checks/duplicate-stage-name/) | Stage names should be unique |
| [ReservedStageName](/build/checks/reserved-stage-name/) | Reserved words should not be used as stage names |
| [JSONArgsRecommended](/build/checks/json-args-recommended/) | JSON arguments recommended for ENTRYPOINT/CMD to prevent unintended behavior related to OS signals |
| [MaintainerDeprecated](/build/checks/maintainer-deprecated/) | The MAINTAINER instruction is deprecated, use a label instead to define an image author |
| [UndefinedArgInFrom](/build/checks/undefined-arg-in-from/) | FROM command must use declared ARGs |
| [WorkdirRelativePath](/build/checks/workdir-relative-path/) | Relative workdir without an absolute workdir declared within the build can have unexpected results if the base image changes |
| [UndefinedVar](/build/checks/undefined-var/) | Variables should be defined before their use |
| [MultipleInstructionsDisallowed](/build/checks/multiple-instructions-disallowed/) | Multiple instructions of the same type should not be used in the same stage |
| [LegacyKeyValueFormat](/build/checks/legacy-key-value-format/) | Legacy key/value format with whitespace separator should not be used |
| [RedundantTargetPlatform](/build/checks/redundant-target-platform/) | Setting platform to predefined $TARGETPLATFORM in FROM is redundant as this is the default behavior |
| [SecretsUsedInArgOrEnv](/build/checks/secrets-used-in-arg-or-env/) | Sensitive data should not be used in the ARG or ENV commands |
| [InvalidDefaultArgInFrom](/build/checks/invalid-default-arg-in-from/) | Default value for global ARG results in an empty or invalid base image name |
| [FromPlatformFlagConstDisallowed](/build/checks/from-platform-flag-const-disallowed/) | FROM --platform flag should not use a constant value |
| [CopyIgnoredFile](/build/checks/copy-ignored-file/) | Attempting to Copy file that is excluded by .dockerignore |
| [InvalidDefinitionDescription](/build/checks/invalid-definition-description/) (experimental) | Comment for build stage or argument should follow the format: `# <arg/stage name> <description>`. |
| [ExposeProtoCasing](/build/checks/expose-proto-casing/) | Protocol in EXPOSE instruction should be lowercase |
| [ExposeInvalidFormat](/build/checks/expose-invalid-format/) | IP address and host-port mapping should not be used in EXPOSE instruction. This will become an error in a future release |

## Further reading

- [Validating build configuration with GitHub Actions](/build/ci/github-actions/checks/)

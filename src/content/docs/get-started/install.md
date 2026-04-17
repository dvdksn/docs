---
title: Install Docker
description: Install Docker Desktop and run your first container.
keywords: docker, install, docker desktop, get docker, first container
sidebar:
  label: Install
  order: 2
---

Docker Desktop is the recommended way to get Docker on your machine. It
includes the Docker daemon, the CLI, Docker Compose, and Kubernetes — everything
you need to build and run containers.

## Download Docker Desktop

Choose your platform:

- [Mac (Apple Silicon)](https://desktop.docker.com/mac/main/arm64/Docker.dmg)
- [Mac (Intel)](https://desktop.docker.com/mac/main/amd64/Docker.dmg)
- [Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)
- [Linux](/desktop/install/linux/)

For detailed installation instructions, see the [Docker Desktop install
guide](/desktop/install/).

## Verify the installation

After installing, open a terminal and run:

```console
$ docker version
```

You should see version information for both the client and the server (daemon).

## Run your first container

Pull and run a simple container to verify everything works:

```console
$ docker run -d -p 8080:80 docker/welcome-to-docker
```

This command:
1. Downloads the `docker/welcome-to-docker` image from Docker Hub.
2. Starts a container in the background (`-d`).
3. Maps port 8080 on your machine to port 80 in the container (`-p`).

Open [http://localhost:8080](http://localhost:8080) in your browser. You should
see a welcome page.

## Explore the running container

List your running containers:

```console
$ docker ps
```

Stop the container:

```console
$ docker stop <container-id>
```

You can also manage containers visually in Docker Desktop — open the app and
look at the **Containers** tab.

## Next step

Your Docker installation is working. Now let's [build your first
app](/get-started/build-your-first-app/).

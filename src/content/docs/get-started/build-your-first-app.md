---
title: Build your first app
description: Write a Dockerfile, build an image, run a container, add a database with Docker Compose, and push your image to Docker Hub.
keywords: docker, tutorial, build, dockerfile, compose, push, first app, beginner
sidebar:
  label: Build your first app
  order: 3
---

In this guide, you'll containerize a simple to-do application, add a database,
and push the image to Docker Hub. By the end, you'll know how to write a
Dockerfile, use Docker Compose, and share your work.

## Get the sample app

Clone the sample repository:

```console
$ git clone https://github.com/docker/getting-started-app.git
$ cd getting-started-app
```

This is a Node.js to-do app. Look at the project: it has a `package.json`,
a `src/` directory with the application code, and a `spec/` directory with
tests.

## Write a Dockerfile

Create a file called `Dockerfile` in the project root:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

Each line is an instruction:

| Instruction | What it does |
|---|---|
| `FROM` | Sets the base image (Node.js on Alpine Linux) |
| `WORKDIR` | Sets the working directory inside the container |
| `COPY` | Copies files from your machine into the image |
| `RUN` | Runs a command during the build (install dependencies) |
| `EXPOSE` | Documents which port the app listens on |
| `CMD` | The default command when a container starts |

## Build the image

Build the image and tag it `getting-started`:

```console
$ docker build -t getting-started .
```

Docker reads the Dockerfile, executes each instruction, and produces an image.
The `-t` flag gives it a name you can reference later.

## Run the container

Start a container from your new image:

```console
$ docker run -dp 127.0.0.1:3000:3000 getting-started
```

Open [http://localhost:3000](http://localhost:3000) and add some to-do items.

The flags:
- `-d` — run in the background (detached)
- `-p 127.0.0.1:3000:3000` — map port 3000 on localhost to port 3000 in the
  container

## Make a change

Edit `src/static/js/app.js` and change the placeholder text on line 56 from
"New Item" to "New Todo Item". Then rebuild and rerun:

```console
$ docker build -t getting-started .
```

Before running the new container, stop and remove the old one (you can't have
two containers on the same port):

```console
$ docker ps
$ docker stop <container-id>
$ docker rm <container-id>
$ docker run -dp 127.0.0.1:3000:3000 getting-started
```

Refresh the browser — your change is live.

## Persist data with a volume

You may have noticed that your to-do items disappear when you restart the
container. That's because each container has its own filesystem. To persist data
across restarts, use a **volume**.

Create a volume and run the container with it mounted:

```console
$ docker volume create todo-db
$ docker run -dp 127.0.0.1:3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started
```

Add some to-do items, then stop and remove the container. Start a new one with
the same volume:

```console
$ docker stop <container-id> && docker rm <container-id>
$ docker run -dp 127.0.0.1:3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started
```

Your to-do items are still there. The volume lives independently of any
container.

## Add a database with Compose

Most real applications need more than one container. Let's add a MySQL database
using Docker Compose.

Create a file called `compose.yaml` in the project root:

```yaml
services:
  app:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      MYSQL_HOST: db
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos
    depends_on:
      - db

  db:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```

This defines two services:
- **app** — your to-do application, built from the local Dockerfile
- **db** — a MySQL database, using the official MySQL image

Compose automatically creates a network so the services can reach each other by
name (`db` resolves to the database container).

Start everything:

```console
$ docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000). Your app is now backed by
MySQL. Add some to-do items — they're stored in the database, not a local file.

To stop everything:

```console
$ docker compose down
```

Add `--volumes` if you also want to remove the database data.

## Push to Docker Hub

Share your image so others can use it.

1. [Create a Docker Hub account](https://hub.docker.com/signup) if you don't
   have one.
2. Sign in from the CLI:

   ```console
   $ docker login
   ```

3. Tag your image with your Docker Hub username:

   ```console
   $ docker tag getting-started YOUR-USERNAME/getting-started
   ```

4. Push it:

   ```console
   $ docker push YOUR-USERNAME/getting-started
   ```

Your image is now on Docker Hub. Anyone can pull and run it with:

```console
$ docker run -dp 3000:3000 YOUR-USERNAME/getting-started
```

## What you've learned

In this guide, you:

- Wrote a **Dockerfile** to define your application image
- **Built** an image and **ran** it as a container
- **Persisted data** with a volume
- Ran a **multi-container** app with Docker Compose
- **Pushed** your image to Docker Hub

These are the core Docker workflows that apply to any project, in any language.

## Next step

See [Next steps](/get-started/next-steps/) for guidance on build optimization,
production patterns, and language-specific guides.

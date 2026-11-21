# Dockerize Smart Model Router Gateway with PostgreSQL — Step by Step Guide

## What you'll learn
- How to write a Dockerfile to containerize a Node.js app
- How to use docker-compose to orchestrate multiple services
- How Docker volumes persist data across container restarts
- How Docker networking lets containers talk to each other

---

## Step 1: Create a `.dockerignore` file

Before building a Docker image, you tell Docker what files to **skip** (like `.gitignore` for Docker).

Create `.dockerignore` in the project root with:

```
node_modules
.env
.git
tests
```

**Why?** `node_modules` will be installed inside the container. `.env` has secrets — we'll pass env vars differently. Tests aren't needed in production.

---

## Step 2: Create the `Dockerfile`

This file describes how to build your app into a Docker image — like a recipe.

Create `Dockerfile` in the project root with:

```dockerfile
# Start from a lightweight Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (Docker caches this layer)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Tell Docker this container will listen on port 3000
EXPOSE 3000

# Start the app
CMD ["node", "--env-file", ".env", "src/index.ts"]
```

**Key concepts:**
- Each line creates a **layer**. Docker caches layers, so putting `package.json` before `COPY . .` means `npm install` only reruns when dependencies change.
- `WORKDIR` sets the directory for all following commands.
- `EXPOSE` is documentation — it doesn't actually publish the port (that's done in docker-compose).
- `CMD` is what runs when the container starts.

---

## Step 3: Create `docker-compose.yml`

Docker Compose lets you define **multiple services** (app + database) that work together.

Create `docker-compose.yml` in the project root with:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:17-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: smartrouter
      POSTGRES_PASSWORD: smartrouter123
      POSTGRES_DB: smartrouter_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Key concepts:**

- **`services`**: Each service is a container. `app` builds from your Dockerfile, `db` uses a pre-built Postgres image.
- **`ports: "3000:3000"`**: Maps host port (left) to container port (right). You access the app at `localhost:3000`.
- **`env_file`**: Passes your `.env` file into the container.
- **`depends_on`**: Tells Docker to start `db` before `app`.
- **`volumes: pgdata:/var/lib/postgresql/data`**: This is the key part — it mounts a **named volume** to Postgres's data directory. Without this, your data disappears when the container stops.
- **`volumes:` (bottom)**: Declares the named volume. Docker manages where it's stored on disk.
- **Networking**: Docker Compose automatically creates a network. The `app` container can reach Postgres at `db:5432` (service name = hostname).

---

## Step 4: Update `.env.example`

Add these lines to `.env.example` so future devs know what's needed:

```
POSTGRES_USER='smartrouter'
POSTGRES_PASSWORD='smartrouter123'
POSTGRES_DB='smartrouter_db'
DATABASE_URL='postgresql://smartrouter:smartrouter123@db:5432/smartrouter_db'
```

Also add them to your `.env` file with real values.

**Note:** `DATABASE_URL` uses `db` as the host — that's the service name from docker-compose, which Docker resolves to the Postgres container's IP.

---

## Step 5: Build and run

Run these commands from the project root:

```bash
# Build the app image
docker compose build

# Start both containers
docker compose up
```

You should see logs from both the app and Postgres. The app should start and be reachable at `http://localhost:3000`.

---

## Step 6: Test it

In another terminal:

```bash
curl -X POST http://localhost:3000/chat \
  -H 'Content-Type: application/json' \
  -d '{"question":"What is rate limiting?"}'
```

---

## Step 7: Verify the volume persists

```bash
# Stop the containers
docker compose down

# Check the volume still exists
docker volume ls

# Start again — Postgres data is still there
docker compose up
```

**Important:** `docker compose down` stops and removes containers but keeps volumes. To delete volumes too, you'd use `docker compose down -v` (don't do this unless you want to wipe the data).

---

## Step 8: Useful commands to explore

```bash
# See running containers
docker compose ps

# See logs from a specific service
docker compose logs app
docker compose logs db

# Open a shell inside the app container
docker exec -it <container-name> sh

# Connect to Postgres from inside the db container
docker exec -it <container-name> psql -U smartrouter -d smartrouter_db

# Inspect the volume
docker volume inspect <project-name>_pgdata
```

---

## Summary

| Concept | What it does |
|---------|-------------|
| `Dockerfile` | Recipe to build your app into an image |
| `docker-compose.yml` | Orchestrates multiple containers together |
| `volumes` | Persists data outside the container lifecycle |
| `depends_on` | Controls startup order |
| Service names (`db`) | Act as hostnames on the Docker network |
| `env_file` | Passes environment variables to containers |
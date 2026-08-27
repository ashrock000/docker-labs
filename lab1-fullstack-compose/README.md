# Lab 1: Docker Compose — FullStack Application

## 📋 Overview
This lab demonstrates the same FullStack application from Lab 1, but using **Docker Compose**.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      DOCKER HOST                            │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │    FRONTEND     │  │    BACKEND      │  │  DATABASE   │  │
│  │    Container    │  │    Container    │  │  Container  │  │
│  │   (Port 8080)   │  │   (Port 3000)   │  │   (SQLite)  │  │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘  │
│           │                    │                    │       │
│           └────────────────────┼────────────────────┘       │
│                                │                            │
│                    ┌───────────▼───────────┐                │
│                    │   Docker Network      │                │
│                    │   (auto-created)      │                │
│                    └───────────────────────┘                │
│                                │                            │
│                    ┌───────────▼───────────┐                │
│                    │   Docker Volume       │                │
│                    │   (auto-created)      │                │
│                    └───────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 How to Run

```bash
# Build and start all containers
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs

# Stop all containers
docker compose down

# Stop and remove volumes
docker compose down -v
```

## 📸 Screenshots
- `compose-ps-lab1.png` — Running containers
- `compose-app-lab1.png` — Application in browser

## 👤 Author
ashrock000

## 📅 Date
August 27, 2026

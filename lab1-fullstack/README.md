# Lab 1: FullStack Application with SQLite Database

## 📋 Overview
This lab demonstrates a full-stack application running in **separate Docker containers** with a SQLite database.

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
│                    │   lab1-network        │                │
│                    └───────────────────────┘                │
│                                │                            │
│                    ┌───────────▼───────────┐                │
│                    │   Docker Volume       │                │
│                    │   sqlite_data         │                │
│                    └───────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Technologies Used

| Container | Technology | Port |
|-----------|------------|------|
| **Frontend** | Node.js + Express | 8080 |
| **Backend** | Node.js + Express | 3000 |
| **Database** | SQLite | – |

## 🚀 How to Run

### 1. Build Database Image
```bash
cd database
docker build -t lab1-database .
cd ..
```

### 2. Build Backend Image
```bash
cd backend
docker build -t lab1-backend .
cd ..
```

### 3. Build Frontend Image
```bash
cd frontend
docker build -t lab1-frontend .
cd ..
```

### 4. Create Network
```bash
docker network create lab1-network
```

### 5. Create Volume
```bash
docker volume create sqlite_data
```

### 6. Run Database Container
```bash
docker run -d \
  --name lab1-database \
  --network lab1-network \
  -v sqlite_data:/data \
  lab1-database
```

### 7. Run Backend Container
```bash
docker run -d \
  --name lab1-backend \
  --network lab1-network \
  -p 3000:3000 \
  -v sqlite_data:/data \
  lab1-backend
```

### 8. Run Frontend Container
```bash
docker run -d \
  --name lab1-frontend \
  --network lab1-network \
  -p 8080:8080 \
  lab1-frontend
```

### 9. Test
Open browser → `http://localhost:8080`

## 🧪 Testing Commands

```bash
# Check running containers
docker ps

# Check backend logs
docker logs lab1-backend

# Check database logs
docker logs lab1-database
```

## 🛑 Stop and Clean Up

```bash
docker stop lab1-frontend lab1-backend lab1-database
docker rm lab1-frontend lab1-backend lab1-database
docker volume rm sqlite_data
docker network rm lab1-network
```

## 📸 Screenshots
- `screenshots/app-ui-lab1.png` — Application UI
- `screenshots/docker-ps-lab1.png` — Running containers

## 📁 Files

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Build backend image |
| `backend/app.js` | Backend API |
| `backend/package.json` | Dependencies |
| `frontend/Dockerfile` | Build frontend image |
| `frontend/index.html` | UI |
| `frontend/server.js` | Frontend server |
| `frontend/package.json` | Dependencies |
| `database/Dockerfile` | SQLite database image |

## ✅ What We Learned

- Building custom Docker images
- Using Docker volumes for persistence
- Docker networking for container communication
- Multi-container architecture
- SQLite as a lightweight database

## 👤 Author
ashrock000

## 📅 Date
August 24, 2026

## 🔗 GitHub
https://github.com/ashrock000/docker-labs/tree/main/lab1-fullstack

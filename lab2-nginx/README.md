# Lab 2: Nginx Reverse Proxy with Docker

## 📋 Overview
This lab demonstrates using **Nginx as a reverse proxy** to route traffic to two different containerized applications.

## 🏗️ Architecture

```
         Browser
            |
            v
     Nginx Container
      /          \
  /app1/          /app2/
     |              |
     v              v
App1 Container   App2 Container
```

## 🔧 Technologies Used

| Container | Technology | Internal Port | Exposed Port |
|-----------|------------|---------------|--------------|
| **App1** | Node.js + Express | 3001 | – |
| **App2** | Node.js + Express | 3002 | – |
| **Nginx** | Nginx | 80 | 8081 |

## 🚀 How to Run

### 1. Build Images
```bash
cd ~/docker-labs/lab2-nginx

# Build App1
docker build -t app1 ./app1

# Build App2
docker build -t app2 ./app2

# Build Nginx
docker build -t nginx-proxy ./nginx
```

### 2. Create Network
```bash
docker network create lab2-network
```

### 3. Run Containers
```bash
# Run App1
docker run -d --name app1 --network lab2-network app1

# Run App2
docker run -d --name app2 --network lab2-network app2

# Run Nginx
docker run -d --name nginx-proxy --network lab2-network -p 8081:80 nginx-proxy
```

### 4. Test
```bash
curl http://localhost:8081/app1/
curl http://localhost:8081/app2/
```

## 📸 Screenshots
- `screenshots/docker-ps-lab2.png` — Running containers
- `screenshots/app1-lab2.png` — App1 response
- `screenshots/app2-lab2.png` — App2 response

## 📁 Files

| File | Purpose |
|------|---------|
| `app1/Dockerfile` | Build App1 image |
| `app1/app.js` | App1 code |
| `app1/package.json` | App1 dependencies |
| `app2/Dockerfile` | Build App2 image |
| `app2/app.js` | App2 code |
| `app2/package.json` | App2 dependencies |
| `nginx/Dockerfile` | Build Nginx image |
| `nginx/nginx.conf` | Nginx reverse proxy config |

## 📝 Nginx Configuration
```nginx
upstream app1 {
    server app1:3001;
}

upstream app2 {
    server app2:3002;
}

server {
    listen 80;

    location /app1/ {
        proxy_pass http://app1/;
    }

    location /app2/ {
        proxy_pass http://app2/;
    }
}
```

## ✅ What We Learned
- Using Nginx as a reverse proxy
- Docker networking with container names
- Routing traffic to multiple containers
- Building and running multi-container setups

## 👤 Author
ashrock000

## 📅 Date
August 25, 2026

## 🔗 GitHub
https://github.com/ashrock000/docker-labs/tree/main/lab2-nginx

# CI/CD Pipeline — Frontend + Backend with GitHub Actions

## 📋 Overview
This lab implements a complete CI/CD pipeline for a frontend and backend application using:
- **GitHub Actions** for automation
- **AWS ECR** for image storage
- **AWS ECS Fargate** for deployment

## 🏗️ Architecture# CI/CD Pipeline — Frontend + Backend with GitHub Actions

## 📋 Overview
This lab implements a complete CI/CD pipeline for a frontend and backend application using:
- **GitHub Actions** for automation
- **AWS ECR** for image storage
- **AWS ECS Fargate** for deployment

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GITHUB REPOSITORIES                               │
│                                                                             │
│  ┌─────────────────────────┐          ┌─────────────────────────┐           │
│  │   frontend-app Repo     │          │   backend-app Repo      │           │
│  │                         │          │                         │           │
│  │  index.html             │          │  app.js                 │           │
│  │  server.js              │          │  package.json           │           │
│  │  package.json           │          │  Dockerfile             │           │
│  │  Dockerfile             │          │  .github/workflows/     │           │
│  │  .github/workflows/     │          │    deploy.yml           │           │
│  │    deploy.yml           │          │                         │           │
│  └───────────┬─────────────┘          └───────────┬─────────────┘           │
│              │                                    │                         │
│              │ Push → triggers                    │ Push → triggers         │
│              ▼                                    ▼                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         GITHUB ACTIONS                                │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐             │  │
│  │  │  Frontend Pipeline      │  │  Backend Pipeline       │             │  │
│  │  │                         │  │                         │             │  │
│  │  │  1. Build Frontend      │  │  1. Build Backend       │             │  │
│  │  │  2. Push to ECR         │  │  2. Push to ECR         │             │  │
│  │  │  3. Update ECS Service  │  │  3. Update ECS Service  │             │  │
│  │  └─────────────────────────┘  └─────────────────────────┘             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AWS CLOUD                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                              ECR                                    │    │
│  │  ┌──────────────────────┐  ┌──────────────────────┐                 │    │
│  │  │ lab1-frontend:latest │  │ lab1-backend:latest  │                 │    │
│  │  └──────────────────────┘  └──────────────────────┘                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          ECS Fargate                                │    │
│  │  ┌──────────────────────┐  ┌──────────────────────┐                 │    │
│  │  │  frontend-service    │  │  backend-service     │                 │    │
│  │  │  Public IP:          │  │  Private             │                 │    │
│  │  │  44.202.151.102:8080 │  │  (internal)          │                 │    │
│  │  └──────────────────────┘  └──────────────────────┘                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER ACCESS                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │              Application Accessible at:                             │    │
│  │              http://44.202.151.102:8080                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Technologies Used

| Technology | Purpose |
|------------|---------|
| **GitHub Actions** | CI/CD automation |
| **AWS ECR** | Container registry |
| **AWS ECS Fargate** | Serverless container orchestration |
| **Docker** | Containerization |
| **Node.js** | Application runtime |

## 📁 Repository Structure

## 📁 Code Repositories

| Repository | Link |
|------------|------|
| **Frontend App** | https://github.com/ashrock000/frontend-app |
| **Backend App** | https://github.com/ashrock000/backend-app |

Each repository contains:
- Application code
- Dockerfile
- GitHub Actions workflow (`.github/workflows/deploy.yml`)

### Frontend Repository (`frontend-app`)
```
frontend-app/
├── .github/workflows/deploy.yml
├── index.html
├── server.js
├── package.json
└── Dockerfile
```

### Backend Repository (`backend-app`)
```
backend-app/
├── .github/workflows/deploy.yml
├── app.js
├── package.json
└── Dockerfile
```

## 🚀 CI/CD Workflow

### Frontend Pipeline (`deploy.yml`)
```
1. Trigger: Push to main branch
         │
         ▼
2. Checkout code
         │
         ▼
3. Configure AWS credentials
         │
         ▼
4. Login to ECR
         │
         ▼
5. Build Docker image
         │
         ▼
6. Push image to ECR
         │
         ▼
7. Update ECS service
         │
         ▼
8. ✅ New version deployed
```

### Backend Pipeline (`deploy.yml`)
```
1. Trigger: Push to main branch
         │
         ▼
2. Checkout code
         │
         ▼
3. Configure AWS credentials
         │
         ▼
4. Login to ECR
         │
         ▼
5. Build Docker image
         │
         ▼
6. Push image to ECR
         │
         ▼
7. Update ECS service
         │
         ▼
8. ✅ New version deployed
```

## 📋 AWS Resources

| Resource | Name | Purpose |
|----------|------|---------|
| **ECR Repository** | `lab1-frontend` | Stores frontend images |
| **ECR Repository** | `lab1-backend` | Stores backend images |
| **ECS Cluster** | `lab1-cluster` | Runs containers |
| **Frontend Service** | `frontend-service` | Runs frontend tasks |
| **Backend Service** | `backend-service` | Runs backend tasks |

## 🌐 Access

| Service | URL |
|---------|-----|
| **Frontend** | `http://44.202.151.102:8080` |
| **Backend** | Private (internal) |

## 📸 Screenshots

| Screenshot | Description |
|------------|-------------|
| `cid-frontend-success-final.png` | Frontend GitHub Actions workflow (green) |
| `cid-backend-success-final.png` | Backend GitHub Actions workflow (green) |
| `cid-services.png` | ECS services running |
| `cid-task-definitions-frontend.png` | Frontend task definition |
| `cid-task-definitions-backend.png` | Backend task definition |
| `cid-app-frontend.png` | Application in browser |
| `cid-backend.png` | Backend response |

## ✅ Completion Checklist

- [x] Frontend repository with code and Dockerfile
- [x] Backend repository with code and Dockerfile
- [x] ECR repositories created
- [x] ECS cluster and services created
- [x] GitHub Actions workflows created
- [x] CI/CD pipeline working
- [x] Auto-deployment on push to main

## 🗓️ Date Completed
August 27, 2026

## 👤 Author
ashrock000

## 🔗 GitHub
- Frontend: https://github.com/ashrock000/frontend-app
- Backend: https://github.com/ashrock000/backend-app

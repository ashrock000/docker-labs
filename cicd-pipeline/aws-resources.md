# AWS Resources — CI/CD Pipeline

## 📋 Overview
This document lists all AWS resources created for the CI/CD pipeline.

## 📦 ECR Repositories

| Repository | URI | Purpose |
|------------|-----|---------|
| `lab1-frontend` | `242557074006.dkr.ecr.us-east-1.amazonaws.com/lab1-frontend` | Frontend Docker images |
| `lab1-backend` | `242557074006.dkr.ecr.us-east-1.amazonaws.com/lab1-backend` | Backend Docker images |

## 🗂️ ECS Cluster

| Name | Status | Services |
|------|--------|----------|
| `lab1-cluster` | ACTIVE | `frontend-service`, `backend-service`, `lab1-service` |

## 📝 Task Definitions

| Name | Revision | CPU | Memory | Containers |
|------|----------|-----|--------|------------|
| `frontend-task` | 1 | 256 | 512 | frontend |
| `backend-task` | 1 | 256 | 512 | backend |

## 🚀 ECS Services

| Service Name | Cluster | Task Definition | Desired Count | Running |
|--------------|---------|-----------------|---------------|---------|
| `frontend-service` | `lab1-cluster` | `frontend-task:1` | 1 | 1 |
| `backend-service` | `lab1-cluster` | `backend-task:1` | 1 | 1 |

## 🔐 Security Groups

| Group ID | Name | Rules |
|----------|------|-------|
| `sg-06fc04904d64d4ca2` | default | Port 8080 open to 0.0.0.0/0 |

## 🗄️ Database

| Component | Details |
|-----------|---------|
| **Engine** | SQLite3 |
| **Location** | Inside backend container at `/data/database.sqlite` |
| **Persistence** | Ephemeral (data is lost on container restart) |
| **Tables** | `entries` (id, text, timestamp) |
| **Backend Access** | Via environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` |

### Database Schema
```sql
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL
)
```

## 🌐 Public IPs

| Service | Public IP |
|---------|-----------|
| **Frontend** | `44.202.151.102:8080` |
| **Backend** | Private (internal) |

## 📋 Commands Used

### Create ECR Repositories
```bash
aws ecr create-repository --repository-name lab1-frontend
aws ecr create-repository --repository-name lab1-backend
```

### Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name lab1-cluster
```

### Register Task Definitions
```bash
aws ecs register-task-definition --cli-input-json file://frontend-task.json
aws ecs register-task-definition --cli-input-json file://backend-task.json
```

### Create Services
```bash
aws ecs create-service \
  --cluster lab1-cluster \
  --service-name frontend-service \
  --task-definition frontend-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-0f9628633552e07fe,subnet-07222ef9e0971cd20],securityGroups=[sg-06fc04904d64d4ca2],assignPublicIp=ENABLED}" \
  --desired-count 1

aws ecs create-service \
  --cluster lab1-cluster \
  --service-name backend-service \
  --task-definition backend-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-0f9628633552e07fe,subnet-07222ef9e0971cd20],securityGroups=[sg-06fc04904d64d4ca2],assignPublicIp=ENABLED}" \
  --desired-count 1
```

### Get Public IP
```bash
FRONTEND_TASK=$(aws ecs list-tasks --cluster lab1-cluster --service-name frontend-service --query "taskArns[0]" --output text)
FRONTEND_ENI=$(aws ecs describe-tasks --cluster lab1-cluster --tasks $FRONTEND_TASK --query "tasks[0].attachments[0].details[?name=='networkInterfaceId'].value" --output text)
FRONTEND_IP=$(aws ec2 describe-network-interfaces --network-interface-ids $FRONTEND_ENI --query "NetworkInterfaces[0].Association.PublicIp" --output text)
echo "Frontend IP: $FRONTEND_IP"
```

## ✅ Cleanup Commands
```bash
# Delete services
aws ecs update-service --cluster lab1-cluster --service frontend-service --desired-count 0
aws ecs delete-service --cluster lab1-cluster --service frontend-service --force
aws ecs update-service --cluster lab1-cluster --service backend-service --desired-count 0
aws ecs delete-service --cluster lab1-cluster --service backend-service --force

# Delete cluster
aws ecs delete-cluster --cluster lab1-cluster

# Delete ECR repositories
aws ecr delete-repository --repository-name lab1-frontend --force
aws ecr delete-repository --repository-name lab1-backend --force
```

## 🗓️ Date
August 27, 2026

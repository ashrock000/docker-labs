# Lab 3: AWS ECR + ECS Fargate Deployment

## 📋 Overview
This lab demonstrates deploying a containerized application to AWS using:
- **ECR** (Elastic Container Registry) to store Docker images
- **ECS Fargate** to run containers without managing servers

---

## 🏗️ Architecture

```
Local Docker Images
        |
        v
    AWS ECR
   (Registry)
        |
        v
  ECS Fargate
        |
    (Tasks/Containers)
```

---

## 🔧 Technologies Used

| Service | Purpose |
|---------|---------|
| **ECR** | Private container registry |
| **ECS Fargate** | Serverless container orchestration |
| **Docker** | Containerization |
| **AWS CLI** | Infrastructure management |

---

## 📁 Files

| File | Purpose |
|------|---------|
| `task-definition.json` | ECS task definition (blueprint) |
| `screenshots/` | Deployment screenshots |

---

## 🚀 Deployment Steps

### 1. Create ECR Repositories
```bash
aws ecr create-repository --repository-name lab1-frontend
aws ecr create-repository --repository-name lab1-backend
aws ecr create-repository --repository-name lab1-database
```

### 2. Authenticate Docker to ECR
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
```

### 3. Tag and Push Images
```bash
docker tag lab1-frontend:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/lab1-frontend:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/lab1-frontend:latest
```

### 4. Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name lab1-cluster
```

### 5. Register Task Definition
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

### 6. Create Service
```bash
aws ecs create-service \
  --cluster lab1-cluster \
  --service-name lab1-service \
  --task-definition lab1-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-zzz],assignPublicIp=ENABLED}" \
  --desired-count 1
```

### 7. Get Public IP
```bash
TASK_ARN=$(aws ecs list-tasks --cluster lab1-cluster --service-name lab1-service --query "taskArns[0]" --output text)
ENI_ID=$(aws ecs describe-tasks --cluster lab1-cluster --tasks $TASK_ARN --query "tasks[0].attachments[0].details[?name=='networkInterfaceId'].value" --output text)
PUBLIC_IP=$(aws ec2 describe-network-interfaces --network-interface-ids $ENI_ID --query "NetworkInterfaces[0].Association.PublicIp" --output text)
echo "Public IP: $PUBLIC_IP"
```

---

## 📸 Screenshots

| Screenshot | Description |
|------------|-------------|
| `ecr-images.png` | Images in ECR |
| `ecs-cluster.png` | ECS Cluster |
| `ecs-task.png` | Task Definition |
| `ecs-service.png` | Running Service |
| `ecs-app.png` | Application in browser |

---

## ✅ Completion Checklist

- [x] ECR repositories created
- [x] Images pushed to ECR
- [x] ECS Cluster created
- [x] Task Definition registered
- [x] Service running on Fargate
- [x] Application accessible via browser

---

## 🗓️ Date Completed
August 25, 2026

## 👤 Author
ashrock000

## 🔗 GitHub
https://github.com/ashrock000/docker-labs/tree/main/lab3-ecs

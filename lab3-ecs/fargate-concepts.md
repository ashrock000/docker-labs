# Fargate — Complete Concepts

## What is Fargate?
Fargate is a **serverless compute engine** for containers. It runs containers without you managing EC2 instances.

## Key Concepts

### 1. Task Definition
- **Blueprint** for running containers
- Defines: image, CPU, memory, environment variables, ports
- Example: `lab1-task:4`

### 2. Cluster
- **Logical group** of resources
- Where tasks and services run
- Example: `lab1-cluster`

### 3. Service
- **Ensures** a specific number of tasks are always running
- Restarts failed tasks
- Example: `lab1-service`

### 4. Task
- **Running instance** of a task definition
- Contains one or more containers
- Example: Fargate task with frontend + backend + database

### 5. ENI (Elastic Network Interface)
- **Virtual network card** for the task
- Provides: Private IP, Public IP (if enabled), Security Group

## Fargate Flow

Task Definition → Service → Fargate → ENI → Container → Accessible App


## Commands Used
```bash
# Create cluster
aws ecs create-cluster --cluster-name lab1-cluster

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster lab1-cluster \
  --service-name lab1-service \
  --task-definition lab1-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[...],securityGroups=[...],assignPublicIp=ENABLED}" \
  --desired-count 1

Get Public IP:

TASK_ARN=$(aws ecs list-tasks --cluster lab1-cluster --service-name lab1-service --query "taskArns[0]" --output text)
ENI_ID=$(aws ecs describe-tasks --cluster lab1-cluster --tasks $TASK_ARN --query "tasks[0].attachments[0].details[?name=='networkInterfaceId'].value" --output text)
PUBLIC_IP=$(aws ec2 describe-network-interfaces --network-interface-ids $ENI_ID --query "NetworkInterfaces[0].Association.PublicIp" --output text)

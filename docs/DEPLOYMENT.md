# Deployment Guide

This guide covers deploying the Waste2Value platform to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Mobile App Deployment](#mobile-app-deployment)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring & Logging](#monitoring--logging)

## Prerequisites

### Required Services

- **Cloud Provider**: AWS, GCP, or Azure
- **Database**: PostgreSQL 13+ with PostGIS extension
- **Cache**: Redis 6+
- **Container Registry**: Docker Hub, AWS ECR, or GCR
- **SSL Certificate**: Let's Encrypt or cloud provider
- **Domain Name**: Registered domain

### Required Tools

- Docker & Docker Compose
- kubectl (for Kubernetes)
- Cloud CLI (aws-cli, gcloud, or azure-cli)
- Node.js 16+
- Git

## Backend Deployment

### Option 1: Docker Compose (Simple)

**For small to medium deployments**

1. **Prepare Server**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Clone Repository**
```bash
git clone https://github.com/soumithspeaks/waste2value.git
cd waste2value
```

3. **Configure Environment**
```bash
cd backend
cp .env.example .env
# Edit .env with production values
nano .env
```

4. **Deploy**
```bash
docker-compose up -d
```

5. **Run Migrations & Seeds**
```bash
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed
```

### Option 2: Kubernetes (Scalable)

**For large-scale deployments**

1. **Build Docker Images**
```bash
cd backend
docker build -t your-registry/waste2value-backend:latest .
docker push your-registry/waste2value-backend:latest
```

2. **Create Kubernetes Manifests**

`k8s/deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: waste2value-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: waste2value-backend
  template:
    metadata:
      labels:
        app: waste2value-backend
    spec:
      containers:
      - name: backend
        image: your-registry/waste2value-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: waste2value-secrets
              key: db-host
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

`k8s/service.yaml`:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: waste2value-backend
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: waste2value-backend
```

3. **Deploy to Kubernetes**
```bash
kubectl apply -f k8s/
```

### Option 3: Serverless (AWS Lambda)

**For variable workloads**

1. Install Serverless Framework
```bash
npm install -g serverless
```

2. Create `serverless.yml`
```yaml
service: waste2value-backend

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    DB_HOST: ${env:DB_HOST}
    # Other env vars

functions:
  api:
    handler: src/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
```

3. Deploy
```bash
serverless deploy
```

## Mobile App Deployment

### iOS App Store

1. **Prepare App**
```bash
cd mobile-apps/user-app
npm install
cd ios
pod install
```

2. **Build for Release**
```bash
# Open Xcode
open Waste2ValueUser.xcworkspace

# Select "Any iOS Device"
# Product > Archive
# Distribute App > App Store Connect
```

3. **Submit to App Store**
- Log in to App Store Connect
- Create app listing
- Upload build
- Submit for review

### Google Play Store

1. **Generate Release APK**
```bash
cd mobile-apps/user-app
cd android

# Generate keystore (first time only)
keytool -genkeypair -v -keystore waste2value-release.keystore -alias waste2value -keyalg RSA -keysize 2048 -validity 10000

# Build release
./gradlew assembleRelease
```

2. **Upload to Play Console**
- Log in to Google Play Console
- Create app
- Upload APK/AAB
- Complete store listing
- Submit for review

## Database Setup

### PostgreSQL with PostGIS

**AWS RDS:**
```bash
aws rds create-db-instance \
  --db-instance-identifier waste2value-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 15.3 \
  --master-username admin \
  --master-user-password <strong-password> \
  --allocated-storage 100 \
  --backup-retention-period 7 \
  --storage-encrypted
```

**Enable PostGIS:**
```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
```

### Redis Setup

**AWS ElastiCache:**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id waste2value-cache \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

## Environment Configuration

### Production Environment Variables

```env
# Server
NODE_ENV=production
PORT=3000
API_VERSION=v1

# Database
DB_HOST=your-db-host.rds.amazonaws.com
DB_PORT=5432
DB_NAME=waste2value_prod
DB_USER=admin
DB_PASSWORD=<secure-password>

# Redis
REDIS_HOST=your-cache.cache.amazonaws.com
REDIS_PORT=6379

# Security
JWT_SECRET=<generate-strong-secret>
JWT_REFRESH_SECRET=<generate-strong-secret>

# APIs
GOOGLE_MAPS_API_KEY=<your-key>
RAZORPAY_KEY_ID=<your-key>
RAZORPAY_KEY_SECRET=<your-secret>

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
S3_BUCKET_NAME=waste2value-prod-uploads

# Firebase
FIREBASE_PROJECT_ID=<project-id>
FIREBASE_CLIENT_EMAIL=<service-account-email>
FIREBASE_PRIVATE_KEY=<private-key>

# ML Model
ML_MODEL_ENDPOINT=https://ml-api.waste2value.com/predict
ML_MODEL_API_KEY=<api-key>
```

### Secret Management

**AWS Secrets Manager:**
```bash
aws secretsmanager create-secret \
  --name waste2value/production \
  --secret-string file://secrets.json
```

**Kubernetes Secrets:**
```bash
kubectl create secret generic waste2value-secrets \
  --from-literal=db-password=<password> \
  --from-literal=jwt-secret=<secret>
```

## CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker Image
        run: |
          docker build -t ${{ secrets.DOCKER_REGISTRY }}/waste2value-backend:${{ github.sha }} backend/
          docker push ${{ secrets.DOCKER_REGISTRY }}/waste2value-backend:${{ github.sha }}
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/waste2value-backend \
            backend=${{ secrets.DOCKER_REGISTRY }}/waste2value-backend:${{ github.sha }}
```

## Monitoring & Logging

### Application Monitoring

**Prometheus + Grafana:**
```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

### Logging

**ELK Stack:**
- **Elasticsearch**: Store logs
- **Logstash**: Process logs
- **Kibana**: Visualize logs

**CloudWatch (AWS):**
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

### Error Tracking

**Sentry:**
```javascript
// backend/src/index.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Health Checks

### Endpoint
```
GET /health
```

### Response Monitoring
```bash
# Configure uptime monitoring (UptimeRobot, Pingdom, etc.)
curl -X POST https://api.uptimerobot.com/v2/newMonitor \
  -d "api_key=<your-key>" \
  -d "friendly_name=Waste2Value API" \
  -d "url=https://api.waste2value.com/health" \
  -d "type=1"
```

## Backup & Recovery

### Database Backups

**Automated Backups:**
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME | gzip > $BACKUP_DIR/backup_$TIMESTAMP.sql.gz

# Upload to S3
aws s3 cp $BACKUP_DIR/backup_$TIMESTAMP.sql.gz s3://waste2value-backups/
```

**Schedule with Cron:**
```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup-script.sh
```

## SSL/TLS Configuration

### Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.waste2value.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.waste2value.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.waste2value.com;

    ssl_certificate /etc/letsencrypt/live/api.waste2value.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.waste2value.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Performance Optimization

### Caching Strategy
- Redis for session storage
- CDN for static assets
- API response caching

### Database Optimization
- Connection pooling
- Query optimization
- Indexing critical fields

### Load Balancing
- Use nginx or cloud load balancer
- Distribute across multiple instances
- Health check endpoints

## Security Checklist

- [ ] SSL/TLS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] Helmet.js middleware active
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens implemented
- [ ] Regular security audits

## Rollback Plan

1. **Identify Issue**
2. **Stop Traffic** (if critical)
3. **Rollback Steps:**
```bash
# Kubernetes
kubectl rollout undo deployment/waste2value-backend

# Docker Compose
docker-compose down
git checkout <previous-commit>
docker-compose up -d
```
4. **Verify Rollback**
5. **Investigate & Fix**

## Post-Deployment

1. **Smoke Tests**: Test critical paths
2. **Monitor Logs**: Watch for errors
3. **Check Metrics**: CPU, memory, response times
4. **User Communication**: Announce new features

## Support

For deployment issues:
- Email: devops@waste2value.com
- Slack: #deployments
- Documentation: https://docs.waste2value.com

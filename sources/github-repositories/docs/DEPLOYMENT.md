# Deployment Guide

## Environments

### Development
```bash
NODE_ENV=development
DEBUG=*
LOG_LEVEL=debug
```

### Staging
```bash
NODE_ENV=staging
LOG_LEVEL=info
MONITORING=enabled
```

### Production
```bash
NODE_ENV=production
LOG_LEVEL=warn
MONITORING=enabled
SECURITY=enabled
```

## Pre-deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Documentation updated
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Database migrations ready

## Deployment Process

### Step 1: Prepare Release

```bash
# Create release branch
git checkout -b release/v1.0.0

# Update version
npm version patch

# Update CHANGELOG
npm run changelog

# Commit
git commit -am "chore: release v1.0.0"
```

### Step 2: Tag Release

```bash
git tag v1.0.0
git push origin release/v1.0.0 --tags
```

### Step 3: Build & Test

```bash
npm run build
npm test
npm run lint
```

### Step 4: Deploy

#### Option A: Docker Deployment

```bash
# Build image
docker build -t codex:1.0.0 .

# Push to registry
docker push codex:1.0.0

# Deploy
kubectl apply -f k8s/deployment.yaml
```

#### Option B: Heroku

```bash
git push heroku main
```

#### Option C: Cloud Platform (AWS, GCP, Azure)

See platform-specific guides in `/docs/deploy/`

## Post-deployment

```bash
# Verify deployment
curl https://api.codex.dev/health

# Monitor logs
docker logs -f container_id

# Check metrics
# Visit monitoring dashboard
```

## Rollback

```bash
# Revert to previous version
docker pull codex:0.9.9
docker run codex:0.9.9

# Or
kubectl rollout undo deployment/codex
```

## CI/CD Pipeline

GitHub Actions automatically:
- Runs tests
- Builds Docker image
- Runs security scan
- Deploys to staging
- (Manual approval for production)

See `.github/workflows/deploy.yml`

## Monitoring After Deployment

- Check application logs
- Monitor error rates
- Track performance metrics
- Verify database connections
- Test critical features

## Troubleshooting

**500 Error**
```bash
# Check logs
docker logs container_id

# Verify database connection
npm run db:check
```

**Slow performance**
```bash
# Check resources
docker stats

# Review slowest endpoints
npm run perf:report
```

See individual project deployment guides for specifics.

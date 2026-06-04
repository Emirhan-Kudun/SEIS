# Docker Development Guide

## Quick Start

### Using docker-compose

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Building Docker Images

```bash
# Build image
docker build -t codex:latest .

# Run container
docker run -p 3000:3000 codex:latest

# With environment
docker run -e NODE_ENV=development -p 3000:3000 codex:latest
```

## Services Included

### Codex (Node.js)
- App: Port 3000
- Database: PostgreSQL
- Cache: Redis

### DeepSeek-Coder (Python)
- App: Port 8000
- Database: PostgreSQL

### Website
- App: Port 3000
- Proxy: Nginx

## Development Workflow

```bash
# Start development environment
docker-compose up

# View logs in real-time
docker-compose logs -f

# Execute commands in container
docker-compose exec app npm test

# Stop and remove containers
docker-compose down
```

## Production Deployment

```bash
# Build for production
docker build -t codex:prod --target production .

# Run with production settings
docker run \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://... \
  -p 3000:3000 \
  codex:prod
```

## Docker Commands Reference

```bash
# Images
docker images                    # List images
docker build -t name:tag .      # Build image
docker rmi image_id             # Remove image

# Containers
docker ps                        # List running containers
docker ps -a                     # List all containers
docker logs container_id         # View logs
docker exec -it container_id sh # Shell into container

# Docker Compose
docker-compose up               # Start services
docker-compose down             # Stop services
docker-compose ps              # List services
docker-compose logs app        # View app logs
```

## Best Practices

✅ Use Alpine images for smaller size
✅ Multi-stage builds for optimization
✅ Non-root users in containers
✅ Health checks for monitoring
✅ Volume mounts for development
✅ Environment variable management

## Troubleshooting

**Port already in use**
```bash
docker-compose down
# Kill process on port
lsof -ti:3000 | xargs kill -9
```

**Container won't start**
```bash
docker logs container_id
# Check docker-compose.yml
docker-compose config
```

See Docker documentation for more information.

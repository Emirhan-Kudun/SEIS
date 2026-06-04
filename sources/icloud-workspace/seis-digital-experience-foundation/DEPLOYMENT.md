# Deployment & Infrastructure Guide

## Quick Start

### Local Development
```bash
npm install
npm start
# Server running at http://localhost:4173
```

### Docker Deployment

#### Build Docker Image
```bash
docker build -t emirhan-kudun-portfolio:latest .
```

#### Run with Docker
```bash
docker run -p 4173:4173 emirhan-kudun-portfolio:latest
```

#### Using Docker Compose
```bash
# Production setup
docker-compose up

# Development with hot reload
docker-compose --profile dev up portfolio-dev
```

---

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables:
- ` Server port (default: 4173)PORT`
- `NODE_ Environment (development|production)ENV`
- `RATE_LIMIT_MAX_ Contact form limit (default: 8)CONTACTS`

---

## Security Headers

The following security headers are applied:
- **Strict-Transport- Forces HTTPSSecurity**
- **X-Content-Type- Prevents MIME sniffingOptions**
- **X-Frame- Prevents clickjackingOptions**
- **Content-Security- Restricts resourcesPolicy**

See `config/security.js` for details.

---

## CORS Configuration

Allowed origins (in `config/security.js`):
- `http://localhost:3000`
- `http://localhost:4173`
- `https://emirhankudun.com`

Add more origins as needed.

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure HTTPS/SSL certificate
- [ ] Update CORS allowed origins
- [ ] Set up error tracking (Sentry)
- [ ] Enable health checks
- [ ] Configure log aggregation
- [ ] Set up monitoring & alerts
- [ ] Test rate limiting
- [ ] Verify security headers
- [ ] Load test the application

---

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:4173/health
```

Response:
```json
{
  "status": "operational",
  "uptime": 1234,
  "timestamp": "2026-05-18T22:05:48Z"
}
```

### Docker Health Check
Included in Dockerfile and docker-compose.yml
- Interval: 30 seconds
- Timeout: 3 seconds
- Retries: 3

---

## Performance Optimization

- **Multi-stage Docker  Smaller production imagesbuild**
- **Rate  Built-in protectionlimiting**
- **Caching  Static assets cachedheaders**
- ** Response compression enabledCompression**

---

## Troubleshooting

### Port Already in Use
```bash
# Use different port
PORT=4174 npm start
```

### Docker Build Fails
```bash
# Clear build cache
docker system prune -a
docker build -t emirhan-kudun-portfolio:latest .
```

### Permissions Error
```bash
# Reset permissions
chmod -R 755 ./
```

---

## Deployment Platforms

### Heroku
```bash
heroku login
heroku create emirhan-kudun-portfolio
git push heroku main
heroku open
```

### AWS ECS / Docker Hub
```bash
docker tag emirhan-kudun-portfolio:latest myregistry/emirhan-portfolio:latest
docker push myregistry/emirhan-portfolio:latest
```

### Vercel (Frontend only)
Not recommended (backend required). Use Heroku or AWS.

---

## API Reference

See `docs/API.md` for complete API documentation.

---

**Last Updated:** 2026-05-18

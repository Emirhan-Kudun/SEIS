# Monitoring & Health Checks

## Health Endpoint

### GET /health
Returns server health status

**Response:**
```json
{
  "status": "operational",
  "uptime": 3600,
  "timestamp": "2026-05-18T22:14:08Z"
}
```

---

## Metrics Endpoint

### GET /metrics
Returns detailed application metrics

**Response:**
```json
{
  "uptime": 3600,
  "startedAt": "2026-05-18T21:14:08Z",
  "requestCount": 1245,
  "contactFormSubmissions": 12,
  "totalErrors": 3,
  "avgRequestTime": "289ms",
  "memoryUsage": {
    "rss": 52428800,
    "heapTotal": 31522816,
    "heapUsed": 15835136,
    "external": 2580992
  },
  "cpuUsage": {
    "user": 1234567,
    "system": 234567
  }
}
```

---

## Logging System

### Log Levels
- **error** - Critical errors that need immediate attention
- **warn** - Warning messages for non-critical issues
- **info** - General informational messages
- **debug** - Detailed debugging information

### Configuration
```bash
LOG_LEVEL=info      # Set in .env
LOG_FORMAT=json     # JSON structured logging
```

### Log Files
Logs are stored in `./logs/YYYY-MM-DD.log`

Each log entry contains:
- `timestamp` - ISO timestamp
- `level` - Log level
- `message` - Log message
- `environment` - NODE_ENV value
- `pid` - Process ID
- Additional data fields

---

## Docker Health Checks

Docker containers include health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4173/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
```

Check container health:
```bash
docker ps --filter "label=health"
docker inspect --format="{{.State.Health.Status}}" <container_id>
```

---

## Performance Metrics

### Request Metrics
- Total requests
- Average response time
- Error rate

### Application Metrics
- Contact form submissions
- Total errors
- Memory usage
- CPU usage
- Uptime

---

## Monitoring Services Integration

### Uptime Monitoring
```bash
# Ping health endpoint every 5 minutes
*/5 * * * * curl -f http://localhost:4173/health || alert
```

### Error Tracking
Configure Sentry integration:
```bash
SENTRY_DSN=https://key@sentry.io/project
```

### Performance Monitoring
Monitor metrics endpoint:
```bash
curl http://localhost:4173/metrics | jq .avgRequestTime
```

---

## Alerting Rules

### Critical Alerts
- Server down (health check fails)
- Error rate > 5%
- Memory usage > 80%

### Warning Alerts
- Average response time > 1s
- Contact form submission failures
- CPU usage > 70%

---

## Log Aggregation

For production, aggregate logs from:
```
./logs/YYYY-MM-DD.log
```

Example aggregation commands:
```bash
# View today's logs
cat logs/$(date +%Y-%m-%d).log | jq 'select(.level=="error")'

# Search for specific errors
grep "error" logs/*.log | jq .

# Get error count
grep '"level":"error"' logs/*.log | wc -l
```

---

**Last Updated:** 2026-05-18

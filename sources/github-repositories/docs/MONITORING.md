# Monitoring & Observability

## Grafana Dashboards

### Installation (Docker)

```yaml
version: '3.8'
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./dashboards:/etc/grafana/provisioning/dashboards
      - ./datasources:/etc/grafana/provisioning/datasources
  
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

volumes:
  grafana_data:
  prometheus_data:
```

### prometheus.yml

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'codex'
    static_configs:
      - targets: ['localhost:9100']
  
  - job_name: 'node-app'
    static_configs:
      - targets: ['localhost:9090']
```

## Key Metrics to Monitor

### Application Metrics
- Request count (by endpoint)
- Response time (p50, p95, p99)
- Error rate (by status code)
- Active connections
- Memory usage
- CPU usage

### Business Metrics
- User sign-ups
- Conversion rate
- API calls per user
- Feature usage
- Customer satisfaction

### Infrastructure Metrics
- Server uptime
- Database performance
- Cache hit rate
- Network latency
- Disk usage

## Alerting

```yaml
# prometheus-rules.yml
groups:
  - name: codex
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        annotations:
          summary: "High error rate detected"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, http_request_duration_seconds) > 1
        annotations:
          summary: "Slow response times"
```

## Tools Integration

### Prometheus Exporter

```typescript
// Node.js with prom-client
import client from 'prom-client';

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route.path, res.statusCode)
      .observe(duration);
  });
  next();
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

## Dashboard Examples

### Key Metrics Dashboard
- Error rate (graph)
- Request latency (heatmap)
- Service uptime (gauge)
- Top endpoints (bar chart)
- Request volume (time series)

### Performance Dashboard
- CPU usage (graph)
- Memory usage (graph)
- Database queries (stat)
- API response times (table)
- Cache hit rate (gauge)

## Setting Up Alerts

1. **Slack Integration**
   - Webhook: https://hooks.slack.com/...
   - Alert rules send notifications

2. **Email Alerts**
   - SMTP configuration
   - Alert recipients

3. **PagerDuty**
   - Escalation policies
   - On-call schedules

## Running Locally

```bash
# Start Prometheus + Grafana
docker-compose up

# Access Grafana
# URL: http://localhost:3000
# Username: admin
# Password: admin

# Access Prometheus
# URL: http://localhost:9090
```

See monitoring dashboards configuration files.

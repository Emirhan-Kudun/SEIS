# Log Aggregation & Management

## ELK Stack Setup

### Docker Compose

```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    ports:
      - "5000:5000/udp"
    volumes:
      - ./logstash.conf:/usr/share/logstash/config/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

### logstash.conf

```
input {
  udp {
    port => 5000
    codec => json
  }
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [type] == "nodejs" {
    mutate {
      add_field => { "[@metadata][index_name]" => "app-nodejs-%{+YYYY.MM.dd}" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "%{[@metadata][index_name]}"
  }
}
```

## Application Logging

### Winston Configuration

```typescript
// src/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'codex-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
```

### Using Logger

```typescript
logger.info('User logged in', { userId: 123, timestamp: new Date() });
logger.error('Database connection failed', { error: err.message });
logger.warn('High memory usage', { memory: process.memoryUsage() });
```

## Log Levels

| Level | Usage |
|-------|-------|
| error | Critical failures |
| warn | Potential issues |
| info | Important events |
| http | HTTP requests |
| debug | Development info |

## Log Retention

```yaml
# Logstash index management
PUT _ilm/policy/app-policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0d",
        "actions": {
          "rollover": {
            "max_primary_store_size": "50gb"
          }
        }
      },
      "warm": {
        "min_age": "30d",
        "actions": {
          "set_priority": { "priority": 50 }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}
```

## Kibana Queries

```
# All errors
level: "error"

# By service
service: "codex-api"

# By time range
@timestamp: [now-1d TO now]

# Specific endpoint
method: "POST" AND path: "/api/users"

# Slow requests
response_time: >1000
```

## Accessing Logs

```bash
# Kibana UI
http://localhost:5601

# Elasticsearch API
curl http://localhost:9200/_search?q=error

# Log streaming
docker logs -f container_id
```

## Best Practices

✅ Structured logging (JSON)
✅ Appropriate log levels
✅ Add request IDs for tracing
✅ Log errors with stack traces
✅ Avoid logging sensitive data
✅ Set retention policies
✅ Regular log cleanup
✅ Monitor log disk usage

See MONITORING.md for related tools.

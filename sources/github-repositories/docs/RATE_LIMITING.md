# Rate Limiting & Throttling

## Implementation Options

### Express Rate Limit

```bash
npm install express-rate-limit
```

### Setup

```typescript
import rateLimit from 'express-rate-limit';

// Basic limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Apply to all requests
app.use(limiter);

// Apply to specific routes
app.post('/login', limiter, (req, res) => {
  // Handle login
});
```

### Per-User Rate Limiting

```typescript
const apiLimiter = rateLimit({
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use IP
    return req.user?.id || req.ip;
  },
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  skip: (req) => {
    // Skip rate limiting for admins
    return req.user?.role === 'admin';
  },
});

app.use('/api/', apiLimiter);
```

### Redis Store

```typescript
import RedisStore from 'rate-limit-redis';
import redis from 'redis';

const redisClient = redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:', // key prefix
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

## Rate Limit Strategies

### Global Limits
- 100 requests per minute (all users)
- Reduces server load
- Protects against DDoS

### User Limits
- 50 requests per minute (authenticated users)
- 10 requests per minute (unauthenticated)
- Prevents abuse

### API Endpoint Limits
- `/login`: 5 attempts per 15 minutes
- `/api/search`: 30 per minute
- `/api/upload`: 10 per hour

## Response Headers

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1635789000
```

## Error Response

```json
{
  "error": "Too many requests",
  "retryAfter": 15,
  "message": "Please try again in 15 minutes"
}
```

## Advanced Configuration

```typescript
const limiter = rateLimit({
  // Skip certain requests
  skip: (req) => {
    return req.user?.isAdmin;
  },

  // Custom key generator
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },

  // Custom handler
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests',
      retryAfter: req.rateLimit.resetTime,
    });
  },

  // Custom message
  message: async (req, res) => {
    return `You have made too many requests. Please try again later.`;
  },

  // Store configuration
  store: new RedisStore({
    client: redisClient,
    prefix: 'rate-limit:',
  }),
});
```

## Monitoring

```typescript
// Log rate limit hits
app.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode === 429) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userId: req.user?.id,
        endpoint: req.path,
      });
    }
  });
  next();
});
```

## Best Practices

✅ Implement rate limiting early
✅ Use Redis for scalability
✅ Different limits per endpoint
✅ Whitelist trusted IPs
✅ Monitor and adjust limits
✅ Inform users via headers
✅ Provide clear error messages
✅ Log violations

See API guidelines for limits.

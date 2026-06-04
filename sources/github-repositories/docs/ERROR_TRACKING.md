# Error Tracking & Sentry Integration

## Sentry Setup

### Installation

```bash
npm install @sentry/node @sentry/tracing
```

### Configuration

```typescript
// src/sentry.ts
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export function initSentry(app) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Express.Tracing(),
    ],
    beforeSend: (event) => {
      // Filter out certain errors
      if (event.exception) {
        const error = event.exception.values[0];
        if (error.type === 'NetworkError') {
          return null; // Don't send network errors
        }
      }
      return event;
    },
  });

  // Request handler
  app.use(Sentry.Handlers.requestHandler());
  
  // Performance monitoring
  app.use(Sentry.Handlers.tracingHandler());

  // Error handler
  app.use(Sentry.Handlers.errorHandler());

  return app;
}
```

### Usage in Code

```typescript
import * as Sentry from '@sentry/node';

// Capture exception
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Capture message
Sentry.captureMessage('Something happened', 'warning');

// Add context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

Sentry.setContext('character', {
  name: 'Mighty Fighter',
  level: 19,
});

// Add breadcrumbs
Sentry.addBreadcrumb({
  category: 'database',
  message: 'User query',
  level: 'info',
  data: { query: 'SELECT * FROM users' },
});
```

## Error Groups

Sentry automatically groups similar errors:
- Same stack trace
- Same error type
- Same message pattern

Group errors for easier management.

## Issue Workflow

1. **Error Occurs** → Sentry captures it
2. **Alert Sent** → Slack/Email notification
3. **Team Review** → Check error details
4. **Investigation** → Look at context/breadcrumbs
5. **Fix & Deploy** → Code changes
6. **Release Tracking** → Mark version as fixed
7. **Resolution** → Close issue

## Sentry Dashboard Features

### Issues
- View all errors
- Group by error type
- Assign to team members
- Set priority

### Performance
- Slow transactions
- Bottleneck identification
- Performance metrics

### Release Tracking
```typescript
Sentry.captureException(error, {
  release: process.env.APP_VERSION,
});
```

### Custom Events

```typescript
Sentry.captureEvent({
  message: 'User action',
  level: 'info',
  tags: {
    feature: 'checkout',
    action: 'purchase',
  },
  extra: {
    orderId: 123,
    amount: 99.99,
  },
});
```

## Alert Rules

### Email Alerts
- Critical errors
- New error types
- Error spike detection

### Slack Integration
```
1. Add Sentry app to Slack workspace
2. Configure channel: #errors
3. Set alert rules
```

## Local Development

```bash
# Disable Sentry in development
SENTRY_DSN=null npm run dev

# Or use different project
SENTRY_DSN=https://different@sentry.io/different npm run dev
```

## Privacy & Compliance

```typescript
beforeSend: (event) => {
  // Remove sensitive data
  if (event.request?.cookies) {
    delete event.request.cookies;
  }
  if (event.extra?.password) {
    event.extra.password = '[REDACTED]';
  }
  return event;
}
```

## Metrics

```typescript
// Time an operation
const end = Sentry.captureCheckIn({
  monitorSlug: 'periodic-job',
  status: 'in_progress',
});

// ... do work ...

end('ok');
```

See error handling documentation for more.

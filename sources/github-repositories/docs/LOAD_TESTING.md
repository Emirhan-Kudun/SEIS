# Load Testing & Performance Benchmarking

## k6 Setup

### Installation

```bash
npm install --save-dev k6
# Or download from https://k6.io/docs/getting-started/installation/
```

### Load Test Script

```javascript
// tests/load/api-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp-up
    { duration: '5m', target: 100 }, // Stay at 100
    { duration: '2m', target: 0 },   // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function() {
  // Get request
  let getResp = http.get('http://localhost:3000/api/users');
  check(getResp, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Post request
  const payload = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
  });

  let postResp = http.post(
    'http://localhost:3000/api/users',
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  check(postResp, {
    'post status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
```

## Running Load Tests

```bash
# Run test
k6 run tests/load/api-test.js

# With specific VUs (Virtual Users)
k6 run -u 50 -d 30s tests/load/api-test.js

# With environment
k6 run --env URL=https://api.example.com tests/load/api-test.js

# Output results to JSON
k6 run -o json=results.json tests/load/api-test.js
```

## Test Scenarios

### Spike Test
```javascript
export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '30s', target: 1000 }, // Sudden spike
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};
```

### Stress Test
```javascript
export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 0 },
  ],
};
```

### Soak Test
```javascript
export const options = {
  stages: [
    { duration: '5m', target: 100 }, // Ramp up
    { duration: '30m', target: 100 }, // Soak
    { duration: '5m', target: 0 },    // Ramp down
  ],
};
```

## Performance Thresholds

```javascript
export const options = {
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],
    'http_req_failed': ['rate<0.1'],
    'http_req_duration{staticAsset:yes}': ['p(99)<1000'],
    'http_req_duration{staticAsset:no}': ['p(99)<5000'],
  },
};
```

## Metrics

- **http_req_duration**: Response time
- **http_req_failed**: Failed requests
- **http_reqs**: Total requests
- **http_req_waiting**: Time waiting
- **http_req_connecting**: Connection time
- **vus**: Virtual users

## Apache JMeter

### Installation
```bash
# Download from https://jmeter.apache.org/
# Extract and run: bin/jmeter.sh
```

### Test Plan Structure
1. Thread Group (users, ramp-up)
2. HTTP Requests
3. Listeners (results)
4. Assertions

## Results Analysis

```bash
# View summary
k6 run results.json --summary

# Analyze with Grafana
k6 run -o cloud tests/load/api-test.js
```

## Best Practices

✅ Define clear thresholds
✅ Test realistic scenarios
✅ Monitor database impact
✅ Test at different times
✅ Gradual ramp-up
✅ Measure response times
✅ Track error rates
✅ Monitor infrastructure

See performance documentation for targets.

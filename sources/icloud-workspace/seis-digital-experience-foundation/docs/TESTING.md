# Testing Guide

## Setup

### Install Testing Dependencies
```bash
npm install --save-dev jest
```

### Jest Configuration
Jest is configured in `jest.config.js` with:
- Node.js test environment
- ESM module support
- Coverage thresholds (50%)
- Test files discovery patterns

---

## Running Tests

### Run All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

---

## Test Structure

### Unit Tests
Located in `__tests__/` directory

Example test file: `__tests__/logger.test.js`

```javascript
describe('Logger', () => {
  describe('error', () => {
    it('should log error messages', () => {
      // Test logic
    });
  });
});
```

---

## Available Tests

### Logger Tests (`__tests__/logger.test.js`)
-  Error logging
-  Warning logging
-  Info logging
-  Debug logging

### Metrics Tests (`__tests__/metrics.test.js`)
-  Request counting
-  Contact submission tracking
-  Error tracking
-  Metrics retrieval
-  Metrics reset

---

## Writing New Tests

### Basic Test Structure
```javascript
describe('Module Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  it('should do something', () => {
    // Test code
    expect(result).toBe(expected);
  });

  afterEach(() => {
    // Cleanup after each test
  });
});
```

### Common Assertions
```javascript
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(array).toContain(item);
expect(fn).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(arg);
```

---

## Mocking

### Mock Functions
```javascript
const mockFn = jest.fn();
mockFn('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
```

### Spy on Methods
```javascript
const spy = jest.spyOn(console, 'log').mockImplementation();
// ... test code ...
spy.mockRestore();
```

---

## E2E Testing

### Contact Form Test
```javascript
it('should submit contact form', async () => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Test message'
    })
  });

  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.success).toBe(true);
});
```

---

## CI/CD Integration

### GitHub Actions
Tests run automatically on:
- Push to main or feature branches
- Pull requests
- Multiple Node.js versions (18, 20, 24)

See `.github/workflows/build-and-test.yml`

### Local Pre-Commit Hook
```bash
npm test && npm run lint
```

---

## Coverage Requirements

Current thresholds (50%):
- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

To view coverage report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

---

## Troubleshooting

### Tests Won't Run
```bash
npm install --save-dev jest
npm test
```

### Module Not Found
Ensure Jest is configured for ESM:
- Use `"type": "module"` in package.json
- Jest 29.5.0+ has native ESM support

### Async Tests Timeout
Increase timeout in test:
```javascript
it('should do async work', async () => {
  // test code
}, 10000); // 10 second timeout
```

---

## Best Practices

1. **One test per behavior** - Each test should verify one thing
2. **Clear test names** - Describe what is being tested
3. **Use setup/teardown** - Clean up state before/after tests
4. **Mock external services** - Don't call real APIs in tests
5. **Test edge cases** - Test both happy path and error cases
6. **Keep tests fast** - Slow tests discourage running them

---

**Last Updated:** 2026-05-18
**Test Framework:** Jest 29.5.0+
**Node Versions:** 18, 20, 24

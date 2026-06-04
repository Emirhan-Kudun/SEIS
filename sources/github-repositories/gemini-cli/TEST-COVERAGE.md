# gemini-cli Test Coverage Improvement Plan

## Current Status

- Test Framework: Jest/Vitest (existing)
- Coverage Target: 80%+
- Focus Areas: Core CLI functionality, API integration, error handling

## Test Coverage Strategy

### Phase 1: Core Functionality Tests

```bash
# Command parsing and execution
├── test/cli/parser.test.ts
├── test/cli/executor.test.ts
├── test/cli/commands.test.ts
└── test/cli/options.test.ts
```

Key tests:
- ✅ Command line argument parsing
- ✅ Flag handling
- ✅ Help output
- ✅ Version output
- ✅ Error handling for invalid inputs

### Phase 2: API Integration Tests

```bash
# API interaction tests
├── test/api/client.test.ts
├── test/api/endpoints.test.ts
├── test/api/auth.test.ts
└── test/api/errors.test.ts
```

Key tests:
- ✅ Successful API calls
- ✅ Error responses
- ✅ Rate limiting
- ✅ Authentication
- ✅ Retry logic

### Phase 3: Integration Tests

```bash
# End-to-end CLI workflows
├── test/integration/workflows.test.ts
├── test/integration/output.test.ts
└── test/integration/scenarios.test.ts
```

Key scenarios:
- ✅ Full command execution
- ✅ Piped output
- ✅ File handling
- ✅ Configuration loading

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test test/cli/parser.test.ts

# Run with coverage report
npm test -- --coverage

# Watch mode for development
npm test -- --watch

# Generate HTML coverage report
npm test -- --coverage --coverageReporters=html
```

## Coverage Goals

| Area | Current | Target |
|------|---------|--------|
| CLI Commands | 70% | 90% |
| API Client | 65% | 85% |
| Utils | 80% | 95% |
| Overall | 72% | 85%+ |

## Implementation Timeline

- **Week 1**: Command parsing tests
- **Week 2**: API integration tests
- **Week 3**: Integration tests
- **Week 4**: Edge cases and refinement

## Quick Start

```bash
# Install testing dependencies
npm install -D @testing-library/node jest @types/jest

# Create test file
touch test/cli/parser.test.ts

# Run tests
npm test
```

## Sample Test

```typescript
describe('CLI Parser', () => {
  it('should parse valid arguments', () => {
    const result = parseArgs(['--model', 'gemini-pro']);
    expect(result.model).toBe('gemini-pro');
  });

  it('should throw on invalid arguments', () => {
    expect(() => parseArgs(['--invalid'])).toThrow();
  });
});
```

## CI/CD Integration

Tests run automatically on:
- ✅ Pull requests
- ✅ Commits to main branch
- ✅ Pre-commit hook

See [.github/workflows/ci.yml](../.github/workflows/ci.yml)

## Coverage Report

Generate and view reports:

```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

## Next Steps

1. [ ] Set up Jest configuration
2. [ ] Write parser tests
3. [ ] Add API mock tests
4. [ ] Create integration tests
5. [ ] Achieve 85%+ coverage
6. [ ] Set up coverage CI check

---

Questions? See [CONTRIBUTING.md](../CONTRIBUTING.md)

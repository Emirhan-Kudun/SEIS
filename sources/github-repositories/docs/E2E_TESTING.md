# E2E Testing with Cypress & Playwright

## Cypress Setup

### Installation

```bash
npm install --save-dev cypress
npx cypress open
```

### Configuration (cypress.config.ts)

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
```

## Example E2E Test

```typescript
// cypress/e2e/auth.cy.ts
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('wrong@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .should('contain', 'Invalid credentials');
  });
});
```

## Playwright Setup

### Installation

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Configuration (playwright.config.ts)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Example Playwright Test

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete checkout', async ({ page }) => {
    // Add product to cart
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('[data-testid="cart-count"]'))
      .toContainText('1');

    // Go to checkout
    await page.click('[data-testid="checkout-button"]');
    await expect(page).toHaveURL(/.*checkout/);

    // Fill checkout form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="address"]', '123 Main St');

    // Complete purchase
    await page.click('[data-testid="place-order"]');
    await expect(page).toHaveURL(/.*confirmation/);

    // Verify confirmation
    await expect(page.locator('[data-testid="order-number"]'))
      .toBeVisible();
  });
});
```

## Visual Regression Testing

```typescript
// tests/e2e/visual.spec.ts
test('should match snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

## Running Tests

```bash
# Cypress
npx cypress open
npx cypress run
npx cypress run --headless

# Playwright
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright show-report
```

## Best Practices

✅ Use data-testid attributes
✅ Test user workflows, not implementation
✅ Keep tests independent
✅ Wait for elements properly
✅ Mock API responses when needed
✅ Take screenshots on failures
✅ Run tests in parallel
✅ Test accessibility
✅ Test responsive design
✅ CI/CD integration

## CI/CD Integration

```yaml
# GitHub Actions
- name: Run E2E Tests
  run: npm run test:e2e

- name: Upload Results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

See framework documentation for advanced features.

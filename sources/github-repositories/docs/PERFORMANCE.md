# Performance Monitoring & Optimization

## Lighthouse CI Setup

### Installation

```bash
npm install --save-dev @lhci/cli@^0.11.0
```

### Configuration (.lighthouserc.json)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3,
      "settings": {
        "configPath": "./lighthouse.config.js"
      }
    },
    "upload": {
      "target": "filesystem",
      "outputDir": "./lh-results"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.90}],
        "categories:best-practices": ["error", {"minScore": 0.90}],
        "categories:seo": ["error", {"minScore": 0.90}]
      }
    }
  }
}
```

### GitHub Actions Integration

```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    uploadArtifacts: true
    temporaryPublicStorage: true
```

## Performance Budget

### bundlesize Configuration

```bash
npm install --save-dev bundlesize
```

**.bundlesize.json**
```json
{
  "files": [
    {
      "path": "dist/*.js",
      "maxSize": "200kb"
    },
    {
      "path": "dist/*.css",
      "maxSize": "50kb"
    },
    {
      "path": "dist/images/*",
      "maxSize": "100kb"
    }
  ]
}
```

## Web Vitals Monitoring

### Setup

```bash
npm install web-vitals
```

### Code

```typescript
import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTFB | < 600ms |

## Monitoring Tools

- **Google Lighthouse**: Built-in browser audit
- **WebPageTest**: Detailed performance analysis
- **DataBox**: Real User Monitoring (RUM)
- **Sentry**: Error and performance tracking
- **New Relic**: APM and infrastructure
- **DataDog**: Full-stack monitoring

## CI/CD Integration

Add to GitHub Actions:
```yaml
- name: Check performance
  run: npm run lighthouse
```

## Quick Commands

```bash
# Run Lighthouse CI
npx lhci autorun

# Check bundle size
npx bundlesize

# Generate report
npm run performance:report
```

See [BUILD-OPTIMIZATION.md](../Website/BUILD-OPTIMIZATION.md) for more.

# Build Optimization Tools

## Installation

```bash
npm install --save-dev \
  @vitejs/plugin-vue \
  rollup-plugin-visualizer \
  rollup-plugin-terser \
  vite-plugin-compression \
  vite-plugin-image-optimization
```

## Scripts for package.json

```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --analyze",
    "preview": "vite preview",
    "analyze:bundle": "webpack-bundle-analyzer dist/stats.json"
  }
}
```

## Performance Targets

### Bundle Size
- Main bundle: < 200KB (gzipped)
- Vendor chunk: < 150KB (gzipped)
- No chunk > 100KB

### Load Times
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

## Optimization Strategies

### 1. Code Splitting
```javascript
// Automatic code splitting
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['vue', 'router'],
    }
  }
}
```

### 2. Image Optimization
```bash
# Install image optimizer
npm install --save-dev sharp imagemin

# Commands
npx imagemin src/images --out-dir=dist/images
```

### 3. CSS Optimization
```bash
# Install PurgeCSS
npm install --save-dev purgecss

# Remove unused CSS
npx purgecss --css src/style.css --content src/**/*.vue
```

### 4. Compression
```bash
# Enable Brotli compression
npm install --save-dev compression-webpack-plugin

# In webpack config:
plugins: [
  new CompressionPlugin({
    algorithm: 'brotliSize',
  })
]
```

## Monitoring

### Bundle Analysis
```bash
npm run build:analyze
```

### Lighthouse
```bash
npm install --save-dev @lhci/cli@^0.8.0

# Run audit
lhci autorun
```

### Performance Budget
```bash
npm install --save-dev bundlesize

# In .bundlesize.json:
{
  "files": [
    {
      "path": "dist/*.js",
      "maxSize": "200kb"
    }
  ]
}
```

## CI/CD Integration

Add to GitHub Actions:
```yaml
- name: Build and analyze
  run: npm run build:analyze

- name: Check bundle size
  run: npm run bundlesize
```

See optimization guides in each project.

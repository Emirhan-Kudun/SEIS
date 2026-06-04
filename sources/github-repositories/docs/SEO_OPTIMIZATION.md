# SEO Optimization

## Meta Tags

### HTML Head Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Essential meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Title & Description -->
  <title>Codex - Modern Development Platform | {keyword}</title>
  <meta name="description" content="Description under 160 characters for search results">
  
  <!-- Keywords -->
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  
  <!-- Open Graph (Social Media) -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
</html>
```

## Structured Data (Schema.org)

```html
<!-- JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Codex",
  "url": "https://codex.dev",
  "logo": "https://codex.dev/logo.png",
  "description": "Modern development platform",
  "sameAs": [
    "https://twitter.com/codex",
    "https://github.com/codex"
  ]
}
</script>
```

## Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/blog</loc>
    <lastmod>2024-05-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## robots.txt

```
# robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml
```

## Performance for SEO

### Page Speed Metrics
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

### Optimization
- Image optimization
- Code splitting
- Lazy loading
- Caching strategy
- CDN usage

## URL Structure

```
# ❌ Bad
example.com/p?id=123&category=products

# ✅ Good
example.com/products/electronics/laptop-123
```

## Content Guidelines

### Headings
- One H1 per page
- Logical hierarchy (H1 → H2 → H3)
- Include keywords naturally

### Content Quality
- 300+ words per page
- Unique content
- Regular updates
- Fast load times

### Internal Linking
```html
<a href="/blog/seo-tips" title="SEO Tips Guide">
  Learn SEO best practices
</a>
```

## Monitoring & Tools

### Google Search Console
- Submit sitemap
- Monitor search queries
- Check indexing
- Track rankings

### Analytics
- Track organic traffic
- Monitor conversion rates
- Identify top pages
- User behavior

### Tools
- **Google PageSpeed**: Performance
- **Lighthouse**: Audit
- **Screaming Frog**: Crawl analysis
- **SEMrush**: Competition analysis
- **Ahrefs**: Backlink analysis

## SEO Checklist

- [ ] Meta tags
- [ ] Structured data
- [ ] Sitemap submitted
- [ ] robots.txt
- [ ] Fast page speed
- [ ] Mobile responsive
- [ ] SSL certificate
- [ ] Unique content
- [ ] Internal links
- [ ] No broken links
- [ ] Proper headings
- [ ] Image alt text

## Implementation Example

```typescript
// Next.js example
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Codex</title>
        <meta name="description" content="Home page" />
        <meta property="og:title" content="Home | Codex" />
        <meta property="og:description" content="Home page" />
      </Head>
      <main>
        {/* Content */}
      </main>
    </>
  );
}
```

See SEO best practices guide for more.

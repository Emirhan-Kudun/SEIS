# Accessibility (a11y) Implementation

## WCAG 2.1 Compliance

### Level A (Basic)
- Keyboard navigation
- Alt text for images
- Color not sole indicator
- Sufficient contrast (4.5:1 text, 3:1 large)

### Level AA (Recommended)
- Focus visible
- Error messages
- Meaningful headings
- Form labels

### Level AAA (Advanced)
- Enhanced contrast (7:1)
- Sign language interpretation
- Extended audio descriptions

## Testing Tools

### Installation

```bash
npm install --save-dev axe-core eslint-plugin-jsx-a11y
npm install --save-dev @axe-core/react
```

### Automated Testing

```typescript
// tests/accessibility.test.ts
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## HTML Best Practices

### Semantic HTML

```html
<!-- ❌ Bad -->
<div onclick="navigate()">Click here</div>

<!-- ✅ Good -->
<button onclick="navigate()">Navigate</button>
<a href="/page">Navigate</a>
```

### Form Labels

```html
<!-- ❌ Bad -->
<input type="text" placeholder="Name">

<!-- ✅ Good -->
<label for="name">Name:</label>
<input id="name" type="text">
```

### Images

```html
<!-- ❌ Bad -->
<img src="chart.png">

<!-- ✅ Good -->
<img src="chart.png" alt="Sales data from Q1 2024">
```

### Headings

```html
<!-- ❌ Bad -->
<h1>Main Title</h1>
<h3>Subtitle</h3> <!-- Skips h2 -->

<!-- ✅ Good -->
<h1>Main Title</h1>
<h2>Subtitle</h2>
<h3>Sub-section</h3>
```

## Color & Contrast

### Contrast Checker

```typescript
// Use tools like WCAG Contrast Checker
// Minimum: 4.5:1 for normal text
// Minimum: 3:1 for large text

// CSS variable example
const colors = {
  text: '#000000',      // black
  background: '#ffffff', // white
  // Contrast ratio: 21:1 ✅
};
```

### Color Not Sole Indicator

```css
/* ❌ Bad - relies only on color */
.error { color: red; }

/* ✅ Good - uses icon + text + color */
.error {
  color: red;
}
.error::before {
  content: '⚠️';
}
```

## Keyboard Navigation

```typescript
// Implement keyboard support
<div
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
>
  Button
</div>
```

## ARIA Attributes

```html
<!-- Announce dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Loading...
</div>

<!-- Label inputs -->
<input aria-label="Email address" type="email">

<!-- Describe regions -->
<nav aria-label="Main navigation">
  <!-- navigation items -->
</nav>

<!-- Show relationships -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<div id="menu">
  <!-- menu items -->
</div>
```

## Screen Reader Testing

```bash
# Tools
- NVDA (Windows, free)
- JAWS (Windows, commercial)
- VoiceOver (Mac, free)
- TalkBack (Android, free)
```

## Accessibility Checklist

- [ ] Semantic HTML
- [ ] Keyboard navigation
- [ ] Alt text for images
- [ ] Color contrast ≥ 4.5:1
- [ ] Form labels
- [ ] Error messages
- [ ] Focus visible
- [ ] ARIA where needed
- [ ] No auto-playing media
- [ ] Captions for videos
- [ ] Meaningful link text

## Tools

- **Axe DevTools**: Browser extension
- **Lighthouse**: In Chrome DevTools
- **WAVE**: Browser extension
- **Pa11y**: Command-line tool
- **Deque**: Comprehensive platform

See testing documentation for implementation.

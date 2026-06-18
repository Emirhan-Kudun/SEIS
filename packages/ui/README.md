# @seis/ui — UI primitives

> **Open module — MIT licensed.** Second SEIS open module under the hybrid
> governance model. Carries its own [`LICENSE`](./LICENSE) (MIT) and is listed in
> the open-modules registry. Part of the
> [SEIS Design System](../../docs/design/seis-design-system.md).

Dependency-free, accessible CSS UI primitives built on the open
[`@seis/design-tokens`](../design-tokens). Calm, compact, operational — for SEIS
internal tools and dashboards.

## Usage

```css
@import "@seis/design-tokens/seis.tokens.css";
@import "@seis/ui/seis.ui.css";
```

```html
<button class="seis-button seis-button--primary">Save</button>
<input class="seis-field" placeholder="Search…" />
<span class="seis-badge seis-badge--ok">Synced</span>
<div class="seis-card"><h3 class="seis-card__title">Status</h3>…</div>
```

## Primitives

[`seis.ui.css`](./seis.ui.css) provides: `.seis-button` (+ `--primary`),
`.seis-field` (with `aria-invalid` state), `.seis-badge` (+ `--ok/--warn/--alert`),
`.seis-card` (+ `__title`), and `.seis-link`. All share one focus ring
(`--seis-focus`) and honor `prefers-reduced-motion`.

## Scope

Compact operational UI for SEIS internal tools and dashboards (buttons, fields,
status badges, cards, link cards, dashboard primitives). Avoid decorative
landing-page patterns for internal tools.

## Principles

- Accessible: visible focus, sufficient contrast, semantic HTML expected.
- Dependency-free: pure CSS over `--seis-*` tokens; no build step.
- Token-driven: visual decisions live in `@seis/design-tokens`, not here.

## Contributing

Welcome under MIT + the SEIS [Code of Conduct](../../CODE_OF_CONDUCT.md). Keep
primitives token-driven, accessible, and dependency-free.

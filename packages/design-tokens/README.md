# SEIS Design Tokens

> **Open module — MIT licensed.** This directory is the **first SEIS open
> module** under the hybrid governance model. It carries its own
> [`LICENSE`](./LICENSE) (MIT) and is listed in the open-modules registry, so it
> is open source even though the SEIS core remains closed. See
> [`CONTRIBUTING.md`](../../CONTRIBUTING.md) and
> [the hybrid resolution ADR](../../docs/decisions/seis-hybrid-governance-resolution.md).

The SEIS design tokens — a small, dependency-free set of CSS custom properties
for the SEIS visual language (calm, cinematic, dark-first).

## Usage

Import the stylesheet and consume the variables:

```css
@import "@seis/design-tokens/seis.tokens.css";

.button {
  background: var(--seis-surface-strong);
  color: var(--seis-text);
  border: 1px solid var(--seis-border);
  border-radius: var(--seis-radius);
}

.button:focus-visible {
  box-shadow: var(--seis-focus);
}
```

## Tokens

[`seis.tokens.css`](./seis.tokens.css) defines color, text, accent, radius, and
focus tokens on `:root` (with `color-scheme: dark`). Accent colors: gold, teal,
rose. All tokens are namespaced `--seis-*`.

## Contributing

External contributions are welcome here under the MIT license and the SEIS
[Code of Conduct](../../CODE_OF_CONDUCT.md). Keep tokens minimal, accessible
(maintain contrast), and dependency-free.

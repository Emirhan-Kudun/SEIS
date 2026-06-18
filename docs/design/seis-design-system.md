# SEIS Design System

The SEIS Design System is the open, token-driven visual foundation for SEIS
surfaces. It operationalizes the design direction in the constitution
([V14 §21 Design Direction](../governance/seis-master-prompt-v14.md) and
[§41 Design System Governance](../governance/seis-master-prompt-v14.md)) as real,
shippable code.

It is the first SEIS **area** assembled entirely from **open modules** (hybrid
model): both layers below are MIT-licensed and externally consumable, while the
SEIS product core stays closed.

## Layers

| Layer | Module | License | What it is |
| --- | --- | --- | --- |
| Tokens | [`packages/design-tokens`](../../packages/design-tokens) | MIT | `--seis-*` CSS custom properties (color, text, accent, radius, focus). |
| Primitives | [`packages/ui`](../../packages/ui) | MIT | Dependency-free, accessible CSS primitives built on the tokens. |

Tokens hold every visual decision; primitives consume tokens and add no new
colors or magic numbers of their own. Consume them together:

```css
@import "@seis/design-tokens/seis.tokens.css";
@import "@seis/ui/seis.ui.css";
```

## Principles (from V14 §21 / §41)

- **Design is infrastructure.** Tokens and primitives are versioned, documented,
  and CI-guarded — not ad-hoc styles.
- **Token-driven.** Colors, spacing, radius, and focus live in tokens; nothing
  hard-codes them downstream.
- **Calm & compact.** Operational clarity over decoration; restraint over noise.
- **Accessible by default.** Visible focus (`--seis-focus`), sufficient contrast,
  semantic HTML, and `prefers-reduced-motion` support.
- **Dependency-free.** Pure CSS, no build step, easy to adopt and maintain.

## Surface binding

The `apps/web` surface is bound to this system as the single source of truth:
`npm run check:design-system` verifies every `--seis-*` token referenced in
`apps/web` CSS is defined in
[`packages/design-tokens/seis.tokens.css`](../../packages/design-tokens/seis.tokens.css),
catching drift in CI without requiring a bundler.

## Governance

- Both modules are registered in
  [`content/governance/open-modules.json`](../../content/governance/open-modules.json)
  and the [`CONTRIBUTING.md`](../../CONTRIBUTING.md) open-modules table.
- `npm run check:open-modules` enforces that each carries its own LICENSE and is
  registered; `npm run check:doc-links` keeps this document's links valid.

## Roadmap

- Document a spacing scale token set as the system grows.
- Add primitives only when a real SEIS surface needs them (no speculative
  components — V14 §44 anti-bloat).

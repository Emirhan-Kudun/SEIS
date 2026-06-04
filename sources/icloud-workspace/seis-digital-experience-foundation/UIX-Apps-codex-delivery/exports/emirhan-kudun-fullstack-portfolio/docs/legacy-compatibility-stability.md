# Legacy Compatibility and Premium Stability Layer

The portfolio keeps the static HTML/CSS/JavaScript surface as the primary experience. Modern behavior is treated as progressive enhancement, not as a requirement for reading, navigation, or contact discovery.

## Principles

- Preserve semantic HTML and readable source structure.
- Keep CSS modular, fallback-safe, and editable in legacy tools where reasonable.
- Keep JavaScript lightweight and defensive.
- Avoid framework lock-in for simple portfolio sections.
- Prefer native browser capabilities and graceful degradation.
- Keep the full-stack layer dependency-light and portable.

## Stability Decisions

- The page now exposes a `no-js` class on the root element and removes it only after JavaScript starts successfully.
- Reveal and hero content remain visible when JavaScript is disabled or partially fails.
- Modern CSS values such as `clamp()`, `min()`, and `svh` are paired with older fallback values where they affect core layout.
- The custom cursor hover enlargement is guarded behind `@supports selector(...)` so unsupported browsers ignore it cleanly.
- The Node full-stack server uses built-in modules only and does not require a frontend build pipeline.

## Compatibility Targets

- Dreamweaver-compatible editing where reasonable.
- Static hosting with PHP fallback.
- Node runtime hosting for the optional full-stack API.
- Slow-network and external-resource failure tolerance.
- Animation failure tolerance through visible default content.

## Non-Goals

- No forced framework migration.
- No heavy animation libraries.
- No WebGL dependency.
- No fragile build pipeline for the portfolio surface.

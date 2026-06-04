# Cinematic Depth Layer

The cinematic depth layer adds a restrained atmospheric surface to the development cockpit without adding a dependency or heavy GPU work.

## Runtime Endpoint

```text
GET /api/cinematic-depth
```

The endpoint returns the current canvas mode, reduced-motion fallback, and low-power render settings.

## Source Contract

```text
config/cinematic-depth.json
```

The config is intentionally small. Tune `particleCount`, `depthLayers`, `frameIntervalMs`, and `opacity` here before changing JavaScript.

## Accessibility

- The canvas is decorative and `aria-hidden`.
- Low Motion mode pauses animation and leaves a static depth grid.
- The layer is scoped to the development cockpit instead of the whole page.

## Validation

```bash
npm run check:cinematic-depth
```

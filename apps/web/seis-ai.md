# SEIS AI · Hermes (web surfaces)

Public-facing SEIS AI presence, branded around **Hermes** — the SEIS
orchestrator agent that fuses the strengths of major AI/technology labs
and conducts the SEIS sub-agents and curated plugins.

Static, dependency-free, no build step. Turkish-first with an EN toggle.

## Files

| File | Surface |
| --- | --- |
| [`seis-ai.html`](./seis-ai.html) | Marketing site: hero, capabilities, sub-agents gallery, plugin gallery, flow, pricing, about, contact |
| [`hermes.html`](./hermes.html) | Hermes agent console (offline interactive demo) |
| [`seis-ai.css`](./seis-ai.css) | Premium dark theme (local `--hermes-*` vars mirroring the SEIS token palette) |
| [`seis-ai.js`](./seis-ai.js) | TR/EN i18n, scroll reveal, footer year |
| [`hermes-console.js`](./hermes-console.js) | Console routing + simulated orchestration |

## Notes

- The console is an **offline demo**: no network calls, no backend. Routing
  is keyword-based and responses are canned, matching the SEIS "no automatic
  deploy / honest state" rules.
- The stylesheet intentionally uses `--hermes-*` (not `--seis-*`) custom
  properties so `npm run check:design-system` has nothing to validate here,
  while still mirroring the canonical gold/teal/rose palette.
- Bilingual content lives Turkish-first in the HTML; English overrides live in
  `seis-ai.js` keyed by `data-i18n`.

## Related

- Existing operations cockpit: [`cockpit.html`](./cockpit.html)
- Web lane direction: [`README.md`](./README.md)

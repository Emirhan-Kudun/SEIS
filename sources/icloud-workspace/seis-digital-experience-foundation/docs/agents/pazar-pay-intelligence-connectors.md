# Pazar Payi Intelligence Connectors

This connector lane prepares SEIS for market-share-oriented analysis without
turning paid or account-scoped intelligence tools into always-on infrastructure.

## Connector Families

- Search visibility: `semrush`, `conductor`, `ranked-ai`.
- Brand share-of-voice: `conductor`, `brand24`, `waldo`.
- Ecommerce demand: `particl-market-research`, `semrush`.
- B2B GTM signal: `demandbase`, `channel99`, `cb-insights`.
- Capital-market context: `pitchbook`, `quartr`, `daloopa`,
  `mt-newswires`, `alpaca`, `binance`.

## Guardrail

Pazar payi is not a single universal number. Treat each connector as a signal
source, then state the metric boundary:

- search share;
- visibility share;
- conversation share;
- ecommerce assortment or demand signal;
- company, funding, public market, or news context.

## Commands

```bash
node scripts/pazar-pay-intelligence-check.cjs
node seis/connector-orchestration/runner.cjs --dry-run --group pazar-pay-intelligence --format markdown
```

## Presets

- `seo-share-snapshot`: safest first-pass market visibility view.
- `brand-voice-snapshot`: brand conversation and sentiment signal.
- `ecommerce-demand-snapshot`: product/category demand and pricing signal.
- `b2b-gtm-position`: account and channel demand signal.
- `capital-context-watch`: public/private market and news context.

Use `seis/pazar-pay-intelligence/report-template.json` for outputs so every
connector step, skipped reason, and confidence label is visible.

## Coding Rule

Do not wire a paid market connector into runtime code first. Start with a
dry-run plan, define the market metric, and keep connector usage as a scoped
analysis step.

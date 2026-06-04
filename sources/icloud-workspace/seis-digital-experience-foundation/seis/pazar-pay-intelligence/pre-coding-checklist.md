# Pazar Payi Intelligence Pre-Coding Checklist

Use this before activating market-share, competitor, ecommerce, or brand
intelligence connectors.

## 1. Metric Scope

- Define the category, geography, audience, time window, and competitor set.
- Decide whether the request needs share-of-search, share-of-voice,
  ecommerce demand, B2B GTM signal, or capital-market context.
- Do not collapse estimated traffic, sentiment, search visibility, and sales
  share into one metric.

## 2. Connector Safety

- Run:

```bash
node scripts/pazar-pay-intelligence-check.cjs
node seis/connector-orchestration/runner.cjs --dry-run --group pazar-pay-intelligence --format markdown
```

- Select a preset from `connector-presets.json` before activating connectors.
- Use `metric-router.json` when the request is underspecified.
- Keep paid data retrieval, account reads, CRM mutation, campaign edits, and
  financial decisions blocked until explicitly approved.
- Record inaccessible connectors as `skipped_with_reason`.

## 3. Output Safety

- Label estimates as estimates.
- Include confidence and source boundaries.
- Use `report-template.json` for connector-step records and skipped reasons.
- Avoid public-facing claims without source-backed definitions.
- Keep recommendations as suggested actions unless implementation is approved.

# Universal Execution Contract

## Objective

Run-level mandatory coverage for all connectors and all MCP entries while preserving guarded-write and branch safety.

## Mandatory Coverage Rule

- Each run MUST include at least one step record for every connector in `config/connector-catalog.json`.
- Each run MUST include at least one step record for every MCP entry in `config/mcp-catalog.json`.
- Coverage can be fulfilled by `invoked` or `skipped_with_reason` status.

## Required Step Shape

Each step MUST include:

- `target`
- `target_type` (`connector|mcp|core`)
- `status` (`invoked|skipped_with_reason`)
- `execution_mode` (`full_action|light_probe`)
- `reason`
- `duration_ms`
- `next_action`

Back-compat field:

- `connector` remains present as a mirror of `target` for existing consumers.

## Runtime Policy

- Core failures are blocking (`hard-fail`).
- Non-core failures do not fail the run automatically; they must emit `skipped_with_reason` with a concrete `next_action`.
- Budget gate may degrade non-core execution from `full_action` to `light_probe` without removing mandatory step coverage.

## Guarded Write

- Write scope remains limited to reports and ledger/config artifacts defined by orchestration contracts.
- `suggested -> approved -> implemented` lifecycle and dual approval rules remain active.

## Reporting

Each universal report must include:

- `run_id`, `timestamp`, `timezone`, `steps`, `risk_summary`, `summary`, `suggested_actions`
- `summary_metrics.connector_steps_count`
- `summary_metrics.mcp_steps_count`
- `summary_metrics.budget_degraded_count`

# Ledger Contract

## Files

- `plan-ledger.json`
- `content-intake-ledger.json`
- `connector-coverage-ledger.json`

## `plan-ledger.json` required fields

- `version`
- `mode`
- `approval_gate`
  - `type`
  - `sources`
  - `approval_expiry_days`
  - `stale_suggested_days`
- `rolling_policy`
  - `type`
  - `cadence`
- `sprints[]`
  - `sprint_id`
  - `window_start`
  - `window_end`
  - `objective`
  - `kpi`
  - `status`
  - `approval_state`
  - `owner`
  - `due_date`
  - `source_ref`

## `content-intake-ledger.json` required fields

- `version`
- `policy`
  - `mode`
  - `quality_threshold`
  - `dedup`
  - `read_only`
  - `blocked_keywords`
- `sources`
  - `behance_registry`
  - `zip_paths`
  - `folder_paths`
- `candidates[]`
  - `candidate_id`
  - `source_type`
  - `category`
  - `quality_score`
  - `duplicate_group`
  - `action_state`

## `connector-coverage-ledger.json` required fields

- `version`
- `month`
- `timezone`
- `coverage[]`
  - `connector_name`
  - `tier`
  - `last_status`
  - `last_run_at`
  - `monthly_coverage_state`
- `summary`
  - `total_connectors`
  - `covered_connectors`
  - `target`
  - `status`

-- SEIS connector readiness surface for relational persistence handoff.
-- This query is intentionally static and side-effect free.
SELECT
  'seis-foundation' AS system_name,
  'mission-gate' AS workflow_stage,
  CURRENT_TIMESTAMP AS observed_at,
  'ready_for_validation' AS status;

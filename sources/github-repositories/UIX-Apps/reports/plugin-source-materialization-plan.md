# Plugin Source Materialization Plan

Generated: 2026-06-03

## Summary

- Plugins: 300
- Materialization step records: 2100
- Generated source visible plugins: 300
- External source bound plugins: 300
- Blocked until auth plugins: 280
- Session runtime ready plugins: 20
- Repository materialization allowed plugins: 0
- Live download allowed plugins: 0
- Live connector invocation allowed plugins: 0
- Credential commit allowed plugins: 0
- Vendor payload commit allowed plugins: 0
- Runtime payload commit allowed plugins: 0

## Policy

- Materialization: manifest_only_materialization_until_authenticated_task_scope
- Repository payload policy: no_credentials_vendor_payloads_runtime_payloads_or_live_connector_results_in_git
- Download handling: manifest_reference_only_until_authenticated_task_scope
- Connection handling: connector_reference_only_until_task_scope_and_auth

## Materialization States

- blocked_until_authenticated_task_scope: 280
- session_runtime_reference_ready: 20

## Validation Commands

- `npm run check:plugin-source-materialization-plan`
- `npm run check:plugin-source-acquisition-plan`
- `npm run check:plugin-download-readiness`
- `npm run check:plugin-cache-evidence`
- `npm run check:external-source-bindings`
- `npm run check:plugin-activation-gates`
- `npm run check:plugin-environment-sources`
- `npm run check:cloud-environment`

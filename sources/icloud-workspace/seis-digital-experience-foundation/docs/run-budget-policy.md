# Run Budget Policy

The run budget policy keeps scheduled automation and orchestration work bounded
before it touches heavier validation or shipment paths.

## Source

- Config: `config/run-budget-policy.json`
- Check: `npm run check:run-budget`

## Automation Profile Coverage

Every `run_profile` used by `config/automation-schedules.json` must exist in the
budget policy. This keeps heartbeats, daily low-power checks, shipment preflight,
and broader sweeps from falling back to an accidental default profile.

## Low-Power Profiles

`heartbeat_low_power_development` is capped at a short, low-parallelism window so
the 10-minute continuation loop can inspect state, apply one small reversible
slice when safe, and then stop.

`full_efficiency_machine_light_shipment` degrades to `preflight_only` so shipment
automation can report blockers without retrying remote push or server upload.

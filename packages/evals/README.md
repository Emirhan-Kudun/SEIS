# @seis/evals

Evaluation criteria for SEIS AI Core outputs.

Status: **specification** (part of SEIS Language v0.1). Closed-code by default;
see [`open-modules.json`](../../content/governance/open-modules.json).

## What it scores

| Dimension | Question |
|---|---|
| Response quality | Is the output correct, clear, and on-task? |
| Safety | No secrets, no leaked/proprietary material, within boundaries? |
| Architecture alignment | Consistent with SEIS structure and ADRs? |
| Documentation quality | Accurate, linked, honestly named? |
| Code quality | Maintainable, scoped, rollback-safe? |
| Task completion | Did it actually finish the request? |

## Rules

- Run the lightest reliable check first; scale only with blast radius.
- Never claim a check passed if it was not run; record skipped checks honestly.
- Evaluation criteria are versioned alongside SEIS language versions.

Start with these criteria as documentation; add executable harnesses later only
when a real need exists. Do not overbuild.

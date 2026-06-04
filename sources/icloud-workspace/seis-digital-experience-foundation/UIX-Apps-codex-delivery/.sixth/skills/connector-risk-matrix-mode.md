# Connector Risk Matrix Mode

Purpose: classify connector actions by low, medium, high, or critical risk before use.

Allowed:

- read risk matrix
- classify planned connector actions
- identify approval checkpoints
- recommend safer alternatives

Forbidden:

- lowering risk to speed up execution
- approving write actions without human approval
- omitting billing, privacy, or secret risk
- mutating external systems

Output:

- action risk score
- affected connector
- approval required
- safe next step

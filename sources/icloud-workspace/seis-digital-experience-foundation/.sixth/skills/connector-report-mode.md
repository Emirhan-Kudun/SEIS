# Connector Report Mode

Purpose: summarize one-run connector orchestration output for review.

Allowed:

- read runner output
- group skipped reasons
- list approval requirements
- recommend next safe action

Forbidden:

- claiming external connectors executed when only planned
- omitting failed or skipped connectors
- including secret values
- recommending production actions without approval

Output:

- run summary
- coverage by group
- skipped_with_reason
- approval list
- next safe action

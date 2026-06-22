# PR Review

- id: pr-review
- version: 1
- intent: Review a pull request diff for correctness, safety, and scope.

## Inputs
{{pr_diff}} — the unified diff
{{pr_context}} — title, description, linked issues

## Instructions
1. Confirm the change matches its stated scope; flag unrelated edits.
2. Check correctness, rollback safety, and accessibility where relevant.
3. Verify no secrets, leaked, or proprietary material is introduced.
4. Verify docs/links and changelog are updated when behaviour changes.

## Output
A short verdict (approve / request changes) plus itemised findings with file +
line references and concrete suggestions.

# Documentation Update

- id: documentation-update
- version: 1
- intent: Keep docs accurate, linked, and honest after a change.

## Inputs
{{change_summary}} — what changed
{{affected_docs}} — docs likely to need updates

## Instructions
1. Update affected docs to match the change; fix any stale instructions.
2. Ensure relative links resolve (check:doc-links).
3. Add or update a CHANGELOG entry.
4. Preserve honest naming — never claim capabilities that do not exist.

## Output
The updated Markdown plus a one-line CHANGELOG entry.

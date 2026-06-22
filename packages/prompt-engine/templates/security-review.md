# Security Review

- id: security-review
- version: 1
- intent: Check a change for secrets, leaks, and clean-room/license risks.

## Inputs
{{change_set}} — files or diff to review

## Instructions
1. Scan for API keys, tokens, `.env*`, private keys, and credentials.
2. If sensitive material is found: do not print it; note only that it appears to
   exist; recommend removal and rotation; update `.gitignore`.
3. Check for leaked or proprietary third-party material (clean-room rule).
4. Confirm provider credentials are env-based, not hardcoded.

## Output
A risk list with severity and remediation — never including secret values.

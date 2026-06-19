# Repository Scan

- id: repository-scan
- version: 1
- intent: Produce a safe, structured report of a repository's state before edits.

## Inputs
{{repo_path}} — root to scan

## Instructions
1. Inspect root files, folder structure, and existing docs.
2. Identify missing foundation files and risky/sensitive files (do not print
   secret contents — only note that they appear to exist).
3. Classify folders and flag duplicates or outdated instructions.
4. Recommend a safe, minimal implementation plan.

## Output
Sections: current state, missing foundation, folder classification, risky files,
duplicates, recommendation, safe plan.

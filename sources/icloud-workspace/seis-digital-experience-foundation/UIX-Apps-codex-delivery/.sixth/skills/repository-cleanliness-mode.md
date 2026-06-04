# Repository Cleanliness Mode

Purpose: keep active source clean and separate from generated artifacts.

Allowed:

- inspect staged and untracked files
- identify archives, exports, backups, and temp outputs
- recommend ignore or archive strategy
- flag source-control noise

Forbidden:

- deleting files without approval
- staging unrelated files
- committing `node_modules`
- hiding generated artifacts

Output:

- cleanliness score
- risky files
- archive recommendations
- staged-scope warning

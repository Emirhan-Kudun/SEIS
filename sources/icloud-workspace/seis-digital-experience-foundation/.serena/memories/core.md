# Core

- Project path resolves through symlink: `/Users/emirhan/Documents/New project` -> `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/New project`.
- Current tree is not a git checkout in this location; do not assume git commands work here.
- SEIS website foundation with static build/release tooling, server adapters, polyglot content, and docs.
- Read `mem:tech_stack` for build/runtime layout, `mem:conventions` for SEIS design/engineering rules, `mem:suggested_commands` for low-power commands, `mem:task_completion` before finishing coding tasks.
- Main user constraint: high-efficiency / low-power mode; avoid heavy validation loops, browser automation, Docker, broad indexing, and dependency bloat unless explicitly requested.
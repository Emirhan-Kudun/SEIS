# Software Language Branch Foundation

The canonical branch is now treated as a governed polyglot foundation.

This does not mean every language gets runtime code immediately. It means the branch can preserve, plan, and promote many software language lanes without turning the repo into a noisy mixed stack.

## Supported Lanes

The current matrix lives in `config/software-language-matrix.json` and covers:

- HTML
- CSS
- JavaScript
- TypeScript
- Node.js
- PHP
- Python
- Java
- C++
- C Sharp
- Bash
- SQL
- JSON
- YAML
- Go
- Rust
- Ruby
- Swift
- Kotlin
- Dart
- R
- Lua
- Elixir
- Scala
- HCL
- Markdown

This brings the governed branch matrix to 26 software and handoff lanes while keeping each non-runtime language as a small reference starter.

## Runtime Surface

The lightweight Node server exposes the matrix at:

```text
GET /api/software-languages
```

This keeps the branch state visible to future deployment, review, or documentation systems.

## Promotion Rule

A language can move from `reference` or `planned` into runtime code only when it has:

- a scoped purpose
- a rollback note
- a quality check
- no new dependency bloat unless there is a clear runtime need
- a documented source or handoff surface

## Validation

Run:

```bash
npm run check:software-languages
```

The check verifies required languages, category coverage, translation tech-stack continuity, server endpoint visibility, and handoff metadata.

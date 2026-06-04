# SEIS GitHub Language Presence

Mission: `SEIS-M014`

This layer makes the existing SEIS polyglot foundation more visible and governable on GitHub without adding runtime dependency bloat.

## Machine Contract

```text
data/seis/github-language-presence.json
```

Runtime endpoint:

```text
/api/seis-github-language-presence
```

Generate:

```bash
npm run generate:seis-github-language-presence
```

Validate:

```bash
npm run check:seis-github-language-presence
```

## GitHub Linguist Strategy

GitHub language charts are based on files and Linguist classification, not project intention. SEIS already has a broad `polyglot/` reference surface, so this mission adds explicit `.gitattributes` hints for the polyglot showcase.

Important rule:

```text
polyglot/** linguist-vendored=false linguist-generated=false
```

This keeps the polyglot reference files visible instead of treating them as vendored or generated code.

## Scope

The presence gate checks:

- `polyglot/manifest.json` entry count
- `config/software-language-matrix.json` language count
- missing polyglot files
- unique file-extension diversity
- GitHub Linguist override count
- showcase languages such as TypeScript, Python, Go, Rust, Swift, Kotlin, Java, C++, C#, PHP, Ruby, Dart, R, Elixir, Erlang, F#, Zig, Vue, Svelte, TSX, JSX, SQL, Bash, Dockerfile, HCL, and GraphQL

## Non-Goal

Do not install frameworks or package dependencies only to influence GitHub language charts. A language can move from reference to runtime only after a small contract, quality check, and rollback note exist.

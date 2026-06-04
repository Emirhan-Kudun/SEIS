# UI-UX Digital Lab

This workspace is a clean, dependency-light foundation for the SEIS creative experience operating system: UI-UX Digital Lab. It keeps legacy zip analysis separate from the new architecture so valuable assets can be curated without dragging old implementation debt forward.

## Current State

- The active folder was not a Git working tree during setup.
- Legacy zip archives were found outside this folder under `/Users/emirhan/Downloads/PortfolioWebsite`.
- No legacy file was copied into the clean app surface.
- 20 selected drawing assets were curated into the new public media layer.
- A static, dependency-free web foundation was added under `apps/web` for low-power review.
- A UI-UX Digital Lab operating-model layer now documents experience modes, AI workflow readiness, accessibility governance, and enterprise creative operations.
- The deploy package now preserves Lab OS content, strategy docs, deploy runbooks, and polyglot contracts before live upload.
- The polyglot branch surface includes JavaScript, TypeScript, Node.js, Python, Ruby, PHP, Go, Rust, Swift, Kotlin, Dart, Bash, Java, C#, SQL, Lua, YAML, Cloudflare Worker, Docker, Nginx/Apache config, C, C++, Elixir, Erlang, Haskell, Scala, R, Julia, Perl, Zig, Clojure, F#, PowerShell, TOML, XML, OCaml, ReasonML, Nim, Crystal, Groovy, Objective-C, Visual Basic, MATLAB, Fortran, COBOL, Racket, Scheme, Prolog, D, V, GraphQL, OpenAPI, JSON Schema, WebAssembly Text, HCL, Protocol Buffers, Avro, AsyncAPI, JSON-LD, INI, Solidity, Move, Cairo, Hack, Elm, PureScript, ReScript, Q#, Apex, ABAP, PL/SQL, T-SQL, Bicep, Nix, CUE, Turtle, SPARQL, Mermaid, PlantUML, CSV, Ada, Pascal, Tcl, AWK, Forth, Common Lisp, Emacs Lisp, Smalltalk, GDScript, GLSL, WGSL, Rego, CEL, Jsonnet, Dhall, Starlark, KDL, HOCON, Java Properties, dotenv, Make, CMake, Meson, Just, and Taskfile.
- The development process now has a low-power governance protocol with a machine-readable registry and a focused validation script.
- The long development roadmap is tracked as both a content registry and a human-readable plan before heavier architecture moves.
- Manual accessibility review is now part of the long-running quality rhythm before release.
- Case study detail modeling has started as portable content before any framework migration.
- Case study content quality review now blocks detail routes until narrative, evidence, accessibility, search, and rollback expectations are explicit.
- Case study detail routing is now proposed in a framework-neutral way before implementation.
- The first static case study detail route now exists without requiring framework migration.

## Structure

```text
apps/web/                    dependency-free cinematic web shell
content/                     portable content and metadata registries
content/lab/                 UI-UX Digital Lab operating-model contracts
packages/design-tokens/       shared visual and motion tokens
packages/asset-registry/      legacy asset migration decisions
docs/reports/                 zip and repository analysis
docs/architecture/            proposed clean architecture
docs/strategy/                operating-model and product strategy notes
docs/quality/                 responsive, SEO, performance, accessibility strategy
docs/governance/              branch and development process policy
docs/plans/                   commit and rollout plans
archive/                      archive policy, not extracted legacy source
```

## Open Locally

The initial shell is static. Open this file in a browser:

```text
apps/web/index.html
```

## Checks

```bash
npm run automation:develop
npm run check:js
npm run check:foundation
node scripts/check-development-process.mjs
node scripts/check-long-development-roadmap.mjs
node scripts/check-accessibility-review.mjs
node scripts/check-case-study-detail-model.mjs
node scripts/check-case-study-content-quality-review.mjs
node scripts/check-case-study-detail-route-proposal.mjs
node scripts/check-case-study-static-route.mjs
```

`npm run automation:develop` is the low-power first pass for long development sessions. It checks workspace routing, foundation integrity, JavaScript syntax, Git availability, and GitHub auth readiness without starting a server or packaging a release.

## Server Package

```bash
npm run package:server
npm run prepare:server
npm run automation:refresh-release
npm run release:ready
```

This creates:

```text
dist/seis-static.zip
dist/server-upload-manifest.json
deploy/upload-plan.json
releases/latest.json
dist/server-drop/
```

Use this archive for the selected server after the domain/hosting target is confirmed.

## Multilingual Branch Scope

The current foundation includes runtime language switching for:

```text
tr, en, fr, it, de, es, ar
```

Recommended branch name when the real Git repo is connected:

```text
feature/multilingual-cinematic-foundation
```

## Polyglot Software Branch

The iCloud Git copy also has a polyglot branch:

```text
feature/polyglot-multilingual-server-foundation
```

It includes lightweight contracts for JavaScript, Node.js, Python, Go, Rust, Swift, Kotlin, Dart, Ruby, PHP, Java, C#, SQL, Lua, Bash, Docker, Cloudflare Worker, web-server configs, C, C++, Elixir, Erlang, Haskell, Scala, R, Julia, Perl, Zig, Clojure, F#, PowerShell, TOML, XML, OCaml, ReasonML, Nim, Crystal, Groovy, Objective-C, Visual Basic, MATLAB, Fortran, COBOL, Racket, Scheme, Prolog, D, V, GraphQL, OpenAPI, JSON Schema, WebAssembly Text, HCL, Protocol Buffers, Avro, AsyncAPI, JSON-LD, INI, Solidity, Move, Cairo, Hack, Elm, PureScript, ReScript, Q#, Apex, ABAP, PL/SQL, T-SQL, Bicep, Nix, CUE, Turtle, SPARQL, Mermaid, PlantUML, CSV, Ada, Pascal, Tcl, AWK, Forth, Common Lisp, Emacs Lisp, Smalltalk, GDScript, GLSL, WGSL, Rego, CEL, Jsonnet, Dhall, Starlark, KDL, HOCON, Java Properties, dotenv, Make, CMake, Meson, Just, and Taskfile without adding dependency bloat.

## Release Recovery

```bash
npm run restore:latest
npm run check:history
```

## Sync To iCloud GitHub Folder

```bash
npm run sync:icloud
```

## Next Git Step

Clone or connect the actual GitHub repository, then apply this foundation on a non-main branch such as:

```bash
git checkout -b chore/seis-foundation-audit
```

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
- WebAssembly Text
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
- GraphQL
- OpenAPI
- JSON Schema
- Protobuf
- AsyncAPI
- Avro
- TOML
- XML
- CSV
- INI
- JSON-LD
- Turtle
- SPARQL
- Mermaid
- PlantUML
- Make
- CMake
- Taskfile
- Rego
- CEL
- Jsonnet
- Dhall
- Starlark
- KDL
- Meson
- Just
- Nix
- HOCON
- Java Properties
- dotenv
- PowerShell
- Batch
- Zsh
- C
- Objective-C
- Zig
- Ada
- Pascal
- Fortran
- COBOL
- ABAP
- PL/SQL
- T-SQL
- Cypher
- Datalog
- Groovy
- Clojure
- Haskell
- Erlang
- OCaml
- F#
- Scheme
- Racket
- Prolog
- Nim
- Crystal
- V
- QML
- GLSL
- WGSL
- SCSS
- Less
- Stylus
- Liquid
- Handlebars
- Mustache
- Vue SFC
- Svelte
- Astro
- MDX
- EJS
- Pug
- Jinja
- Nunjucks
- Twig
- Blade
- ERB
- Haml
- JSX
- TSX
- WebC
- XAML
- FXML
- Razor
- Dockerfile
- Bicep
- Helm
- CUE
- Pkl
- Nickel
- PromQL
- LogQL
- Flux
- jq
- JSONPath
- JSONata
- XPath
- XQuery
- XSLT
- Graphviz DOT
- Vega
- Vega-Lite
- Thrift
- FlatBuffers
- Cap'n Proto
- Smithy
- RAML
- WSDL
- WebIDL
- ASN.1
- MIDL
- Julia
- MATLAB
- SAS
- TeX
- BibTeX
- Typst
- TLA+
- Alloy
- Coq
- Lean
- Agda
- Isabelle
- Gettext PO
- XLIFF
- RESX
- OWL
- SHACL
- RDF/XML
- CloudFormation
- Ansible Playbook
- Kustomize
- GitHub Actions
- GitLab CI
- CircleCI
- SPDX
- CycloneDX
- SARIF
- SLSA Provenance
- in-toto Attestation
- OpenVEX
- OpenTelemetry
- OpenMetrics
- Grafana Dashboard
- Gherkin
- Pact
- JUnit XML
- LCOV
- Cobertura XML
- Clover XML
- Postman Collection
- Insomnia Export
- Bruno Collection
- HTTP Archive
- REST Client HTTP
- HTTPie
- Sitemap XML
- Robots.txt
- RSS Feed
- Security.txt
- Ads.txt
- Humans.txt
- Web App Manifest
- Browserconfig
- Digital Asset Links
- axe JSON
- Pa11y JSON
- Lighthouse JSON
- OSV JSON
- npm audit JSON
- Dependabot Alerts JSON
- Gitleaks JSON
- Trivy JSON
- Grype JSON
- License Checker JSON
- ScanCode JSON
- OSS Review Toolkit JSON
- OWASP ZAP JSON
- Nuclei JSON
- Burp Suite XML
- OpenAPI Diff JSON
- Schemathesis JSON
- Dredd JSON
- Sentry Issue JSON
- Datadog Monitor JSON
- Alertmanager JSON
- Checkov JSON
- tfsec JSON
- Terrascan JSON
- DPIA JSON
- Consent Ledger JSON
- Retention Policy JSON
- Design Tokens JSON
- Style Dictionary JSON
- Figma Tokens JSON
- Lottie JSON
- Motion Spec JSON
- Reduced Motion JSON
- Release Readiness JSON
- Rollback Plan JSON
- Change Impact JSON

This brings the governed branch matrix to 228 software and handoff lanes while keeping each non-runtime language as a small reference starter.

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

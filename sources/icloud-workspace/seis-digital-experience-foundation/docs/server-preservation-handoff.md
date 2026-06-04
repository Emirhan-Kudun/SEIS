# Server Preservation Handoff

This repo keeps one canonical delivery lane so the work does not disappear in local folders.

## Canonical Target

- repo: `https://github.com/emirhankudun-ux/UIX-Apps.git`
- branch: `UIXAppTTR`
- local role: iCloud Drive mirror for active work
- remote role: source preservation server

## Before Upload

Run the low-power checks first:

```bash
npm run quality
npm run publish:preflight
```

If GitHub auth is ready, publish with:

```bash
GIT_TERMINAL_PROMPT=0 git push origin UIXAppTTR
```

If `publish:preflight` reports missing GitHub auth, stop there. The content is ready locally, but remote shipment is blocked until `gh auth login -h github.com` or an explicit credential helper is configured and `--allow-missing-gh-auth` is used intentionally.

## Multilingual Branch Contract

The canonical branch must keep these locale IDs aligned across static runtime, Node APIs, and the Next.js foundation:

- `tr`
- `en`
- `fr`
- `it`
- `de`

The static source of truth is `translations.json`. The runtime visibility endpoint is `/api/i18n-health`.

## Software Language Branch Contract

The canonical branch also keeps a governed polyglot matrix in `config/software-language-matrix.json`.

Runtime visibility endpoint:

```text
GET /api/software-languages
```

The matrix currently covers 228 frontend, backend, scripting, systems, data, and governance lanes without adding new runtime dependencies. WebAssembly Text, GraphQL, OpenAPI, JSON Schema, Protobuf, AsyncAPI, Avro, TOML, XML, CSV, INI, JSON-LD, Turtle, SPARQL, Mermaid, PlantUML, Make, CMake, Taskfile, Rego, CEL, Jsonnet, Dhall, Starlark, KDL, Meson, Just, Nix, HOCON, Java Properties, dotenv, PowerShell, Batch, Zsh, C, Objective-C, Zig, Ada, Pascal, Fortran, COBOL, ABAP, PL/SQL, T-SQL, Cypher, Datalog, Groovy, Clojure, Haskell, Erlang, OCaml, F#, Scheme, Racket, Prolog, Nim, Crystal, V, QML, GLSL, WGSL, SCSS, Less, Stylus, Liquid, Handlebars, Mustache, Vue SFC, Svelte, Astro, MDX, EJS, Pug, Jinja, Nunjucks, Twig, Blade, ERB, Haml, JSX, TSX, WebC, XAML, FXML, Razor, Dockerfile, Bicep, Helm, CUE, Pkl, Nickel, PromQL, LogQL, Flux, jq, JSONPath, JSONata, XPath, XQuery, XSLT, Graphviz DOT, Vega, Vega-Lite, Thrift, FlatBuffers, Cap'n Proto, Smithy, RAML, WSDL, WebIDL, ASN.1, MIDL, Julia, MATLAB, SAS, TeX, BibTeX, Typst, TLA+, Alloy, Coq, Lean, Agda, Isabelle, Gettext PO, XLIFF, RESX, OWL, SHACL, RDF/XML, CloudFormation, Ansible Playbook, Kustomize, GitHub Actions, GitLab CI, CircleCI, SPDX, CycloneDX, SARIF, SLSA Provenance, in-toto Attestation, OpenVEX, OpenTelemetry, OpenMetrics, Grafana Dashboard, Gherkin, Pact, JUnit XML, LCOV, Cobertura XML, Clover XML, Postman Collection, Insomnia Export, Bruno Collection, HTTP Archive, REST Client HTTP, HTTPie, Sitemap XML, Robots.txt, RSS Feed, Security.txt, Ads.txt, Humans.txt, Web App Manifest, Browserconfig, Digital Asset Links, axe JSON, Pa11y JSON, Lighthouse JSON, OSV JSON, npm audit JSON, Dependabot Alerts JSON, Gitleaks JSON, Trivy JSON, Grype JSON, License Checker JSON, ScanCode JSON, OSS Review Toolkit JSON, OWASP ZAP JSON, Nuclei JSON, Burp Suite XML, OpenAPI Diff JSON, Schemathesis JSON, Dredd JSON, Sentry Issue JSON, Datadog Monitor JSON, Alertmanager JSON, Checkov JSON, tfsec JSON, Terrascan JSON, DPIA JSON, Consent Ledger JSON, Retention Policy JSON, Design Tokens JSON, Style Dictionary JSON, Figma Tokens JSON, Lottie JSON, Motion Spec JSON, Reduced Motion JSON, Release Readiness JSON, Rollback Plan JSON, and Change Impact JSON are preserved as lightweight readiness contracts, not as compiled runtime artifacts.

## Preservation Rules

Do not ship raw local artifacts:

- `node_modules/`
- `.next/`
- `runtime/`
- `logs/`
- `__MACOSX/`
- `.DS_Store`
- `*.zip`

Promoted source material should move through reviewed folders such as `source-intake/`, docs, config, scripts, or runtime-safe data files.

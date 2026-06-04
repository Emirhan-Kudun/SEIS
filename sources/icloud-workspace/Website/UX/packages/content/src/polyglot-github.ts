export type PolyglotGithubLanguage = {
  id:
    | "typescript"
    | "html"
    | "css"
    | "javascript"
    | "swift"
    | "kotlin"
    | "python"
    | "go"
    | "rust"
    | "php"
    | "csharp"
    | "java"
    | "shell"
    | "json"
    | "sql"
    | "cplusplus"
    | "docker"
    | "terraform"
    | "vue"
    | "astro"
    | "svelte";
  name: string;
  path: string;
  role: string;
  status: "active" | "example" | "planned";
};

export const polyglotGithubLanguages: PolyglotGithubLanguage[] = [
  {
    id: "typescript",
    name: "TypeScript",
    path: "examples/seis-polyglot/typescript/seis_contract.ts",
    role: "Typed publish-state contract for GitHub, iCloud and cloud readiness.",
    status: "example"
  },
  {
    id: "html",
    name: "HTML",
    path: "examples/seis-polyglot/web/index.html",
    role: "Static readable fallback shell for server/cloud readiness.",
    status: "example"
  },
  {
    id: "css",
    name: "CSS",
    path: "examples/seis-polyglot/web/styles.css",
    role: "Calm fallback styling with no production dependency impact.",
    status: "example"
  },
  {
    id: "javascript",
    name: "JavaScript",
    path: "examples/seis-polyglot/web/runtime.js",
    role: "Tiny progressive enhancement layer for readiness summaries.",
    status: "example"
  },
  {
    id: "json",
    name: "JSON",
    path: "examples/seis-polyglot/web/runtime.json",
    role: "Portable runtime signal contract for cloud and server state.",
    status: "example"
  },
  {
    id: "shell",
    name: "Shell",
    path: "examples/seis-polyglot/shell/seis_publish.sh",
    role: "Dual-share GitHub push and iCloud export command sequence.",
    status: "active"
  },
  {
    id: "swift",
    name: "Swift",
    path: "examples/seis-polyglot/ios/SeisReadinessCard.swift",
    role: "Native iOS readiness card pattern for future Apple surfaces.",
    status: "example"
  },
  {
    id: "kotlin",
    name: "Kotlin",
    path: "examples/seis-polyglot/android/SeisReadinessCard.kt",
    role: "Android readiness state pattern with accessibility-first labeling.",
    status: "example"
  },
  {
    id: "python",
    name: "Python",
    path: "examples/seis-polyglot/python/seis_preflight.py",
    role: "Automation and data preflight shape for future AI workflow checks.",
    status: "example"
  },
  {
    id: "go",
    name: "Go",
    path: "examples/seis-polyglot/go/seis_health.go",
    role: "Small health-signal primitive for lightweight service adapters.",
    status: "example"
  },
  {
    id: "rust",
    name: "Rust",
    path: "examples/seis-polyglot/rust/seis_guardrail.rs",
    role: "Guardrail counting primitive for future systems-level tooling.",
    status: "example"
  },
  {
    id: "php",
    name: "PHP",
    path: "examples/seis-polyglot/php/seis_fallback.php",
    role: "Traditional hosting fallback status helper.",
    status: "example"
  },
  {
    id: "csharp",
    name: "C#",
    path: "examples/seis-polyglot/csharp/SeisReleaseGate.cs",
    role: "Desktop and enterprise release-gate model.",
    status: "example"
  },
  {
    id: "java",
    name: "Java",
    path: "examples/seis-polyglot/java/SeisConnectorSignal.java",
    role: "Connector credential signal for JVM enterprise adapters.",
    status: "example"
  },
  {
    id: "sql",
    name: "SQL",
    path: "examples/seis-polyglot/sql/seis_connector_surface.sql",
    role: "Relational readiness contract for future persistence handoffs.",
    status: "example"
  },
  {
    id: "cplusplus",
    name: "C++",
    path: "examples/seis-polyglot/cpp/SeisMissionGate.cpp",
    role: "Systems-level mission gate pattern for high-performance adapters.",
    status: "example"
  },
  {
    id: "docker",
    name: "Docker",
    path: "examples/seis-polyglot/docker/Dockerfile.seis",
    role: "Containerized runtime baseline for reproducible cloud execution.",
    status: "example"
  },
  {
    id: "terraform",
    name: "Terraform",
    path: "examples/seis-polyglot/terraform/seis_cloud_activation.tf",
    role: "Infrastructure-as-code scaffold for controlled cloud activation.",
    status: "example"
  },
  {
    id: "vue",
    name: "Vue",
    path: "examples/seis-polyglot/vue/SeisReadinessPanel.vue",
    role: "Alternative UI adapter for cross-framework readiness surfaces.",
    status: "example"
  },
  {
    id: "astro",
    name: "Astro",
    path: "examples/seis-polyglot/astro/seis-foundation.astro",
    role: "Content-first static composition route for calm delivery surfaces.",
    status: "example"
  },
  {
    id: "svelte",
    name: "Svelte",
    path: "examples/seis-polyglot/svelte/SeisSignalCard.svelte",
    role: "Lightweight reactive component surface for future product labs.",
    status: "example"
  },
];

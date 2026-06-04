import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const requiredFiles = [
  "examples/seis-polyglot/web/index.html",
  "examples/seis-polyglot/web/styles.css",
  "examples/seis-polyglot/web/runtime.js",
  "examples/seis-polyglot/web/runtime.json",
  "examples/seis-polyglot/typescript/seis_contract.ts",
  "examples/seis-polyglot/ios/SeisReadinessCard.swift",
  "examples/seis-polyglot/android/SeisReadinessCard.kt",
  "examples/seis-polyglot/python/seis_preflight.py",
  "examples/seis-polyglot/go/seis_health.go",
  "examples/seis-polyglot/rust/seis_guardrail.rs",
  "examples/seis-polyglot/php/seis_fallback.php",
  "examples/seis-polyglot/csharp/SeisReleaseGate.cs",
  "examples/seis-polyglot/java/SeisConnectorSignal.java",
  "examples/seis-polyglot/shell/seis_publish.sh",
  "examples/seis-polyglot/sql/seis_connector_surface.sql",
  "examples/seis-polyglot/cpp/SeisMissionGate.cpp",
  "examples/seis-polyglot/docker/Dockerfile.seis",
  "examples/seis-polyglot/terraform/seis_cloud_activation.tf",
  "examples/seis-polyglot/vue/SeisReadinessPanel.vue",
  "examples/seis-polyglot/astro/seis-foundation.astro",
  "examples/seis-polyglot/svelte/SeisSignalCard.svelte"
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing polyglot example file: ${file}`);
    continue;
  }
  const source = fs.readFileSync(fullPath, "utf8");
  if (source.trim().length < 40) {
    errors.push(`Polyglot example is too small to be meaningful: ${file}`);
  }
}

const registrySource = fs.readFileSync(path.join(root, "packages/content/src/polyglot-github.ts"), "utf8");
for (const language of ["HTML", "CSS", "JavaScript", "JSON", "TypeScript", "Swift", "Kotlin", "Python", "Go", "Rust", "PHP", "C#", "Java", "Shell", "SQL", "C++", "Docker", "Terraform", "Vue", "Astro", "Svelte"]) {
  if (!registrySource.includes(language)) {
    errors.push(`Polyglot registry missing language: ${language}`);
  }
}

const apiSource = fs.readFileSync(path.join(root, "apps/site-next/app/api/software-languages/route.ts"), "utf8");
for (const snippet of ["polyglotGithubLanguages", "githubLanguageTotal", "githubLanguages"]) {
  if (!apiSource.includes(snippet)) {
    errors.push(`/api/software-languages missing polyglot snippet: ${snippet}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Polyglot surface check passed: ${requiredFiles.length} example language files guarded.`);

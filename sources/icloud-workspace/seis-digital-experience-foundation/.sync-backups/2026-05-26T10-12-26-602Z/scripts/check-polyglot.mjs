import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "polyglot/manifest.json",
  "polyglot/contracts/seis-experience-contract.json",
  "polyglot/python/seis_manifest.py",
  "polyglot/go/health_contract.go",
  "polyglot/rust/performance_budget.rs",
  "polyglot/swift/SEISMotionPolicy.swift",
  "polyglot/kotlin/SeisMotionPolicy.kt",
  "polyglot/typescript/release-contract.ts",
  "polyglot/ruby/verify_release.rb",
  "polyglot/dart/seis_motion_policy.dart",
  "polyglot/bash/deploy_guard.sh",
  "polyglot/java/SeisDeployReadiness.java",
  "polyglot/csharp/SeisReleaseContract.cs",
  "polyglot/sql/release_readiness_schema.sql",
  "polyglot/lua/calm_motion_policy.lua",
  "polyglot/yaml/deploy-governance.yml",
  "polyglot/cpp/seis_release_contract.hpp",
  "polyglot/elixir/seis_release_contract.ex",
  "polyglot/scala/SeisReleaseContract.scala",
  "polyglot/clojure/seis_release_contract.clj",
  "polyglot/r/seis_motion_budget.R",
  "polyglot/julia/SeisReleaseContract.jl",
  "polyglot/haskell/SeisReleaseContract.hs",
  "polyglot/erlang/seis_release_contract.erl",
  "polyglot/zig/seis_budget.zig",
  "polyglot/nim/seis_motion_policy.nim",
  "polyglot/perl/verify_manifest.pl",
  "polyglot/fsharp/SeisReleaseContract.fs",
  "polyglot/objective-c/SEISMotionPolicy.h",
  "polyglot/racket/seis-release-contract.rkt",
  "polyglot/ocaml/seis_release_contract.ml",
  "polyglot/powershell/Test-SeisRelease.ps1",
  "polyglot/terraform/seis_deploy_guard.tf",
  "polyglot/graphql/seis_schema.graphql",
  "polyglot/protobuf/seis_release.proto",
  "polyglot/toml/deploy-governance.toml",
  "polyglot/crystal/seis_release_contract.cr",
  "polyglot/v/seis_motion_policy.v",
  "polyglot/d/seis_budget.d",
  "polyglot/ada/seis_release_contract.ads",
  "polyglot/fortran/seis_motion_budget.f90",
  "polyglot/cobol/seis-release-contract.cbl",
  "polyglot/pascal/SeisMotionPolicy.pas",
  "polyglot/common-lisp/seis-release-contract.lisp",
  "polyglot/prolog/seis_release_contract.pl",
  "polyglot/elm/SeisMotionPolicy.elm",
  "polyglot/purescript/SeisReleaseContract.purs",
  "polyglot/rescript/SeisMotionPolicy.res",
  "polyglot/solidity/SeisReleaseGuard.sol",
  "polyglot/move/seis_release.move",
  "polyglot/cairo/seis_release_contract.cairo",
  "polyglot/qsharp/SeisReleaseContract.qs",
  "polyglot/matlab/seis_motion_budget.m",
  "polyglot/xml/deploy-governance.xml",
  "polyglot/cmake/SeisDeployGuard.cmake",
  "polyglot/make/Makefile",
  "polyglot/ini/deploy-governance.ini",
  "polyglot/plantuml/release-flow.puml",
  "polyglot/mermaid/release-flow.mmd",
  "polyglot/json-schema/seis-release.schema.json",
  "polyglot/hack/SeisReleaseContract.hack",
  "polyglot/abap/seis_release_contract.abap",
  "polyglot/plsql/seis_release_contract.sql",
  "polyglot/tsql/seis_release_contract.sql",
  "polyglot/bicep/seis_deploy_guard.bicep",
  "polyglot/nix/seis_release_policy.nix",
  "polyglot/cue/seis_release_policy.cue",
  "polyglot/rego/seis_release_policy.rego",
  "polyglot/cel/seis_release_policy.cel",
  "polyglot/jsonnet/seis_release_policy.jsonnet",
  "polyglot/dhall/seis_release_policy.dhall",
  "polyglot/gdscript/seis_motion_policy.gd",
  "polyglot/glsl/seis_motion_policy.glsl",
  "polyglot/wgsl/seis_motion_policy.wgsl",
  "polyglot/avro/seis-release.avsc",
  "polyglot/asyncapi/seis-release-events.asyncapi.yaml",
  "server/php/health.php",
  "server/node/static-server.mjs",
  "server/edge/cloudflare-worker.js",
  "server/docker/Dockerfile",
  "deploy/server-targets.json",
  "docs/polyglot/software-language-branch.md",
  "docs/polyglot/software-language-atlas.md"
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`missing polyglot file: ${file}`);
  }
}

if (existsSync("polyglot/manifest.json")) {
  const manifest = JSON.parse(readFileSync("polyglot/manifest.json", "utf8"));
  const languages = manifest.languages || [];
  if (languages.length < 80) {
    failures.push("polyglot manifest must include at least 80 language/config surfaces");
  }
  for (const language of languages) {
    for (const entrypoint of language.entrypoints || []) {
      if (!existsSync(entrypoint)) {
        failures.push(`polyglot manifest references missing entrypoint: ${entrypoint}`);
      }
    }
  }
}

if (existsSync("polyglot/contracts/seis-experience-contract.json")) {
  const contract = JSON.parse(readFileSync("polyglot/contracts/seis-experience-contract.json", "utf8"));
  if (contract.polyglotAtlas?.targetSurfaceCount < 80) {
    failures.push("experience contract must declare an 80-surface polyglot atlas target");
  }
  if (contract.polyglotAtlas?.promotionRule !== "contracts before services") {
    failures.push("polyglot atlas must keep contracts before services");
  }
}

if (failures.length > 0) {
  console.error("SEIS polyglot check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEIS polyglot check passed.");

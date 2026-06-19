#!/usr/bin/env node
// Aggregates SEIS JSON records into the static cockpit data bundle
// rendered by apps/web/cockpit.html. Run with --check to verify the
// committed bundle matches its sources.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(root, "apps/web/src/data/cockpit-status.js");
// Framework-neutral snapshot consumed by the Expo mobile shell, so web and
// mobile render from one generated source.
const mobilePath = resolve(root, "apps/android/SEISMobile/src/data/status.json");

const read = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));

const plugins = read("data/installed-codex-plugins-2026-06-05.json");
const workbench = read("data/openai-curated-build-workbench-2026-06-05.json");
const visibility = read("data/repository-visibility-audit-2026-06-05.json");
const zipInventory = read("data/github-zip-import-inventory.json");
const consolidation = read("data/github-repository-consolidation.json");
const workspace = read("integrations/google-workspace.json");
const securityGates = read("data/security-gate-status.json");
const languageVersions = read("content/governance/seis-language-versions.json");
const sourcesManifest = readFileSync(resolve(root, "sources/README.md"), "utf8");

const laneLabels = {
  repository_and_governance: "Repository & Governance",
  android_ios_mobile: "Android / iOS Mobile",
  web_frontend_design: "Web Frontend & Design",
  macos_desktop: "macOS Desktop",
  fullstack_backend_deploy: "Full-stack & Deploy",
  data_analytics_visualization: "Data & Analytics",
  workspace_communications: "Workspace & Comms",
  observability_quality_security: "Quality & Security",
  ai_media_research: "AI, Media & Research",
  business_gtm_finance_ops: "Business & Ops",
};

const consolidatedSources = [...sourcesManifest.matchAll(/^\| `sources\/([a-z0-9-]+)\/` \|/gim)].map(
  (m) => m[1],
);
const fullHistoryBranches = [...sourcesManifest.matchAll(/^\| `sources\/[^`]*[^/`]` \|/gim)].length;

const researchIndex = readFileSync(resolve(root, "docs/research/README.md"), "utf8");
const researchNotes = [...researchIndex.matchAll(/^\| \[`(notes\/[^`]+)`\]/gim)].map((m) => m[1]);

const moduleStatusOverrides = {
  web_cockpit: "first_milestone_shipped",
  backend_state: "model_committed",
  workspace_ops: "operating_layer_committed",
  security_quality_gate: "gate_live",
  mobile_shell: "contract_committed",
  macos_inspector: "contract_committed",
  research_memory: "lane_active",
};

const status = {
  generatedBy: "scripts/create-cockpit-status.mjs",
  sources: [
    "data/installed-codex-plugins-2026-06-05.json",
    "data/openai-curated-build-workbench-2026-06-05.json",
    "data/repository-visibility-audit-2026-06-05.json",
    "data/github-zip-import-inventory.json",
    "data/github-repository-consolidation.json",
    "integrations/google-workspace.json",
    "data/security-gate-status.json",
    "content/governance/seis-language-versions.json",
    "sources/README.md",
    "docs/research/README.md",
  ],
  branch: {
    canonicalRepository: "Emirhan-Kudun/SEIS",
    defaultBranch: "main",
    mirrorBranch: consolidation.canonical_default_branch,
    decision: visibility.decision,
    seisBranchCount: visibility.seis_branch_count,
    sourceTrackingRefs: visibility.seis_source_branch_count,
  },
  plugins: {
    installedEnabled: plugins.installed_enabled_count,
    notInstalled: plugins.not_installed_count,
    policy: workbench.policy,
    lanes: Object.entries(plugins.lanes).map(([id, lane]) => ({
      id,
      label: laneLabels[id] ?? id,
      active: lane.active_installed.length,
      missing: lane.mentioned_but_not_installed.length,
    })),
  },
  workbench: {
    goal: workbench.sprint_1.goal,
    buildOrder: workbench.next_build_order,
    modules: workbench.sprint_1.modules.map((m) => ({
      id: m.id,
      lane: m.lane,
      path: m.owner_path,
      deliverable: m.deliverable,
      status: moduleStatusOverrides[m.id] ?? m.status,
    })),
  },
  research: {
    lane: "docs/research",
    notes: researchNotes,
  },
  ai: {
    doc: "docs/platform/seis-ai-core.md",
    routerPolicy: "content/governance/ai-routing-policy.json",
    note: "Application layer over external providers — no SEIS-owned base model exists yet.",
    languageVersions: languageVersions.versions.map((v) => ({
      id: v.id,
      status: v.status,
      scope: v.scope,
    })),
  },
  workspace: {
    drive: Object.entries(workspace.drive).map(([id, doc]) => ({
      id,
      title: doc.title,
      url: doc.url,
    })),
    calendar: {
      title: workspace.calendar.weekly_build_review.title,
      recurrence: workspace.calendar.weekly_build_review.recurrence,
      url: workspace.calendar.weekly_build_review.url,
    },
  },
  safety: {
    consolidatedSources,
    fullHistoryBranches,
    zipImport: {
      sizeBytes: zipInventory.zip_size_bytes,
      entryCount: zipInventory.entry_count,
      sha256: zipInventory.sha256,
      status: "inventoried_not_committed",
    },
    deletionGate:
      "Origin repositories may be archived or deleted: snapshots live under sources/ and full history under sources/<repo>/<branch> branches.",
  },
  gates: securityGates.gates.map((gate) => ({
    id: gate.gate_id,
    label: gate.label,
    state: gate.state,
  })),
};

const banner =
  "// Generated by scripts/create-cockpit-status.mjs — do not edit by hand.\n" +
  "// Regenerate with: npm run automation:cockpit-status\n";
const output = `${banner}window.SEIS_COCKPIT_STATUS = ${JSON.stringify(status, null, 2)};\n`;
const mobileOutput = `${JSON.stringify(status, null, 2)}\n`;

if (process.argv.includes("--check")) {
  const stale = (path, expected) => {
    let current = "";
    try {
      current = readFileSync(path, "utf8");
    } catch {
      return true;
    }
    return current !== expected;
  };
  if (stale(outputPath, output) || stale(mobilePath, mobileOutput)) {
    console.error("cockpit-status check failed: bundle out of date. Run npm run automation:cockpit-status");
    process.exit(1);
  }
  console.log("cockpit-status check passed.");
} else {
  writeFileSync(outputPath, output);
  writeFileSync(mobilePath, mobileOutput);
  console.log(`Wrote ${outputPath}`);
  console.log(`Wrote ${mobilePath}`);
}

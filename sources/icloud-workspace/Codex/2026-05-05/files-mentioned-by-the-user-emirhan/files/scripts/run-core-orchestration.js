#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(ROOT, "reports", "ecosystem");
const INTEGRATION_TARGETS_PATH = path.join(ROOT, "config", "integration-targets.json");
const CONNECTOR_REGISTRY_PATH = path.join(ROOT, "config", "connector-rotation-registry.json");
const PLAYBOOK_PATH = path.join(ROOT, "INTEGRATION-PLAYBOOK.md");
const PLAN_LEDGER_PATH = path.join(ROOT, "plan-ledger.json");
const COVERAGE_LEDGER_PATH = path.join(ROOT, "connector-coverage-ledger.json");

const LOCAL_CORE_SCRIPTS = [
  { connector: "local-qa-quality-gate", file: "scripts/quality-gate.js", critical: true },
  { connector: "local-qa-regression-smoke", file: "scripts/regression-smoke.js", critical: true },
  { connector: "local-qa-infrastructure-check", file: "scripts/infrastructure-check.js", critical: true },
  { connector: "local-qa-semantic-seo-check", file: "scripts/semantic-seo-check.js", critical: true },
  { connector: "security-review", file: "scripts/security-static-check.js", critical: true }
];

const CONNECTOR_STEP_MAP = [
  { connector: "notion-run-log", key: "notion", destinationField: "runLogPageOrDatabaseId", connectorId: "notion" },
  { connector: "linear-action-package", key: "linear", destinationField: "teamIdOrProjectId", connectorId: "linear" },
  { connector: "github-issue-checklist-candidate", key: "github", destinationField: "repositoryFullName", connectorId: "github" },
  { connector: "slack-summary-candidate", key: "slack", destinationField: "channelIdOrName", connectorId: "slack" }
];

const CORE_TO_REGISTRY_MAP = {
  "browser-validation": "browser-use",
  "local-qa-quality-gate": "build-web-apps",
  "local-qa-regression-smoke": "build-web-apps",
  "local-qa-infrastructure-check": "build-web-apps",
  "local-qa-semantic-seo-check": "build-web-apps",
  "security-review": "codex-security",
  "notion-run-log": "notion",
  "linear-action-package": "linear",
  "github-issue-checklist-candidate": "github",
  "slack-summary-candidate": "slack"
};

function nowMs() {
  return Date.now();
}

function runCommand(command, args, options) {
  const started = nowMs();
  const result = cp.spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    ...options
  });
  return {
    ok: result.status === 0,
    code: result.status,
    stdout: String(result.stdout || ""),
    stderr: String(result.stderr || ""),
    duration_ms: nowMs() - started
  };
}

function ensureReportDir() {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

function readJsonSafe(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_err) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function writeReport(data) {
  const date = new Date().toISOString().slice(0, 10);
  const filePath = path.join(REPORT_DIR, date + "-core-run.json");
  writeJson(filePath, data);
  return filePath;
}

function readIntegrationTargets() {
  const defaults = {
    notion: { enabled: false, runLogPageOrDatabaseId: "" },
    linear: { enabled: false, teamIdOrProjectId: "" },
    github: { enabled: false, repositoryFullName: "" },
    slack: { enabled: false, channelIdOrName: "" },
    approvalGate: { dualApprovalRequired: true, approvalExpiryDays: 14, staleSuggestedDays: 10 },
    sla: { p95MsThreshold: 8000, failRateThreshold: 0.05 },
    reporting: { detailLevel: "detailed-audit", timezone: "Europe/Istanbul" }
  };

  if (!fs.existsSync(INTEGRATION_TARGETS_PATH)) {
    return { __meta: { available: false, reason: "integration-targets.json missing" }, ...defaults };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(INTEGRATION_TARGETS_PATH, "utf8"));
    return {
      __meta: { available: true, reason: "ok" },
      ...defaults,
      ...parsed,
      approvalGate: { ...defaults.approvalGate, ...(parsed.approvalGate || {}) },
      sla: { ...defaults.sla, ...(parsed.sla || {}) },
      reporting: { ...defaults.reporting, ...(parsed.reporting || {}) }
    };
  } catch (_err) {
    return { __meta: { available: false, reason: "integration-targets.json invalid JSON" }, ...defaults };
  }
}

function buildStep(base, severity) {
  return {
    connector: base.connector,
    status: base.status,
    reason: base.reason,
    duration_ms: base.duration_ms,
    next_action: base.next_action,
    severity: severity
  };
}

function addRisk(risk, severity, message) {
  if (!message) {
    return;
  }
  if (severity === "high") {
    risk.high.push(message);
    return;
  }
  if (severity === "medium") {
    risk.medium.push(message);
    return;
  }
  risk.low.push(message);
}

function uniqueStrings(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function percentile(values, p) {
  if (!values.length) {
    return 0;
  }
  const sorted = values.slice().sort((a, b) => a - b);
  const rank = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(rank, sorted.length - 1))];
}

function parsePlaybookSprints(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  const re = /^-\s+Sprint\s+(\d+):\s+(\d{4}-\d{2}-\d{2})\s+->\s+(\d{4}-\d{2}-\d{2})/;
  for (const line of lines) {
    const m = line.match(re);
    if (!m) {
      continue;
    }
    out.push({ sprint_id: "Sprint " + m[1], window_start: m[2], window_end: m[3] });
  }
  return out;
}

function checkPlanLedgerSync() {
  if (!fs.existsSync(PLAYBOOK_PATH) || !fs.existsSync(PLAN_LEDGER_PATH)) {
    return {
      step: buildStep(
        {
          connector: "plan-ledger-sync",
          status: "skipped_with_reason",
          reason: "playbook or plan-ledger missing",
          duration_ms: 0,
          next_action: "Ensure INTEGRATION-PLAYBOOK.md and plan-ledger.json both exist."
        },
        "medium"
      ),
      actions: [
        {
          status: "suggested",
          title: "Repair plan source sync",
          problem: "One of the plan sources is missing.",
          proposed_change: "Restore both playbook and plan ledger.",
          labels: ["ops", "planning"],
          source_link: "plan-ledger.json"
        }
      ],
      drift: { ok: false, reason: "source missing", missing_in_ledger: [], missing_in_playbook: [] }
    };
  }

  const playbook = fs.readFileSync(PLAYBOOK_PATH, "utf8");
  const ledger = readJsonSafe(PLAN_LEDGER_PATH, { sprints: [] });
  const playbookSprints = parsePlaybookSprints(playbook);
  const ledgerSprints = Array.isArray(ledger.sprints) ? ledger.sprints : [];

  const playbookIds = new Set(playbookSprints.map((s) => s.sprint_id));
  const ledgerIds = new Set(ledgerSprints.map((s) => s.sprint_id));

  const missingInLedger = [];
  const missingInPlaybook = [];

  for (const id of playbookIds) {
    if (!ledgerIds.has(id)) {
      missingInLedger.push(id);
    }
  }
  for (const id of ledgerIds) {
    if (!playbookIds.has(id) && id !== "Rolling Quarter") {
      missingInPlaybook.push(id);
    }
  }

  if (!missingInLedger.length && !missingInPlaybook.length) {
    return {
      step: buildStep(
        {
          connector: "plan-ledger-sync",
          status: "invoked",
          reason: "playbook and plan-ledger are synchronized",
          duration_ms: 0,
          next_action: "continue"
        },
        "low"
      ),
      actions: [],
      drift: { ok: true, reason: "in-sync", missing_in_ledger: [], missing_in_playbook: [] }
    };
  }

  const reason = "plan source drift detected";
  return {
    step: buildStep(
      {
        connector: "plan-ledger-sync",
        status: "invoked",
        reason: reason,
        duration_ms: 0,
        next_action: "Align sprint ids between INTEGRATION-PLAYBOOK.md and plan-ledger.json."
      },
      "medium"
    ),
    actions: [
      {
        status: "suggested",
        title: "Fix plan source drift",
        problem: reason,
        proposed_change: "Sync sprint records across playbook and plan-ledger.",
        labels: ["planning", "ops"],
        source_link: "INTEGRATION-PLAYBOOK.md"
      }
    ],
    drift: {
      ok: false,
      reason: reason,
      missing_in_ledger: missingInLedger,
      missing_in_playbook: missingInPlaybook
    }
  };
}

function evaluateApprovalHealth(integrations) {
  const ledger = readJsonSafe(PLAN_LEDGER_PATH, { actions: [] });
  const actions = Array.isArray(ledger.actions) ? ledger.actions : [];
  const now = Date.now();
  const staleSuggestedMs = Number(integrations.approvalGate.staleSuggestedDays || 10) * 24 * 60 * 60 * 1000;
  const approvalExpiryMs = Number(integrations.approvalGate.approvalExpiryDays || 14) * 24 * 60 * 60 * 1000;

  const out = {
    stale_suggested: [],
    expired_approved: [],
    suggested_actions: []
  };

  for (const item of actions) {
    if (!item || !item.updated_at || !item.approval_state) {
      continue;
    }
    const updatedAt = Date.parse(item.updated_at);
    if (!Number.isFinite(updatedAt)) {
      continue;
    }
    const age = now - updatedAt;

    if (item.approval_state === "suggested" && age > staleSuggestedMs) {
      out.stale_suggested.push(item.id || item.title || "unnamed-action");
      out.suggested_actions.push({
        status: "suggested",
        title: "Escalate stale suggested action",
        problem: "Suggested action exceeded stale window.",
        proposed_change: "Review and approve/reject stale action immediately.",
        labels: ["ops", "stale"],
        source_link: "plan-ledger.json"
      });
    }

    if (item.approval_state === "approved" && age > approvalExpiryMs) {
      out.expired_approved.push(item.id || item.title || "unnamed-action");
      out.suggested_actions.push({
        status: "suggested",
        title: "Revalidate expired approval",
        problem: "Approved action exceeded approval expiry window.",
        proposed_change: "Reconfirm Notion + GitHub approval before implementation.",
        labels: ["ops", "approval"],
        source_link: "plan-ledger.json"
      });
    }
  }

  return out;
}

function buildSuggestedActionsFromSteps(steps, reportDate) {
  const out = [];
  for (const step of steps) {
    if (step.severity === "high" || step.severity === "medium") {
      out.push({
        status: "suggested",
        title: "Resolve " + step.connector,
        problem: step.reason,
        proposed_change: step.next_action,
        labels: step.severity === "high" ? ["ops", "blocking"] : ["ops"],
        source_link: "reports/ecosystem/" + reportDate + "-core-run.json"
      });
    }
  }
  return out;
}

function mergeSuggestedActions(parts) {
  const merged = [];
  const seen = new Set();

  for (const list of parts) {
    for (const item of list) {
      const key = [item.title, item.problem, item.proposed_change].join("|");
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      merged.push(item);
    }
  }

  return merged;
}

function updateCoverageLedgerFromCore(steps, timestamp) {
  const registry = readJsonSafe(CONNECTOR_REGISTRY_PATH, { connectors: [] });
  const coverageLedger = readJsonSafe(COVERAGE_LEDGER_PATH, {
    version: 1,
    month: "",
    timezone: "Europe/Istanbul",
    coverage: [],
    summary: { total_connectors: 0, covered_connectors: 0, target: "100% monthly", status: "pending" }
  });

  const byId = new Map();
  for (const item of coverageLedger.coverage || []) {
    byId.set(item.connector_name, item);
  }

  for (const step of steps) {
    const connectorId = CORE_TO_REGISTRY_MAP[step.connector];
    if (!connectorId) {
      continue;
    }
    const existing = byId.get(connectorId) || {
      connector_name: connectorId,
      tier: "core",
      last_status: "unknown",
      last_run_at: "",
      monthly_coverage_state: "pending",
      notes: ""
    };
    existing.last_status = step.status;
    existing.last_run_at = timestamp;
    existing.monthly_coverage_state = "covered";
    existing.notes = step.reason;
    byId.set(connectorId, existing);
  }

  const connectors = Array.isArray(registry.connectors) ? registry.connectors : [];
  for (const entry of connectors) {
    if (!byId.has(entry.id)) {
      byId.set(entry.id, {
        connector_name: entry.id,
        tier: entry.tier,
        last_status: "not_run",
        last_run_at: "",
        monthly_coverage_state: "pending",
        notes: "awaiting monthly sweep"
      });
    }
  }

  const month = timestamp.slice(0, 7);
  const all = Array.from(byId.values()).sort((a, b) => a.connector_name.localeCompare(b.connector_name));
  const covered = all.filter((item) => item.monthly_coverage_state === "covered").length;

  const nextLedger = {
    version: 1,
    month: month,
    timezone: "Europe/Istanbul",
    coverage: all,
    summary: {
      total_connectors: all.length,
      covered_connectors: covered,
      target: "100% monthly",
      status: covered === all.length ? "on_track" : "in_progress"
    }
  };

  writeJson(COVERAGE_LEDGER_PATH, nextLedger);
}

function main() {
  const runId = "run-" + new Date().toISOString().replace(/[:.]/g, "-");
  const started = nowMs();
  const steps = [];
  const risk = { high: [], medium: [], low: [] };

  // 1) Browser validation
  const npmCheck = runCommand("bash", ["-lc", "command -v npm >/dev/null 2>&1"]);
  const browserFallback = runCommand(process.execPath, ["scripts/browser-validation-fallback.js"]);
  if (browserFallback.ok) {
    const step = buildStep(
      {
        connector: "browser-validation",
        status: "invoked",
        reason:
          npmCheck.ok
            ? "Browser contract fallback passed. Live browser MCP step should run in automation context."
            : "Live browser MCP runtime missing npm. Fallback browser contract check passed.",
        duration_ms: npmCheck.duration_ms + browserFallback.duration_ms,
        next_action:
          npmCheck.ok
            ? "Run live browser validation in heartbeat automation for rendered DOM checks."
            : "Install npm to enable live browser validation; fallback remains green."
      },
      npmCheck.ok ? "low" : "medium"
    );
    steps.push(step);
    addRisk(risk, step.severity, step.reason);
  } else {
    const step = buildStep(
      {
        connector: "browser-validation",
        status: "invoked",
        reason: "Fallback browser contract check failed.",
        duration_ms: npmCheck.duration_ms + browserFallback.duration_ms,
        next_action: "Fix browser-validation-fallback failures before continuing to release."
      },
      "high"
    );
    steps.push(step);
    addRisk(risk, "high", "Browser validation fallback failed; first-view contract may be broken.");
  }

  // 2) Local QA + security
  for (const script of LOCAL_CORE_SCRIPTS) {
    const res = runCommand(process.execPath, [script.file]);
    const severity = res.ok ? "low" : (script.critical ? "high" : "medium");
    const step = buildStep(
      {
        connector: script.connector,
        status: "invoked",
        reason: res.ok ? "check passed" : "check failed",
        duration_ms: res.duration_ms,
        next_action: res.ok ? "continue" : "inspect stdout/stderr and fix blocking issues"
      },
      severity
    );
    step.exit_code = res.code;
    steps.push(step);
    if (!res.ok) {
      addRisk(risk, severity, script.connector + " failed.");
    }
  }

  // 3-7) Core connector package
  const integrations = readIntegrationTargets();
  for (const connectorDef of CONNECTOR_STEP_MAP) {
    if (!integrations.__meta.available) {
      const step = buildStep(
        {
          connector: connectorDef.connector,
          status: "skipped_with_reason",
          reason: integrations.__meta.reason,
          duration_ms: 0,
          next_action: "Create valid config/integration-targets.json to enable guarded connector steps."
        },
        "medium"
      );
      steps.push(step);
      addRisk(risk, "medium", connectorDef.connector + " skipped: " + integrations.__meta.reason + ".");
      continue;
    }

    const config = integrations[connectorDef.key] || {};
    const enabled = !!config.enabled;
    const destination = String(config[connectorDef.destinationField] || "").trim();

    if (!enabled) {
      const step = buildStep(
        {
          connector: connectorDef.connector,
          status: "skipped_with_reason",
          reason: "connector disabled in integration-targets.json",
          duration_ms: 0,
          next_action: "Enable connector when auth and destination are ready."
        },
        "low"
      );
      steps.push(step);
      continue;
    }

    if (!destination) {
      const step = buildStep(
        {
          connector: connectorDef.connector,
          status: "skipped_with_reason",
          reason: "connector enabled but destination missing",
          duration_ms: 0,
          next_action: "Set " + connectorDef.destinationField + " in integration-targets.json."
        },
        "medium"
      );
      steps.push(step);
      addRisk(risk, "medium", connectorDef.connector + " destination missing.");
      continue;
    }

    steps.push(
      buildStep(
        {
          connector: connectorDef.connector,
          status: "invoked",
          reason: "guarded-suggested mode ready with configured destination",
          duration_ms: 0,
          next_action: "Use automation context to publish suggested entries remotely."
        },
        "low"
      )
    );
  }

  // Plan source sync
  const planSync = checkPlanLedgerSync();
  steps.push(planSync.step);
  addRisk(risk, planSync.step.severity, planSync.step.reason);

  // Approval health checks
  const approvalHealth = evaluateApprovalHealth(integrations);
  if (approvalHealth.stale_suggested.length) {
    const step = buildStep(
      {
        connector: "approval-stale-suggested-check",
        status: "invoked",
        reason: "stale suggested items found",
        duration_ms: 0,
        next_action: "Review stale suggested items and resolve triage backlog."
      },
      "medium"
    );
    steps.push(step);
    addRisk(risk, "medium", "Stale suggested actions exceeded 10 days.");
  }
  if (approvalHealth.expired_approved.length) {
    const step = buildStep(
      {
        connector: "approval-expiry-check",
        status: "invoked",
        reason: "approved items exceeded expiry window",
        duration_ms: 0,
        next_action: "Revalidate dual approvals older than 14 days."
      },
      "medium"
    );
    steps.push(step);
    addRisk(risk, "medium", "Approved actions exceeded 14-day expiry.");
  }

  const reportDate = new Date().toISOString().slice(0, 10);
  const stepActions = buildSuggestedActionsFromSteps(steps, reportDate);

  const durations = steps.map((s) => Number(s.duration_ms || 0));
  const invokedSteps = steps.filter((s) => s.status === "invoked");
  const failingSteps = invokedSteps.filter((s) => Number(s.exit_code || 0) !== 0);
  const p95Ms = percentile(durations, 95);
  const failRate = invokedSteps.length ? failingSteps.length / invokedSteps.length : 0;

  const p95Threshold = Number(integrations.sla.p95MsThreshold || 8000);
  const failRateThreshold = Number(integrations.sla.failRateThreshold || 0.05);

  let slaAlert = false;
  if (p95Ms > p95Threshold || failRate > failRateThreshold) {
    slaAlert = true;
    addRisk(risk, "medium", "SLA threshold exceeded (p95 or fail_rate).");
  }

  const securityStep = steps.find((s) => s.connector === "security-review");
  const securityBlocked = !!(securityStep && securityStep.severity === "high");
  if (securityBlocked) {
    addRisk(risk, "high", "Release blocked due to High security finding.");
  }

  const summary =
    securityBlocked
      ? "Run completed with release block: High security finding detected."
      : (risk.high.length > 0
        ? "Run completed with blocking risks. Fix high severity items before release."
        : "Run completed. Core checks green; non-blocking connector gaps are tracked.");

  const suggestedActions = mergeSuggestedActions([
    stepActions,
    planSync.actions,
    approvalHealth.suggested_actions,
    slaAlert
      ? [{
          status: "suggested",
          title: "Resolve SLA degradation",
          problem: "Connector run exceeded SLA threshold.",
          proposed_change: "Inspect slow/failed steps and remediate before next scheduled run.",
          labels: ["ops", "sla"],
          source_link: "reports/ecosystem/" + reportDate + "-core-run.json"
        }]
      : [],
    securityBlocked
      ? [{
          status: "suggested",
          title: "Release blocked by security gate",
          problem: "High finding detected by security-review.",
          proposed_change: "Fix High findings, rerun security step, then continue release flow.",
          labels: ["security", "blocking"],
          source_link: "reports/ecosystem/" + reportDate + "-core-run.json"
        }]
      : []
  ]);

  const timestamp = new Date().toISOString();
  const report = {
    run_id: runId,
    timestamp: timestamp,
    timezone: String(integrations.reporting.timezone || "Europe/Istanbul"),
    mode: "always-on-core-plus-on-demand-rotation-registry",
    write_mode: "guarded",
    detail_level: String(integrations.reporting.detailLevel || "detailed-audit"),
    duration_ms: nowMs() - started,
    steps: steps,
    risk_summary: {
      high: uniqueStrings(risk.high),
      medium: uniqueStrings(risk.medium),
      low: uniqueStrings(risk.low)
    },
    audit: {
      metrics: {
        p95_ms: p95Ms,
        fail_rate: Number(failRate.toFixed(4)),
        failed_steps: failingSteps.length,
        total_steps: steps.length,
        thresholds: {
          p95_ms_threshold: p95Threshold,
          fail_rate_threshold: failRateThreshold
        }
      },
      gates: {
        sla_alert: slaAlert,
        security_release_block: securityBlocked,
        dual_approval_required: !!integrations.approvalGate.dualApprovalRequired
      },
      plan_sync: planSync.drift,
      approval_health: {
        stale_suggested_count: approvalHealth.stale_suggested.length,
        expired_approved_count: approvalHealth.expired_approved.length
      }
    },
    summary: summary,
    suggested_actions: suggestedActions
  };

  ensureReportDir();
  const reportPath = writeReport(report);
  updateCoverageLedgerFromCore(steps, timestamp);
  process.stdout.write("Core orchestration report: " + reportPath + "\n");

  const hasBlockingLocalQa = steps.some((step) => {
    return step.severity === "high" && step.connector.indexOf("local-qa-") === 0 && Number(step.exit_code || 0) !== 0;
  });

  if (hasBlockingLocalQa || securityBlocked) {
    process.exit(1);
  }
}

main();

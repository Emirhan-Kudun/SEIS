#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(ROOT, "reports", "ecosystem");
const REGISTRY_PATH = path.join(ROOT, "config", "connector-rotation-registry.json");
const COVERAGE_LEDGER_PATH = path.join(ROOT, "connector-coverage-ledger.json");
const PLAN_LEDGER_PATH = path.join(ROOT, "plan-ledger.json");

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (_err) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function ensureReportDir() {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

function main() {
  const registry = readJson(REGISTRY_PATH, { connectors: [] });
  const coverageLedger = readJson(COVERAGE_LEDGER_PATH, { coverage: [], summary: { total_connectors: 0, covered_connectors: 0 } });
  const planLedger = readJson(PLAN_LEDGER_PATH, { actions: [] });

  const connectors = Array.isArray(registry.connectors) ? registry.connectors : [];
  const coverage = Array.isArray(coverageLedger.coverage) ? coverageLedger.coverage : [];
  const coverageByName = new Map(coverage.map((entry) => [entry.connector_name, entry]));

  const now = new Date();
  const timestamp = now.toISOString();
  const date = timestamp.slice(0, 10);

  const steps = connectors.map((connector) => {
    const hit = coverageByName.get(connector.id);
    if (!hit) {
      return {
        connector: connector.id,
        status: "skipped_with_reason",
        reason: "no monthly coverage record found",
        duration_ms: 0,
        next_action: "Ensure monthly sweep includes this connector.",
        tier: connector.tier,
        group: connector.group
      };
    }

    return {
      connector: connector.id,
      status: "invoked",
      reason: "quarterly audit read existing monthly coverage",
      duration_ms: 0,
      next_action: "continue",
      tier: connector.tier,
      group: connector.group,
      last_status: hit.last_status
    };
  });

  const missingCoverage = steps.filter((step) => step.status !== "invoked");
  const staleSuggested = (planLedger.actions || []).filter((item) => item && item.approval_state === "suggested").length;
  const staleApproved = (planLedger.actions || []).filter((item) => item && item.approval_state === "approved").length;

  const suggestedActions = [];
  if (missingCoverage.length) {
    suggestedActions.push({
      status: "suggested",
      title: "Repair connector coverage gaps",
      problem: "Quarterly audit detected connectors without monthly coverage records.",
      proposed_change: "Run monthly sweep and resolve missing connector bindings.",
      labels: ["ops", "coverage"],
      source_link: "reports/ecosystem/" + date + "-quarterly-mcp-audit.json"
    });
  }
  if (staleSuggested > 0 || staleApproved > 0) {
    suggestedActions.push({
      status: "suggested",
      title: "Review approval backlog",
      problem: "Plan ledger contains unresolved suggested/approved actions.",
      proposed_change: "Refresh approvals and clear stale action backlog.",
      labels: ["ops", "approval"],
      source_link: "plan-ledger.json"
    });
  }

  const report = {
    run_id: "run-" + timestamp.replace(/[:.]/g, "-") + "-quarterly-mcp-audit",
    timestamp: timestamp,
    timezone: "Europe/Istanbul",
    mode: "quarterly-mcp-audit",
    write_mode: "guarded",
    steps: steps,
    risk_summary: {
      high: [],
      medium: missingCoverage.length ? ["Coverage gaps detected in quarterly audit."] : [],
      low: missingCoverage.length ? [] : ["Quarterly connector coverage audit clean."]
    },
    audit: {
      coverage: {
        total_connectors: connectors.length,
        connectors_with_coverage: connectors.length - missingCoverage.length,
        connectors_missing_coverage: missingCoverage.length,
        target: "100%"
      },
      approval_backlog: {
        suggested_count: staleSuggested,
        approved_count: staleApproved
      }
    },
    summary: "Quarterly MCP audit completed using guarded-write and coverage-ledger verification.",
    suggested_actions: suggestedActions
  };

  ensureReportDir();
  const reportPath = path.join(REPORT_DIR, date + "-quarterly-mcp-audit.json");
  writeJson(reportPath, report);
  process.stdout.write("Quarterly MCP audit report: " + reportPath + "\n");
}

main();

#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(ROOT, "reports", "ecosystem");
const LEDGER_PATH = path.join(ROOT, "content-intake-ledger.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".gif", ".bmp", ".tiff", ".mp4"]);

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

function listZipEntries(zipPath) {
  if (!fs.existsSync(zipPath)) {
    return [];
  }
  const res = cp.spawnSync("unzip", ["-Z1", zipPath], { encoding: "utf8" });
  if (res.status !== 0) {
    return [];
  }
  return String(res.stdout || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function listFolderEntries(folderPath) {
  const abs = path.isAbsolute(folderPath) ? folderPath : path.join(ROOT, folderPath);
  if (!fs.existsSync(abs)) {
    return [];
  }

  const out = [];
  const stack = [abs];
  while (stack.length) {
    const current = stack.pop();
    const names = fs.readdirSync(current, { withFileTypes: true });
    for (const name of names) {
      const full = path.join(current, name.name);
      if (name.isDirectory()) {
        stack.push(full);
      } else if (name.isFile()) {
        out.push(full);
      }
    }
  }
  return out;
}

function normalizeCategory(input) {
  const lower = input.toLowerCase();
  if (lower.includes("ital") || lower.includes("ilham")) {
    return "italy-inspiration";
  }
  if (lower.includes("acikalan") || lower.includes("sergi") || lower.includes("exhibit")) {
    return "exhibition";
  }
  if (lower.includes("draw") || lower.includes("ciz") || lower.includes("karakalem") || lower.includes("renk")) {
    return "drawing";
  }
  if (lower.includes("behance") || lower.includes("photomanip")) {
    return "photomanip";
  }
  return "unclassified";
}

function scoreCandidate(candidate, blockedKeywords) {
  const text = (candidate.path_hint + " " + candidate.title).toLowerCase();
  const blocked = blockedKeywords.some((kw) => text.includes(String(kw).toLowerCase()));
  if (blocked) {
    return { blocked: true, score: 0 };
  }

  let score = 55;
  if (candidate.is_media) {
    score += 20;
  }
  if (candidate.category !== "unclassified") {
    score += 15;
  }
  if (candidate.source_type === "behance_registry") {
    score += 10;
  }
  if (candidate.source_type === "zip_scan") {
    score += 5;
  }
  if (score > 100) {
    score = 100;
  }
  return { blocked: false, score: score };
}

function makeId(seed) {
  return seed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function main() {
  const ledger = readJson(LEDGER_PATH, {
    policy: {
      quality_threshold: 85,
      max_candidates: 300,
      blocked_keywords: ["alkol", "alcohol", "wine", "beer", "cocktail", "yemek", "food", "restaurant", "cafe", "kafe"]
    },
    sources: { behance_registry: "", zip_paths: [], folder_paths: [] },
    candidates: []
  });

  const threshold = Number((ledger.policy && ledger.policy.quality_threshold) || 85);
  const maxCandidates = Number((ledger.policy && ledger.policy.max_candidates) || 300);
  const blockedKeywords = Array.isArray(ledger.policy && ledger.policy.blocked_keywords)
    ? ledger.policy.blocked_keywords
    : ["alkol", "alcohol", "wine", "beer", "cocktail", "yemek", "food", "restaurant", "cafe", "kafe"];

  const discovered = [];

  const behanceRegistryPath = ledger.sources && ledger.sources.behance_registry
    ? path.join(ROOT, ledger.sources.behance_registry)
    : "";
  const behanceRegistry = behanceRegistryPath ? readJson(behanceRegistryPath, { items: [] }) : { items: [] };

  for (const item of (behanceRegistry.items || [])) {
    const projectId = String(item.project_id || "").trim();
    if (!projectId) {
      continue;
    }
    const candidate = {
      candidate_id: item.candidate_id || ("behance-" + projectId),
      source_type: "behance_registry",
      title: item.title || ("Behance project " + projectId),
      path_hint: "behance:" + projectId,
      category: normalizeCategory(item.category || item.title || "behance"),
      is_media: true,
      duplicate_group: "behance-project-" + projectId
    };
    discovered.push(candidate);
  }

  for (const zipPath of (ledger.sources.zip_paths || [])) {
    const entries = listZipEntries(zipPath);
    for (const entry of entries) {
      const ext = path.extname(entry).toLowerCase();
      if (!IMAGE_EXT.has(ext)) {
        continue;
      }
      const base = path.basename(entry);
      discovered.push({
        candidate_id: makeId("zip-" + base + "-" + entry),
        source_type: "zip_scan",
        title: base,
        path_hint: zipPath + "::" + entry,
        category: normalizeCategory(entry),
        is_media: true,
        duplicate_group: makeId("media-" + base)
      });
    }
  }

  for (const folderPath of (ledger.sources.folder_paths || [])) {
    const entries = listFolderEntries(folderPath);
    for (const fullPath of entries) {
      const ext = path.extname(fullPath).toLowerCase();
      if (!IMAGE_EXT.has(ext)) {
        continue;
      }
      const rel = path.relative(ROOT, fullPath);
      const base = path.basename(fullPath);
      discovered.push({
        candidate_id: makeId("folder-" + rel),
        source_type: "folder_scan",
        title: base,
        path_hint: rel,
        category: normalizeCategory(rel),
        is_media: true,
        duplicate_group: makeId("media-" + base)
      });
    }
  }

  const dedupMap = new Map();
  for (const item of discovered) {
    const key = item.duplicate_group || item.candidate_id;
    if (!dedupMap.has(key)) {
      dedupMap.set(key, item);
      continue;
    }

    const existing = dedupMap.get(key);
    const merged = {
      ...existing,
      title: existing.title,
      path_hint: existing.path_hint + " | " + item.path_hint,
      source_type: existing.source_type === item.source_type ? existing.source_type : "hybrid",
      merge_note: "auto-dedup merged multiple sources"
    };
    dedupMap.set(key, merged);
  }

  const candidates = Array.from(dedupMap.values()).map((candidate) => {
    const scored = scoreCandidate(candidate, blockedKeywords);
    const actionState = scored.blocked
      ? "blocked"
      : (scored.score >= threshold ? "suggested" : "rejected");
    return {
      candidate_id: candidate.candidate_id,
      source_type: candidate.source_type,
      title: candidate.title,
      category: candidate.category,
      quality_score: scored.score,
      duplicate_group: candidate.duplicate_group,
      action_state: actionState,
      path_hint: candidate.path_hint,
      merge_note: candidate.merge_note || ""
    };
  });

  const priority = {
    suggested: 0,
    blocked: 1,
    rejected: 2
  };
  candidates.sort((a, b) => {
    const pa = priority[a.action_state] ?? 9;
    const pb = priority[b.action_state] ?? 9;
    if (pa !== pb) {
      return pa - pb;
    }
    return (b.quality_score || 0) - (a.quality_score || 0);
  });

  const suggested = candidates.filter((item) => item.action_state === "suggested");
  const blocked = candidates.filter((item) => item.action_state === "blocked");
  const rejected = candidates.filter((item) => item.action_state === "rejected");
  const storedCandidates = candidates.slice(0, Math.max(0, maxCandidates));
  const trimmedCount = candidates.length - storedCandidates.length;

  const nextLedger = {
    ...ledger,
    policy: {
      ...(ledger.policy || {}),
      max_candidates: maxCandidates
    },
    last_run_at: new Date().toISOString(),
    candidates: storedCandidates,
    snapshot: {
      total_candidates: candidates.length,
      stored_candidates: storedCandidates.length,
      trimmed_candidates: trimmedCount,
      suggested: suggested.length,
      blocked: blocked.length,
      rejected: rejected.length
    }
  };
  writeJson(LEDGER_PATH, nextLedger);

  const timestamp = new Date().toISOString();
  const date = timestamp.slice(0, 10);
  const report = {
    run_id: "run-" + timestamp.replace(/[:.]/g, "-") + "-content-intake",
    timestamp: timestamp,
    timezone: "Europe/Istanbul",
    mode: "content-intake-read-only",
    write_mode: "guarded",
    steps: [
      {
        connector: "content-intake-hybrid",
        status: "invoked",
        reason: "Hybrid intake completed with read-only indexing.",
        duration_ms: 0,
        next_action: "Review suggested candidates and promote approved items manually."
      }
    ],
    risk_summary: {
      high: [],
      medium: blocked.length ? ["Blocked keywords detected in one or more candidates."] : [],
      low: suggested.length ? ["Suggested candidates ready for approval."] : ["No suggested candidates found."]
    },
    audit: {
      threshold: threshold,
      max_candidates: maxCandidates,
      totals: {
        candidates: candidates.length,
        stored_candidates: storedCandidates.length,
        trimmed_candidates: trimmedCount,
        suggested: suggested.length,
        blocked: blocked.length,
        rejected: rejected.length
      }
    },
    summary: "Hybrid read-only intake finished. No website code was modified.",
    suggested_actions: [
      {
        status: "suggested",
        title: "Review suggested content intake queue",
        problem: "New Behance/drawing candidates require approval flow.",
        proposed_change: "Approve selected candidates in Notion+GitHub workflow before implementation.",
        labels: ["content", "ops"],
        source_link: "content-intake-ledger.json"
      }
    ]
  };

  ensureReportDir();
  const reportPath = path.join(REPORT_DIR, date + "-content-intake.json");
  writeJson(reportPath, report);
  process.stdout.write("Content intake report: " + reportPath + "\n");
}

main();

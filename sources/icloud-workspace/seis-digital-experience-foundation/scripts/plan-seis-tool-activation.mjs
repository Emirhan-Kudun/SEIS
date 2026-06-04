import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const registryPath = "data/seis/mcp-skill-connector-registry.json";
const rulesPath = "data/seis/tool-activation-rules.json";
const readinessPath = "data/seis/mcp-runtime-readiness.json";
const observationSurfaceMap = {
  "codex-mcp-list": ["skill-runtime", "documentation-knowledge-mcps"],
  "github-local-cli": ["github-governance-connectors"],
  "github-app-connector": ["github-governance-connectors"],
  "output-ai-skill": ["skill-runtime"]
};

export function buildActivationPlan(missionText, options = {}) {
  const { registry, rules, readiness } = options.registry && options.rules
    ? options
    : loadToolActivationData();

  const normalizedMission = normalize(missionText || "");
  const selectedIntent = selectIntent(normalizedMission, rules);
  const registryById = new Map(registry.surfaces.map((surface) => [surface.id, surface]));
  const readinessBySurface = groupReadinessBySurface(readiness?.items || []);
  const selectedSurfaceIds = new Set(selectedIntent.requiredSurfaces);

  for (const conditionalSurface of selectedIntent.conditionalSurfaces || []) {
    if (matchesAny(normalizedMission, conditionalSurface.keywords || [])) {
      selectedSurfaceIds.add(conditionalSurface.id);
    }
  }

  const selectedSurfaces = [...selectedSurfaceIds]
    .map((id) => registryById.get(id))
    .filter(Boolean)
    .map((surface) => describeSurface(surface, registry.runtimeObservations || [], readinessBySurface.get(surface.id) || []));

  const blockedByDefault = (selectedIntent.blockedByDefault || [])
    .map((id) => registryById.get(id))
    .filter(Boolean)
    .map((surface) => ({
      id: surface.id,
      label: surface.label,
      reason: "Not required by the selected mission intent."
    }));

  const blockers = collectBlockers(selectedSurfaces, registry.runtimeObservations || []);
  const permissionGates = collectPermissionGates(selectedSurfaces);
  const runtimeReadiness = summarizePlanReadiness(selectedSurfaces, readiness);

  return {
    schemaVersion: "1.0.0",
    mission: "SEIS-M007",
    basePlannerMission: "SEIS-M005",
    readinessMission: readiness?.mission || null,
    input: missionText,
    selectedIntent: {
      id: selectedIntent.id,
      label: selectedIntent.label,
      score: selectedIntent.score,
      matchedKeywords: selectedIntent.matchedKeywords
    },
    ownerAgents: selectedIntent.primaryAgents,
    executionPolicy: {
      defaultMode: rules.policy.defaultMode,
      blanketActivationAllowed: rules.policy.blanketActivationAllowed,
      preferLocalEvidence: rules.policy.preferLocalEvidence
    },
    selectedSurfaces,
    blockedByDefault,
    runtimeReadiness,
    blockers,
    permissionGates,
    validation: selectedIntent.validation,
    nextAction: blockers.length > 0
      ? "Resolve or explicitly accept blockers before write-capable connector use."
      : permissionGates.length > 0
        ? "Review permission-gated connectors before using external authenticated surfaces."
      : "Proceed with the selected read-only-first surfaces and run validation."
  };
}

export function loadToolActivationData() {
  ensureFile(registryPath);
  ensureFile(rulesPath);

  return {
    registry: JSON.parse(readFileSync(registryPath, "utf8")),
    rules: JSON.parse(readFileSync(rulesPath, "utf8")),
    readiness: existsSync(readinessPath)
      ? JSON.parse(readFileSync(readinessPath, "utf8"))
      : null
  };
}

function selectIntent(normalizedMission, rules) {
  const scored = rules.intents.map((intent) => {
    const matchedKeywords = (intent.keywords || []).filter((keyword) => keywordMatches(normalizedMission, keyword));
    return {
      ...intent,
      score: matchedKeywords.length * 3 + (intent.id === rules.policy.defaultIntent ? 1 : 0),
      matchedKeywords
    };
  });

  scored.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return scored[0];
}

function describeSurface(surface, observations, readinessItems) {
  const relatedObservations = observations.filter((observation) => {
    return (observationSurfaceMap[observation.id] || []).includes(surface.id);
  });
  const readinessSummary = summarizeSurfaceReadiness(readinessItems);

  return {
    id: surface.id,
    label: surface.label,
    ownerAgent: surface.ownerAgent,
    risk: surface.risk,
    status: surface.status,
    activationMode: activationModeFor(surface),
    activationRule: surface.activationRule,
    guardrails: surface.guardrails,
    runtimeReadiness: readinessSummary,
    runtimeObservations: relatedObservations.map((observation) => ({
      id: observation.id,
      status: observation.status
    }))
  };
}

function activationModeFor(surface) {
  const status = surface.status.toLowerCase();
  if (status.includes("blocked")) return "blocked";
  if (status.includes("permission")) return "permission-gated";
  if (surface.risk === "high") return "read-only-preflight";
  if (status.includes("read-only")) return "read-only";
  return "mission-scoped";
}

function groupReadinessBySurface(items) {
  return items.reduce((groups, item) => {
    if (!item.surfaceId) return groups;
    if (!groups.has(item.surfaceId)) groups.set(item.surfaceId, []);
    groups.get(item.surfaceId).push(item);
    return groups;
  }, new Map());
}

function summarizeSurfaceReadiness(items) {
  return {
    totalItems: items.length,
    byReadiness: countBy(items, "readiness"),
    blockedAuthItems: items.filter((item) => item.readiness === "blocked-auth").map(({ name, auth }) => ({ name, auth })),
    permissionGatedItems: items.filter((item) => item.readiness === "permission-gated").map(({ name, auth }) => ({ name, auth })),
    examples: items.slice(0, 8).map(({ name, readiness }) => ({ name, readiness }))
  };
}

function summarizePlanReadiness(selectedSurfaces, readiness) {
  const selectedItems = selectedSurfaces.flatMap((surface) => {
    return (readiness?.items || []).filter((item) => item.surfaceId === surface.id);
  });

  return {
    sourceMission: readiness?.mission || null,
    sourceGeneratedAt: readiness?.generatedAt || null,
    totalRuntimeItems: selectedItems.length,
    byReadiness: countBy(selectedItems, "readiness"),
    blockedAuthItems: selectedItems.filter((item) => item.readiness === "blocked-auth").length,
    permissionGatedItems: selectedItems.filter((item) => item.readiness === "permission-gated").length,
    unmappedRuntimeItems: readiness?.summary?.unmappedItems ?? null
  };
}

function collectBlockers(selectedSurfaces, observations) {
  const selectedIds = new Set(selectedSurfaces.map((surface) => surface.id));
  const blockers = [];

  for (const surface of selectedSurfaces) {
    if (surface.activationMode === "blocked") {
      blockers.push({
        id: `${surface.id}-blocked`,
        surface: surface.id,
        detail: `Surface status is ${surface.status}.`
      });
    }
  }

  for (const observation of observations) {
    if (!observation.status.startsWith("blocked")) continue;
    const githubSelected = selectedIds.has("github-governance-connectors") && observation.id.includes("github");
    if (githubSelected) {
      blockers.push({
        id: observation.id,
        surface: "github-governance-connectors",
        detail: observation.detail
      });
    }
  }

  for (const surface of selectedSurfaces) {
    for (const item of surface.runtimeReadiness.blockedAuthItems || []) {
      blockers.push({
        id: `${surface.id}:${item.name}:blocked-auth`,
        surface: surface.id,
        detail: `${item.name} is visible in MCP runtime but blocked by auth state ${item.auth}.`
      });
    }
  }

  return blockers;
}

function collectPermissionGates(selectedSurfaces) {
  return selectedSurfaces.flatMap((surface) => {
    return (surface.runtimeReadiness.permissionGatedItems || []).map((item) => ({
      id: `${surface.id}:${item.name}:permission-gated`,
      surface: surface.id,
      detail: `${item.name} requires permission or OAuth confirmation before use.`
    }));
  });
}

function countBy(entries, field) {
  return entries.reduce((counts, entry) => {
    const key = entry[field] || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function matchesAny(normalizedMission, keywords) {
  return keywords.some((keyword) => keywordMatches(normalizedMission, keyword));
}

function normalize(value) {
  return value.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
}

function keywordMatches(normalizedMission, keyword) {
  const normalizedKeyword = normalize(keyword);
  if (normalizedKeyword.includes(" ")) {
    return normalizedMission.includes(normalizedKeyword);
  }

  return tokenize(normalizedMission).some((token) => {
    if (token === normalizedKeyword) return true;
    return normalizedKeyword.length >= 5 && token.startsWith(normalizedKeyword);
  });
}

function tokenize(value) {
  return value.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

function ensureFile(file) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isCli) {
  const missionText = process.argv.slice(2).join(" ").trim();
  if (!missionText) {
    console.error("Usage: node scripts/plan-seis-tool-activation.mjs \"mission text\"");
    process.exit(1);
  }

  console.log(JSON.stringify(buildActivationPlan(missionText), null, 2));
}

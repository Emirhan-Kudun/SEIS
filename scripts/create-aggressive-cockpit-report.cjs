const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const outputPath = path.join(ROOT, "content", "development", "aggressive-cockpit-report.json");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function normalize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function buildReport() {
  const aggressiveMap = readJson("content/development/aggressive-capability-map.json");
  const evolutionModel = readJson("content/development/seis-evolution-model.json");
  const publishGate = readJson("content/development/publish-gate-contract.json");
  const remoteConfig = readJson("content/development/github-remote-configuration.json");

  const laneCount = aggressiveMap.capabilityLanes?.length || 0;
  const readinessReady = (aggressiveMap.liveReadinessMatrix || []).filter((entry) =>
    String(entry.status || "").includes("ready") || String(entry.status || "").includes("candidate")
  ).length;
  const blockedGates = unique([
    ...(publishGate.readinessLevels || []).flatMap((level) => level.blocks || []),
    ...(remoteConfig.publishReadiness?.pushRequires || [])
  ]);

  const immediateActions = (evolutionModel.activationQueue || []).slice(0, 5).map((item, index) => ({
    order: index + 1,
    id: item.id,
    backlogId: item.backlogId,
    layer: item.layer,
    title: item.title,
    nextAction: item.nextAction,
    validationProfile: item.validationProfile,
    rollback: item.rollback
  }));

  const laneSummaries = (aggressiveMap.capabilityLanes || []).map((lane) => ({
    id: lane.id,
    surfaceCount: lane.surfaces?.length || 0,
    firstSurfaces: (lane.surfaces || []).slice(0, 4),
    allowedActionCount: lane.allowedActions?.length || 0,
    firstBlockedAction: lane.blockedActions?.[0] || "none",
    qualityCommands: lane.qualityCommands || []
  }));

  const qualityCommands = unique([
    "npm run check:aggressive-cockpit-report",
    ...(aggressiveMap.capabilityLanes || []).flatMap((lane) => lane.qualityCommands || []),
    ...(publishGate.qualityCommands || []),
    ...(remoteConfig.qualityCommands || [])
  ]);

  return {
    id: "seis-aggressive-cockpit-report",
    version: 1,
    status: "active",
    mode: aggressiveMap.mode,
    branch: aggressiveMap.branch,
    generatedFrom: [
      "content/development/aggressive-capability-map.json",
      "content/development/seis-evolution-model.json",
      "content/development/publish-gate-contract.json",
      "content/development/github-remote-configuration.json"
    ],
    summary: {
      mission: aggressiveMap.mission,
      timeboxMinutes: aggressiveMap.timeboxMinutes,
      laneCount,
      readinessReady,
      immediateActionCount: immediateActions.length,
      publishExpectedResult: publishGate.currentEnvironmentPolicy?.expectedResult,
      remoteTarget: remoteConfig.repository?.remoteUrl,
      targetBranch: remoteConfig.repository?.targetBranch
    },
    immediateActions,
    laneSummaries,
    blockedGates,
    qualityCommands,
    rollback: "Regenerate this report from source governance records, or revert the smallest cockpit/report commit."
  };
}

function main() {
  const next = buildReport();
  const nextText = normalize(next);
  const checkMode = process.argv.includes("--check");

  if (checkMode) {
    if (!fs.existsSync(outputPath)) {
      console.error(`Missing aggressive cockpit report: ${path.relative(ROOT, outputPath)}`);
      process.exit(1);
    }

    const currentText = fs.readFileSync(outputPath, "utf8");
    if (currentText !== nextText) {
      console.error("Aggressive cockpit report is stale. Run npm run automation:aggressive-cockpit-report.");
      process.exit(1);
    }

    if (next.immediateActions.length < 5) {
      console.error("Aggressive cockpit report must keep at least five immediate actions.");
      process.exit(1);
    }

    if (next.laneSummaries.length < 5) {
      console.error("Aggressive cockpit report must include at least five lane summaries.");
      process.exit(1);
    }

    console.log("Aggressive cockpit report check passed.");
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, nextText);
  console.log(`Aggressive cockpit report written to ${path.relative(ROOT, outputPath)}`);
}

main();

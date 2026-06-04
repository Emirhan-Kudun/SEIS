import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { createUxAppsServer } from "../src/server/server.mjs";

async function withServer(callback) {
  const submissionsDir = await mkdtemp(path.join(tmpdir(), "ux-apps-submissions-"));
  const server = createUxAppsServer({ submissionsDir });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    await callback(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await rm(submissionsDir, { recursive: true, force: true });
  }
}

test("health and app APIs return foundation data", async () => {
  await withServer(async (baseUrl) => {
    const health = await fetch(`${baseUrl}/api/health`).then((response) => response.json());
    assert.equal(health.ok, true);
    assert.equal(health.service, "ux-apps");

    const apps = await fetch(`${baseUrl}/api/apps`).then((response) => response.json());
    assert.equal(apps.apps.length >= 5, true);

    const cinematicProgram = await fetch(`${baseUrl}/api/cinematic-program`).then((response) => response.json());
    assert.equal(cinematicProgram.qualityPresets.length >= 3, true);
    assert.equal(cinematicProgram.motionDepths.some((depth) => depth.id === "cinematic"), true);

    const archiveInsights = await fetch(`${baseUrl}/api/archive-insights`).then((response) => response.json());
    assert.equal(archiveInsights.conversionMap.length >= 5, true);
    assert.equal(archiveInsights.noisePolicy.excluded.includes("node_modules"), true);
    assert.equal(archiveInsights.nextFeatures.some((feature) => feature.id === "composition-score-panel"), true);

    const promotionLab = await fetch(`${baseUrl}/api/zip-promotion-lab`).then((response) => response.json());
    assert.equal(promotionLab.lanes.length >= 5, true);
    assert.equal(promotionLab.summary.lanes, promotionLab.lanes.length);
    assert.equal(promotionLab.lanes.some((lane) => lane.status === "blocked"), true);
    assert.equal(promotionLab.blockedImports.includes(".git"), true);

    const decisionQueue = await fetch(`${baseUrl}/api/decision-queue`).then((response) => response.json());
    assert.equal(decisionQueue.decisions.length >= 5, true);
    assert.equal(decisionQueue.summary.decisions, decisionQueue.decisions.length);
    assert.equal(decisionQueue.decisions.some((decision) => decision.status === "blocked"), true);
    assert.equal(decisionQueue.decisions.every((decision) => decision.rollback), true);

    const motionTokens = await fetch(`${baseUrl}/api/motion-tokens`).then((response) => response.json());
    assert.equal(motionTokens.tokens.length >= 7, true);
    assert.equal(motionTokens.summary.tokens, motionTokens.tokens.length);
    assert.equal(motionTokens.summary.defaultPreset, "heavy-cinematic");
    assert.equal(motionTokens.summary.reducedMotion, "instant-state-change");
    assert.equal(motionTokens.tokens.some((token) => token.pressure === "guarded"), true);
    assert.equal(motionTokens.tokens.some((token) => token.id === "heavy-cinematic"), true);

    const affordances = await fetch(`${baseUrl}/api/accessibility-affordances`).then((response) => response.json());
    assert.equal(affordances.affordances.length >= 6, true);
    assert.equal(affordances.summary.affordances, affordances.affordances.length);
    assert.equal(affordances.summary.mobileReady >= 3, true);
    assert.equal(affordances.blockedPatterns.includes("hover-only disclosure"), true);

    const scorecard = await fetch(`${baseUrl}/api/experience-scorecard`).then((response) => response.json());
    assert.equal(scorecard.dimensions.length >= 6, true);
    assert.equal(scorecard.summary.dimensions, scorecard.dimensions.length);
    assert.equal(scorecard.summary.score >= scorecard.summary.minimumReleaseScore, true);
    assert.equal(scorecard.watchItems.some((item) => item.includes("GitHub CLI auth")), true);

    const gapClosureRegister = await fetch(`${baseUrl}/api/gap-closure-register`).then((response) => response.json());
    assert.equal(gapClosureRegister.gaps.length >= 6, true);
    assert.equal(gapClosureRegister.summary.gaps, gapClosureRegister.gaps.length);
    assert.equal(gapClosureRegister.summary.blocked, gapClosureRegister.gaps.filter((gap) => gap.status === "blocked").length);
    assert.equal(gapClosureRegister.gaps.every((gap) => gap.priority && gap.nextAction && gap.closureMetric && gap.rollback), true);
    assert.equal(gapClosureRegister.gaps.every((gap) => Array.isArray(gap.qualityCommands) && gap.qualityCommands.length > 0), true);
    assert.equal(gapClosureRegister.gaps.some((gap) => gap.qualityCommands.includes("npm run check:polyglot-foundation")), true);

    const stewardship = await fetch(`${baseUrl}/api/weekly-usage-stewardship`).then((response) => response.json());
    assert.equal(stewardship.summary.cadence, "weekly-budget-aware");
    assert.equal(stewardship.preferredSpend.some((item) => item.id === "implementation-slices"), true);
    assert.equal(stewardship.blockedSpend.includes("empty token burn"), true);

    const observability = await fetch(`${baseUrl}/api/observability`).then((response) => response.json());
    assert.equal(observability.signals.decisionQueue, decisionQueue.decisions.length);
    assert.equal(observability.signals.readyDecisions, decisionQueue.summary.ready);
    assert.equal(observability.signals.motionTokens, motionTokens.tokens.length);
    assert.equal(observability.signals.accessibilityAffordances, affordances.affordances.length);
    assert.equal(observability.signals.experienceScore, scorecard.summary.score);
    assert.equal(observability.signals.gapClosureCount, gapClosureRegister.gaps.length);
    assert.equal(observability.signals.gapClosureBlocked, gapClosureRegister.summary.blocked);
    assert.equal(observability.signals.weeklyUsageCadence, stewardship.summary.cadence);
  });
});

test("contact API validates input and accepts valid requests", async () => {
  await withServer(async (baseUrl) => {
    const invalid = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "A" })
    });

    assert.equal(invalid.status, 422);

    const valid = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Emirhan",
        email: "emirhan@example.com",
        intention: "UX system",
        message: "Build a calm UX application foundation."
      })
    });

    const payload = await valid.json();
    assert.equal(valid.status, 201);
    assert.equal(payload.ok, true);
  });
});

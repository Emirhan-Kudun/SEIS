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

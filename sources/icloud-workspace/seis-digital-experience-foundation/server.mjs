#!/usr/bin/env node
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { appendFile, mkdir, readFile, stat } from "node:fs/promises";
import { randomBytes, createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const RUNTIME_DIR = path.join(ROOT, "runtime");
const SUBMISSIONS_FILE = path.join(RUNTIME_DIR, "contact-submissions.jsonl");
const BODY_LIMIT = 128 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const SUPPORTED_LANGS = ["tr", "en", "fr", "it", "de"];
const DEFAULT_LANG = "tr";

const startedAt = new Date();
const rateBuckets = new Map();

const publicFiles = new Set([
  "index.html",
  "style.css",
  "script.js",
  "translations.json",
  "manifest.json",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "contact.html"
]);

const publicDirs = ["assets", "images"];

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"]
]);

function sendJson(response, statusCode, payload, headers = {}) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...headers
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(message);
}

async function readJsonFile(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

async function readVirtualSiteConfig() {
  const config = await readJsonFile("site-config.json", {});
  return {
    ...config,
    contactEndpoint: "/api/contact",
    runtime: "node-fullstack",
    api: {
      health: "/api/health",
      site: "/api/site",
      integrations: "/api/integrations",
      roadmap: "/api/roadmap",
      i18nHealth: "/api/i18n-health",
      availability: "/api/availability",
      cinematicDepth: "/api/cinematic-depth",
      developmentProgram: "/api/development-program",
      automationSchedules: "/api/automation-schedules",
      efficiencyMode: "/api/efficiency-mode",
      githubPublication: "/api/github-publication",
      brief: "/api/brief",
      estimate: "/api/estimate",
      studio: "/api/studio",
      runtimeConfig: "/api/runtime-config",
      contentModel: "/api/content-model",
      infrastructure: "/api/infrastructure",
      serverHandoff: "/api/server-handoff",
      serverUploadBundle: "/api/server-upload-bundle",
      serverTarget: "/api/server-target",
      softwareLanguages: "/api/software-languages",
      polyglotFoundation: "/api/polyglot-foundation",
      preservationSnapshot: "/api/preservation-snapshot",
      qualityScorecard: "/api/quality-scorecard",
      releaseReadiness: "/api/release-readiness",
      orchestrationReadiness: "/api/orchestration-readiness",
      seisOperationsReadiness: "/api/seis-operations-readiness",
      seisConnectorReadiness: "/api/seis-connector-readiness",
      seisCloudServerEnvironment: "/api/seis-cloud-server-environment",
      seisDeployEnvelope: "/api/seis-deploy-envelope",
      seisRemoteShipmentGate: "/api/seis-remote-shipment-gate",
      seisProductEngineeringModel: "/api/seis-product-engineering-model",
      seisGithubLanguagePresence: "/api/seis-github-language-presence",
      seisCapabilityActivationHub: "/api/seis-capability-activation-hub"
    }
  };
}

function normalizeLang(value) {
  const normalized = String(value || "").toLowerCase();
  return SUPPORTED_LANGS.includes(normalized) ? normalized : DEFAULT_LANG;
}

function getClientId(request) {
  const forwarded = String(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || request.socket.remoteAddress || "unknown";
}

function hashClientId(value) {
  return createHash("sha256")
    .update(String(value))
    .update(process.env.CONTACT_HASH_SALT || "portfolio-local")
    .digest("hex")
    .slice(0, 24);
}

function isRateLimited(clientId) {
  const now = Date.now();
  const current = rateBuckets.get(clientId) || [];
  const recent = current.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(clientId, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(clientId, recent);
  return false;
}

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(Object.assign(new Error("Payload too large"), { statusCode: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

function parseMultipart(buffer, contentType) {
  const boundaryMatch = /boundary=([^;]+)/i.exec(contentType);
  if (!boundaryMatch) {
    return {};
  }

  const boundary = "--" + boundaryMatch[1].replace(/^"|"$/g, "");
  const rawParts = buffer.toString("utf8").split(boundary).slice(1, -1);
  const fields = {};

  rawParts.forEach((part) => {
    const normalized = part.replace(/^\r\n/, "").replace(/\r\n$/, "");
    const splitAt = normalized.indexOf("\r\n\r\n");
    if (splitAt === -1) {
      return;
    }
    const headers = normalized.slice(0, splitAt);
    const body = normalized.slice(splitAt + 4).replace(/\r\n$/, "");
    const nameMatch = /name="([^"]+)"/i.exec(headers);
    const hasFile = /filename="/i.test(headers);
    if (!nameMatch || hasFile) {
      return;
    }
    fields[nameMatch[1]] = body;
  });

  return fields;
}

function parseFields(buffer, contentType) {
  const type = String(contentType || "").toLowerCase();

  if (type.includes("multipart/form-data")) {
    return parseMultipart(buffer, contentType);
  }

  if (type.includes("application/json")) {
    try {
      return JSON.parse(buffer.toString("utf8"));
    } catch {
      return {};
    }
  }

  const params = new URLSearchParams(buffer.toString("utf8"));
  return Object.fromEntries(params.entries());
}

async function handleContact(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type, accept"
    });
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    sendJson(response, 429, { ok: false, message: "Too many requests" });
    return;
  }

  let fields;
  try {
    const body = await readBody(request);
    fields = parseFields(body, request.headers["content-type"]);
  } catch (error) {
    sendJson(response, error.statusCode || 400, { ok: false, message: "Invalid request" });
    return;
  }

  if (cleanText(fields._gotcha, 120)) {
    sendJson(response, 200, { ok: false, message: "Spam ignored" });
    return;
  }

  const name = cleanText(fields.name, 120);
  const email = cleanText(fields.email, 180);
  const service = cleanText(fields.service, 80);
  const message = cleanText(fields.message, 4000);
  const subject = cleanText(fields._subject, 160);

  if (!name || !email || !message) {
    sendJson(response, 400, { ok: false, message: "Required fields are missing" });
    return;
  }

  if (!isEmail(email)) {
    sendJson(response, 400, { ok: false, message: "Invalid email" });
    return;
  }

  if (message.length < 12) {
    sendJson(response, 400, { ok: false, message: "Required fields are missing" });
    return;
  }

  const submission = {
    id: "msg_" + Date.now().toString(36) + "_" + randomBytes(4).toString("hex"),
    receivedAt: new Date().toISOString(),
    name,
    email,
    service,
    message,
    subject,
    clientHash: hashClientId(clientId),
    userAgent: cleanText(request.headers["user-agent"], 240)
  };

  try {
    await mkdir(RUNTIME_DIR, { recursive: true });
    await appendFile(SUBMISSIONS_FILE, JSON.stringify(submission) + "\n", "utf8");
  } catch {
    sendJson(response, 500, { ok: false, message: "Mail could not be sent" });
    return;
  }

  sendJson(response, 200, {
    ok: true,
    message: "Message received",
    id: submission.id
  });
}

async function handleHealth(response) {
  sendJson(response, 200, {
    ok: true,
    service: "emirhan-kudun-portfolio",
    mode: "fullstack",
    startedAt: startedAt.toISOString(),
    uptimeSeconds: Math.round((Date.now() - startedAt.getTime()) / 1000)
  });
}

async function handleSite(response) {
  const config = await readVirtualSiteConfig();
  sendJson(response, 200, {
    ok: true,
    name: "Emirhan Kudun Portfolio",
    message: "I design minimal, functional, and visually balanced systems that create clarity.",
    languages: ["tr", "en", "fr", "it", "de"],
    contactEmail: config.contactEmail || "",
    contactEndpoint: config.contactEndpoint,
    surfaces: [
      "static portfolio",
      "contact API",
      "integration registry API",
      "roadmap API",
      "i18n health API",
      "availability API",
      "cinematic depth API",
      "development program API",
      "brief analysis API",
      "project estimate API",
      "studio runtime API",
      "runtime config API",
      "content model API",
      "infrastructure API",
      "software language matrix API",
      "polyglot foundation API",
      "preservation snapshot API",
      "server upload bundle API",
      "server target profile API",
      "quality scorecard API",
      "release readiness API",
      "orchestration readiness API",
      "SEIS operations readiness API",
      "SEIS connector readiness API",
      "SEIS cloud server environment API",
      "SEIS deploy envelope API",
      "SEIS remote shipment gate API",
      "SEIS product engineering model API",
      "SEIS GitHub language presence API",
      "SEIS capability activation hub API"
    ]
  });
}

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, number));
}

function normalizeService(value) {
  const normalized = cleanText(value, 80).toLowerCase();
  if (["branding", "editorial", "ui-ux", "other"].includes(normalized)) {
    return normalized;
  }
  return "other";
}

function createBriefAnalysis(fields) {
  const service = normalizeService(fields.service);
  const message = cleanText(fields.message, 4000);
  const lowerMessage = message.toLowerCase();
  const wordCount = message ? message.split(/\s+/).filter(Boolean).length : 0;
  const signals = [];
  const nextSteps = [];

  if (service !== "other") signals.push("service");
  if (wordCount >= 18) signals.push("scope");
  if (/takvim|timeline|deadline|teslim|hafta|week|month|ay|gun|gün/i.test(lowerMessage)) signals.push("timeline");
  if (/butce|bütçe|budget|tl|usd|eur|€|\$/i.test(lowerMessage)) signals.push("budget");
  if (/referans|reference|behance|figma|site|link|örnek|ornek/i.test(lowerMessage)) signals.push("reference");

  if (service === "other") nextSteps.push("choose-service");
  if (!signals.includes("scope")) nextSteps.push("add-scope");
  if (!signals.includes("timeline")) nextSteps.push("add-timeline");
  if (!signals.includes("budget")) nextSteps.push("add-budget");
  if (!signals.includes("reference")) nextSteps.push("add-reference");
  if (nextSteps.length === 0) nextSteps.push("send");

  let readinessScore = 24;
  readinessScore += service !== "other" ? 18 : 6;
  readinessScore += Math.min(24, Math.floor(wordCount * 1.4));
  readinessScore += signals.includes("timeline") ? 12 : 0;
  readinessScore += signals.includes("budget") ? 10 : 0;
  readinessScore += signals.includes("reference") ? 8 : 0;
  readinessScore = clampNumber(readinessScore, 35, 18, 96);

  let complexity = "focused";
  if (wordCount > 75 || signals.length >= 5) {
    complexity = "advanced";
  } else if (wordCount > 34 || signals.length >= 3) {
    complexity = "balanced";
  }

  const baseWeeks = service === "branding" ? 3 : service === "ui-ux" ? 2 : service === "editorial" ? 2 : 1;
  const timelineWeeks = baseWeeks + (complexity === "advanced" ? 2 : complexity === "balanced" ? 1 : 0);

  return {
    ok: true,
    service,
    complexity,
    readinessScore,
    timelineWeeks,
    signals,
    nextSteps: nextSteps.slice(0, 4)
  };
}

function createProjectEstimate(fields) {
  const analysis = createBriefAnalysis(fields);
  const message = cleanText(fields.message, 4000).toLowerCase();
  const urgent = /acil|urgent|hizli|hızlı|soon|asap|rush|hemen/i.test(message);
  const packageByService = {
    branding: "identity-system",
    editorial: "editorial-system",
    "ui-ux": "interface-system",
    other: "discovery-sprint"
  };
  const deliverablesByService = {
    branding: ["identity-audit", "visual-direction", "handoff-kit"],
    editorial: ["content-map", "layout-system", "export-kit"],
    "ui-ux": ["screen-map", "component-direction", "prototype-notes"],
    other: ["discovery-call", "scope-map", "next-step-plan"]
  };
  const extraDeliverables = analysis.complexity === "advanced"
    ? ["governance-notes", "revision-map"]
    : analysis.complexity === "balanced"
      ? ["revision-map"]
      : [];

  return {
    ok: true,
    service: analysis.service,
    package: packageByService[analysis.service] || packageByService.other,
    cadence: urgent ? "accelerated" : analysis.complexity === "advanced" ? "phased" : "weekly",
    expectedWeeks: urgent ? Math.max(1, analysis.timelineWeeks - 1) : analysis.timelineWeeks,
    priority: urgent ? "fast" : analysis.readinessScore >= 78 ? "ready" : "needs-detail",
    deliverables: [...deliverablesByService[analysis.service], ...extraDeliverables].slice(0, 5)
  };
}

async function handleAvailability(response) {
  const config = await readJsonFile("site-config.json", {});
  const openSlots = clampNumber(config.openProjectSlots, 2, 0, 9);
  const responseHours = clampNumber(config.responseWindowHours, 48, 1, 168);

  sendJson(response, 200, {
    ok: true,
    status: openSlots > 0 ? "open" : "limited",
    openSlots,
    responseHours,
    timezone: "Europe/Istanbul",
    updatedAt: new Date().toISOString()
  });
}

async function handleStudio(response) {
  const config = await readVirtualSiteConfig();
  const translations = await readJsonFile("translations.json", {});
  const defaultKeys = Object.keys(translations[DEFAULT_LANG] || {});
  const localeCoverage = SUPPORTED_LANGS.map((locale) => ({
    locale,
    keyCount: Object.keys(translations[locale] || {}).length
  }));
  const openSlots = clampNumber(config.openProjectSlots, 2, 0, 9);
  const responseHours = clampNumber(config.responseWindowHours, 48, 1, 168);
  const api = config.api || {};

  sendJson(response, 200, {
    ok: true,
    service: "emirhan-kudun-portfolio",
    mode: "node-fullstack",
    startedAt: startedAt.toISOString(),
    uptimeSeconds: Math.round((Date.now() - startedAt.getTime()) / 1000),
    apiCount: Object.keys(api).length,
    api,
    availability: {
      openSlots,
      responseHours,
      status: openSlots > 0 ? "open" : "limited"
    },
    i18n: {
      defaultLocale: DEFAULT_LANG,
      localeCount: SUPPORTED_LANGS.length,
      defaultKeyCount: defaultKeys.length,
      localeCoverage
    }
  });
}

async function handleRuntimeConfig(response) {
  const runtimeConfig = await readJsonFile("config/fullstack-runtime.json", {});
  sendJson(response, 200, {
    ok: true,
    runtimeConfig
  });
}

async function handleContentModel(response) {
  const contentModel = await readJsonFile("data/content-model.json", {});
  sendJson(response, 200, {
    ok: true,
    contentModel
  });
}

async function handleInfrastructure(response) {
  const [config, runtimeConfig, contentModel, softwareMatrix, polyglotManifest, preservationConfig] = await Promise.all([
    readVirtualSiteConfig(),
    readJsonFile("config/fullstack-runtime.json", {}),
    readJsonFile("data/content-model.json", {}),
    readJsonFile("config/software-language-matrix.json", {}),
    readJsonFile("polyglot/manifest.json", {}),
    readJsonFile("config/preservation-snapshot.json", {})
  ]);
  const modules = Array.isArray(runtimeConfig.modules) ? runtimeConfig.modules : [];
  const api = config.api || {};
  const entities = contentModel.entities || {};
  const languages = Array.isArray(softwareMatrix.languages) ? softwareMatrix.languages : [];
  const polyglotEntries = Array.isArray(polyglotManifest.entries) ? polyglotManifest.entries : [];
  const preservationRequiredPaths = Array.isArray(preservationConfig.requiredPaths) ? preservationConfig.requiredPaths : [];

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    runtime: {
      version: runtimeConfig.version || null,
      mode: runtimeConfig.runtime || config.runtime,
      moduleCount: modules.length,
      modules: modules.map((module) => ({
        id: module.id,
        status: module.status,
        surface: module.surface
      }))
    },
    content: {
      version: contentModel.version || null,
      locales: Array.isArray(contentModel.locales) ? contentModel.locales : SUPPORTED_LANGS,
      entityCount: Object.keys(entities).length,
      entities: Object.keys(entities)
    },
    softwareLanguages: {
      version: softwareMatrix.version || null,
      mode: softwareMatrix.branchPolicy ? softwareMatrix.branchPolicy.mode : null,
      languageCount: languages.length,
      categories: [...new Set(languages.map((language) => language.category).filter(Boolean))]
    },
    polyglotFoundation: {
      version: polyglotManifest.version || null,
      entryCount: polyglotEntries.length,
      languageIds: polyglotEntries.map((entry) => entry.languageId)
    },
    preservationSnapshot: {
      version: preservationConfig.version || null,
      requiredPathCount: preservationRequiredPaths.length,
      hashAlgorithm: preservationConfig.hashAlgorithm || null
    },
    api: {
      count: Object.keys(api).length,
      endpoints: api
    },
    storage: runtimeConfig.storage || {},
    qualityGates: Array.isArray(runtimeConfig.qualityGates) ? runtimeConfig.qualityGates : []
  });
}

async function handleSoftwareLanguages(response) {
  const matrix = await readJsonFile("config/software-language-matrix.json", {});
  const languages = Array.isArray(matrix.languages) ? matrix.languages : [];
  const categories = [...new Set(languages.map((language) => language.category).filter(Boolean))];

  sendJson(response, 200, {
    ok: true,
    version: matrix.version || null,
    branchPolicy: matrix.branchPolicy || {},
    languageCount: languages.length,
    categories,
    languages
  });
}

async function handlePolyglotFoundation(response) {
  const manifest = await readJsonFile("polyglot/manifest.json", {});
  const entries = Array.isArray(manifest.entries) ? manifest.entries : [];

  sendJson(response, 200, {
    ok: true,
    version: manifest.version || null,
    purpose: manifest.purpose || "",
    promotionRule: manifest.promotionRule || "",
    entryCount: entries.length,
    languageIds: entries.map((entry) => entry.languageId),
    entries
  });
}

function safeSnapshotPath(relPath) {
  if (!relPath || path.isAbsolute(relPath)) return null;
  const normalized = path.normalize(relPath);
  if (normalized.startsWith("..") || normalized === ".") return null;
  const absolutePath = path.join(ROOT, normalized);
  if (!absolutePath.startsWith(ROOT + path.sep)) return null;
  return { normalized, absolutePath };
}

async function hashSnapshotFile(relPath) {
  const safePath = safeSnapshotPath(relPath);
  if (!safePath) {
    return {
      path: relPath,
      ok: false,
      error: "unsafe-path"
    };
  }

  try {
    const [fileStat, buffer] = await Promise.all([
      stat(safePath.absolutePath),
      readFile(safePath.absolutePath)
    ]);
    return {
      path: safePath.normalized,
      ok: true,
      bytes: fileStat.size,
      sha256: createHash("sha256").update(buffer).digest("hex")
    };
  } catch {
    return {
      path: safePath.normalized,
      ok: false,
      error: "missing"
    };
  }
}

async function buildPreservationSnapshot() {
  const config = await readJsonFile("config/preservation-snapshot.json", {});
  const paths = new Set(Array.isArray(config.requiredPaths) ? config.requiredPaths : []);

  for (const source of Array.isArray(config.manifestSources) ? config.manifestSources : []) {
    const manifest = await readJsonFile(source.path, {});
    for (const entry of Array.isArray(manifest.entries) ? manifest.entries : []) {
      const entryPath = entry[source.pathField];
      if (entryPath) {
        paths.add(entryPath);
      }
    }
  }

  const forbiddenFragments = Array.isArray(config.forbiddenPathFragments) ? config.forbiddenPathFragments : [];
  const filteredPaths = [...paths].sort().filter((relPath) => !forbiddenFragments.some((fragment) => relPath.includes(fragment)));
  const files = await Promise.all(filteredPaths.map((relPath) => hashSnapshotFile(relPath)));
  const missing = files.filter((file) => !file.ok);

  return {
    ok: missing.length === 0,
    generatedAt: new Date().toISOString(),
    version: config.version || null,
    canonicalBranch: config.canonicalBranch || null,
    hashAlgorithm: config.hashAlgorithm || "sha256",
    fileCount: files.length,
    missingCount: missing.length,
    files,
    missing
  };
}

async function handlePreservationSnapshot(response) {
  sendJson(response, 200, await buildPreservationSnapshot());
}

async function buildServerUploadBundle() {
  const [bundleConfig, preservationSnapshot] = await Promise.all([
    readJsonFile("config/server-upload-bundle.json", {}),
    buildPreservationSnapshot()
  ]);

  const forbiddenEntries = Array.isArray(bundleConfig.forbiddenBundleEntries) ? bundleConfig.forbiddenBundleEntries : [];
  const uploadOrder = Array.isArray(bundleConfig.uploadOrder) ? bundleConfig.uploadOrder : [];
  const requiredCommands = Array.isArray(bundleConfig.requiredCommands) ? bundleConfig.requiredCommands : [];
  const fallbackWhenAuthBlocked = Array.isArray(bundleConfig.fallbackWhenAuthBlocked) ? bundleConfig.fallbackWhenAuthBlocked : [];

  return {
    ok: preservationSnapshot.ok,
    generatedAt: new Date().toISOString(),
    version: bundleConfig.version || null,
    purpose: bundleConfig.purpose || "",
    canonical: bundleConfig.canonical || {},
    bundle: bundleConfig.bundle || {},
    uploadOrder,
    requiredCommands,
    fallbackWhenAuthBlocked,
    forbiddenBundleEntries: forbiddenEntries,
    preservation: {
      ok: preservationSnapshot.ok,
      hashAlgorithm: preservationSnapshot.hashAlgorithm,
      fileCount: preservationSnapshot.fileCount,
      missingCount: preservationSnapshot.missingCount,
      sampleFiles: preservationSnapshot.files.slice(0, 12)
    }
  };
}

async function handleServerUploadBundle(response) {
  sendJson(response, 200, await buildServerUploadBundle());
}

async function buildServerTargetProfile() {
  const config = await readJsonFile("config/server-target-profile.json", {});
  const targets = Array.isArray(config.targets) ? config.targets : [];

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    version: config.version || null,
    purpose: config.purpose || "",
    defaultTarget: config.defaultTarget || null,
    targets: targets.map((target) => {
      const requiredEnvironment = target.requiredEnvironment || {};
      const environmentAvailability = Object.fromEntries(
        Object.entries(requiredEnvironment).map(([key, envName]) => [
          key,
          {
            name: envName,
            configured: Boolean(process.env[envName])
          }
        ])
      );

      return {
        id: target.id,
        label: target.label || target.id,
        method: target.method,
        bundleDirectory: target.bundleDirectory,
        requiredEnvironment,
        environmentAvailability,
        safeRemotePathPattern: target.safeRemotePathPattern || "",
        dryRunCommand: target.dryRunCommand || "",
        executeCommand: target.executeCommand || "",
        constraints: Array.isArray(target.constraints) ? target.constraints : []
      };
    })
  };
}

async function handleServerTarget(response) {
  sendJson(response, 200, await buildServerTargetProfile());
}

async function buildDevelopmentProgram() {
  const [program, scorecard, serverTarget] = await Promise.all([
    readJsonFile("config/development-program.json", {}),
    buildQualityScorecard(),
    buildServerTargetProfile()
  ]);
  const remoteBlocked = scorecard.blockers.length > 0;
  const releaseReadiness = {
    status: remoteBlocked ? "local-ready-remote-blocked" : scorecard.overallScore >= 90 ? "ready" : "needs-work",
    localReady: scorecard.overallScore >= 85,
    remoteBlocked,
    overallScore: scorecard.overallScore
  };
  const orchestrationReadiness = {
    status: remoteBlocked ? "ready-with-blocker" : "ready",
    overallScore: scorecard.overallScore
  };
  const lanes = Array.isArray(program.lanes) ? program.lanes : [];
  const target = Array.isArray(serverTarget.targets) ? serverTarget.targets[0] : null;
  const missingServerEnv = target
    ? Object.values(target.environmentAvailability || {}).filter((entry) => !entry.configured).map((entry) => entry.name)
    : [];

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    version: program.version || null,
    purpose: program.purpose || "",
    currentSprint: program.currentSprint || {},
    developmentMode: program.developmentMode || {},
    automationPolicy: program.automationPolicy || {},
    status: releaseReadiness.remoteBlocked ? "active-with-server-blocker" : "active",
    lanes,
    decisionSlots: Array.isArray(program.decisionSlots) ? program.decisionSlots : [],
    signals: {
      quality: {
        status: scorecard.status,
        overallScore: scorecard.overallScore,
        cards: scorecard.cards.map((card) => ({
          id: card.id,
          status: card.status,
          score: card.score
        }))
      },
      releaseReadiness,
      orchestrationReadiness,
      serverTarget: {
        defaultTarget: serverTarget.defaultTarget,
        missingEnvironment: missingServerEnv
      }
    }
  };
}

async function handleDevelopmentProgram(response) {
  sendJson(response, 200, await buildDevelopmentProgram());
}

async function handleAutomationSchedules(response) {
  const config = await readJsonFile("config/automation-schedules.json", {});
  const automations = Array.isArray(config.automations) ? config.automations : [];
  const activeAutomations = automations.filter((automation) => automation.status === "ACTIVE");

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    timezone: config.timezone || "Europe/Istanbul",
    automationCount: automations.length,
    activeCount: activeAutomations.length,
    automations
  });
}

async function handleEfficiencyMode(response) {
  const config = await readJsonFile("config/efficiency-mode.json", {});

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    version: config.version || null,
    mode: config.mode || "token-heavy-machine-light",
    name: config.name || "Full Efficiency Without Local Strain",
    purpose: config.purpose || "",
    localMachinePolicy: config.localMachinePolicy || {},
    agentPolicy: config.agentPolicy || {},
    usageStewardship: config.usageStewardship || {},
    shipmentLoop: config.shipmentLoop || {},
    qualitySignals: Array.isArray(config.qualitySignals) ? config.qualitySignals : [],
    deliveryLanes: Array.isArray(config.deliveryLanes) ? config.deliveryLanes : [],
    blockedPatterns: Array.isArray(config.blockedPatterns) ? config.blockedPatterns : []
  });
}

async function handleGithubPublication(response) {
  const config = await readJsonFile("config/github-publication.json", {});

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    version: config.version || null,
    mode: config.mode || "icloud-local-first-github-push-gated",
    repo: config.repo || "https://github.com/emirhankudun-ux/UIX-Apps.git",
    branch: config.branch || "UIXAppTTR",
    localWorkspace: config.localWorkspace || "",
    localTarget: config.localTarget || "iCloud Drive Github/UIX-Apps",
    remoteTarget: config.remoteTarget || "GitHub origin/UIXAppTTR",
    requiredBeforePush: Array.isArray(config.requiredBeforePush) ? config.requiredBeforePush : [],
    blockedWhen: Array.isArray(config.blockedWhen) ? config.blockedWhen : [],
    safeCommands: Array.isArray(config.safeCommands) ? config.safeCommands : [],
    currentKnownBlocker: config.currentKnownBlocker || ""
  });
}

async function handleCinematicDepth(response) {
  const config = await readJsonFile("config/cinematic-depth.json", {});
  const settings = config.settings || {};

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    version: config.version || null,
    purpose: config.purpose || "",
    surface: config.surface || "development-cockpit",
    mode: config.mode || "canvas-2d",
    enabled: config.enabled !== false,
    reducedMotionFallback: config.reducedMotionFallback || "static-depth-grid",
    settings: {
      particleCount: Math.min(Number(settings.particleCount) || 24, 48),
      depthLayers: Math.max(1, Math.min(Number(settings.depthLayers) || 3, 5)),
      maxDevicePixelRatio: Math.max(1, Math.min(Number(settings.maxDevicePixelRatio) || 1, 2)),
      frameIntervalMs: Math.max(48, Number(settings.frameIntervalMs) || 66),
      opacity: Math.max(0.08, Math.min(Number(settings.opacity) || 0.28, 0.55))
    },
    constraints: Array.isArray(config.constraints) ? config.constraints : []
  });
}

function scoreStatus(score) {
  if (score >= 90) return "pass";
  if (score >= 75) return "warn";
  return "fail";
}

function averageScore(cards) {
  if (!cards.length) return 0;
  return Math.round(cards.reduce((total, card) => total + card.score, 0) / cards.length);
}

function countTranslationGaps(translations) {
  const defaultKeys = Object.keys(translations[DEFAULT_LANG] || {});
  return SUPPORTED_LANGS.reduce((total, locale) => {
    const dictionary = translations[locale] || {};
    return total + defaultKeys.filter((key) => !Object.prototype.hasOwnProperty.call(dictionary, key)).length;
  }, 0);
}

async function buildQualityScorecard() {
  const [translations, runtimeConfig, handoff, softwareMatrix, polyglotManifest, preservationSnapshot] = await Promise.all([
    readJsonFile("translations.json", {}),
    readJsonFile("config/fullstack-runtime.json", {}),
    readJsonFile("config/server-handoff.json", {}),
    readJsonFile("config/software-language-matrix.json", {}),
    readJsonFile("polyglot/manifest.json", {}),
    buildPreservationSnapshot()
  ]);

  const modules = Array.isArray(runtimeConfig.modules) ? runtimeConfig.modules : [];
  const blockers = Array.isArray(handoff.blockers) ? handoff.blockers : [];
  const languages = Array.isArray(softwareMatrix.languages) ? softwareMatrix.languages : [];
  const polyglotEntries = Array.isArray(polyglotManifest.entries) ? polyglotManifest.entries : [];
  const categories = [...new Set(languages.map((language) => language.category).filter(Boolean))];
  const translationGaps = countTranslationGaps(translations);
  const handoffBlockers = blockers.filter((blocker) => String(blocker.status || "").includes("blocked"));

  const cards = [
    {
      id: "multilingual-contract",
      label: "Multilingual contract",
      score: translationGaps === 0 && SUPPORTED_LANGS.length >= 5 ? 100 : Math.max(0, 90 - translationGaps * 4),
      detail: `${SUPPORTED_LANGS.length} locales, ${translationGaps} missing translation keys.`
    },
    {
      id: "software-language-matrix",
      label: "Software language matrix",
      score: languages.length >= 12 && categories.length >= 6 ? 100 : Math.min(88, languages.length * 6),
      detail: `${languages.length} language lanes across ${categories.length} categories.`
    },
    {
      id: "polyglot-foundation",
      label: "Polyglot starter code",
      score: polyglotEntries.length >= 14 ? 100 : Math.min(88, polyglotEntries.length * 6),
      detail: `${polyglotEntries.length} starter code entries are registered.`
    },
    {
      id: "runtime-modules",
      label: "Runtime modules",
      score: modules.length >= 8 ? 100 : Math.max(60, modules.length * 12),
      detail: `${modules.length} full-stack runtime modules registered.`
    },
    {
      id: "server-handoff",
      label: "Server handoff",
      score: handoffBlockers.length === 0 ? 100 : 78,
      detail: handoffBlockers.length === 0 ? "No handoff blockers declared." : `${handoffBlockers.length} remote shipment blocker remains.`
    },
    {
      id: "local-preservation",
      label: "Local preservation",
      score: preservationSnapshot.ok && Array.isArray(handoff.excludedFromShipment) && handoff.excludedFromShipment.length >= 6 ? 100 : 72,
      detail: `${preservationSnapshot.fileCount} protected files, ${preservationSnapshot.missingCount} missing; ${(handoff.excludedFromShipment || []).length} exclusions documented.`
    }
  ].map((card) => ({
    ...card,
    status: scoreStatus(card.score)
  }));

  const overallScore = averageScore(cards);

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    overallScore,
    status: scoreStatus(overallScore),
    cards,
    blockers: handoffBlockers
  };
}

async function handleQualityScorecard(response) {
  sendJson(response, 200, await buildQualityScorecard());
}

async function handleReleaseReadiness(response) {
  const scorecard = await buildQualityScorecard();
  const remoteBlocked = scorecard.blockers.length > 0;
  const status = remoteBlocked
    ? "local-ready-remote-blocked"
    : scorecard.overallScore >= 90
      ? "ready"
      : "needs-work";

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    status,
    canPublishNow: !remoteBlocked && scorecard.overallScore >= 90,
    localReady: scorecard.overallScore >= 85,
    remoteBlocked,
    overallScore: scorecard.overallScore,
    checks: scorecard.cards.map((card) => ({
      id: card.id,
      status: card.status,
      score: card.score,
      detail: card.detail
    })),
    blockers: scorecard.blockers,
    nextActions: remoteBlocked
      ? ["Run gh auth login -h github.com", "Rerun npm run publish:preflight", "Push UIXAppTTR"]
      : ["Run npm run quality", "Run npm run publish:preflight", "Push UIXAppTTR"]
  });
}

async function handleOrchestrationReadiness(response) {
  const scorecard = await buildQualityScorecard();
  const byId = new Map(scorecard.cards.map((card) => [card.id, card]));
  const lanes = [
    {
      id: "local-quality",
      status: scorecard.overallScore >= 85 ? "ready" : "needs-work",
      detail: `Overall local score is ${scorecard.overallScore}.`
    },
    {
      id: "multilingual",
      status: (byId.get("multilingual-contract") || {}).score === 100 ? "ready" : "needs-work",
      detail: (byId.get("multilingual-contract") || {}).detail || ""
    },
    {
      id: "polyglot-branch",
      status: (byId.get("software-language-matrix") || {}).score === 100 && (byId.get("polyglot-foundation") || {}).score === 100 ? "ready" : "needs-work",
      detail: `${(byId.get("software-language-matrix") || {}).detail || ""} ${(byId.get("polyglot-foundation") || {}).detail || ""}`.trim()
    },
    {
      id: "server-preservation",
      status: (byId.get("local-preservation") || {}).score >= 90 ? "ready" : "needs-work",
      detail: (byId.get("local-preservation") || {}).detail || ""
    },
    {
      id: "remote-publication",
      status: scorecard.blockers.length > 0 ? "blocked" : "ready",
      detail: scorecard.blockers.length > 0 ? "GitHub authentication is required before remote push." : "Remote publication has no declared blocker."
    }
  ];

  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    status: lanes.some((lane) => lane.status === "blocked") ? "ready-with-blocker" : "ready",
    lanes
  });
}

async function handleSeisOperationsReadiness(response) {
  const operations = await readJsonFile("data/seis/operations-readiness.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    operations
  });
}

async function handleSeisConnectorReadiness(response) {
  const connectorReadiness = await readJsonFile("data/seis/connector-readiness-matrix.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    connectorReadiness
  });
}

async function handleSeisCloudServerEnvironment(response) {
  const environment = await readJsonFile("data/seis/cloud-server-environment.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    environment
  });
}

async function handleSeisDeployEnvelope(response) {
  const deployEnvelope = await readJsonFile("data/seis/server-cloud-deploy-envelope.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    deployEnvelope
  });
}

async function handleSeisRemoteShipmentGate(response) {
  const remoteShipmentGate = await readJsonFile("data/seis/remote-shipment-gate.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    remoteShipmentGate
  });
}

async function handleSeisProductEngineeringModel(response) {
  const productEngineeringModel = await readJsonFile("data/seis/product-engineering-operating-model.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    productEngineeringModel
  });
}

async function handleSeisGithubLanguagePresence(response) {
  const githubLanguagePresence = await readJsonFile("data/seis/github-language-presence.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    githubLanguagePresence
  });
}

async function handleSeisCapabilityActivationHub(response) {
  const capabilityActivationHub = await readJsonFile("data/seis/capability-activation-hub.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    capabilityActivationHub
  });
}

async function handleServerHandoff(response) {
  const handoff = await readJsonFile("config/server-handoff.json", {});
  sendJson(response, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    canonical: handoff.canonical || {},
    requiredChecks: Array.isArray(handoff.requiredChecks) ? handoff.requiredChecks : [],
    multilingualContract: handoff.multilingualContract || {},
    excludedFromShipment: Array.isArray(handoff.excludedFromShipment) ? handoff.excludedFromShipment : [],
    blockers: Array.isArray(handoff.blockers) ? handoff.blockers : []
  });
}

async function handleBrief(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type, accept"
    });
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  let fields;
  try {
    const body = await readBody(request);
    fields = parseFields(body, request.headers["content-type"]);
  } catch (error) {
    sendJson(response, error.statusCode || 400, { ok: false, message: "Invalid request" });
    return;
  }

  sendJson(response, 200, createBriefAnalysis(fields || {}));
}

async function handleEstimate(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type, accept"
    });
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  let fields;
  try {
    const body = await readBody(request);
    fields = parseFields(body, request.headers["content-type"]);
  } catch (error) {
    sendJson(response, error.statusCode || 400, { ok: false, message: "Invalid request" });
    return;
  }

  sendJson(response, 200, createProjectEstimate(fields || {}));
}

async function handleRoadmap(response, lang) {
  const locale = normalizeLang(lang);
  const content = {
    tr: {
      title: "Çok dilli full-stack yol haritası",
      updatedAt: "2026-05-20",
      tracks: [
        { id: "i18n-foundation", status: "planned", title: "Multi-dil temel", detail: "TR/EN/FR/IT/DE anahtarları, SEO metadata ve fallback davranışı tek kontratta tutulur." },
        { id: "content-model", status: "planned", title: "İçerik modeli", detail: "Projeler, servisler ve insight yazıları ileride API veya CMS katmanına taşınabilecek şemayla planlanır." },
        { id: "operations", status: "active", title: "Operasyon API", detail: "Contact, health, roadmap ve i18n durum endpointleri küçük ve bağımlılıksız kalır." }
      ]
    },
    en: {
      title: "Multilingual full-stack roadmap",
      updatedAt: "2026-05-20",
      tracks: [
        { id: "i18n-foundation", status: "planned", title: "Multilingual foundation", detail: "TR/EN/FR/IT/DE keys, SEO metadata, and fallback behavior stay in one contract." },
        { id: "content-model", status: "planned", title: "Content model", detail: "Projects, services, and insights are planned with schemas that can move to an API or CMS layer later." },
        { id: "operations", status: "active", title: "Operations API", detail: "Contact, health, roadmap, and i18n status endpoints stay small and dependency-free." }
      ]
    },
    fr: {
      title: "Roadmap full-stack multilingue",
      updatedAt: "2026-05-20",
      tracks: [
        { id: "i18n-foundation", status: "planned", title: "Base multilingue", detail: "Les cles TR/EN/FR/IT/DE, les metadonnees SEO et les fallbacks restent dans un contrat unique." },
        { id: "content-model", status: "planned", title: "Modele de contenu", detail: "Projets, services et insights sont planifies avec des schemas prets pour une API ou un CMS." },
        { id: "operations", status: "active", title: "API operations", detail: "Contact, health, roadmap et etat i18n restent petits et sans dependance." }
      ]
    },
    it: {
      title: "Roadmap full-stack multilingue",
      updatedAt: "2026-05-20",
      tracks: [
        { id: "i18n-foundation", status: "planned", title: "Base multilingue", detail: "Chiavi TR/EN/FR/IT/DE, metadata SEO e fallback restano in un unico contratto." },
        { id: "content-model", status: "planned", title: "Modello contenuti", detail: "Progetti, servizi e insight sono pianificati con schemi pronti per API o CMS." },
        { id: "operations", status: "active", title: "API operativa", detail: "Contact, health, roadmap e stato i18n restano piccoli e senza dipendenze." }
      ]
    },
    de: {
      title: "Mehrsprachige Full-Stack-Roadmap",
      updatedAt: "2026-05-20",
      tracks: [
        { id: "i18n-foundation", status: "planned", title: "Mehrsprachige Basis", detail: "TR/EN/FR/IT/DE Keys, SEO-Metadaten und Fallbacks bleiben in einem Vertrag." },
        { id: "content-model", status: "planned", title: "Content-Modell", detail: "Projekte, Services und Insights werden mit Schemas fur spatere API- oder CMS-Schichten geplant." },
        { id: "operations", status: "active", title: "Operations API", detail: "Contact, Health, Roadmap und i18n-Status bleiben klein und ohne Abhangigkeiten." }
      ]
    }
  };

  sendJson(response, 200, {
    ok: true,
    locale,
    ...content[locale]
  });
}

async function handleI18nHealth(response) {
  const translations = await readJsonFile("translations.json", {});
  const defaultKeys = Object.keys(translations[DEFAULT_LANG] || {});
  const locales = SUPPORTED_LANGS.map((locale) => {
    const dictionary = translations[locale] || {};
    const keys = Object.keys(dictionary);
    const missingFromDefault = defaultKeys.filter((key) => !Object.prototype.hasOwnProperty.call(dictionary, key));
    return {
      locale,
      keyCount: keys.length,
      missingFromDefaultCount: missingFromDefault.length,
      sampleMissingFromDefault: missingFromDefault.slice(0, 8)
    };
  });

  sendJson(response, 200, {
    ok: true,
    defaultLocale: DEFAULT_LANG,
    requiredLocales: SUPPORTED_LANGS,
    defaultKeyCount: defaultKeys.length,
    locales
  });
}

async function handleIntegrations(response) {
  const catalog = await readJsonFile("config/mcp-catalog.json", { mcps: [] });
  const ledger = await readJsonFile("connector-coverage-ledger.json", []);
  const mcps = Array.isArray(catalog.mcps) ? catalog.mcps : [];
  const ledgerItems = Array.isArray(ledger)
    ? ledger
    : (Array.isArray(ledger.coverage) ? ledger.coverage : Object.values(ledger || {}));

  sendJson(response, 200, {
    ok: true,
    source: "local governance files",
    generatedAt: catalog.generated_at || null,
    mcpCount: mcps.length,
    enabledMcpCount: mcps.filter((item) => item.status === "enabled").length,
    localMcpCount: mcps.filter((item) => item.source_type === "local").length,
    remoteMcpCount: mcps.filter((item) => item.source_type === "remote").length,
    connectorLedgerCount: ledgerItems.length,
    sampleMcps: mcps.slice(0, 12).map((item) => ({
      id: item.id,
      sourceType: item.source_type,
      status: item.status,
      auth: item.auth
    }))
  });
}

function resolvePublicPath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const normalized = path.normalize(decoded).replace(/^[/\\]+/, "");
  const relative = normalized || "index.html";

  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    relative.includes("\\") ||
    relative.startsWith(".") ||
    relative.includes("/.")
  ) {
    return null;
  }

  if (relative === "site-config.json") {
    return "virtual:site-config";
  }

  const allowed = publicFiles.has(relative) ||
    publicDirs.some((dir) => relative === dir || relative.startsWith(dir + "/"));

  if (!allowed) {
    return null;
  }

  return path.join(ROOT, relative);
}

async function serveStatic(request, response, pathname) {
  const target = resolvePublicPath(pathname === "/" ? "/index.html" : pathname);

  if (target === "virtual:site-config") {
    sendJson(response, 200, await readVirtualSiteConfig());
    return;
  }

  if (!target) {
    sendText(response, 404, "Not found");
    return;
  }

  let info;
  try {
    info = await stat(target);
  } catch {
    sendText(response, 404, "Not found");
    return;
  }

  if (!info.isFile()) {
    sendText(response, 404, "Not found");
    return;
  }

  const extension = path.extname(target).toLowerCase();
  const isHtml = extension === ".html";
  const headers = {
    "content-type": mimeTypes.get(extension) || "application/octet-stream",
    "cache-control": isHtml ? "no-cache" : "public, max-age=3600",
    "x-content-type-options": "nosniff"
  };

  response.writeHead(200, headers);
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  createReadStream(target).pipe(response);
}

async function route(request, response) {
  const url = new URL(request.url || "/", "http://localhost");

  try {
    if (url.pathname === "/api/health") {
      await handleHealth(response);
      return;
    }
    if (url.pathname === "/api/site") {
      await handleSite(response);
      return;
    }
    if (url.pathname === "/api/integrations") {
      await handleIntegrations(response);
      return;
    }
    if (url.pathname === "/api/roadmap") {
      await handleRoadmap(response, url.searchParams.get("lang"));
      return;
    }
    if (url.pathname === "/api/i18n-health") {
      await handleI18nHealth(response);
      return;
    }
    if (url.pathname === "/api/availability") {
      await handleAvailability(response);
      return;
    }
    if (url.pathname === "/api/cinematic-depth") {
      await handleCinematicDepth(response);
      return;
    }
    if (url.pathname === "/api/development-program") {
      await handleDevelopmentProgram(response);
      return;
    }
    if (url.pathname === "/api/automation-schedules") {
      await handleAutomationSchedules(response);
      return;
    }
    if (url.pathname === "/api/efficiency-mode") {
      await handleEfficiencyMode(response);
      return;
    }
    if (url.pathname === "/api/github-publication") {
      await handleGithubPublication(response);
      return;
    }
    if (url.pathname === "/api/brief") {
      await handleBrief(request, response);
      return;
    }
    if (url.pathname === "/api/estimate") {
      await handleEstimate(request, response);
      return;
    }
    if (url.pathname === "/api/studio") {
      await handleStudio(response);
      return;
    }
    if (url.pathname === "/api/runtime-config") {
      await handleRuntimeConfig(response);
      return;
    }
    if (url.pathname === "/api/content-model") {
      await handleContentModel(response);
      return;
    }
    if (url.pathname === "/api/infrastructure") {
      await handleInfrastructure(response);
      return;
    }
    if (url.pathname === "/api/server-handoff") {
      await handleServerHandoff(response);
      return;
    }
    if (url.pathname === "/api/server-upload-bundle") {
      await handleServerUploadBundle(response);
      return;
    }
    if (url.pathname === "/api/server-target") {
      await handleServerTarget(response);
      return;
    }
    if (url.pathname === "/api/software-languages") {
      await handleSoftwareLanguages(response);
      return;
    }
    if (url.pathname === "/api/polyglot-foundation") {
      await handlePolyglotFoundation(response);
      return;
    }
    if (url.pathname === "/api/preservation-snapshot") {
      await handlePreservationSnapshot(response);
      return;
    }
    if (url.pathname === "/api/quality-scorecard") {
      await handleQualityScorecard(response);
      return;
    }
    if (url.pathname === "/api/release-readiness") {
      await handleReleaseReadiness(response);
      return;
    }
    if (url.pathname === "/api/orchestration-readiness") {
      await handleOrchestrationReadiness(response);
      return;
    }
    if (url.pathname === "/api/seis-operations-readiness") {
      await handleSeisOperationsReadiness(response);
      return;
    }
    if (url.pathname === "/api/seis-connector-readiness") {
      await handleSeisConnectorReadiness(response);
      return;
    }
    if (url.pathname === "/api/seis-cloud-server-environment") {
      await handleSeisCloudServerEnvironment(response);
      return;
    }
    if (url.pathname === "/api/seis-deploy-envelope") {
      await handleSeisDeployEnvelope(response);
      return;
    }
    if (url.pathname === "/api/seis-remote-shipment-gate") {
      await handleSeisRemoteShipmentGate(response);
      return;
    }
    if (url.pathname === "/api/seis-product-engineering-model") {
      await handleSeisProductEngineeringModel(response);
      return;
    }
    if (url.pathname === "/api/seis-github-language-presence") {
      await handleSeisGithubLanguagePresence(response);
      return;
    }
    if (url.pathname === "/api/seis-capability-activation-hub") {
      await handleSeisCapabilityActivationHub(response);
      return;
    }
    if (url.pathname === "/api/contact") {
      await handleContact(request, response);
      return;
    }
    await serveStatic(request, response, url.pathname);
  } catch {
    sendJson(response, 500, { ok: false, message: "Internal server error" });
  }
}

const server = createServer(route);

server.listen(PORT, HOST, () => {
  console.log(`Portfolio full-stack server running at http://${HOST}:${PORT}/`);
});

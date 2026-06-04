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
      brief: "/api/brief"
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
    surfaces: ["static portfolio", "contact API", "integration registry API", "roadmap API", "i18n health API", "availability API", "brief analysis API"]
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
    if (url.pathname === "/api/brief") {
      await handleBrief(request, response);
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

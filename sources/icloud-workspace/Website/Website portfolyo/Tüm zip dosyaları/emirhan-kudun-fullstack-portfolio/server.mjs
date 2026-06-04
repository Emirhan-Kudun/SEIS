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
      integrations: "/api/integrations"
    }
  };
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
    surfaces: ["static portfolio", "contact API", "integration registry API"]
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

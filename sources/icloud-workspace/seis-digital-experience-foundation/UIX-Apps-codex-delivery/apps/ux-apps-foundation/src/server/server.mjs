import { createReadStream } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "../..");

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".ico", "image/x-icon"]
]);

function jsonResponse(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

function textResponse(res, statusCode, body) {
  res.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function safeJoin(root, requestPath) {
  const cleanPath = requestPath.replace(/^\/+/, "") || "index.html";
  const resolved = path.resolve(root, cleanPath);
  if (!resolved.startsWith(path.resolve(root))) {
    return null;
  }
  return resolved;
}

async function readBody(req, limit = 64 * 1024) {
  let total = 0;
  const chunks = [];

  for await (const chunk of req) {
    total += chunk.length;
    if (total > limit) {
      throw new Error("Request body is too large.");
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function validateContactPayload(payload) {
  const errors = [];
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const intention = String(payload.intention || "").trim();
  const message = String(payload.message || "").trim();

  if (name.length < 2) errors.push("Name must be at least 2 characters.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email must be valid.");
  if (intention.length < 3) errors.push("Intention must be at least 3 characters.");
  if (message.length < 12) errors.push("Message must be at least 12 characters.");

  return {
    ok: errors.length === 0,
    errors,
    value: { name, email, intention, message }
  };
}

async function handleApi(req, res, context) {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const dataDir = context.dataDir;

  if (req.method === "GET" && url.pathname === "/api/health") {
    return jsonResponse(res, 200, {
      ok: true,
      service: "ux-apps",
      uptimeSeconds: Math.round(process.uptime()),
      environment: process.env.NODE_ENV || "development"
    });
  }

  if (req.method === "GET" && url.pathname === "/api/apps") {
    const apps = await readJson(path.join(dataDir, "apps.json"));
    return jsonResponse(res, 200, apps);
  }

  if (req.method === "GET" && url.pathname === "/api/manifest") {
    const manifest = await readJson(path.join(dataDir, "manifest.json"));
    return jsonResponse(res, 200, manifest);
  }

  if (req.method === "GET" && url.pathname === "/api/governance") {
    const governance = await readJson(path.join(dataDir, "governance.json"));
    return jsonResponse(res, 200, governance);
  }

  if (req.method === "GET" && url.pathname === "/api/cinematic-program") {
    const program = await readJson(path.join(dataDir, "cinematic-program.json"));
    return jsonResponse(res, 200, program);
  }

  if (req.method === "GET" && url.pathname === "/api/archive-insights") {
    const insights = await readJson(path.join(dataDir, "archive-insights.json"));
    return jsonResponse(res, 200, insights);
  }

  if (req.method === "GET" && url.pathname === "/api/zip-promotion-lab") {
    const promotionLab = await readJson(path.join(dataDir, "zip-promotion-lab.json"));
    return jsonResponse(res, 200, promotionLab);
  }

  if (req.method === "GET" && url.pathname === "/api/observability") {
    const apps = await readJson(path.join(dataDir, "apps.json"));
    const manifest = await readJson(path.join(dataDir, "manifest.json"));
    const governance = await readJson(path.join(dataDir, "governance.json"));
    const cinematicProgram = await readJson(path.join(dataDir, "cinematic-program.json"));
    const archiveInsights = await readJson(path.join(dataDir, "archive-insights.json"));
    const promotionLab = await readJson(path.join(dataDir, "zip-promotion-lab.json"));

    return jsonResponse(res, 200, {
      ok: true,
      signals: {
        appCount: apps.apps.length,
        runtimeDependencies: manifest.budgets.runtimeDependencies,
        branchFamilies: governance.branchFamilies.length,
        cinematicLanes: cinematicProgram.productLanes.length,
        archiveSignals: archiveInsights.conversionMap.length,
        promotionLanes: promotionLab.summary.lanes,
        motionPressure: "low",
        telemetryMode: "local explainable signals"
      }
    });
  }

  if (req.method === "POST" && url.pathname === "/api/contact") {
    let payload;

    try {
      payload = JSON.parse(await readBody(req));
    } catch (error) {
      return jsonResponse(res, 400, {
        ok: false,
        errors: ["Invalid JSON request body."]
      });
    }

    const validation = validateContactPayload(payload);
    if (!validation.ok) {
      return jsonResponse(res, 422, {
        ok: false,
        errors: validation.errors
      });
    }

    if (process.env.UX_APPS_DISABLE_WRITES !== "true") {
      await mkdir(context.submissionsDir, { recursive: true });
      const id = `${Date.now()}-${validation.value.email.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`;
      await writeFile(
        path.join(context.submissionsDir, `${id}.json`),
        JSON.stringify(
          {
            id,
            receivedAt: new Date().toISOString(),
            ...validation.value
          },
          null,
          2
        )
      );
    }

    return jsonResponse(res, 201, {
      ok: true,
      message: "Request received."
    });
  }

  return jsonResponse(res, 404, {
    ok: false,
    error: "API route not found."
  });
}

async function serveStatic(req, res, publicDir) {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const filePath = safeJoin(publicDir, url.pathname);
  const fallbackPath = path.join(publicDir, "index.html");

  if (!filePath) {
    return textResponse(res, 403, "Forbidden");
  }

  const candidate = url.pathname === "/" ? fallbackPath : filePath;

  try {
    const info = await stat(candidate);
    if (!info.isFile()) {
      throw new Error("Not a file.");
    }

    const ext = path.extname(candidate);
    res.writeHead(200, {
      "content-type": mimeTypes.get(ext) || "application/octet-stream",
      "cache-control": ext === ".html" ? "no-store" : "public, max-age=300"
    });
    createReadStream(candidate).pipe(res);
  } catch (error) {
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    });
    createReadStream(fallbackPath).pipe(res);
  }
}

export function createUxAppsServer(options = {}) {
  const context = {
    publicDir: options.publicDir || path.join(projectRoot, "public"),
    dataDir: options.dataDir || path.join(projectRoot, "data"),
    submissionsDir: options.submissionsDir || path.join(projectRoot, "data", "submissions")
  };

  return createServer(async (req, res) => {
    try {
      if (req.url?.startsWith("/api/")) {
        await handleApi(req, res, context);
        return;
      }

      await serveStatic(req, res, context.publicDir);
    } catch (error) {
      jsonResponse(res, 500, {
        ok: false,
        error: "Internal server error."
      });
    }
  });
}

export function startServer() {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "127.0.0.1";
  const server = createUxAppsServer();

  server.listen(port, host, () => {
    console.log(`UX Apps listening on http://${host}:${port}`);
  });

  return server;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  startServer();
}

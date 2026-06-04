import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.env.SEIS_STATIC_ROOT || "dist/seis-static");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4177);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"]
]);

if (!existsSync(root)) {
  console.error(`Static root not found: ${root}`);
  process.exit(1);
}

const server = createServer((request, response) => {
  if (!request.url || request.method !== "GET") {
    sendJson(response, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
  const filePath = resolveSafePath(url.pathname);

  if (!filePath) {
    sendJson(response, 403, { ok: false, error: "forbidden" });
    return;
  }

  if (url.pathname === "/_server/health") {
    sendJson(response, 200, buildHealthPayload());
    return;
  }

  serveFile(filePath, response);
});

server.listen(port, host, () => {
  console.log(`SEIS static server listening on http://${host}:${port}`);
});

function resolveSafePath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = normalizedPath === "/" ? "index.html" : normalizedPath.replace(/^[/\\]/, "");
  const candidate = resolve(join(root, relativePath));

  if (!candidate.startsWith(root)) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return resolve(join(candidate, "index.html"));
  }

  if (existsSync(candidate)) {
    return candidate;
  }

  if (extname(relativePath)) {
    return candidate;
  }

  const fallback = resolve(join(root, "index.html"));
  return existsSync(fallback) ? fallback : candidate;
}

function serveFile(filePath, response) {
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    sendJson(response, 404, { ok: false, error: "not_found" });
    return;
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = mimeTypes.get(extension) || "application/octet-stream";
  const cacheControl = isImmutableAsset(filePath)
    ? "public, max-age=31536000, immutable"
    : "public, max-age=300";

  response.writeHead(200, {
    "content-type": contentType,
    "cache-control": cacheControl,
    "x-content-type-options": "nosniff"
  });
  createReadStream(filePath).pipe(response);
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(`${JSON.stringify(payload, null, 2)}\n`);
}

function buildHealthPayload() {
  const releasePath = resolve(join(root, "health.json"));
  if (!existsSync(releasePath)) {
    return { ok: true, name: "seis-static", source: "node-server" };
  }

  try {
    const release = JSON.parse(readText(releasePath));
    return { ...release, source: "node-server" };
  } catch (_error) {
    return { ok: true, name: "seis-static", source: "node-server", releaseReadable: false };
  }
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function isImmutableAsset(filePath) {
  return filePath.includes("/public/media/") || filePath.endsWith(".svg");
}

#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const EXPORT_DIR = path.join(ROOT, "exports");
const ZIP_PATH = path.join(EXPORT_DIR, "canonical-all-html-css-js-json.zip");
const MANIFEST_PATH = path.join(EXPORT_DIR, "canonical-manifest.json");

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      walk(abs, out);
      continue;
    }
    out.push(abs);
  }
}

function shouldInclude(relPath) {
  if (/ 2\.(html|css|js|json)$/.test(relPath)) return false;
  if (/^\.codex\//.test(relPath)) return false;
  if (/^reports\/ecosystem\//.test(relPath)) return false;
  if (/^exports\/canonical-all-html-css-js-json\.zip$/.test(relPath)) return false;
  if (/^exports\/canonical-manifest\.json$/.test(relPath)) return false;
  return /\.(html|css|js|json)$/.test(relPath);
}

function sha1(filePath) {
  const res = cp.spawnSync("shasum", [filePath], { encoding: "utf8" });
  if (res.status !== 0) return "";
  return String(res.stdout || "").trim().split(/\s+/)[0] || "";
}

function main() {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });

  const files = [];
  walk(ROOT, files);

  const included = files
    .map((abs) => ({ abs, rel: path.relative(ROOT, abs).replace(/\\/g, "/") }))
    .filter((item) => shouldInclude(item.rel))
    .sort((a, b) => a.rel.localeCompare(b.rel));

  if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);

  const listPath = path.join(EXPORT_DIR, ".canonical-file-list.txt");
  fs.writeFileSync(listPath, included.map((i) => i.rel).join("\n") + "\n", "utf8");

  const zip = cp.spawnSync("bash", ["-lc", `cd \"${ROOT}\" && zip -q -@ \"${ZIP_PATH}\" < \"${listPath}\"`], { encoding: "utf8" });
  if (zip.status !== 0) {
    process.stderr.write(String(zip.stderr || "zip command failed\n"));
    process.exit(1);
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    root: ROOT,
    zip_path: ZIP_PATH,
    file_count: included.length,
    files: included.map((item) => ({
      path: item.rel,
      sha1: sha1(item.abs),
      size_bytes: fs.statSync(item.abs).size
    }))
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  fs.unlinkSync(listPath);

  process.stdout.write("Canonical zip built: " + ZIP_PATH + "\n");
  process.stdout.write("Canonical manifest: " + MANIFEST_PATH + "\n");
}

main();

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/github-language-presence.json";
const SHOWCASE_LANGUAGE_IDS = [
  "html",
  "css",
  "javascript",
  "typescript",
  "nodejs",
  "python",
  "go",
  "rust",
  "swift",
  "kotlin",
  "java",
  "cpp",
  "csharp",
  "php",
  "ruby",
  "dart",
  "r",
  "elixir",
  "erlang",
  "fsharp",
  "zig",
  "vue",
  "svelte",
  "tsx",
  "jsx",
  "sql",
  "bash",
  "dockerfile",
  "hcl",
  "graphql"
];

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function readText(relPath) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return "";
  return readFileSync(absolutePath, "utf8");
}

function pathExists(relPath) {
  return existsSync(join(ROOT, relPath));
}

function extensionFor(entryPath) {
  const base = entryPath.split("/").pop() || "";
  if (base.includes("Dockerfile")) return "Dockerfile";
  return extname(base).replace(/^\./, "") || "(none)";
}

function main() {
  const manifest = readJson("polyglot/manifest.json", { entries: [] });
  const matrix = readJson("config/software-language-matrix.json", { languages: [] });
  const gitattributes = readText(".gitattributes");
  const entries = Array.isArray(manifest.entries) ? manifest.entries : [];
  const languages = Array.isArray(matrix.languages) ? matrix.languages : [];
  const matrixIds = new Set(languages.map((item) => item.id));
  const manifestIds = new Set(entries.map((item) => item.languageId));
  const files = entries.map((entry) => ({
    languageId: entry.languageId,
    path: entry.path,
    role: entry.role || "",
    extension: extensionFor(entry.path),
    exists: pathExists(entry.path)
  }));
  const missingFiles = files.filter((file) => !file.exists);
  const missingManifestIds = languages.filter((language) => !manifestIds.has(language.id)).map((language) => language.id);
  const extensionCounts = files.reduce((acc, file) => {
    acc[file.extension] = (acc[file.extension] || 0) + 1;
    return acc;
  }, {});
  const linguistLines = gitattributes
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("polyglot/") && line.includes("linguist-"));
  const showcase = SHOWCASE_LANGUAGE_IDS.map((id) => {
    const file = files.find((item) => item.languageId === id);
    return {
      languageId: id,
      presentInMatrix: matrixIds.has(id),
      presentInManifest: manifestIds.has(id),
      path: file?.path || null,
      exists: Boolean(file?.exists)
    };
  });
  const blockers = [
    missingFiles.length > 0 ? `${missingFiles.length} polyglot manifest files are missing` : null,
    missingManifestIds.length > 0 ? `${missingManifestIds.length} software language matrix ids are missing from manifest` : null,
    !gitattributes.includes("polyglot/** linguist-vendored=false linguist-generated=false") ? "polyglot Linguist visibility rule is missing" : null,
    linguistLines.length < 20 ? "not enough Linguist language overrides for GitHub language visibility" : null,
    showcase.some((item) => !item.exists) ? "one or more showcase language files are missing" : null
  ].filter(Boolean);

  const snapshot = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-github-language-presence.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M014",
    purpose: "Expose and govern SEIS polyglot source presence for GitHub language visibility without adding runtime dependencies.",
    source: {
      secretsStored: false,
      files: [
        "polyglot/manifest.json",
        "config/software-language-matrix.json",
        ".gitattributes"
      ]
    },
    policy: {
      branch: "UIXAppTTR",
      runtimeDependencyAdded: false,
      githubLinguistVisible: true,
      promotionRule: matrix.branchPolicy?.promotionRule || "",
      defaultRuntime: matrix.branchPolicy?.defaultRuntime || "node-fullstack"
    },
    manifest: {
      entryCount: entries.length,
      matrixLanguageCount: languages.length,
      missingFileCount: missingFiles.length,
      missingManifestIdCount: missingManifestIds.length,
      uniqueExtensionCount: Object.keys(extensionCounts).length,
      topExtensions: Object.entries(extensionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 24)
        .map(([extension, count]) => ({ extension, count }))
    },
    githubLinguist: {
      visibleRulePresent: gitattributes.includes("polyglot/** linguist-vendored=false linguist-generated=false"),
      overrideCount: linguistLines.filter((line) => line.includes("linguist-language=")).length,
      lines: linguistLines
    },
    showcase,
    summary: {
      status: blockers.length > 0 ? "blocked" : "ready",
      ready: blockers.length === 0,
      polyglotEntries: entries.length,
      softwareLanguageCount: languages.length,
      showcaseReadyCount: showcase.filter((item) => item.exists).length,
      githubLinguistOverrideCount: linguistLines.filter((line) => line.includes("linguist-language=")).length,
      blockerCount: blockers.length,
      blockers
    },
    nextActions: [
      "Keep polyglot examples dependency-light and reversible.",
      "Use .gitattributes Linguist hints only for existing polyglot samples.",
      "Promote a language to runtime only after a contract, check, and rollback note exist.",
      "Do not add package dependencies only to influence GitHub language charts."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: snapshot.mission,
    outputPath: OUTPUT_PATH,
    status: snapshot.summary.status,
    polyglotEntries: snapshot.summary.polyglotEntries,
    showcaseReadyCount: snapshot.summary.showcaseReadyCount,
    blockerCount: snapshot.summary.blockerCount
  }, null, 2));
}

main();

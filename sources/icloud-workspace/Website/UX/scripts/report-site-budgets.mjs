import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const publicRoot = path.join(root, "apps/site-next/public");
const nextRoot = path.join(root, "apps/site-next/.next");
const firstViewImages = ["drawings/renk-11.jpg", "favicon.svg", "icon-192.png", "apple-touch-icon.png"];
const budgets = {
  firstViewTransferBytes: 600 * 1024,
  largestGzipJsBytes: 220 * 1024,
  totalGzipJsBytes: 520 * 1024
};

function sizeOf(relativePath) {
  const file = path.join(publicRoot, relativePath);
  if (!fs.existsSync(file)) return { relativePath, bytes: 0, missing: true };
  return { relativePath, bytes: fs.statSync(file).size, missing: false };
}

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const imageSizes = firstViewImages.map(sizeOf);
const firstViewTransferBytes = imageSizes.reduce((sum, item) => sum + item.bytes, 0);
const jsFiles = walk(path.join(nextRoot, "static"))
  .filter((file) => file.endsWith(".js"))
  .map((file) => {
    const buffer = fs.readFileSync(file);
    return {
      file: path.relative(nextRoot, file),
      bytes: buffer.length,
      gzipBytes: zlib.gzipSync(buffer, { level: 9 }).length
    };
  })
  .sort((a, b) => b.gzipBytes - a.gzipBytes);

const largestGzipJsBytes = jsFiles[0]?.gzipBytes ?? 0;
const totalGzipJsBytes = jsFiles.reduce((sum, file) => sum + file.gzipBytes, 0);
const report = {
  generatedAt: new Date().toISOString(),
  budgets,
  firstViewImages: imageSizes,
  firstViewTransferBytes,
  firstViewTransferWithinBudget: firstViewTransferBytes <= budgets.firstViewTransferBytes,
  jsArtifactAvailable: jsFiles.length > 0,
  largestGzipJsBytes,
  largestGzipJsWithinBudget: !jsFiles.length || largestGzipJsBytes <= budgets.largestGzipJsBytes,
  totalGzipJsBytes,
  totalGzipJsWithinBudget: !jsFiles.length || totalGzipJsBytes <= budgets.totalGzipJsBytes,
  largestJsFiles: jsFiles.slice(0, 8)
};

const reportPath = path.join(root, "docs/releases/site-budget-report.json");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

const errors = [];
for (const image of imageSizes) {
  if (image.missing) errors.push(`Missing first-view budget asset: ${image.relativePath}`);
}
if (!report.firstViewTransferWithinBudget) {
  errors.push(`First-view image transfer ${firstViewTransferBytes} exceeds ${budgets.firstViewTransferBytes}.`);
}
if (!report.largestGzipJsWithinBudget) {
  errors.push(`Largest gzip JS chunk ${largestGzipJsBytes} exceeds ${budgets.largestGzipJsBytes}.`);
}
if (!report.totalGzipJsWithinBudget) {
  errors.push(`Total gzip JS ${totalGzipJsBytes} exceeds ${budgets.totalGzipJsBytes}.`);
}

console.log(`Site budget report written: ${path.relative(root, reportPath)}`);
console.log(`First-view image transfer: ${firstViewTransferBytes} bytes / ${budgets.firstViewTransferBytes}`);
if (jsFiles.length) {
  console.log(`Largest gzip JS chunk: ${largestGzipJsBytes} bytes / ${budgets.largestGzipJsBytes}`);
  console.log(`Total gzip JS: ${totalGzipJsBytes} bytes / ${budgets.totalGzipJsBytes}`);
} else {
  console.log("JS artifact budget skipped: run after Next build for chunk data.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

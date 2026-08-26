#!/usr/bin/env node
// Validates apps/fullstack/technology-registry.json: every entry has the
// required fields with values from the approved enums, every provenance path
// exists, and — the anti-fabrication drift gate — domains_with_no_entries
// stays exactly equal to the domains actually uncovered by real entries. This
// stops the registry from silently claiming coverage (or silently losing its
// honesty disclaimer) as entries are added or removed.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(root, "apps/fullstack/technology-registry.json");

const errors = [];
let registry;
try {
  registry = JSON.parse(readFileSync(registryPath, "utf8"));
} catch (error) {
  console.error(`technology-registry check failed: ${error.message}`);
  process.exit(1);
}

for (const key of [
  "id",
  "purpose",
  "scope_note",
  "domain_taxonomy",
  "domains_with_no_entries",
  "maturity_ladder",
  "implementation_classes",
  "entries",
]) {
  if (!registry[key]) errors.push(`missing top-level field: ${key}`);
}

if (registry.decision_record && !existsSync(resolve(root, registry.decision_record))) {
  errors.push(`decision record not found: ${registry.decision_record}`);
}

const domainSet = new Set(registry.domain_taxonomy ?? []);
const maturitySet = new Set(registry.maturity_ladder ?? []);
const classSet = new Set(registry.implementation_classes ?? []);

const requiredEntryFields = [
  "id", "name", "domain", "subdomain", "maturity", "implementation_class",
  "owner", "dependencies", "permissions", "supported_platforms",
  "hardware_requirements", "standards", "license", "provenance",
  "tests", "benchmarks", "fallback", "rollback", "status",
];

const entries = registry.entries ?? [];
if (entries.length === 0) errors.push("entries must not be empty");

const seenIds = new Set();
const domainsCovered = new Set();

for (const entry of entries) {
  for (const field of requiredEntryFields) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === "") {
      errors.push(`${entry.id ?? "(unknown entry)"}: missing ${field}`);
    }
  }
  if (entry.id) {
    if (seenIds.has(entry.id)) errors.push(`duplicate entry id: ${entry.id}`);
    seenIds.add(entry.id);
  }
  if (entry.domain && !domainSet.has(entry.domain)) {
    errors.push(`${entry.id}: unknown domain "${entry.domain}"`);
  } else if (entry.domain) {
    domainsCovered.add(entry.domain);
  }
  if (entry.maturity && !maturitySet.has(entry.maturity)) {
    errors.push(`${entry.id}: unknown maturity "${entry.maturity}"`);
  }
  if (entry.implementation_class && !classSet.has(entry.implementation_class)) {
    errors.push(`${entry.id}: unknown implementation_class "${entry.implementation_class}"`);
  }
  if (entry.provenance && !existsSync(resolve(root, entry.provenance))) {
    errors.push(`${entry.id}: provenance path not found: ${entry.provenance}`);
  }
  for (const dep of entry.dependencies ?? []) {
    if (!entries.some((other) => other.id === dep)) {
      errors.push(`${entry.id}: dependency references unknown entry id: ${dep}`);
    }
  }
}

const declaredEmptyDomains = new Set(registry.domains_with_no_entries ?? []);
const actualEmptyDomains = new Set(
  [...domainSet].filter((domain) => !domainsCovered.has(domain)),
);

for (const domain of declaredEmptyDomains) {
  if (!actualEmptyDomains.has(domain)) {
    errors.push(
      `domains_with_no_entries claims "${domain}" has no entries, but an entry now covers it — update the registry's honesty disclaimer`,
    );
  }
}
for (const domain of actualEmptyDomains) {
  if (!declaredEmptyDomains.has(domain)) {
    errors.push(
      `domain "${domain}" has no entries but is missing from domains_with_no_entries — the disclaimer must list every uncovered domain`,
    );
  }
}

if (errors.length > 0) {
  console.error("technology-registry check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `technology-registry check passed (${entries.length} entries, ${domainsCovered.size} of ${domainSet.size} domains covered, honestly).`,
);

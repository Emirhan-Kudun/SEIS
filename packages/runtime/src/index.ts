import registry from "./registry.json";
import mcpReadiness from "./mcp-readiness.generated.json";
import sourceArchives from "./source-archives.json";

export type RuntimeStatus = "active" | "configured" | "needs_credentials" | "unavailable" | "skipped_with_reason";

export type RuntimeConnector = {
  id: string;
  name: string;
  category: string;
  status: RuntimeStatus;
  scope: string;
  requiresEnv: string[];
  lastChecked: string;
  notes: string;
};

export type SkillRegistryItem = RuntimeConnector;

type RegistryEntry = Omit<RuntimeConnector, "status" | "lastChecked"> & {
  statusOverride?: RuntimeStatus;
};

export type RuntimeSnapshot = {
  generatedAt: string;
  summary: {
    total: number;
    active: number;
    configured: number;
    needsCredentials: number;
    unavailable: number;
    skippedWithReason: number;
  };
  connectors: RuntimeConnector[];
  skills: SkillRegistryItem[];
};

export type McpReadinessItem = {
  id: string;
  name: string;
  category: string;
  status: RuntimeStatus;
  scope: string;
  requiresEnv: string[];
  lastChecked: string;
  notes: string;
  auth: string;
  sourceType: string;
  archiveStatus: "matched" | "live_only" | "archive_only" | "unknown";
  probe: "list_readiness" | "auth_status" | "not_run";
};

export type McpReadinessSnapshot = {
  generatedAt: string;
  sourceCommand: string;
  sourceArchiveCount: number;
  summary: RuntimeSnapshot["summary"];
  items: McpReadinessItem[];
};

export type SourceArchiveVersion = {
  id: string;
  fileName: string;
  role: "portfolio_latest" | "runtime_infra" | "reference_history";
  sourcePath: string;
  sha256: string;
  notes: string;
};

type RegistryShape = {
  connectors: RegistryEntry[];
  skills: RegistryEntry[];
};

const typedRegistry = registry as RegistryShape;

function hasEnv(env: NodeJS.ProcessEnv | Record<string, string | undefined>, key: string): boolean {
  return Boolean(env[key] && String(env[key]).trim().length > 0);
}

function resolveStatus(
  item: RegistryEntry,
  env: NodeJS.ProcessEnv | Record<string, string | undefined>
): RuntimeStatus {
  if (item.statusOverride) {
    return item.statusOverride;
  }

  if (item.requiresEnv.length === 0) {
    return "active";
  }

  return item.requiresEnv.every((key) => hasEnv(env, key)) ? "configured" : "needs_credentials";
}

function decorateItems<T extends RegistryEntry>(
  items: T[],
  env: NodeJS.ProcessEnv | Record<string, string | undefined>,
  lastChecked: string
): RuntimeConnector[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    status: resolveStatus(item, env),
    scope: item.scope,
    requiresEnv: item.requiresEnv,
    lastChecked,
    notes: item.notes
  }));
}

function summarize(items: RuntimeConnector[]) {
  return {
    total: items.length,
    active: items.filter((item) => item.status === "active").length,
    configured: items.filter((item) => item.status === "configured").length,
    needsCredentials: items.filter((item) => item.status === "needs_credentials").length,
    unavailable: items.filter((item) => item.status === "unavailable").length,
    skippedWithReason: items.filter((item) => item.status === "skipped_with_reason").length
  };
}

export function getConnectors(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
  now = new Date()
): RuntimeConnector[] {
  return decorateItems(typedRegistry.connectors, env, now.toISOString());
}

export function getSkills(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
  now = new Date()
): SkillRegistryItem[] {
  return decorateItems(typedRegistry.skills, env, now.toISOString());
}

export function getRuntimeSnapshot(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
  now = new Date()
): RuntimeSnapshot {
  const generatedAt = now.toISOString();
  const connectors = getConnectors(env, now);
  const skills = getSkills(env, now);
  const allItems = [...connectors, ...skills];

  return {
    generatedAt,
    summary: summarize(allItems),
    connectors,
    skills
  };
}

export function getMcpReadinessSnapshot(now = new Date()): McpReadinessSnapshot {
  const snapshot = mcpReadiness as Omit<McpReadinessSnapshot, "generatedAt"> & { generatedAt?: string };
  const lastChecked = snapshot.generatedAt || now.toISOString();
  const items = snapshot.items.map((item) => ({
    ...item,
    lastChecked: item.lastChecked || lastChecked
  })) as McpReadinessItem[];

  return {
    generatedAt: lastChecked,
    sourceCommand: snapshot.sourceCommand,
    sourceArchiveCount: snapshot.sourceArchiveCount,
    summary: summarize(items),
    items
  };
}

export function getSourceArchives(): SourceArchiveVersion[] {
  return sourceArchives as SourceArchiveVersion[];
}

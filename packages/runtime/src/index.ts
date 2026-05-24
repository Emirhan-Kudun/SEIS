import registry from "./registry.json";
import deploymentTargets from "./deployment-targets.json";
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

export type CinematicScenePreset = {
  id: string;
  name: string;
  surface: "hero" | "showcase" | "fallback";
  motion: "standard" | "reduced";
  performance: "mobile_safe" | "desktop_rich" | "static";
  notes: string;
};

export type DeploymentTarget = RuntimeConnector & {
  targetUrl: string;
  command: string;
  persistence: "local" | "remote-git" | "managed-hosting" | "custom-server" | "filesystem";
  safety: string;
};

const cinematicScenePresets: CinematicScenePreset[] = [
  {
    id: "orbital-studio-hero",
    name: "Orbital Studio Hero",
    surface: "hero",
    motion: "standard",
    performance: "desktop_rich",
    notes: "Full-bleed Three.js scene with drawing panels, light rings, pointer parallax and scroll camera drift."
  },
  {
    id: "runtime-gallery-showcase",
    name: "Runtime Gallery Showcase",
    surface: "showcase",
    motion: "standard",
    performance: "mobile_safe",
    notes: "Secondary WebGL scene for drawings, work cards and runtime status points with capped pixel ratio."
  },
  {
    id: "reduced-motion-atmosphere",
    name: "Reduced Motion Atmosphere",
    surface: "hero",
    motion: "reduced",
    performance: "mobile_safe",
    notes: "Same visual language with nearly static rotation for users who prefer reduced motion."
  },
  {
    id: "static-fallback-gallery",
    name: "Static Fallback Gallery",
    surface: "fallback",
    motion: "reduced",
    performance: "static",
    notes: "Dependency-light HTML/CSS fallback that preserves the portfolio and runtime story without WebGL."
  }
];

type RegistryShape = {
  connectors: RegistryEntry[];
  skills: RegistryEntry[];
};

type DeploymentTargetEntry = Omit<DeploymentTarget, "status" | "lastChecked"> & {
  statusOverride?: RuntimeStatus;
};

const typedRegistry = registry as RegistryShape;
const typedDeploymentTargets = deploymentTargets as DeploymentTargetEntry[];

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

export function getCinematicScenePresets(): CinematicScenePreset[] {
  return cinematicScenePresets;
}

export function getDeploymentTargets(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
  now = new Date()
): DeploymentTarget[] {
  return typedDeploymentTargets.map((target) => ({
    id: target.id,
    name: target.name,
    category: target.category,
    status: resolveStatus(target, env),
    scope: target.scope,
    requiresEnv: target.requiresEnv,
    lastChecked: now.toISOString(),
    notes: target.notes,
    targetUrl: target.targetUrl,
    command: target.command,
    persistence: target.persistence,
    safety: target.safety
  }));
}

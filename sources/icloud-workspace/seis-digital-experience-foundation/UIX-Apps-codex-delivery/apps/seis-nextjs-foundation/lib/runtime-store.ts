import { mkdir, readFile, stat, appendFile } from "node:fs/promises";
import path from "node:path";

type JsonRecord = Record<string, unknown>;

export type RuntimeWriteResult = {
  stored: boolean;
  path: string;
  error?: string;
};

export type RuntimeContactRecord = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  channelUsed: "resend" | "api" | "mailto" | "php";
  fallbackLevel: 0 | 1 | 2 | 3;
  status: "sent" | "queued" | "failed" | "ignored";
  errorCode?: string;
};

export type RuntimeEventRecord = {
  id: string;
  acceptedAt: string;
  name: string;
  scope: string;
  label: string;
  locale: string;
  path: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type RuntimeBriefRecord = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  goals: string;
  locale: string;
  status: "new" | "reviewed" | "archived";
};

export type RuntimeReadinessRecord = {
  id: string;
  assessedAt: string;
  projectName: string;
  email: string;
  projectStage: string;
  contentReadiness: string;
  designReadiness: string;
  integrationReadiness: string;
  launchWindow: string;
  score: number;
  level: "foundation" | "structured" | "launch-ready";
  recommendation: string;
  locale: string;
};

export type RuntimeScopePlanRecord = {
  id: string;
  plannedAt: string;
  projectName: string;
  email: string;
  primaryGoal: string;
  deliveryModel: string;
  complexity: string;
  maintenance: string;
  focusAreas: string[];
  score: number;
  level: "lean" | "balanced" | "governed";
  phaseCount: number;
  recommendation: string;
  locale: string;
};

const RUNTIME_ROOT = process.env.SEIS_RUNTIME_DIR
  ? path.resolve(process.env.SEIS_RUNTIME_DIR)
  : path.join(process.cwd(), ".runtime");

const COLLECTION_FILES = {
  contacts: "contact-submissions.jsonl",
  events: "events.jsonl",
  briefs: "project-briefs.jsonl",
  readiness: "readiness-assessments.jsonl",
  scopePlans: "scope-plans.jsonl"
} as const;

function resolveCollectionPath(collection: keyof typeof COLLECTION_FILES): string {
  return path.join(RUNTIME_ROOT, COLLECTION_FILES[collection]);
}

function safeString(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function safeStringList(value: string[], maxItems: number, maxLength: number): string[] {
  return value.slice(0, maxItems).map((item) => safeString(item, maxLength)).filter(Boolean);
}

async function appendJsonLine(collection: keyof typeof COLLECTION_FILES, record: JsonRecord): Promise<RuntimeWriteResult> {
  const filePath = resolveCollectionPath(collection);

  try {
    await mkdir(path.dirname(filePath), { recursive: true });
    await appendFile(filePath, JSON.stringify(record) + "\n", "utf8");
    return { stored: true, path: filePath };
  } catch (error) {
    return {
      stored: false,
      path: filePath,
      error: error instanceof Error ? error.message : "runtime-write-failed"
    };
  }
}

async function readJsonLines<T>(
  collection: keyof typeof COLLECTION_FILES,
  limit = 50
): Promise<T[]> {
  const filePath = resolveCollectionPath(collection);
  const safeLimit = Math.min(200, Math.max(1, Math.floor(limit)));

  try {
    const raw = await readFile(filePath, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .slice(-safeLimit)
      .reverse()
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as T];
        } catch {
          return [];
        }
      });
  } catch {
    return [];
  }
}

export async function queueContactSubmission(input: RuntimeContactRecord): Promise<RuntimeWriteResult> {
  return appendJsonLine("contacts", {
    ...input,
    id: safeString(input.id, 80),
    name: safeString(input.name, 120),
    email: safeString(input.email, 180),
    service: safeString(input.service, 80),
    message: safeString(input.message, 2400),
    locale: safeString(input.locale, 10),
    errorCode: input.errorCode ? safeString(input.errorCode, 80) : undefined
  });
}

export async function queueRuntimeEvent(input: RuntimeEventRecord): Promise<RuntimeWriteResult> {
  return appendJsonLine("events", {
    ...input,
    id: safeString(input.id, 80),
    name: safeString(input.name, 80),
    scope: safeString(input.scope, 80),
    label: safeString(input.label, 160),
    locale: safeString(input.locale, 10),
    path: safeString(input.path, 400)
  });
}

export async function queueProjectBrief(input: RuntimeBriefRecord): Promise<RuntimeWriteResult> {
  return appendJsonLine("briefs", {
    ...input,
    id: safeString(input.id, 80),
    name: safeString(input.name, 120),
    email: safeString(input.email, 180),
    projectType: safeString(input.projectType, 80),
    budgetRange: safeString(input.budgetRange, 80),
    timeline: safeString(input.timeline, 80),
    goals: safeString(input.goals, 2400),
    locale: safeString(input.locale, 10)
  });
}

export async function queueReadinessAssessment(input: RuntimeReadinessRecord): Promise<RuntimeWriteResult> {
  return appendJsonLine("readiness", {
    ...input,
    id: safeString(input.id, 80),
    projectName: safeString(input.projectName, 140),
    email: safeString(input.email, 180),
    projectStage: safeString(input.projectStage, 80),
    contentReadiness: safeString(input.contentReadiness, 80),
    designReadiness: safeString(input.designReadiness, 80),
    integrationReadiness: safeString(input.integrationReadiness, 80),
    launchWindow: safeString(input.launchWindow, 80),
    score: Math.max(0, Math.min(100, Math.round(input.score))),
    recommendation: safeString(input.recommendation, 600),
    locale: safeString(input.locale, 10)
  });
}

export async function queueScopePlan(input: RuntimeScopePlanRecord): Promise<RuntimeWriteResult> {
  return appendJsonLine("scopePlans", {
    ...input,
    id: safeString(input.id, 80),
    projectName: safeString(input.projectName, 140),
    email: safeString(input.email, 180),
    primaryGoal: safeString(input.primaryGoal, 800),
    deliveryModel: safeString(input.deliveryModel, 80),
    complexity: safeString(input.complexity, 80),
    maintenance: safeString(input.maintenance, 80),
    focusAreas: safeStringList(input.focusAreas, 8, 80),
    score: Math.max(0, Math.min(100, Math.round(input.score))),
    phaseCount: Math.max(1, Math.min(8, Math.round(input.phaseCount))),
    recommendation: safeString(input.recommendation, 800),
    locale: safeString(input.locale, 10)
  });
}

export async function readContactSubmissions(limit?: number): Promise<RuntimeContactRecord[]> {
  return readJsonLines<RuntimeContactRecord>("contacts", limit);
}

export async function readRuntimeEvents(limit?: number): Promise<RuntimeEventRecord[]> {
  return readJsonLines<RuntimeEventRecord>("events", limit);
}

export async function readProjectBriefs(limit?: number): Promise<RuntimeBriefRecord[]> {
  return readJsonLines<RuntimeBriefRecord>("briefs", limit);
}

export async function readReadinessAssessments(limit?: number): Promise<RuntimeReadinessRecord[]> {
  return readJsonLines<RuntimeReadinessRecord>("readiness", limit);
}

export async function readScopePlans(limit?: number): Promise<RuntimeScopePlanRecord[]> {
  return readJsonLines<RuntimeScopePlanRecord>("scopePlans", limit);
}

async function collectionStats(collection: keyof typeof COLLECTION_FILES) {
  const filePath = resolveCollectionPath(collection);

  try {
    const info = await stat(filePath);
    return {
      path: filePath,
      exists: true,
      bytes: info.size,
      updatedAt: info.mtime.toISOString()
    };
  } catch {
    return {
      path: filePath,
      exists: false,
      bytes: 0,
      updatedAt: null
    };
  }
}

export async function getRuntimeStoreSummary() {
  const [contacts, events, briefs, readiness, scopePlans] = await Promise.all([
    collectionStats("contacts"),
    collectionStats("events"),
    collectionStats("briefs"),
    collectionStats("readiness"),
    collectionStats("scopePlans")
  ]);

  return {
    mode: "jsonl",
    root: RUNTIME_ROOT,
    collections: {
      contacts,
      events,
      briefs,
      readiness,
      scopePlans
    }
  };
}

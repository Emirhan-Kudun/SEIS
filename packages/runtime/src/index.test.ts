import { describe, it, expect } from "vitest";
import { z } from "zod";
import registry from "./registry.json";
import deploymentTargets from "./deployment-targets.json";

const RuntimeStatusSchema = z.enum([
  "active",
  "configured",
  "needs_credentials",
  "unavailable",
  "skipped_with_reason",
]);

const ConnectorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  status: RuntimeStatusSchema,
  scope: z.string().min(1),
  requiresEnv: z.array(z.string()),
  notes: z.string(),
});

const RegistrySchema = z.object({
  connectors: z.array(ConnectorSchema),
  skills: z.array(ConnectorSchema),
});

const DeploymentTargetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  status: RuntimeStatusSchema,
  scope: z.string().min(1),
  requiresEnv: z.array(z.string()),
  notes: z.string(),
});

// ── registry.json ─────────────────────────────────────────────────────────────

describe("registry.json", () => {
  it("passes the RegistrySchema validation", () => {
    const result = RegistrySchema.safeParse(registry);
    expect(result.success, result.error?.message).toBe(true);
  });

  it("all connector ids are unique", () => {
    const { connectors } = registry as { connectors: Array<{ id: string }> };
    const ids = connectors.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all skill ids are unique", () => {
    const { skills } = registry as { skills: Array<{ id: string }> };
    const ids = skills.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every connector has a valid status", () => {
    const { connectors } = registry as { connectors: Array<{ status: string }> };
    for (const c of connectors) {
      expect(RuntimeStatusSchema.safeParse(c.status).success, `Invalid status: ${c.status}`).toBe(true);
    }
  });

  it("connectors that require env vars list at least one env var name", () => {
    const { connectors } = registry as {
      connectors: Array<{ status: string; requiresEnv: string[] }>;
    };
    const configured = connectors.filter((c) => c.status === "configured");
    for (const c of configured) {
      expect(c.requiresEnv.length, `configured connector has no requiresEnv`).toBeGreaterThan(0);
    }
  });
});

// ── deployment-targets.json ───────────────────────────────────────────────────

describe("deployment-targets.json", () => {
  it("is an array of deployment targets", () => {
    expect(Array.isArray(deploymentTargets)).toBe(true);
    expect((deploymentTargets as unknown[]).length).toBeGreaterThan(0);
  });

  it("every target passes DeploymentTargetSchema", () => {
    for (const target of deploymentTargets as unknown[]) {
      const result = DeploymentTargetSchema.safeParse(target);
      expect(result.success, result.error?.message).toBe(true);
    }
  });

  it("all target ids are unique", () => {
    const ids = (deploymentTargets as Array<{ id: string }>).map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

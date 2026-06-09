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
  statusOverride: z.string().optional(),
  scope: z.string().min(1),
  requiresEnv: z.array(z.string()),
  targetUrl: z.string().optional(),
  command: z.string().optional(),
  persistence: z.string().optional(),
  safety: z.string().optional(),
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

  it("every connector has a non-empty scope", () => {
    const { connectors } = registry as unknown as { connectors: Array<{ scope: string }> };
    for (const c of connectors) {
      expect(c.scope.trim().length, `empty scope on connector`).toBeGreaterThan(0);
    }
  });

  it("connectors with env requirements list at least one env var name", () => {
    const { connectors } = registry as unknown as {
      connectors: Array<{ requiresEnv: string[] }>;
    };
    for (const c of connectors) {
      if (c.requiresEnv.length > 0) {
        expect(c.requiresEnv.every((e) => e.trim().length > 0)).toBe(true);
      }
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

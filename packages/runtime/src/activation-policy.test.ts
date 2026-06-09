import { describe, it, expect } from "vitest";
import { activationPolicies, type ActivationPolicy } from "./activation-policy";

const ALL_STATUSES = [
  "active",
  "configured",
  "needs_credentials",
  "unavailable",
  "skipped_with_reason",
] as const;

describe("activationPolicies", () => {
  it("contains exactly five policies — one per RuntimeStatus", () => {
    expect(activationPolicies).toHaveLength(5);
  });

  it("covers every RuntimeStatus value", () => {
    const covered = new Set(activationPolicies.map((p) => p.status));
    for (const status of ALL_STATUSES) {
      expect(covered.has(status), `Missing policy for status: ${status}`).toBe(true);
    }
  });

  it("every policy has non-empty required text fields", () => {
    for (const policy of activationPolicies) {
      expect(policy.visitorMeaning.trim().length, `visitorMeaning empty for ${policy.status}`).toBeGreaterThan(0);
      expect(policy.implementationRule.trim().length, `implementationRule empty for ${policy.status}`).toBeGreaterThan(0);
      expect(policy.escalation.trim().length, `escalation empty for ${policy.status}`).toBeGreaterThan(0);
    }
  });

  it("'active' policy does not require credentials", () => {
    const active = activationPolicies.find((p) => p.status === "active")!;
    const text = `${active.visitorMeaning} ${active.implementationRule} ${active.escalation}`.toLowerCase();
    // Must not require credentials — the word may appear in a negative/exclusionary context
    expect(text).not.toContain("credential");
    expect(text).toContain("works");
  });

  it("'configured' policy explicitly warns about secret exposure", () => {
    const configured = activationPolicies.find((p) => p.status === "configured")!;
    const text = `${configured.implementationRule}`.toLowerCase();
    expect(text).toContain("secret");
  });

  it("'needs_credentials' policy guides toward setup — not an error", () => {
    const nc = activationPolicies.find((p) => p.status === "needs_credentials")!;
    // Must guide toward setup guidance rather than silently failing
    expect(nc.implementationRule.toLowerCase()).toContain("setup");
    expect(nc.implementationRule.toLowerCase()).toContain("guidance");
  });

  it("'skipped_with_reason' policy blocks destructive tool calls", () => {
    const skipped = activationPolicies.find((p) => p.status === "skipped_with_reason")!;
    const rule = skipped.implementationRule.toLowerCase();
    expect(rule).toContain("blocker");
  });

  it("no two policies share the same status value", () => {
    const statuses = activationPolicies.map((p) => p.status);
    expect(new Set(statuses).size).toBe(statuses.length);
  });
});

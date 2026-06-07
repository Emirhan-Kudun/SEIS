import { describe, it, expect } from "vitest";
import { z } from "zod";
import { locales } from "./index";
import rawData from "./data.json";

// ── Locale registry ──────────────────────────────────────────────────────────

describe("locales", () => {
  it("includes the five required locale codes", () => {
    const required = ["tr", "en", "fr", "it", "de"] as const;
    for (const locale of required) {
      expect(locales).toContain(locale);
    }
  });

  it("contains no duplicate values", () => {
    expect(new Set(locales).size).toBe(locales.length);
  });
});

// ── data.json schema validation ──────────────────────────────────────────────

const SiteMetaSchema = z.object({
  domain: z.string().min(1),
  author: z.string().min(1),
  email: z.string().email(),
  city: z.string().min(1),
  country: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const ServiceItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
});

const WorkItemSchema = z.object({
  id: z.string().min(1),
  tag: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  impact: z.string().min(1),
});

const DrawingItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  src: z.string().min(1),
  tone: z.string().min(1),
  category: z.enum(["graphite", "color"]),
  archiveRole: z.string().min(1),
  sortIndex: z.number().int().nonnegative(),
  featured: z.boolean().optional(),
});

const DataSchema = z.object({
  meta: SiteMetaSchema,
  services: z.array(ServiceItemSchema).min(1),
  work: z.array(WorkItemSchema).min(1),
  drawings: z.array(DrawingItemSchema).min(1),
});

describe("data.json", () => {
  it("passes full schema validation", () => {
    const result = DataSchema.safeParse(rawData);
    expect(result.success, result.error?.message).toBe(true);
  });

  it("has a valid email in meta", () => {
    const result = SiteMetaSchema.safeParse((rawData as any).meta);
    expect(result.success).toBe(true);
  });

  it("every drawing has a unique id", () => {
    const drawings = (rawData as any).drawings as Array<{ id: string }>;
    const ids = drawings.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every drawing has a valid category", () => {
    const drawings = (rawData as any).drawings as Array<{ category: string }>;
    const valid = new Set(["graphite", "color"]);
    for (const d of drawings) {
      expect(valid.has(d.category), `Invalid category: ${d.category}`).toBe(true);
    }
  });

  it("every work item has a non-empty impact field", () => {
    const work = (rawData as any).work as Array<{ impact: string }>;
    for (const item of work) {
      expect(item.impact.trim().length).toBeGreaterThan(0);
    }
  });

  it("sortIndex values in drawings are unique", () => {
    const drawings = (rawData as any).drawings as Array<{ sortIndex: number }>;
    const indices = drawings.map((d) => d.sortIndex);
    expect(new Set(indices).size).toBe(indices.length);
  });
});

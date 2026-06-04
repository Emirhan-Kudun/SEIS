import { Locale } from "@/lib/content";

type Localized = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

function allLocales(value: string): Localized {
  return {
    tr: value,
    en: value,
    fr: value,
    it: value,
    de: value
  };
}

export type InsightItem = {
  slug: string;
  publishedAt: string;
  readTime: string;
  title: string;
  summary: string;
  tags: string[];
  sections: string[];
};

type LocalizedInsightItem = {
  slug: string;
  publishedAt: string;
  readTime: string;
  title: Localized;
  summary: Localized;
  tags: string[];
  sections: LocalizedList;
};

const localizedInsights: LocalizedInsightItem[] = [
  {
    slug: "cinematic-ui-without-performance-debt",
    publishedAt: "2026-05-12",
    readTime: "6 min",
    title: allLocales("Cinematic UI Without Performance Debt"),
    summary: allLocales(
      "How to keep premium visual depth while preserving mobile responsiveness, accessibility, and clean rendering budgets."
    ),
    tags: ["motion", "performance", "frontend"],
    sections: {
      tr: [
        "Cinematic etkiyi ilk olarak hiyerarsi ve spacing ile kur, animasyonla degil.",
        "GPU-safe transform ve opacity disinda kalan pahali animasyonlari sinirla.",
        "Reduced-motion alternatiflerini komponent contract'inin parcasi yap.",
        "Ayni anda hem estetik hem render stabilitesi isteyen ekipler icin token tabanli motion sistemi kur."
      ],
      en: [
        "Build cinematic impact through hierarchy and spacing first, not animation volume.",
        "Constrain expensive effects and prefer GPU-safe transform/opacity transitions.",
        "Treat reduced-motion alternatives as part of the component contract.",
        "Use tokenized motion patterns to balance aesthetics and rendering stability."
      ],
      fr: [
        "Build cinematic impact through hierarchy and spacing first, not animation volume.",
        "Constrain expensive effects and prefer GPU-safe transform/opacity transitions.",
        "Treat reduced-motion alternatives as part of the component contract.",
        "Use tokenized motion patterns to balance aesthetics and rendering stability."
      ],
      it: [
        "Build cinematic impact through hierarchy and spacing first, not animation volume.",
        "Constrain expensive effects and prefer GPU-safe transform/opacity transitions.",
        "Treat reduced-motion alternatives as part of the component contract.",
        "Use tokenized motion patterns to balance aesthetics and rendering stability."
      ],
      de: [
        "Build cinematic impact through hierarchy and spacing first, not animation volume.",
        "Constrain expensive effects and prefer GPU-safe transform/opacity transitions.",
        "Treat reduced-motion alternatives as part of the component contract.",
        "Use tokenized motion patterns to balance aesthetics and rendering stability."
      ]
    }
  },
  {
    slug: "design-system-governance-for-small-teams",
    publishedAt: "2026-05-11",
    readTime: "5 min",
    title: allLocales("Design System Governance for Small Teams"),
    summary: allLocales(
      "A pragmatic approach to component governance that keeps quality high without creating process overhead."
    ),
    tags: ["design-system", "product", "governance"],
    sections: {
      tr: [
        "Her yeni komponent icin zorunlu: amac, tekrar kullanilabilirlik, ve degisim riski notu.",
        "UI kararlarini token katmaninda birlestirerek kopya stilleri azalt.",
        "Small PR disiplini, sistemin degisim maliyetini kontrol altinda tutar.",
        "Geri alinabilirlik (rollback) design system evriminde ana guvencedir."
      ],
      en: [
        "Require purpose, reusability, and risk notes for every new component.",
        "Consolidate UI decisions in token layers to minimize style duplication.",
        "Small PR discipline controls the long-term cost of system evolution.",
        "Rollback safety is the core guardrail for design-system changes."
      ],
      fr: [
        "Require purpose, reusability, and risk notes for every new component.",
        "Consolidate UI decisions in token layers to minimize style duplication.",
        "Small PR discipline controls the long-term cost of system evolution.",
        "Rollback safety is the core guardrail for design-system changes."
      ],
      it: [
        "Require purpose, reusability, and risk notes for every new component.",
        "Consolidate UI decisions in token layers to minimize style duplication.",
        "Small PR discipline controls the long-term cost of system evolution.",
        "Rollback safety is the core guardrail for design-system changes."
      ],
      de: [
        "Require purpose, reusability, and risk notes for every new component.",
        "Consolidate UI decisions in token layers to minimize style duplication.",
        "Small PR discipline controls the long-term cost of system evolution.",
        "Rollback safety is the core guardrail for design-system changes."
      ]
    }
  },
  {
    slug: "ai-ready-frontend-architecture-principles",
    publishedAt: "2026-05-10",
    readTime: "7 min",
    title: allLocales("AI-Ready Frontend Architecture Principles"),
    summary: allLocales(
      "How to structure modern frontend systems so OpenAI, Gemini, and Claude integrations can be added without rewrites."
    ),
    tags: ["ai", "architecture", "nextjs"],
    sections: {
      tr: [
        "AI entegrasyonlarini UI katmanina degil API contract katmanina bagla.",
        "Provider degistirilebilirligi icin ortak payload sekli kullan.",
        "Gozlemlenebilir event akisini ilk gunden kur.",
        "Vendor lock-in riskini azaltmak icin adapter deseni uygula."
      ],
      en: [
        "Anchor AI integrations in API contracts, not direct UI coupling.",
        "Use shared payload envelopes to keep provider switching practical.",
        "Establish observable event streams from day one.",
        "Adopt adapter patterns to reduce vendor lock-in risk."
      ],
      fr: [
        "Anchor AI integrations in API contracts, not direct UI coupling.",
        "Use shared payload envelopes to keep provider switching practical.",
        "Establish observable event streams from day one.",
        "Adopt adapter patterns to reduce vendor lock-in risk."
      ],
      it: [
        "Anchor AI integrations in API contracts, not direct UI coupling.",
        "Use shared payload envelopes to keep provider switching practical.",
        "Establish observable event streams from day one.",
        "Adopt adapter patterns to reduce vendor lock-in risk."
      ],
      de: [
        "Anchor AI integrations in API contracts, not direct UI coupling.",
        "Use shared payload envelopes to keep provider switching practical.",
        "Establish observable event streams from day one.",
        "Adopt adapter patterns to reduce vendor lock-in risk."
      ]
    }
  }
];

export function getInsights(locale: Locale): InsightItem[] {
  return localizedInsights.map((item) => ({
    slug: item.slug,
    publishedAt: item.publishedAt,
    readTime: item.readTime,
    title: item.title[locale],
    summary: item.summary[locale],
    tags: item.tags,
    sections: item.sections[locale]
  }));
}

export function getInsightBySlug(locale: Locale, slug: string): InsightItem | null {
  return getInsights(locale).find((item) => item.slug === slug) ?? null;
}

export function getStaticInsightSlugs(): { slug: string }[] {
  return localizedInsights.map((item) => ({ slug: item.slug }));
}

export function getInsightTagList(locale: Locale): string[] {
  const tags = new Set<string>();
  getInsights(locale).forEach((item) => {
    item.tags.forEach((tag) => tags.add(tag));
  });
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function searchInsights(locale: Locale, query: string, tag: string | null): InsightItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTag = tag?.trim().toLowerCase() || "";

  return getInsights(locale)
    .filter((item) => {
      const tagPass = normalizedTag ? item.tags.some((itemTag) => itemTag.toLowerCase() === normalizedTag) : true;
      if (!tagPass) return false;

      if (!normalizedQuery) return true;

      return (
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((itemTag) => itemTag.toLowerCase().includes(normalizedQuery))
      );
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function scoreRelatedInsights(current: InsightItem, candidate: InsightItem): number {
  if (current.slug === candidate.slug) return -1;

  const currentTags = new Set(current.tags.map((tag) => tag.toLowerCase()));
  const candidateTags = new Set(candidate.tags.map((tag) => tag.toLowerCase()));

  let overlap = 0;
  currentTags.forEach((tag) => {
    if (candidateTags.has(tag)) overlap += 1;
  });

  const dateScore = candidate.publishedAt.localeCompare(current.publishedAt) >= 0 ? 0.4 : 0.2;
  return overlap * 2 + dateScore;
}

export function getRelatedInsights(locale: Locale, slug: string, limit = 2): InsightItem[] {
  const source = getInsightBySlug(locale, slug);
  if (!source) return [];

  return getInsights(locale)
    .map((candidate) => ({
      item: candidate,
      score: scoreRelatedInsights(source, candidate)
    }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

type InsightQueryOptions = {
  query?: string;
  tag?: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesQuery(item: InsightItem, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  return (
    normalize(item.title).includes(q) ||
    normalize(item.summary).includes(q) ||
    item.tags.some((tag) => normalize(tag).includes(q)) ||
    item.sections.some((section) => normalize(section).includes(q))
  );
}

function matchesTag(item: InsightItem, tag: string): boolean {
  const t = normalize(tag);
  if (!t || t === "all") return true;
  return item.tags.some((candidate) => normalize(candidate) === t);
}

function toTimestamp(dateValue: string): number {
  const value = Date.parse(dateValue);
  return Number.isNaN(value) ? 0 : value;
}

export function queryInsights(locale: Locale, options: InsightQueryOptions): InsightItem[] {
  const items = getInsights(locale);
  return items
    .filter((item) => matchesTag(item, options.tag ?? "all"))
    .filter((item) => matchesQuery(item, options.query ?? ""))
    .sort((a, b) => toTimestamp(b.publishedAt) - toTimestamp(a.publishedAt));
}

export function getInsightTags(): string[] {
  return Array.from(
    localizedInsights.reduce((set, item) => {
      item.tags.forEach((tag) => set.add(tag));
      return set;
    }, new Set<string>())
  ).sort((a, b) => a.localeCompare(b));
}

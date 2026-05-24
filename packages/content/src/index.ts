import rawContent from "./data.json";

export const locales = ["tr", "en", "fr", "it", "de"] as const;

export type Locale = (typeof locales)[number];
export type LocalizedDictionary = Record<string, string>;

export type SiteMeta = {
  domain: string;
  author: string;
  email: string;
  city: string;
  country: string;
  title: string;
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
};

export type WorkItem = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  impact: string;
};

export type CaseStudy = {
  slug: string;
  year: string;
  role: string;
  title: string;
  challenge: string;
  process: string[];
  solution: string;
  outcome: string;
};

export type DrawingItem = {
  id: string;
  title: string;
  src: string;
  tone: string;
  featured?: boolean;
};

export type SeisContent = {
  locales: Locale[];
  site: SiteMeta;
  dictionary: Record<Locale, LocalizedDictionary>;
  services: ServiceItem[];
  works: WorkItem[];
  caseStudies: CaseStudy[];
  drawings: DrawingItem[];
};

export const content = rawContent as SeisContent;

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : "tr";
}

export function getDictionary(locale: string | undefined | null): LocalizedDictionary {
  return content.dictionary[resolveLocale(locale)];
}

export const siteMeta = content.site;
export const services = content.services;
export const works = content.works;
export const caseStudies = content.caseStudies;
export const drawings = content.drawings;

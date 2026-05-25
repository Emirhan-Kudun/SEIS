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

export type DrawingItem = {
  id: string;
  title: string;
  src: string;
  tone: string;
  featured?: boolean;
};

export type BehanceVisualItem = {
  id: string;
  projectId: string;
  title: string;
  category: string;
  image: string;
  href: string;
  embedUrl: string;
  embedCode: string;
  notes: string;
  featured?: boolean;
};

export type BehanceEmbedItem = {
  id: string;
  projectId: string;
  title: string;
  url: string;
  embedUrl: string;
  aspectRatio: string;
  category: string;
  notes: string;
  embedCode: string;
  featured?: boolean;
};

export type SoftwareLanguageItem = {
  id: string;
  name: string;
  layer: string;
  role: string;
  status: "active" | "planned";
};

export type SocialLinkItem = {
  id: string;
  label: string;
  href: string;
  mark: string;
};

export type QuestionAnswerItem = {
  id: string;
  question: string;
  answer: string;
};

export type SeisContent = {
  locales: Locale[];
  site: SiteMeta;
  dictionary: Record<Locale, LocalizedDictionary>;
  services: ServiceItem[];
  works: WorkItem[];
  drawings: DrawingItem[];
  behanceVisuals: BehanceVisualItem[];
  behanceEmbeds: BehanceEmbedItem[];
  softwareLanguages: SoftwareLanguageItem[];
  socialLinks: SocialLinkItem[];
  contactQa: QuestionAnswerItem[];
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
export const drawings = content.drawings;
export const behanceVisuals = content.behanceVisuals;
export const behanceEmbeds = content.behanceEmbeds;
export const softwareLanguages = content.softwareLanguages;
export const socialLinks = content.socialLinks;
export const contactQa = content.contactQa;

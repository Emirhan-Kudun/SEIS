export const DEFAULT_SITE_URL = "https://emirhankudun.com";
export const DEFAULT_CONTACT_EMAIL = "hello@emirhankudun.com";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return DEFAULT_SITE_URL;
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_SITE_URL;

  const withProtocol = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;

export const siteConfig = {
  name: "Emirhan Kudun — Cinematic Portfolio OS",
  shortName: "Emirhan Kudun",
  description:
    "Hybrid-brand cinematic portfolio experience combining Emirhan's premium creative direction with SEIS AI-native product engineering discipline.",
  email: contactEmail,
  inLanguages: ["tr", "en", "fr", "it", "de"],
  url: siteUrl,
  social: {
    x: "@emirhankudun",
    behance: "https://www.behance.net/emirhankudun",
    linkedin: "https://www.linkedin.com/in/emirhankudun"
  },
  migration: {
    model: "hybrid-dual",
    currentPhase: "parallel"
  }
} as const;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${siteConfig.url}/`).toString();
}

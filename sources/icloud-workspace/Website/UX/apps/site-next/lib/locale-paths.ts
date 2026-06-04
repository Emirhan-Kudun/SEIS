import { locales, resolveLocale, type Locale } from "@seis/content";

export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_SEGMENTS = new Set(locales);

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return resolveLocale(value ?? DEFAULT_LOCALE);
}

export function withLocalePath(localeInput: string | null | undefined, path = "/") {
  const locale = normalizeLocale(localeInput);
  const normalized = normalizePath(path);

  if (normalized === "/") return `/${locale}`;
  if (normalized.startsWith("/#") || normalized.startsWith("/?")) {
    return `/${locale}${normalized.slice(1)}`;
  }

  return `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string) {
  const normalized = normalizePath(pathname);
  const segments = normalized.split("/");
  const maybeLocale = segments[1];
  const hasKnownPrefix = Boolean(maybeLocale && LOCALE_SEGMENTS.has(maybeLocale as Locale));

  if (!hasKnownPrefix) {
    return { locale: DEFAULT_LOCALE, pathname: normalized, hadPrefix: false };
  }

  const locale = resolveLocale(maybeLocale as Locale);
  const stripped = `/${segments.slice(2).join("/")}`.replace(/\/{2,}/g, "/");
  const pathnameWithoutLocale = stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  return { locale, pathname: pathnameWithoutLocale, hadPrefix: true };
}

export function buildLocaleAlternates(path = "/") {
  const normalized = normalizePath(path);

  return locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = withLocalePath(locale, normalized);
    return acc;
  }, { "x-default": withLocalePath(DEFAULT_LOCALE, normalized) });
}

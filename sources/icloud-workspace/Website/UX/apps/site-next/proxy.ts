import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, normalizeLocale, stripLocalePrefix, withLocalePath } from "./lib/locale-paths";

const IGNORE_PREFIXES = ["/api", "/_next", "/favicon", "/sitemap.xml", "/robots.txt"];
const PUBLIC_FILE_PATTERN = /\.[a-z0-9]+$/i;
const LEGACY_LANG_GRACE_END = Date.parse("2026-08-24T00:00:00.000Z");

function isIgnoredPath(pathname: string) {
  return IGNORE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function applyTechnicalNoIndex(pathname: string, response: NextResponse) {
  if (pathname === "/ops" || pathname === "/runtime") {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isIgnoredPath(pathname) || PUBLIC_FILE_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const legacyLang = searchParams.get("lang");
  const hasLegacyLang = Boolean(legacyLang);
  const now = Date.now();
  const shouldApplyLegacyRedirect = hasLegacyLang && now <= LEGACY_LANG_GRACE_END;
  const localeFromLegacy = normalizeLocale(legacyLang);
  const { hadPrefix, locale: prefixedLocale, pathname: strippedPath } = stripLocalePrefix(pathname);

  if (hadPrefix) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-seis-locale", prefixedLocale);
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = strippedPath;
    rewriteUrl.searchParams.delete("lang");

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders }
    });
    applyTechnicalNoIndex(strippedPath, response);
    return response;
  }

  const redirectLocale = shouldApplyLegacyRedirect ? localeFromLegacy : DEFAULT_LOCALE;
  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = withLocalePath(redirectLocale, pathname);

  if (hasLegacyLang) {
    targetUrl.searchParams.delete("lang");
  }

  const statusCode = shouldApplyLegacyRedirect ? 301 : 308;
  const response = NextResponse.redirect(targetUrl, statusCode);
  applyTechnicalNoIndex(pathname, response);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

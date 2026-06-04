import { headers } from "next/headers";

import { resolveLocale, type Locale } from "@seis/content";

import { DEFAULT_LOCALE } from "./locale-paths";

export async function resolveRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  return resolveLocale(headerStore.get("x-seis-locale") ?? DEFAULT_LOCALE);
}

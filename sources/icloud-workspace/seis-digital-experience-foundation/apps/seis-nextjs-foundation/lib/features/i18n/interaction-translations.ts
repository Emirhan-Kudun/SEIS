import type { Locale } from "@/lib/content";

import { interactionDictionary } from "@/lib/features/i18n/interaction-dictionary";

export function getInteractionDictionary(locale: Locale) {
  return interactionDictionary[locale];
}

import type { Locale } from "@/lib/content";

import { getInteractionDictionary } from "@/lib/features/i18n/interaction-translations";

export function getInteractionLabContent(locale: Locale) {
  return {
    dictionary: getInteractionDictionary(locale),
    hoverPatterns: [
      "lift",
      "outline",
      "spotlight",
      "glow",
      "tilt",
      "underline",
      "chip"
    ],
    motionPatterns: [
      "fade-up",
      "blur-reveal",
      "scale-fade",
      "mask-wipe",
      "float-loop",
      "route-shift",
      "pulse-border",
      "timeline-strip"
    ],
    principles: [
      "Interaction clarity before visual intensity",
      "Motion must preserve readability and focus",
      "Every hover cue should have semantic intent",
      "Reduced-motion fallback stays first-class",
      "Locale switching must not degrade interaction quality"
    ]
  };
}

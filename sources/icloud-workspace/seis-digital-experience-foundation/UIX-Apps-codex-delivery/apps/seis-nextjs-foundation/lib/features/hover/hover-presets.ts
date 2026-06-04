import { hoverTokens } from "@/lib/features/hover/hover-tokens";

export const hoverPresets = {
  card: {
    transition: `transform ${hoverTokens.durationFast} ease, box-shadow ${hoverTokens.durationFast} ease, border-color ${hoverTokens.durationFast} ease`
  },
  subtle: {
    transition: `opacity ${hoverTokens.durationFast} ease`
  },
  dramatic: {
    transition: `transform ${hoverTokens.durationSlow} cubic-bezier(0.22, 1, 0.36, 1)`
  }
} as const;

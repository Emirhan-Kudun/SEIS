import { motionTokens } from "@/lib/features/motion/motion-tokens";

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: motionTokens.durationBase, ease: motionTokens.easeSmooth }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: motionTokens.durationBase, ease: motionTokens.easeSoft }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: motionTokens.durationBase, ease: motionTokens.easeSmooth }
  }
} as const;

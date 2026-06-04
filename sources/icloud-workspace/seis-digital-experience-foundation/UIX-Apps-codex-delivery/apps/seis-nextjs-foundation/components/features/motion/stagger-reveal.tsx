"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { motionTokens } from "@/lib/features/motion/motion-tokens";

type StaggerRevealProps = {
  children: ReactNode;
};

export function StaggerReveal({ children }: StaggerRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: motionTokens.stagger, duration: motionTokens.durationBase }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.52, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

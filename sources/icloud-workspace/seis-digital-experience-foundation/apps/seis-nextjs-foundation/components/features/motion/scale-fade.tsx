"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ScaleFadeProps = {
  children: ReactNode;
};

export function ScaleFade({ children }: ScaleFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

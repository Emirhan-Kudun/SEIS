"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MaskWipeProps = {
  children: ReactNode;
};

export function MaskWipe({ children }: MaskWipeProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

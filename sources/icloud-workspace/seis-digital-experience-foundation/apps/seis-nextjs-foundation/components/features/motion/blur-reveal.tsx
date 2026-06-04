"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type BlurRevealProps = {
  children: ReactNode;
};

export function BlurReveal({ children }: BlurRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

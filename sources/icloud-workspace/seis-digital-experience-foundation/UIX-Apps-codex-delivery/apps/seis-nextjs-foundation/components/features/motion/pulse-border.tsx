"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type PulseBorderProps = {
  children: ReactNode;
};

export function PulseBorder({ children }: PulseBorderProps) {
  return (
    <motion.div
      className="rounded-lg border border-seis-line px-3 py-2"
      animate={{ boxShadow: ["0 0 0 0 rgba(215,169,109,0)", "0 0 0 3px rgba(215,169,109,0.12)", "0 0 0 0 rgba(215,169,109,0)"] }}
      transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

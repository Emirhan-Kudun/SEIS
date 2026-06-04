"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FloatLoopProps = {
  children: ReactNode;
};

export function FloatLoop({ children }: FloatLoopProps) {
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

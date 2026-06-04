"use client";

import { motion } from "framer-motion";

const items = ["layout", "hover", "scroll", "route", "reduced-motion"];

export function TimelineStrip() {
  return (
    <div className="overflow-hidden rounded-lg border border-seis-line bg-[#1a1510] py-2">
      <motion.div
        className="flex min-w-max gap-3 px-3 text-xs uppercase tracking-[0.08em] text-seis-muted"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 14 }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="rounded-full border border-seis-line px-2 py-1">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

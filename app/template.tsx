"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionPreference } from "@/components/motion-provider";

// Next gives templates a new key per route segment, making this a small,
// interruption-free transition on client navigation while the shell persists.
export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useMotionPreference();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

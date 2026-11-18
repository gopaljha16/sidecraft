"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useMotionPreference } from "@/components/motion-provider";

// Next gives templates a new key per route segment, making this a small,
// interruption-free transition on client navigation while the shell persists.
export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useMotionPreference();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={false}
      animate={mounted && !reducedMotion ? { opacity: [0, 1], y: [8, 0] } : { opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

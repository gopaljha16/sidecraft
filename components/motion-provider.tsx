"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { MotionEnhancements } from "./motion-enhancements";

export const editorialEase = [0.22, 1, 0.36, 1] as const;
export const gentleSpring = { type: "spring", stiffness: 320, damping: 32 } as const;
const MotionPreference = createContext(false);
const preferenceQuery = "(prefers-reduced-motion: reduce)";
const getPreference = () => window.matchMedia(preferenceQuery).matches;
function subscribePreference(onChange: () => void) {
  const preference = window.matchMedia(preferenceQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}
export const useMotionPreference = () => useContext(MotionPreference);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribePreference, getPreference, () => false);
  return (
    <MotionPreference.Provider value={reducedMotion}>
      <MotionConfig
        reducedMotion={reducedMotion ? "always" : "never"}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: editorialEase }}
      >
        <MotionEnhancements />
        {children}
      </MotionConfig>
    </MotionPreference.Provider>
  );
}

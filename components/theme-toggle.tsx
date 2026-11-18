"use client";

import { useEffect, useState } from "react";
import { ThemeIcon } from "./icons";

const storageKey = "slidecraft-theme";

function currentTheme() {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => setTheme(currentTheme()), []);

  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(storageKey, next);
    setTheme(next);
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={`theme-toggle inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      <ThemeIcon dark={isDark} />
    </button>
  );
}

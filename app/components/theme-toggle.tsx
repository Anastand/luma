"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  // resolvedTheme gives us the ACTUAL visual theme ('light' or 'dark')
  // even if theme is 'system'
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // If user changes OS settings, reset to "system" immediately
      setTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  // Hydration fix (mandatory for next-themes)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SWITCH = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else if (resolvedTheme == "light") {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={SWITCH}
      className="size-16 flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
    >
      <SunIcon
        size={32}
        className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        size={32}
        className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

// need to add this to the blog

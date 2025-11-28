"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setsystemTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setsystemTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const SWITCH_THEME_BUTTON = () => {
    console.log(`button clicked`);
    switch (theme) {
      case "light":
        setTheme("dark");
        return;
      case "dark":
        setTheme("light");
        return;
      case "system":
        setTheme(systemTheme == "light" ? "dark" : "light");
        return;
      default:
        return;
    }
  };
  return (
    <div>
      <button
        onClick={SWITCH_THEME_BUTTON}
        className="size-16 flex items-center justify-center"
      >
        <SunIcon
          size={200}
          className="rotate-0 scale-100 transition-all duration-200 dark:rotate-90 dark:scale-0 "
        />{" "}
        <MoonIcon
          size={200}
          className="rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 "
        />
      </button>
    </div>
  );
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = safeLocalStorage.get("theme") as Theme | null;
    const initial: Theme = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    safeLocalStorage.set("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be inside ThemeProvider");
  return ctx;
}

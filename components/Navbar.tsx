"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useThemeContext } from "@/components/ThemeProvider";
import { safeLocalStorage, setCookie } from "@/lib/safeStorage";
import gsap from "gsap";

const LOCALES = [
  { code: "ka", label: "KA" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

export default function Navbar() {
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggle } = useThemeContext();
  const switcherRef = useRef<HTMLDivElement>(null);

  const switchLocale = (next: string) => {
    setCookie("lang", next);
    safeLocalStorage.set("lang", next);
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
    setDropdownOpen(false);
  };

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".theme-toggle", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.2);
      tl.from(".lang-switcher", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.3);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <button
        onClick={toggle}
        className="theme-toggle floating-btn"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>

      <div className="lang-switcher floating-btn" ref={switcherRef}>
        <button
          className="lang-trigger"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-expanded={dropdownOpen}
          aria-label="Change language"
        >
          {currentLocale.label.slice(0, 1)}
        </button>

        <div className={`lang-dropdown${dropdownOpen ? " open" : ""}`}>
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              className={`lang-option${locale === loc.code ? " active" : ""}`}
              onClick={() => switchLocale(loc.code)}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

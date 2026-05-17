"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useThemeContext } from "@/components/ThemeProvider";
import gsap from "gsap";
import { fireConfetti } from "@/lib/confetti";

const LOCALES = [
  { code: "ka", flag: "🇬🇪", label: "KA" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "en", flag: "🇬🇧", label: "EN" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

const linkStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "clamp(10px, 1.5vw, 13px)",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: "var(--text-primary)",
  whiteSpace: "nowrap",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggle } = useThemeContext();
  const switcherRef = useRef<HTMLDivElement>(null);

  const switchLocale = (next: string) => {
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("lang", next);
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
      tl.from(".nav-link", { autoAlpha: 0, y: -15, duration: 0.4, ease: "power3.out", stagger: 0.07, clearProps: "all" }, 0.2);
      tl.from(".lang-switcher", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.56);
      tl.from(".rsvp-btn", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.66);
      tl.from(".theme-toggle", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.56);
    });
    return () => ctx.revert();
  }, []);

  return (
    <header
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "12px 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Theme toggle — left */}
      <button
        onClick={toggle}
        className="theme-toggle"
        aria-label="Toggle theme"
        style={{
          color: "var(--nav-heading)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "4px",
          minHeight: "unset",
          minWidth: "unset",
        }}
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

      {/* Nav links + logo — center, desktop only */}
      <nav className="nav-desktop-links" style={{ display: "flex", gap: "clamp(16px, 3vw, 36px)", alignItems: "center" }}>
        <a href="#invitation" className="nav-link" style={linkStyle}>{t("invitation")}</a>
        <div style={{
          fontFamily: "var(--font-great-vibes), Great Vibes, cursive",
          fontSize: "32px",
          color: "var(--nav-heading)",
          letterSpacing: "2px",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}>
          Alexandra × Nika
        </div>
        <a href="#where-when" className="nav-link" style={linkStyle}>{t("whereWhen")}</a>
      </nav>

      {/* Right group: lang switcher + RSVP, desktop only */}
      <div className="nav-desktop-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="lang-switcher" ref={switcherRef}>
          <button
            className="lang-trigger"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-expanded={dropdownOpen}
          >
            <span>{currentLocale.flag}</span>
            <span style={{ marginLeft: 4 }}>{currentLocale.label}</span>
            <span className={`lang-arrow${dropdownOpen ? " open" : ""}`}>▼</span>
          </button>

          <div className={`lang-dropdown${dropdownOpen ? " open" : ""}`}>
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                className={`lang-option${locale === loc.code ? " active" : ""}`}
                onClick={() => switchLocale(loc.code)}
              >
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </button>
            ))}
          </div>
        </div>

        <a
          href="#rsvp"
          className="rsvp-btn"
          onClick={fireConfetti}
          style={{
            background: "#B8960C",
            color: "#fff",
            padding: "8px 20px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 2,
          }}
        >
          RSVP
        </a>
      </div>

      {/* Mobile RSVP — visible only on mobile */}
      <a
        href="#rsvp"
        className="nav-mobile-rsvp"
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#B8960C",
          border: "1px solid rgba(184,150,12,0.4)",
          padding: "6px 14px",
          textDecoration: "none",
          borderRadius: 2,
        }}
      >
        RSVP
      </a>
    </header>
  );
}

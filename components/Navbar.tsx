"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
  color: "inherit",
  whiteSpace: "nowrap",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const switchLocale = (next: string) => {
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "var(--glass-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Theme toggle — left */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="theme-toggle"
        aria-label="Toggle theme"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 20,
          lineHeight: 1,
          padding: 4,
          color: "inherit",
        }}
      >
        {mounted ? (theme === "dark" ? "☀️" : "🌙") : " "}
      </button>

      {/* Nav links — center */}
      <nav style={{ display: "flex", gap: "clamp(12px, 3vw, 32px)", alignItems: "center" }}>
        <a href="#story" className="nav-link" style={linkStyle}>{t("story")}</a>
        <a href="#gallery" className="nav-link" style={linkStyle}>{t("gallery")}</a>
        <a href="#journey" className="nav-link" style={linkStyle}>{t("journey")}</a>
      </nav>

      {/* Right group: lang switcher + RSVP */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
    </header>
  );
}

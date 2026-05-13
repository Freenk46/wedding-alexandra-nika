"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { fireConfetti } from "@/lib/confetti";
import MobileMenu from "./MobileMenu";

const LOCALES = [
  { code: "ka", flag: "🇬🇪", label: "KA" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "en", flag: "🇬🇧", label: "EN" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const logoRef = useRef<SVGTextElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
    setDropdownOpen(false);
  };

  const navItems = [
    { href: "#story", label: t("story") },
    { href: "#gallery", label: t("gallery") },
    { href: "#journey", label: t("journey") },
    { href: "#rsvp", label: t("rsvp") },
  ];

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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const logoText = logoRef.current;
    if (!logoText) return;

    const ctx = gsap.context(() => {
      gsap.set(logoText, {
        fill: "transparent",
        stroke: "#D4AF37",
        strokeWidth: "1px",
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".nav-logo", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(logoText, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0);
      tl.to(
        logoText,
        {
          fill: "var(--accent)",
          duration: 0.3,
          ease: "none",
          onComplete: () => gsap.set(logoText, { clearProps: "all" }),
        },
        0.9
      );

      tl.from(".nav-link", { autoAlpha: 0, y: -15, duration: 0.4, ease: "power3.out", stagger: 0.07, clearProps: "all" }, 0.2);
      tl.from(".lang-switcher", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.56);
      tl.from(".rsvp-btn", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.66);
      tl.from(".hamburger-btn", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.56);
      tl.from(".theme-toggle", { autoAlpha: 0, y: -15, duration: 0.35, clearProps: "all" }, 0.56);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 32px",
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
        {/* ── Logo ─────────────────────────────── */}
        <svg
          className="nav-logo nav-logo-svg"
          width="110"
          height="56"
          aria-label="Alexandra & Nika"
          style={{ overflow: "visible", display: "block", cursor: "pointer" }}
        >
          <text ref={logoRef} className="logo-svg-text" x="0" y="50">
            A N
          </text>
        </svg>

        {/* ── Nav links (desktop) ───────────────── */}
        <nav className="nav-links-row" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              data-text={item.label}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* ── Right group ──────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
            aria-label="Toggle Theme"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
              fontSize: "18px",
            }}
          >
            {mounted ? (theme === "dark" ? "☀️" : "🌙") : " "}
          </button>

          {/* Language switcher (desktop) */}
          <div className="lang-switcher" ref={switcherRef}>
            <button
              className="lang-trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
            >
              <span>{currentLocale.flag}</span>
              <span style={{ marginLeft: "4px" }}>{currentLocale.label}</span>
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

          {/* RSVP button (desktop) */}
          <a href="#rsvp" className="rsvp-btn" onClick={fireConfetti}>
            <span className="rsvp-icon">♥</span>
            RSVP
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              minHeight: 44,
              minWidth: 44,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <span style={{ display: "block", width: 24, height: 2, background: "var(--text-primary)" }} />
            <span style={{ display: "block", width: 24, height: 2, background: "var(--text-primary)" }} />
            <span style={{ display: "block", width: 16, height: 2, background: "var(--text-primary)" }} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        onLocaleSwitch={switchLocale}
      />
    </>
  );
}

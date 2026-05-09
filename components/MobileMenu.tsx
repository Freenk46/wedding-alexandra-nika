"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { href: "#story",   label: "ისტორია" },
  { href: "#gallery", label: "გალერეა" },
  { href: "#journey", label: "მოგზაურობა" },
  { href: "#rsvp",    label: "RSVP" },
];

const LOCALES = [
  { code: "ka", flag: "🇬🇪", label: "KA" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "en", flag: "🇬🇧", label: "EN" },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: string;
  onLocaleSwitch: (code: string) => void;
}

export default function MobileMenu({ open, onClose, locale, onLocaleSwitch }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLAnchorElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(linksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08, delay: 0.1 }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0, duration: 0.25, ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open, mounted]);

  if (!mounted) return null;

  const handleLinkClick = (href: string) => {
    gsap.to(linksRef.current.filter(Boolean), {
      y: -40, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        onClose();
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        background: "#111",
        zIndex: 200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 32,
          background: "none", border: "none",
          color: "#EAE6DD", fontSize: 32, cursor: "pointer",
          lineHeight: 1, minHeight: 44, minWidth: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Close menu"
      >
        ✕
      </button>

      {NAV_ITEMS.map((item, i) => (
        <a
          key={item.href}
          ref={(el) => { if (el) linksRef.current[i] = el; }}
          href={item.href}
          onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }}
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 16vw, 72px)",
            color: "#EAE6DD", textDecoration: "none",
            letterSpacing: "0.02em", lineHeight: 1.1,
            textTransform: "uppercase", padding: "4px 0",
          }}
        >
          {item.label}
        </a>
      ))}

      <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
        {LOCALES.map((loc) => (
          <button
            key={loc.code}
            onClick={() => { onLocaleSwitch(loc.code); onClose(); }}
            style={{
              background: locale === loc.code ? "#F05235" : "transparent",
              border: `1px solid ${locale === loc.code ? "#F05235" : "rgba(234,230,221,0.3)"}`,
              color: "#EAE6DD",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11, letterSpacing: "0.15em",
              padding: "8px 16px", cursor: "pointer",
              minHeight: 44, display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span>{loc.flag}</span>
            <span>{loc.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

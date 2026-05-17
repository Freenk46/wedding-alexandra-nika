"use client";

import { useState, useEffect } from "react";

const LANGS = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
] as const;

function getLangCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("lang="));
  return match ? match.trim().slice(5) : null;
}

function setLangCookie(lang: string) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

interface Props {
  alwaysShow?: boolean;
}

export default function LanguageModal({ alwaysShow = false }: Props) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getLangCookie();
    if (!saved || alwaysShow) setShow(true);
  }, [alwaysShow]);

  const choose = (lang: string) => {
    localStorage.setItem("lang", lang);
    setLangCookie(lang);
    setShow(false);
    window.location.href = `/${lang}`;
  };

  if (!mounted || !show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,8,5,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#f5f0e8",
          padding: "3rem 2.5rem",
          textAlign: "center",
          maxWidth: 360,
          width: "90%",
        }}
      >
        {/* Couple name */}
        <div
          style={{
            fontFamily: "var(--font-great-vibes), Great Vibes, cursive",
            fontSize: 36,
            color: "#c9a96e",
            marginBottom: "0.5rem",
          }}
        >
          Alexandra × Nika
        </div>

        {/* Date */}
        <div
          style={{
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontSize: 9,
            letterSpacing: "3px",
            color: "#9a8a6a",
            marginBottom: "2rem",
            fontWeight: 300,
          }}
        >
          21 · OCT · 2026
        </div>

        {/* Prompt */}
        <div
          style={{
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontSize: 11,
            letterSpacing: "2px",
            color: "#4a4035",
            marginBottom: "1.5rem",
            fontWeight: 300,
          }}
        >
          Choose language / აირჩიე ენა
        </div>

        {/* Language buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          {LANGS.map(({ code, label }, i) => (
            <button
              key={code}
              onClick={() => choose(code)}
              style={{
                flex: 1,
                padding: "12px 6px",
                background: i === 0 ? "#c9a96e" : "transparent",
                border: i === 0 ? "none" : "1px solid #c9a96e",
                color: i === 0 ? "#1a1208" : "#c9a96e",
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 10,
                letterSpacing: "1.5px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c9a96e";
                e.currentTarget.style.color = "#1a1208";
                e.currentTarget.style.border = "1px solid #c9a96e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  i === 0 ? "#c9a96e" : "transparent";
                e.currentTarget.style.color =
                  i === 0 ? "#1a1208" : "#c9a96e";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import CornerFlower from "./CornerFlower";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer
      className="paper-section"
      style={{
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CornerFlower src="/img/9.png" corner="tl" />
      <CornerFlower src="/img/4.png" corner="tr" />

      <div className="thankyou-frame">
        <div className="thankyou-inner">
          <span className="thankyou-scallop thankyou-scallop--top" />
          <span className="thankyou-scallop thankyou-scallop--bottom" />
          <span className="thankyou-scallop thankyou-scallop--left" />
          <span className="thankyou-scallop thankyou-scallop--right" />

          <h2 className="thankyou-title">{t("thankYouTitle")}</h2>
          <p className="thankyou-body">{t("thankYouBody")}</p>
          <p className="thankyou-names">Alexandra &amp; Nika</p>
        </div>
      </div>

      {/* Back to top */}
      <button
        className="footer-back-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 40,
          height: 40,
          background: "var(--bg-secondary)",
          color: "var(--accent)",
          border: "1px solid var(--border-color)",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          transition: "background 0.3s ease, color 0.3s ease",
          minHeight: 44,
          minWidth: 44,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--text-inverted)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--accent)"; }}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Copyright */}
      <p
        style={{
          marginTop: "clamp(24px, 4vw, 36px)",
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "#3a2a12",
          opacity: 0.4,
        }}
      >
        {t("copyright")}
      </p>
    </footer>
  );
}

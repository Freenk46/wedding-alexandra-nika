"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
        padding: "80px 32px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant name — full width */}
      <div
        className="footer-name"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(36px, 10vw, 200px)",
          lineHeight: 0.9,
          color: "var(--border-subtle)",
          WebkitTextStroke: "1px var(--border-color)",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          marginBottom: 48,
        }}
      >
        ALEXANDRA × NIKA
      </div>

      {/* Back to top */}
      <button
        className="footer-back-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
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

      {/* Bottom row */}
      <div
        className="footer-bottom"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 8,
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: 13,
          color: "var(--text-primary)",
          opacity: 0.7,
          paddingRight: 56,
        }}
      >
        <span>©2026 Alexandra &amp; Nika</span>
        <span>
          From Batumi with love{" "}
          <span
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 18,
              opacity: 1,
            }}
          >
            ♡
          </span>
        </span>
      </div>
    </footer>
  );
}

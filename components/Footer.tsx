export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, #EAE6DD 0%, #e8856a 50%, #F05235 100%)",
        padding: "80px 32px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant name — full width */}
      <div
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 13vw, 200px)",
          lineHeight: 0.9,
          color: "#111111",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          marginBottom: 48,
        }}
      >
        ALEXANDRA × NIKA
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
          fontSize: 13,
          color: "#111111",
          opacity: 0.7,
        }}
      >
        <span>©2026 Alexandra &amp; Nika</span>
        <span>
          From Batumi with love{" "}
          <span
            style={{
              color: "#F05235",
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
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

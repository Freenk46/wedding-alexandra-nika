import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alexandra × Nika — October 21, 2026 · ERA Hall · Batumi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EAE6DD",
          backgroundImage:
            "linear-gradient(180deg, #EAE6DD 0%, #EAE6DD 55%, #F05235 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
          color: "#111111",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.55)",
            marginBottom: 24,
          }}
        >
          21 · 10 · 2026
        </div>

        <div
          style={{
            fontSize: 140,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 0.95,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          ALEXANDRA
        </div>

        <div
          style={{
            fontSize: 64,
            fontStyle: "italic",
            color: "#F05235",
            margin: "8px 0",
          }}
        >
          ×
        </div>

        <div
          style={{
            fontSize: 140,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 0.95,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          NIKA
        </div>

        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.7)",
            marginTop: 36,
          }}
        >
          ERA HALL · BATUMI
        </div>
      </div>
    ),
    { ...size }
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled client error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "2rem",
        textAlign: "center",
        background: "#f5f0e8",
        color: "#3a2a12",
        fontFamily: "sans-serif",
      }}
    >
      <p style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
        Something went wrong
      </p>
      <p style={{ fontSize: 15, maxWidth: 420, opacity: 0.85 }}>
        Please try again, or reload the page.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: 8,
          background: "#c9a96e",
          color: "#1a1208",
          border: "none",
          padding: "12px 28px",
          fontSize: 13,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}

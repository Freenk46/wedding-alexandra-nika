"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

export default function HeroSection() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const rsvpCardRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0, x: -30,
      });
      gsap.set(subtitleRef.current, { opacity: 0, x: -20 });
      gsap.set(videoColRef.current, { opacity: 0 });
      gsap.set(rsvpCardRef.current, { opacity: 0, x: 20 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(videoColRef.current, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0);
      tl.to(line1Ref.current, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.5);
      tl.to(line2Ref.current, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.7);
      tl.to(line3Ref.current, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" }, 0.9);
      tl.to(subtitleRef.current, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, 1.2);
      tl.to(rsvpCardRef.current, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, 1.3);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ position: "relative", background: "var(--bg-dark)" }}
    >
      {/* ── Three-column wrapper ── */}
      <div className="hero-wrapper">

        {/* ── LEFT PANEL — titles ── */}
        <div className="hero-side" style={{ justifyContent: "center", padding: "clamp(32px, 5vw, 72px) clamp(24px, 4vw, 56px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h1
              ref={line1Ref}
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "clamp(52px, 6vw, 108px)",
                color: "#f5f0e8",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Wedding
            </h1>
            <h2
              ref={line2Ref}
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "clamp(42px, 5vw, 90px)",
                color: "#c9a96e",
                lineHeight: 1.05,
                margin: 0,
                paddingLeft: "clamp(8px, 1vw, 14px)",
              }}
            >
              Invitation
            </h2>
            <h3
              ref={line3Ref}
              style={{
                fontFamily: "var(--font-great-vibes), cursive",
                fontSize: "clamp(28px, 3.2vw, 58px)",
                color: "rgba(245,240,232,0.65)",
                lineHeight: 1.2,
                margin: 0,
                paddingLeft: "clamp(4px, 0.5vw, 8px)",
              }}
            >
              Alexandra × Nika
            </h3>
          </div>

          {/* Subtitle block */}
          <div
            ref={subtitleRef}
            style={{
              marginTop: "clamp(28px, 4vw, 52px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <p style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: "clamp(10px, 1vw, 12px)",
              fontStyle: "italic",
              color: "rgba(245,240,232,0.8)",
              margin: 0,
              fontWeight: 300,
            }}>
              {t("invite")}
            </p>
            <div style={{ width: 28, height: 1, background: "rgba(201,169,110,0.5)" }} />
            <p style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: "clamp(6px, 0.7vw, 7.5px)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.28)",
              margin: 0,
              fontWeight: 300,
            }}>
              {t("venue")}
            </p>
          </div>
        </div>

        {/* ── CENTER PANEL — video ── */}
        <div ref={videoColRef} className="hero-video-container">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/img/1.png"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── RIGHT PANEL — RSVP card at bottom ── */}
        <div className="hero-side" style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <a
            ref={rsvpCardRef}
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Alexandra+%C3%97+Nika+Wedding&dates=20261021T180000/20261021T230000&location=ERA+Hall,+Batumi,+Georgia&details=Alexandra+%C3%97+Nika+Wedding+Ceremony+and+Reception"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#c9a96e",
              padding: "11px 16px",
              color: "#1a1208",
              textDecoration: "none",
              fontSize: "9px",
              letterSpacing: "2px",
              fontWeight: "500",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              transition: "filter 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#1a1208" strokeWidth="1" />
              <line x1="1" y1="5" x2="13" y2="5" stroke="#1a1208" strokeWidth="1" />
              <line x1="4" y1="1" x2="4" y2="3.5" stroke="#1a1208" strokeWidth="1" />
              <line x1="10" y1="1" x2="10" y2="3.5" stroke="#1a1208" strokeWidth="1" />
            </svg>
            {t("addToCalendar")}
          </a>
        </div>

      </div>

      {/* ── Mobile text overlay (hidden on desktop via CSS) ── */}
      <div
        className="hero-mobile-text"
        style={{
          display: "none",
          position: "absolute",
          top: "55%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 24px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <h1 style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(72px, 18vw, 112px)",
          color: "#f5f0e8", lineHeight: 1.1, margin: 0, textAlign: "center",
        }}>
          Wedding
        </h1>
        <h2 style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(56px, 14vw, 90px)",
          color: "#c9a96e", lineHeight: 1.05, margin: 0, textAlign: "center",
        }}>
          Invitation
        </h2>
        <h3 style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(36px, 9vw, 58px)",
          color: "rgba(245,240,232,0.65)", lineHeight: 1.2, margin: 0, textAlign: "center",
        }}>
          Alexandra × Nika
        </h3>
      </div>
    </section>
  );
}

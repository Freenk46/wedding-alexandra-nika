"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  {
    type: "ცერემონია",
    name: "ღვთისმშობლის ტაძარი",
    time: "~15:00",
    maps: "https://maps.app.goo.gl/zpWN6SAa7FiaXdBm9",
    src: "/Journey/eklesia.jpg",
    bg: "#EAE6DD", textColor: "#111", muted: "#888",
  },
  {
    type: "ფოტო სესია I",
    name: "ციხისძირი",
    time: "~17:00",
    maps: "https://maps.app.goo.gl/Cg2xViNGKYmCi6au6",
    src: "/Journey/cixisdziri.jpg",
    bg: "#F05235", textColor: "#fff", muted: "rgba(255,255,255,0.6)",
  },
  {
    type: "ფოტო სესია II",
    name: "პეტრას ციხე",
    time: "~18:30",
    maps: "https://maps.app.goo.gl/JWPuTw5xxHXmffJg9",
    src: "/Journey/petra.jpg",
    bg: "#111", textColor: "#EAE6DD", muted: "rgba(234,230,221,0.5)",
  },
  {
    type: "ვახშამი და გართობა",
    name: "ERA Banquet Hall",
    time: "~20:00",
    maps: "https://www.google.com/maps/place/Era+Banquet+Hall/@41.5816842,41.5785035,18z",
    src: "/Journey/Era.jpg",
    bg: "#EAE6DD", textColor: "#111", muted: "#888",
  },
];

export default function JourneySection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const locRefs      = useRef<HTMLDivElement[]>([]);
  const imgRefs      = useRef<HTMLDivElement[]>([]);
  const textRefs     = useRef<HTMLDivElement[]>([]);
  const overlayRefs  = useRef<HTMLDivElement[]>([]);
  const gradientRefs = useRef<HTMLDivElement[]>([]);
  const typeRefs     = useRef<HTMLParagraphElement[]>([]);
  const nameRefs     = useRef<HTMLHeadingElement[]>([]);
  const timeRefs     = useRef<HTMLParagraphElement[]>([]);
  const btnRefs      = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      LOCATIONS.forEach((_, i) => {
        const loc      = locRefs.current[i];
        const img      = imgRefs.current[i];
        const text     = textRefs.current[i];
        const overlay  = overlayRefs.current[i];
        const gradient = gradientRefs.current[i];

        // Phase 1 — text entrance
        gsap.from(
          [typeRefs.current[i], nameRefs.current[i], timeRefs.current[i], btnRefs.current[i]],
          {
            y: 36, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
            scrollTrigger: {
              trigger: loc,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Phase 2 — scroll-driven 70/30 → 100%
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: loc,
            start: "top top",
            end: "33% top",
            scrub: 1.2,
          },
        });

        tl.to(img,      { width: "100%", duration: 1, ease: "power2.inOut" }, 0);
        tl.to(text,     { width: "0%", opacity: 0, duration: 0.8, ease: "power2.in" }, 0);
        tl.to(gradient, { opacity: 1, duration: 0.5 }, 0.3);
        tl.to(overlay,  { opacity: 1, duration: 0.5 }, 0.5);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="program"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div id="location" style={{ position: "absolute", top: "50%" }} />

      {/* Section header */}
      <div style={{ padding: "80px 32px 48px", background: "#EAE6DD" }}>
        <p style={{
          fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "#F05235", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 16,
        }}>
          21 · 10 · 2026
        </p>
        <h2 style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "clamp(60px, 12vw, 160px)",
          lineHeight: 0.9, color: "#111111", letterSpacing: "-0.01em",
          fontWeight: 400, margin: 0,
        }}>
          THE<br />JOURNEY
        </h2>
      </div>

      {LOCATIONS.map((loc, i) => (
        <div
          key={i}
          ref={(el) => { if (el) locRefs.current[i] = el; }}
          className="journey-loc"
        >
          <div className="journey-panel" style={{ background: loc.bg }}>

            {/* IMAGE — 70% desktop, 100% mobile via CSS */}
            <div
              ref={(el) => { if (el) imgRefs.current[i] = el; }}
              className="journey-img-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={loc.src}
                alt={loc.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* TEXT — 30% desktop, hidden on mobile via CSS */}
            <div
              ref={(el) => { if (el) textRefs.current[i] = el; }}
              className="journey-text-panel"
            >
              <p
                ref={(el) => { if (el) typeRefs.current[i] = el; }}
                className="journey-type-label"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                  color: loc.muted, marginBottom: 12,
                }}
              >
                {loc.type}
              </p>
              <h2
                ref={(el) => { if (el) nameRefs.current[i] = el; }}
                className="journey-name-label"
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 52px)",
                  color: loc.textColor, lineHeight: 1, marginBottom: 16,
                }}
              >
                {loc.name}
              </h2>
              <p
                ref={(el) => { if (el) timeRefs.current[i] = el; }}
                className="journey-time-label"
                style={{
                  fontFamily: "var(--font-caveat), 'Caveat', cursive",
                  fontSize: 26, color: "#F05235", marginBottom: 20,
                }}
              >
                {loc.time}
              </p>
              <a
                ref={(el) => { if (el) btnRefs.current[i] = el; }}
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="journey-map-btn"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  border: "1px solid currentColor",
                  color: loc.textColor,
                  padding: "8px 16px", textDecoration: "none",
                  display: "inline-block", width: "fit-content",
                }}
              >
                VIEW ON MAP →
              </a>
            </div>

            {/* OVERLAY — desktop: fades in on scroll / mobile: always visible via CSS */}
            <div
              ref={(el) => { if (el) overlayRefs.current[i] = el; }}
              className="journey-overlay-panel"
            >
              <p style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)", marginBottom: 8,
              }}>
                {loc.type}
              </p>
              <h2 style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 48, color: "#fff", lineHeight: 1, marginBottom: 10,
              }}>
                {loc.name}
              </h2>
              <p style={{
                fontFamily: "var(--font-caveat), 'Caveat', cursive",
                fontSize: 26, color: "#F05235", marginBottom: 14,
              }}>
                {loc.time}
              </p>
              <a
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#fff", border: "1px solid rgba(255,255,255,0.5)",
                  padding: "8px 16px", textDecoration: "none",
                  display: "inline-block", pointerEvents: "auto",
                }}
              >
                VIEW ON MAP →
              </a>
            </div>

            {/* GRADIENT — desktop: fades in on scroll / mobile: always visible via CSS */}
            <div
              ref={(el) => { if (el) gradientRefs.current[i] = el; }}
              className="journey-gradient-panel"
            />

          </div>
        </div>
      ))}
    </section>
  );
}

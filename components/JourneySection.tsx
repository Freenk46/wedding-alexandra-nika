"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Loc = {
  time: string;
  type: string; typeKa: string;
  name: string; nameKa: string; nameRu?: string;
  maps: string;
  image: string;
};

const LOCATIONS: Loc[] = [
  {
    time: "15:00",
    type: "CEREMONY", typeKa: "ცერემონია",
    name: "Holy Virgin Cathedral", nameKa: "ღვთისმშობლის ტაძარი", nameRu: "Собор Святой Богородицы",
    maps: "https://maps.app.goo.gl/zpWN6SAa7FiaXdBm9",
    image: "/Journey/eklesia.jpg",
  },
  {
    time: "17:00",
    type: "PHOTO SESSION", typeKa: "ფოტო სესია I",
    name: "Tsikhisdziri", nameKa: "ციხისძირი",
    maps: "https://maps.app.goo.gl/Cg2xViNGKYmCi6au6",
    image: "/Journey/cixisdziri.jpg",
  },
  {
    time: "18:30",
    type: "PHOTO SESSION", typeKa: "ფოტო სესია II",
    name: "Petra Fortress", nameKa: "პეტრას ციხე",
    maps: "https://maps.app.goo.gl/JWPuTw5xxHXmffJg9",
    image: "/Journey/petra.jpg",
  },
  {
    time: "20:00",
    type: "DINNER & CELEBRATION", typeKa: "ვახშამი და გართობა",
    name: "ERA Banquet Hall", nameKa: "ERA ბანკეტ ჰოლი",
    maps: "https://www.google.com/maps/place/Era+Banquet+Hall/@41.5816842,41.5785035,18z",
    image: "/Journey/Era.jpg",
  },
];

export default function JourneySection() {
  const locale  = useLocale();
  const [active, setActive] = useState(0);
  const activeRef  = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const locsRef      = useRef<HTMLDivElement[]>([]);
  const imgsRef      = useRef<HTMLImageElement[]>([]);
  const gradientsRef = useRef<HTMLDivElement[]>([]);
  const typesRef     = useRef<HTMLParagraphElement[]>([]);
  const namesRef     = useRef<HTMLHeadingElement[]>([]);
  const timesRef     = useRef<HTMLParagraphElement[]>([]);
  const btnsRef      = useRef<HTMLAnchorElement[]>([]);

  const goToLocation = useCallback((index: number) => {
    locsRef.current.forEach((loc, i) => {
      if (!loc) return;
      gsap.to(loc, {
        opacity: i === index ? 1 : 0,
        scale:   i === index ? 1 : 0.96,
        duration: 0.7,
        ease: "power3.inOut",
      });
    });

    const imgEl  = imgsRef.current[index];
    const gradEl = gradientsRef.current[index];
    const typeEl = typesRef.current[index];
    const nameEl = namesRef.current[index];
    const timeEl = timesRef.current[index];
    const mapEl  = btnsRef.current[index];

    if (imgEl)  gsap.fromTo(imgEl,  { scale: 1.08 },       { scale: 1,  duration: 1.4, ease: "power3.out" });
    if (gradEl) gsap.fromTo(gradEl, { opacity: 0 },        { opacity: 1, duration: 1,   ease: "power2.out" });
    if (typeEl) gsap.fromTo(typeEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3  });
    if (nameEl) gsap.fromTo(nameEl, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.45 });
    if (timeEl) gsap.fromTo(timeEl, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6  });
    if (mapEl)  gsap.fromTo(mapEl,  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.75 });

    setActive(index);
    activeRef.current = index;
  }, []);

  // ScrollTrigger — one per 25% chunk
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialise: loc 0 visible, rest hidden
      locsRef.current.forEach((loc, i) => {
        if (!loc) return;
        gsap.set(loc, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.96 });
      });
      const img0  = imgsRef.current[0];
      const grad0 = gradientsRef.current[0];
      const els0  = [typesRef.current[0], namesRef.current[0], timesRef.current[0], btnsRef.current[0]];
      if (img0)  gsap.set(img0,  { scale: 1 });
      if (grad0) gsap.set(grad0, { opacity: 1 });
      gsap.set(els0.filter(Boolean), { opacity: 1, y: 0 });

      LOCATIONS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${i * 25}% top`,
          end:   `${(i + 1) * 25}% top`,
          onEnter:     () => goToLocation(i),
          onEnterBack: () => goToLocation(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [goToLocation]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToLocation(Math.min(activeRef.current + 1, LOCATIONS.length - 1));
      if (e.key === "ArrowUp")   goToLocation(Math.max(activeRef.current - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToLocation]);

  return (
    <section id="program" style={{ position: "relative" }}>
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
          fontSize: "clamp(72px, 12vw, 160px)",
          lineHeight: 0.9, color: "#111111", letterSpacing: "-0.01em",
          fontWeight: 400, margin: 0,
        }}>
          THE<br />JOURNEY
        </h2>
      </div>

      {/* Snap scroll container */}
      <div ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
        {/* Sticky viewport */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Stacked location slides */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {LOCATIONS.map((loc, i) => {
              const name = locale === "ka" ? loc.nameKa : (locale === "ru" && loc.nameRu ? loc.nameRu : loc.name);
              const type = locale === "ka" ? loc.typeKa : loc.type;

              return (
                <div
                  key={i}
                  ref={(el) => { if (el) locsRef.current[i] = el; }}
                  id={`loc-${i}`}
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    opacity: i === 0 ? 1 : 0,
                  }}
                >
                  {/* Full-bleed image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={(el) => { if (el) imgsRef.current[i] = el; }}
                    src={loc.image}
                    alt={loc.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* Gradient scrim */}
                  <div
                    ref={(el) => { if (el) gradientsRef.current[i] = el; }}
                    style={{
                      position: "absolute",
                      bottom: 0, left: 0, right: 0,
                      height: "45%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />

                  {/* Text overlay */}
                  <div style={{ position: "absolute", bottom: 40, left: 40, zIndex: 2 }}>
                    <p
                      ref={(el) => { if (el) typesRef.current[i] = el; }}
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                        fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "#EAE6DD", marginBottom: 8,
                      }}
                    >
                      {type}
                    </p>
                    <h2
                      ref={(el) => { if (el) namesRef.current[i] = el; }}
                      style={{
                        fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                        fontSize: "clamp(36px, 5vw, 64px)",
                        color: "#ffffff", lineHeight: 1, marginBottom: 12,
                      }}
                    >
                      {name}
                    </h2>
                    <p
                      ref={(el) => { if (el) timesRef.current[i] = el; }}
                      style={{
                        fontFamily: "var(--font-caveat), 'Caveat', cursive",
                        fontSize: 26, color: "#F05235", marginBottom: 16,
                      }}
                    >
                      ~{loc.time}
                    </p>
                    <a
                      ref={(el) => { if (el) btnsRef.current[i] = el; }}
                      href={loc.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                        fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.5)",
                        padding: "8px 16px",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      VIEW ON MAP →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 10,
          }}>
            {LOCATIONS.map((_, i) => (
              <div
                key={i}
                onClick={() => goToLocation(i)}
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: active === i ? "#F05235" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

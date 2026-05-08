"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const THRESHOLD = 90;
let lastX = 0, lastY = 0;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    const dot = dotRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      if (dot) {
        dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      }

      if (Math.hypot(x - lastX, y - lastY) >= THRESHOLD) {
        lastX = x;
        lastY = y;

        const yes = document.createElement('div');
        const size = Math.random() * 44 + 28;
        const tilt = Math.random() * 70 - 35;
        const offX = Math.random() * 56 - 28;
        const fall = Math.random() * 80 + 80;
        const delay = Math.random() * 500 + 600;

        Object.assign(yes.style, {
          position: 'absolute',
          left: `${x + offX}px`,
          top: `${y}px`,
          transform: `translate(-50%,-50%) rotate(${tilt}deg) scale(0)`,
          fontFamily: 'Caveat, cursive',
          fontSize: `${size}px`,
          color: '#F05235',
          pointerEvents: 'none',
          zIndex: '400',
          opacity: '0',
          willChange: 'transform, opacity',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
        });
        yes.textContent = 'YES!';
        el.appendChild(yes);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            yes.style.transform = `translate(-50%,-50%) rotate(${tilt}deg) scale(1)`;
            yes.style.opacity = '1';
          });
        });

        setTimeout(() => {
          yes.style.transition = `transform 0.7s cubic-bezier(0.2,0,0.6,1), opacity 0.7s ease`;
          yes.style.transform = `translate(-50%,${fall}px) rotate(${tilt}deg) scale(0.4)`;
          yes.style.opacity = '0';
          setTimeout(() => yes.remove(), 800);
        }, delay);
      }
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen overflow-hidden cursor-none"
      style={{
        background:
          "linear-gradient(to bottom, #EAE6DD 0%, #EAE6DD 45%, #F05235 100%)",
      }}
    >
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute"
        style={{
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#111111",
          transform: "translate(-100px, -100px)",
          zIndex: 52,
          willChange: "transform",
        }}
      />

      {/* Row 1: ALEXANDRA × NIKA — behind photo */}
      <div
        className="absolute inset-x-0 top-[12%] px-4 text-center"
        style={{ zIndex: 2 }}
      >
        <h1
          className="font-display leading-none tracking-widest uppercase text-black whitespace-nowrap"
          style={{ fontSize: "clamp(2.5rem, 12vw, 16rem)" }}
        >
          ALEXANDRA × NIKA
        </h1>
      </div>

      {/* Couple photo — z-index 3, sharp edges */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 3 }}
      >
        <div
          style={{
            position: "relative",
            width: "clamp(220px, 35vw, 420px)",
            height: "clamp(340px, 58vw, 620px)",
          }}
        >
          <Image
            src="/img/1.png"
            alt="Alexandra and Nika"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
        </div>
      </div>

      {/* Row 2: ARE SAYING + YES! — in front of photo */}
      <div
        className="absolute inset-x-0 flex items-baseline justify-center gap-[0.25em] px-4"
        style={{ bottom: "17%", zIndex: 4 }}
      >
        <span
          className="font-display leading-none tracking-widest uppercase text-black whitespace-nowrap"
          style={{ fontSize: "clamp(2rem, 9.5vw, 13rem)" }}
        >
          ARE SAYING
        </span>
        <span
          className="font-hand font-bold leading-none"
          style={{ fontSize: "clamp(2rem, 8.5vw, 11rem)", color: "#F05235" }}
        >
          YES!
        </span>
      </div>

      {/* Row 3: date · venue */}
      <div
        className="absolute inset-x-0 text-center"
        style={{ bottom: "8%", zIndex: 4 }}
      >
        <p
          className="font-body uppercase text-black/40"
          style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.875rem)", letterSpacing: "0.3em" }}
        >
          21 · 10 · 2026 · ERA HALL · BATUMI
        </p>
      </div>
    </section>
  );
}

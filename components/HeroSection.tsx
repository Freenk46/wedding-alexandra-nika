"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { isTouchDevice } from "@/lib/device";

gsap.registerPlugin(SplitText);

const THRESHOLD = 90;
let lastX = 0, lastY = 0;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => { setIsTouch(isTouchDevice()); }, []);

  // Mouse trail + touch tap → spawn YES!
  useEffect(() => {
    const el  = heroRef.current;
    const dot = dotRef.current;
    if (!el) return;

    const spawnYes = (x: number, y: number) => {
      const yes   = document.createElement("div");
      const size  = Math.random() * 44 + 28;
      const tilt  = Math.random() * 70 - 35;
      const offX  = Math.random() * 56 - 28;
      const fall  = Math.random() * 80 + 80;
      const delay = Math.random() * 500 + 600;

      Object.assign(yes.style, {
        position: "absolute",
        left: `${x + offX}px`,
        top: `${y}px`,
        transform: `translate(-50%,-50%) rotate(${tilt}deg) scale(0)`,
        fontFamily: "Caveat, cursive",
        fontSize: `${size}px`,
        color: "#F05235",
        pointerEvents: "none",
        zIndex: "400",
        opacity: "0",
        willChange: "transform, opacity",
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
      });
      yes.textContent = "YES!";
      el.appendChild(yes);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          yes.style.transform = `translate(-50%,-50%) rotate(${tilt}deg) scale(1)`;
          yes.style.opacity = "1";
        });
      });

      setTimeout(() => {
        yes.style.transition = "transform 0.7s cubic-bezier(0.2,0,0.6,1), opacity 0.7s ease";
        yes.style.transform  = `translate(-50%,${fall}px) rotate(${tilt}deg) scale(0.4)`;
        yes.style.opacity    = "0";
        setTimeout(() => yes.remove(), 800);
      }, delay);
    };

    // Desktop: distance-throttled mousemove trail
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      if (dot) dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`;

      if (Math.hypot(x - lastX, y - lastY) >= THRESHOLD) {
        lastX = x; lastY = y;
        spawnYes(x, y);
      }
    };

    // Mobile: each tap spawns YES!
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const r = el.getBoundingClientRect();
      spawnYes(touch.clientX - r.left, touch.clientY - r.top);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  // Page-load animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split1 = new SplitText(".hero-title-line1", { type: "chars" });
      const split2 = new SplitText(".hero-title-line2", { type: "chars" });
      const split3 = new SplitText(".hero-title-line3", { type: "chars" });

      gsap.set([split1.chars, split2.chars, split3.chars], {
        opacity: 0, y: 80, rotateX: 90,
      });
      gsap.set(".hero-bottom", { opacity: 0, y: -20 });

      gsap.fromTo(".hero-photo",
        { scale: 1.08 },
        { scale: 1, duration: 2, ease: "power2.out", delay: 0.1 }
      );

      const tl = gsap.timeline({ delay: 0.4 });

      tl.to(split1.chars, {
        opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: "power3.out",
        stagger: { amount: 0.6, from: "start" },
      }, 0.2);

      tl.to(split2.chars, {
        opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: "power3.out",
        stagger: { amount: 0.5, from: "start" },
      }, 0.6);

      tl.to(split3.chars, {
        opacity: 1, y: 0, rotateX: 0, duration: 0.4, ease: "power2.out",
        stagger: { amount: 0.4, from: "start" },
      }, 1.0);

      tl.to(".hero-bottom", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.3);

      return () => { split1.revert(); split2.revert(); split3.revert(); };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #EAE6DD 0%, #EAE6DD 45%, #F05235 100%)",
        perspective: "1000px",
        cursor: "none",
      }}
    >
      {/* Cursor dot — CSS hides on mobile */}
      <div
        ref={dotRef}
        className="hero-cursor-dot pointer-events-none absolute"
        style={{
          top: 0, left: 0, width: 10, height: 10,
          borderRadius: "50%", backgroundColor: "#111111",
          transform: "translate(-100px, -100px)",
          zIndex: 52, willChange: "transform",
        }}
      />

      {/* Row 1: ALEXANDRA × NIKA */}
      <div
        className="hero-title-line1 absolute inset-x-0 top-[12%] px-4 text-center"
        style={{ zIndex: 2, transformStyle: "preserve-3d", overflow: "hidden" }}
      >
        <h1
          suppressHydrationWarning
          className="font-display leading-none tracking-widest uppercase text-black whitespace-nowrap"
          style={{ fontSize: "clamp(1.4rem, 7vw, 16rem)" }}
        >
          ALEXANDRA × NIKA
        </h1>
      </div>

      {/* Couple photo */}
      <div
        className="hero-photo absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 3 }}
      >
        <div style={{
          position: "relative",
          width: isTouch ? "70vw" : "clamp(180px, 35vw, 420px)",
          height: isTouch ? "auto" : "clamp(280px, 58vw, 620px)",
          aspectRatio: isTouch ? "4/5" : undefined,
        }}>
          <Image
            src="/img/1.png"
            alt="Alexandra and Nika"
            fill
            sizes="(max-width: 768px) 70vw, 35vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
        </div>
      </div>

      {/* Row 2: ARE SAYING YES! */}
      <div
        className="hero-title-line2 absolute inset-x-0 flex items-baseline justify-center gap-[0.25em] px-4"
        style={{ bottom: "17%", zIndex: 4, transformStyle: "preserve-3d", overflow: "hidden" }}
      >
        <span
          suppressHydrationWarning
          className="font-display leading-none tracking-widest uppercase text-black whitespace-nowrap"
          style={{ fontSize: "clamp(1.2rem, 6.5vw, 13rem)" }}
        >
          ARE SAYING
        </span>
        <span
          suppressHydrationWarning
          className="font-hand font-bold leading-none"
          style={{ fontSize: "clamp(1.2rem, 6vw, 11rem)", color: "#F05235" }}
        >
          YES!
        </span>
      </div>

      {/* Row 3: date · venue */}
      <div
        className="hero-title-line3 absolute inset-x-0 text-center"
        style={{ bottom: "8%", zIndex: 4, transformStyle: "preserve-3d", overflow: "hidden" }}
      >
        <p
          className="font-body uppercase text-black/40"
          style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.875rem)", letterSpacing: "0.25em" }}
        >
          21 · 10 · 2026 · ERA HALL · BATUMI
        </p>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom absolute inset-x-0 flex justify-center" style={{ bottom: "2%", zIndex: 4 }}>
        <p className="font-body uppercase" style={{
          fontSize: "clamp(0.5rem, 1vw, 0.7rem)",
          letterSpacing: "0.35em", color: "rgba(17,17,17,0.3)",
        }}>
          scroll ↓
        </p>
      </div>
    </section>
  );
}

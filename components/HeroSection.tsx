"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

export default function HeroSection() {
  const t = useTranslations("hero");
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 26,
        scale: 0.97,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="invite-hero">
      <div className="invite-hero-bg" />
      <div className="invite-frame" />

      <div className="invite-content" ref={contentRef}>
        <p className="invite-eyebrow">
          {t("eyebrowLine1")}
          <br />
          {t("eyebrowLine2")}
        </p>
        <h1 className="invite-names">
          Alexandra
          <span>&amp;</span>
          Nika
        </h1>
        <p className="invite-body">{t("bodyInvite")}</p>
        <div className="invite-scroll">
          <span>{t("scroll")}</span>
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
            <path
              d="M6 1v14M1 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

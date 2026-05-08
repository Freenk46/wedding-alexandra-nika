"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramSection() {
  const t = useTranslations("program");
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const items = t.raw("items") as { time: string; label: string }[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = itemsRef.current?.querySelectorAll(".program-row");
      if (rows) {
        gsap.from(rows, {
          scrollTrigger: { trigger: itemsRef.current, start: "top 75%" },
          x: -40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="program"
      ref={sectionRef}
      className="bg-cream section-padding py-24"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-none mb-16">
          {t("title")}
        </h2>

        <div ref={itemsRef} className="space-y-0 divide-y divide-black/10">
          {items.map((item, i) => (
            <div
              key={i}
              className="program-row flex items-center gap-8 py-8 group"
            >
              <span className="font-display text-4xl md:text-5xl text-accent w-28 shrink-0">
                {item.time}
              </span>
              <div className="w-px h-8 bg-black/20 shrink-0" />
              <span className="font-body text-lg md:text-xl tracking-wide group-hover:text-accent transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

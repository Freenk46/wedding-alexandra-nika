"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.847!2d41.6386!3d41.6402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUmVzdGF1cmFudCBFUkE!5e0!3m2!1sen!2sge!4v1700000000000";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Restaurant+ERA+Afsarosis+41+Batumi+Georgia";

export default function LocationSection() {
  const t = useTranslations("location");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="bg-black text-cream section-padding py-24"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-none mb-16">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div ref={contentRef} className="space-y-8">
            <div>
              <p className="font-hand text-accent text-3xl mb-2">{t("venue")}</p>
              <p className="font-body text-cream/70 text-lg">{t("address")}</p>
            </div>

            <div className="space-y-3 font-body text-cream/60">
              <div className="flex items-center gap-3">
                <span className="text-accent">✦</span>
                <span>October 21, 2026 at 18:00</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent">✦</span>
                <span>Batumi, Georgia</span>
              </div>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-cream/30 text-cream font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-accent hover:border-accent hover:text-cream transition-all duration-300"
            >
              {t("directions")}
              <span>→</span>
            </a>
          </div>

          <div className="aspect-video md:aspect-square bg-white/5 rounded-sm overflow-hidden">
            <iframe
              src={MAPS_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant ERA location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

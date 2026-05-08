"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fireConfetti } from "@/lib/confetti";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

export default function RsvpSection() {
  const t = useTranslations("rsvp");
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<FormState>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Confetti when section enters viewport (fires once)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fireConfetti();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!GOOGLE_SCRIPT_URL) return;

    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      form.reset();
      setAttending(null);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border border-white/20 text-cream placeholder-cream/30 font-body px-4 py-3 focus:outline-none focus:border-accent transition-colors";

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="bg-cream section-padding py-24"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-none mb-4 text-black">
          {t("title")}
        </h2>
        <p className="font-body text-black/60 mb-12">{t("subtitle")}</p>

        {status === "success" ? (
          <div className="bg-black text-cream p-12 text-center">
            <span className="font-hand text-accent text-4xl block mb-4">✓</span>
            <p className="font-body text-lg">{t("success")}</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-black text-cream p-8 md:p-12 space-y-6"
          >
            <input
              name="name"
              required
              placeholder={t("name")}
              className={inputClass}
            />

            <input
              name="guests"
              type="number"
              min="1"
              max="10"
              defaultValue={1}
              placeholder={t("guests")}
              className={inputClass}
            />

            <div className="space-y-3">
              <p className="font-body text-sm tracking-widest uppercase text-cream/60">
                {t("attending")}
              </p>
              <div className="flex gap-4">
                {(["yes", "no"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAttending(val)}
                    className={`flex-1 py-3 font-body text-sm tracking-wider uppercase border transition-all duration-200 ${
                      attending === val
                        ? "bg-accent border-accent text-cream"
                        : "border-white/20 text-cream/60 hover:border-cream/50"
                    }`}
                  >
                    {t(val)}
                  </button>
                ))}
                <input type="hidden" name="attending" value={attending ?? ""} />
              </div>
            </div>

            <input
              name="dietary"
              placeholder={t("dietary")}
              className={inputClass}
            />

            <textarea
              name="message"
              rows={3}
              placeholder={t("message")}
              className={inputClass + " resize-none"}
            />

            {status === "error" && (
              <p className="font-body text-accent text-sm">{t("error")}</p>
            )}

            <button
              type="submit"
              disabled={!attending || status === "submitting"}
              className="w-full bg-accent text-cream font-body text-sm tracking-widest uppercase py-4 hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "..." : t("submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

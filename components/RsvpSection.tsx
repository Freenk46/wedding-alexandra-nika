"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fireConfetti } from "@/lib/confetti";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

const BASE_FIELD: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--border-color)",
  padding: "12px 0",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontSize: 15,
  color: "var(--text-primary)",
  outline: "none",
};

export default function RsvpSection() {
  const t = useTranslations("rsvp");
  const tHero = useTranslations("hero");
  const tLoc = useTranslations("location");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<FormState>("idle");
  const [submitHover, setSubmitHover] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(fieldRefs.current.filter(Boolean), {
        x: 40, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      fieldRefs.current.forEach((field) => {
        if (!field) return;
        field.addEventListener("focus", () =>
          gsap.to(field, { borderBottomColor: "var(--accent)", duration: 0.3 })
        );
        field.addEventListener("blur", () =>
          gsap.to(field, { borderBottomColor: "var(--border-color)", duration: 0.3 })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { fireConfetti(); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!GOOGLE_SCRIPT_URL) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
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

  const addFieldRef = (el: HTMLInputElement | HTMLTextAreaElement | null, i: number) => {
    if (el) fieldRefs.current[i] = el;
  };

  return (
    <section id="rsvp" ref={sectionRef} className="rsvp-section">

      {/* ── LEFT — title side ──────────────────────────── */}
      <div className="rsvp-left">
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, var(--border-color) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* Ghost RSVP — hidden on mobile via .rsvp-deco */}
        <div className="rsvp-deco" style={{
          position: "absolute", bottom: -20, left: -10,
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(140px, 22vw, 300px)",
          lineHeight: 0.85,
          color: "var(--border-subtle)",
          userSelect: "none", pointerEvents: "none",
        }}>
        </div>

        {/* Rotated watermark — hidden on mobile */}
        <span className="rsvp-deco" style={{
          position: "absolute", top: "40%", right: 24,
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: 24, color: "var(--border-color)",
          transform: "rotate(90deg)", letterSpacing: "0.1em",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          ALEXANDRA × NIKA × 2026
        </span>

        {/* Top label — hidden on mobile */}
        <p className="rsvp-deco" style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "var(--accent)", position: "relative",
        }}>
          21 · 10 · 2026
        </p>

        {/* Main title */}
        <div style={{ position: "relative" }}>
          <h2 ref={titleRef} className="rsvp-h2" style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(64px, 8vw, 110px)",
            lineHeight: 0.9, color: "var(--text-primary)",
            letterSpacing: "-0.01em", marginBottom: 24,
            whiteSpace: "pre-line", textShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}>
            {t("headline")}
          </h2>
          <p style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: 32, color: "var(--accent)", textShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            {t("tagline")}
          </p>
        </div>

        {/* Venue info — hidden on mobile */}
        <div className="rsvp-deco" style={{ position: "relative" }}>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
          }}>
            {tLoc("venue")}<br />
            {tLoc("address")}
          </p>
        </div>
      </div>

      {/* ── RIGHT — form side ──────────────────────────── */}
      <div className="rsvp-right">
        {status === "success" ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            height: "100%", gap: 24,
          }}>
            <span style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 90, color: "var(--accent)", textShadow: "0 0 16px var(--accent-glow)",
            }}>
              YES!
            </span>
            <p style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: 32, color: "var(--text-primary)", letterSpacing: "0.05em",
              textAlign: "center",
            }}>
              {t("tagline").replace(/[♡]/g, "").trim()}
            </p>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 14, color: "var(--text-secondary)", textAlign: "center",
            }}>
              {tLoc("venue")} · {tHero("date")}
            </p>
            <a
              href="/alexandra-nika-2026.ics"
              download="alexandra-nika-2026.ics"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 8,
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--accent)", textDecoration: "none",
                border: "1px solid var(--border-color)",
                padding: "12px 20px",
                minHeight: 44,
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--text-inverted)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
            >
              ♡ {tHero("addToCalendar")}
            </a>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            <input
              ref={(el) => addFieldRef(el, 0)}
              name="name" required
              aria-label={t("name")}
              placeholder={t("name")}
              style={BASE_FIELD}
            />

            <input
              ref={(el) => addFieldRef(el, 1)}
              name="guests" type="number" min="1" max="10" defaultValue={1}
              aria-label={t("guests")}
              placeholder={t("guests")}
              style={BASE_FIELD}
            />

            <div>
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "var(--text-secondary)", marginBottom: 12,
              }}>
                {t("attending")}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {(["yes", "no"] as const).map((val) => {
                  const sel = attending === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAttending(val)}
                      aria-pressed={sel}
                      style={{
                        flex: 1,
                        padding: "18px 12px",
                        minHeight: 64,
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        lineHeight: 1.4,
                        background: sel ? (val === "yes" ? "var(--accent)" : "transparent") : "transparent",
                        border: sel ? (val === "yes" ? "1px solid var(--accent)" : "1px solid var(--text-secondary)") : "1px solid var(--border-color)",
                        color: sel ? (val === "yes" ? "var(--text-inverted)" : "var(--text-primary)") : "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {val === "yes" ? t("yes") : t("no")}
                    </button>
                  );
                })}
                <input type="hidden" name="attending" value={attending ?? ""} />
              </div>
            </div>

            <input
              ref={(el) => addFieldRef(el, 2)}
              name="dietary"
              aria-label={t("dietary")}
              placeholder={t("dietary")}
              style={BASE_FIELD}
            />

            <textarea
              ref={(el) => addFieldRef(el, 3)}
              name="message" rows={3}
              aria-label={t("message")}
              placeholder={t("message")}
              style={{ ...BASE_FIELD, resize: "none" }}
            />

            {status === "error" && (
              <p style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 13, color: "#F05235",
              }}>
                {t("error")}
              </p>
            )}

            <button
              type="submit"
              disabled={!attending || status === "submitting"}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                width: "100%",
                background: submitHover && attending ? "var(--accent)" : "transparent",
                color: submitHover && attending ? "var(--text-inverted)" : "var(--accent)",
                border: "1px solid var(--border-color)",
                padding: "18px",
                minHeight: 56,
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                cursor: !attending || status === "submitting" ? "not-allowed" : "pointer",
                opacity: !attending || status === "submitting" ? 0.4 : 1,
                transition: "background 0.3s, color 0.3s",
                marginTop: 8,
              }}
            >
              {status === "submitting" ? "..." : t("submit")}
            </button>

          </form>
        )}
      </div>
    </section>
  );
}

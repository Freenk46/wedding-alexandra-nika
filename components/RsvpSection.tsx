"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fireConfetti } from "@/lib/confetti";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

const labelStyle: React.CSSProperties = {
  position: "absolute",
  top: -8,
  left: 0,
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#B8960C",
  fontFamily: "DM Sans, sans-serif",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(17,17,17,0.25)",
  padding: "16px 0 8px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 14,
  color: "var(--text-primary)",
  outline: "none",
};

export default function RsvpSection() {
  const t = useTranslations("rsvp");
  const tHero = useTranslations("hero");
  const tLoc = useTranslations("location");
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<FormState>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      };

      gsap.from(leftRef.current, {
        x: -50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.from(rightRef.current, {
        x: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2,
        scrollTrigger: trigger,
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
    if (!GOOGLE_SCRIPT_URL) { setStatus("error"); return; }
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = { ...Object.fromEntries(data.entries()), guests };
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      form.reset();
      setAttending(null);
      setGuests(1);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="rsvp"
        ref={sectionRef}
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* ── LEFT — image with black strip ────────────── */}
        <div ref={leftRef} style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/Journey/petra.jpg"
            alt="ERA Hall, Batumi"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="60vw"
          />

          {/* Black vertical strip */}
          <div style={{
            position: "absolute",
            left: "35%",
            top: 0,
            bottom: 0,
            width: "28%",
            background: "rgba(10,10,10,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}>
            {/* Gold line */}
            <div style={{
              position: "absolute",
              top: "10%",
              bottom: "10%",
              left: "50%",
              width: 1,
              background: "linear-gradient(to bottom, transparent, #B8960C, transparent)",
            }} />
            {/* Vertical text */}
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#B8960C",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              zIndex: 1,
              margin: 0,
            }}>
              ALEXANDRA × NIKA · 21.10.2026 · ERA HALL · BATUMI
            </p>
          </div>
        </div>

        {/* ── RIGHT — form ─────────────────────────────── */}
        <div
          ref={rightRef}
          style={{
            background: "var(--bg-secondary)",
            padding: "60px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "1px solid rgba(184,150,12,0.2)",
          }}
        >
          {status === "success" ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: "100%", gap: 20, textAlign: "center",
            }}>
              <span style={{
                fontFamily: "Caveat, cursive",
                fontSize: 90, color: "#B8960C",
              }}>
                YES!
              </span>
              <p style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 18, color: "#111", letterSpacing: "0.05em",
              }}>
                {t("tagline").replace(/[♡]/g, "").trim()}
              </p>
              <p style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 13, color: "rgba(17,17,17,0.5)",
              }}>
                {tLoc("venue")} · {tHero("date")}
              </p>
              <a
                href="/alexandra-nika-2026.ics"
                download="alexandra-nika-2026.ics"
                style={{
                  marginTop: 8,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#B8960C", textDecoration: "none",
                  border: "1px solid rgba(184,150,12,0.4)",
                  padding: "12px 20px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#B8960C"; e.currentTarget.style.color = "#F5F1E8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B8960C"; }}
              >
                ♡ {tHero("addToCalendar")}
              </a>
            </div>
          ) : (
            <>
              <h2 style={{
                fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(48px, 5vw, 72px)",
                color: "var(--text-primary)",
                letterSpacing: "0.05em",
                marginBottom: 40,
                textAlign: "center",
              }}>
                {t("title")}
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                {/* Name field */}
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <label style={labelStyle}>{t("name")}</label>
                  <input name="name" required style={fieldStyle} />
                </div>

                {/* Guests bubbles */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#B8960C", fontFamily: "DM Sans, sans-serif",
                    display: "block", marginBottom: 12, fontWeight: 300,
                  }}>
                    {t("guests")}
                  </label>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        style={{
                          width: "40px", height: "40px", borderRadius: "50%",
                          border: guests === num ? "1.5px solid var(--gold)" : "1px solid rgba(201,169,110,0.25)",
                          background: guests === num ? "var(--gold)" : "transparent",
                          color: guests === num ? "#1a1208" : "var(--gold)",
                          fontSize: "12px",
                          fontWeight: guests === num ? 500 : 300,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontFamily: "DM Sans, sans-serif",
                          letterSpacing: "0.5px",
                          minHeight: "unset", minWidth: "unset",
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attending */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{
                    fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#B8960C", fontFamily: "DM Sans, sans-serif",
                    display: "block", marginBottom: 12,
                  }}>
                    {t("attend")}
                  </label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      style={{
                        flex: 1, padding: "12px",
                        fontFamily: "DM Sans, sans-serif", fontSize: 11,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        border: "1px solid",
                        borderColor: attending === "yes" ? "#B8960C" : "rgba(17,17,17,0.2)",
                        background: attending === "yes" ? "#B8960C" : "transparent",
                        color: attending === "yes" ? "#fff" : "rgba(17,17,17,0.5)",
                        cursor: "pointer", transition: "all 0.3s",
                      }}
                    >
                      {t("accept")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      style={{
                        flex: 1, padding: "12px",
                        fontFamily: "DM Sans, sans-serif", fontSize: 11,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        border: "1px solid",
                        borderColor: attending === "no" ? "#B8960C" : "rgba(17,17,17,0.2)",
                        background: attending === "no" ? "#B8960C" : "transparent",
                        color: attending === "no" ? "#fff" : "rgba(17,17,17,0.5)",
                        cursor: "pointer", transition: "all 0.3s",
                        position: "relative", zIndex: 10,
                      }}
                    >
                      {t("decline")}
                    </button>
                    <input type="hidden" name="attending" value={attending ?? ""} />
                  </div>
                </div>

                {/* Message */}
                <div style={{ position: "relative", marginBottom: 32 }}>
                  <label style={{
                    fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#B8960C", fontFamily: "DM Sans, sans-serif",
                    display: "block", marginBottom: 8,
                  }}>
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    style={{ ...fieldStyle, resize: "none" }}
                  />
                </div>

                {/* Confetti hint */}
                <p style={{
                  fontFamily: "Caveat, cursive", fontSize: 16,
                  color: "rgba(17,17,17,0.4)", textAlign: "center", marginBottom: 20,
                }}>
                  {t("deadline")}
                </p>

                {status === "error" && (
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#F05235", marginBottom: 12 }}>
                    {t("error")}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!attending || status === "submitting"}
                  style={{
                    width: "100%", background: "#c9a96e", color: "#1a1208",
                    border: "none", padding: "18px",
                    fontFamily: "DM Sans, sans-serif", fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "3px", textTransform: "uppercase",
                    cursor: !attending || status === "submitting" ? "not-allowed" : "pointer",
                    opacity: !attending || status === "submitting" ? 0.45 : 1,
                    transition: "background 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => { if (attending) { e.currentTarget.style.background = "#1a1208"; e.currentTarget.style.color = "#c9a96e"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#c9a96e"; e.currentTarget.style.color = "#1a1208"; }}
                >
                  {status === "submitting" ? "..." : t("submit")}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

  );
}

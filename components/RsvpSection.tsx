"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fireConfetti } from "@/lib/confetti";
import CornerFlower from "./CornerFlower";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "submitting" | "success" | "error";

const labelStyle: React.CSSProperties = {
  position: "absolute",
  top: -8,
  left: 0,
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#8a6a2f",
  fontWeight: 600,
  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#8a6a2f",
  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
  display: "block",
  marginBottom: 12,
  fontWeight: 600,
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1.5px solid rgba(58,42,18,0.55)",
  padding: "16px 0 8px",
  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  color: "#1a1208",
  outline: "none",
};

export default function RsvpSection() {
  const t = useTranslations("rsvp");
  const tHero = useTranslations("hero");
  const tLoc = useTranslations("location");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<FormState>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
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
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = { ...Object.fromEntries(data.entries()), guests };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !result.success) throw new Error("submit_failed");
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
      className="paper-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
      }}
    >
      <CornerFlower src="/img/8.png" corner="tr" />
      <CornerFlower src="/img/3.png" corner="bl" />

      <div ref={cardRef} style={{ width: "100%", maxWidth: 440 }}>
        {status === "success" ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 20, textAlign: "center",
          }}>
            <span style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 90, color: "var(--gold)",
            }}>
              YES!
            </span>
            <p style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 18, color: "#1a1208", fontWeight: 500, letterSpacing: "0.05em",
            }}>
              {t("tagline").replace(/[♡]/g, "").trim()}
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 13, color: "#3a2a12", opacity: 0.8,
            }}>
              {tLoc("venue")} · {tHero("date")}
            </p>
            <a
              href="/alexandra-nika-2026.ics"
              download="alexandra-nika-2026.ics"
              style={{
                marginTop: 8,
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold)", textDecoration: "none",
                border: "1px solid var(--border-color)",
                padding: "12px 20px",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#1a1208"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
            >
              ♡ {tHero("addToCalendar")}
            </a>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: "var(--font-dm-serif), DM Serif Display, serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              color: "#1a1208",
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
                <label style={fieldLabelStyle}>{t("guests")}</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        border: guests === num ? "1.5px solid var(--gold)" : "1.5px solid rgba(58,42,18,0.5)",
                        background: guests === num ? "var(--gold)" : "transparent",
                        color: guests === num ? "#1a1208" : "#3a2a12",
                        fontSize: "12px",
                        fontWeight: guests === num ? 700 : 500,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
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
                <label style={fieldLabelStyle}>{t("attend")}</label>
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    style={{
                      flex: 1, padding: "12px",
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      border: "1.5px solid",
                      borderColor: attending === "yes" ? "var(--gold)" : "rgba(58,42,18,0.5)",
                      background: attending === "yes" ? "var(--gold)" : "transparent",
                      color: attending === "yes" ? "#1a1208" : "#3a2a12",
                      opacity: 1,
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
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      border: "1.5px solid",
                      borderColor: attending === "no" ? "var(--gold)" : "rgba(58,42,18,0.5)",
                      background: attending === "no" ? "var(--gold)" : "transparent",
                      color: attending === "no" ? "#1a1208" : "#3a2a12",
                      opacity: 1,
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
                <label style={fieldLabelStyle}>{t("message")}</label>
                <textarea
                  name="message"
                  rows={3}
                  style={{ ...fieldStyle, resize: "none" }}
                />
              </div>

              <p style={{
                fontFamily: "var(--font-dm-serif), DM Serif Display, serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "#3a2a12", opacity: 0.85, textAlign: "center", marginBottom: 20,
              }}>
                {t("deadline")}
              </p>

              {status === "error" && (
                <p style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontSize: 13, color: "#c0554a", marginBottom: 12, textAlign: "center" }}>
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
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontSize: 11,
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

"use client";

import { useEffect, useRef, useState } from "react";
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
  borderBottom: "1px solid rgba(17,17,17,0.3)",
  padding: "12px 0",
  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
  fontSize: 15,
  color: "#111",
  outline: "none",
};

export default function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const fieldRefs  = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);
  const [attending, setAttending]     = useState<"yes" | "no" | null>(null);
  const [status, setStatus]           = useState<FormState>("idle");
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
          gsap.to(field, { borderBottomColor: "#F05235", duration: 0.3 })
        );
        field.addEventListener("blur", () =>
          gsap.to(field, { borderBottomColor: "rgba(17,17,17,0.3)", duration: 0.3 })
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
    if (!GOOGLE_SCRIPT_URL) return;
    setStatus("submitting");
    const data    = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      e.currentTarget.reset();
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
          backgroundImage: "radial-gradient(circle, rgba(234,230,221,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* Ghost RSVP — hidden on mobile via .rsvp-deco */}
        <div className="rsvp-deco" style={{
          position: "absolute", bottom: -20, left: -10,
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "clamp(140px, 22vw, 300px)",
          lineHeight: 0.85,
          color: "rgba(255,255,255,0.04)",
          userSelect: "none", pointerEvents: "none",
        }}>
          RSVP
        </div>

        {/* Rotated watermark — hidden on mobile */}
        <span className="rsvp-deco" style={{
          position: "absolute", top: "40%", right: 24,
          fontFamily: "var(--font-caveat), 'Caveat', cursive",
          fontSize: 18, color: "rgba(234,230,221,0.15)",
          transform: "rotate(90deg)", letterSpacing: "0.1em",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          ALEXANDRA × NIKA × 2026
        </span>

        {/* Top label — hidden on mobile */}
        <p className="rsvp-deco" style={{
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "#F05235", position: "relative",
        }}>
          21 · 10 · 2026
        </p>

        {/* Main title */}
        <div style={{ position: "relative" }}>
          <h2 ref={titleRef} className="rsvp-h2" style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(64px, 8vw, 110px)",
            lineHeight: 0.9, color: "#EAE6DD",
            letterSpacing: "-0.01em", marginBottom: 24,
          }}>
            დაადასტურე<br />დასწრება
          </h2>
          <p style={{
            fontFamily: "var(--font-caveat), 'Caveat', cursive",
            fontSize: 22, color: "#F05235",
          }}>
            გელოდებით! ♡
          </p>
        </div>

        {/* Venue info — hidden on mobile */}
        <div className="rsvp-deco" style={{ position: "relative" }}>
          <p style={{
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontSize: 13, color: "rgba(234,230,221,0.5)", lineHeight: 1.7,
          }}>
            ERA Hall · ბათუმი<br />
            აფსაროსის 41
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
              fontFamily: "var(--font-caveat), 'Caveat', cursive",
              fontSize: 80, color: "#F05235",
            }}>
              YES!
            </span>
            <p style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 32, color: "#111", letterSpacing: "0.05em",
            }}>
              გელოდებით!
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 14, color: "rgba(17,17,17,0.6)", textAlign: "center",
            }}>
              ERA Hall · 21 ოქტომბერი 2026
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            <input
              ref={(el) => addFieldRef(el, 0)}
              name="name" required
              placeholder="სახელი და გვარი"
              style={BASE_FIELD}
            />

            <input
              ref={(el) => addFieldRef(el, 1)}
              name="guests" type="number" min="1" max="10" defaultValue={1}
              placeholder="სტუმართა რაოდენობა"
              style={BASE_FIELD}
            />

            <div>
              <p style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(17,17,17,0.5)", marginBottom: 12,
              }}>
                დავესწრები?
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {(["yes", "no"] as const).map((val) => {
                  const sel = attending === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAttending(val)}
                      style={{
                        flex: 1, padding: "14px", minHeight: 56,
                        fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                        fontSize: 28,
                        background: sel ? (val === "yes" ? "#111" : "#F05235") : "transparent",
                        border:     sel ? (val === "yes" ? "1px solid #111" : "1px solid #F05235") : "1px solid rgba(17,17,17,0.3)",
                        color:      sel ? (val === "yes" ? "#EAE6DD" : "#fff") : "rgba(17,17,17,0.5)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {val === "yes" ? "დიახ" : "ვერა"}
                    </button>
                  );
                })}
                <input type="hidden" name="attending" value={attending ?? ""} />
              </div>
            </div>

            <input
              ref={(el) => addFieldRef(el, 2)}
              name="dietary"
              placeholder="დიეტური მოთხოვნები"
              style={BASE_FIELD}
            />

            <textarea
              ref={(el) => addFieldRef(el, 3)}
              name="message" rows={3}
              placeholder="შეტყობინება წყვილს"
              style={{ ...BASE_FIELD, resize: "none" }}
            />

            {status === "error" && (
              <p style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 13, color: "#F05235",
              }}>
                შეცდომა. სცადე თავიდან.
              </p>
            )}

            <button
              type="submit"
              disabled={!attending || status === "submitting"}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                width: "100%",
                background: submitHover ? "#F05235" : "#111",
                color: "#EAE6DD",
                border: "none",
                padding: "18px",
                minHeight: 56,
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                cursor: !attending || status === "submitting" ? "not-allowed" : "pointer",
                opacity: !attending || status === "submitting" ? 0.4 : 1,
                transition: "background 0.3s",
                marginTop: 8,
              }}
            >
              {status === "submitting" ? "..." : "გამოგზავნა"}
            </button>

          </form>
        )}
      </div>
    </section>
  );
}

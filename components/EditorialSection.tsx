'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dmSerifItalic: React.CSSProperties = {
  fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
  fontStyle: 'italic',
};

export default function EditorialSection() {
  const tS = useTranslations("schedule");
  const tV = useTranslations("venue");
  const scheduleRef = useRef<HTMLElement>(null);
  const venueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.schedule-left > div', {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: scheduleRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.schedule-right > p', {
        x: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: scheduleRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      gsap.from('.venue-title', {
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: venueRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.venue-info', {
        y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: venueRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── 5A — SCHEDULE ─────────────────────────────── */}
      <section
        id="where-when"
        ref={scheduleRef}
        style={{
          background: 'var(--bg-secondary)',
          padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 3.5vw, 4rem) clamp(5rem, 8vw, 7rem)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'clamp(380px, 55vw, 600px)',
        }}
      >
        {/* Main grid: labels left, values right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'clamp(20px, 4vw, 60px)',
        }}>

          {/* LEFT labels */}
          <div className="schedule-left" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <div>
              <p style={{ ...dmSerifItalic, fontSize: 22, color: 'var(--text-primary)', opacity: 0.85, margin: '0 0 3px' }}>{tS("day")}</p>
              <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.25, margin: 0, fontWeight: 300 }}>{tS("day_sub")}</p>
            </div>
            <div>
              <p style={{ ...dmSerifItalic, fontSize: 22, color: 'var(--text-primary)', opacity: 0.85, margin: '0 0 3px' }}>{tS("ceremony")}</p>
              <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.25, margin: 0, fontWeight: 300 }}>{tS("ceremony_sub")}</p>
            </div>
            <div>
              <p style={{ ...dmSerifItalic, fontSize: 22, color: 'var(--text-primary)', opacity: 0.85, margin: '0 0 3px' }}>{tS("reception")}</p>
              <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.25, margin: 0, fontWeight: 300 }}>{tS("reception_sub")}</p>
            </div>
          </div>

          {/* RIGHT values */}
          <div className="schedule-right" style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ ...dmSerifItalic, fontSize: 'clamp(28px, 5.5vw, 58px)', color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.1 }}>2026.10.21 Wed</p>
            <p style={{ ...dmSerifItalic, fontSize: 'clamp(24px, 4.5vw, 52px)', color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.1 }}>18:00</p>
            <p style={{ ...dmSerifItalic, fontSize: 'clamp(24px, 4.5vw, 52px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>19:30</p>
          </div>
        </div>

        {/* Add to Calendar */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Alexandra+%C3%97+Nika+Wedding&dates=20261021T180000/20261021T230000&location=ERA+Hall,+Batumi,+Georgia&details=Alexandra+%C3%97+Nika+Wedding+Ceremony+and+Reception"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#c9a96e',
              padding: '13px 24px',
              color: '#1a1208',
              textDecoration: 'none',
              fontSize: '10px',
              letterSpacing: '2px',
              fontWeight: '500',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              width: '100%',
              maxWidth: 280,
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#1a1208" strokeWidth="1" />
              <line x1="1" y1="5" x2="13" y2="5" stroke="#1a1208" strokeWidth="1" />
              <line x1="4" y1="1" x2="4" y2="3.5" stroke="#1a1208" strokeWidth="1" />
              <line x1="10" y1="1" x2="10" y2="3.5" stroke="#1a1208" strokeWidth="1" />
            </svg>
            {tS("calendar")}
          </a>
        </div>

      </section>

      {/* ── 5B — VENUE ────────────────────────────────── */}
      <section
        ref={venueRef}
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(2.5rem, 3.5vw, 4rem) clamp(1.5rem, 3.5vw, 4rem) clamp(3rem, 5vw, 5rem)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'clamp(320px, 45vw, 500px)',
        }}
      >
        {/* Top-right label */}
        <div style={{ position: 'absolute', top: 'clamp(2rem, 3.5vw, 4rem)', right: 'clamp(1.5rem, 3.5vw, 4rem)', textAlign: 'right' }}>
          <p style={{ ...dmSerifItalic, fontSize: 18, color: '#f5f0e8', opacity: 0.45, margin: '0 0 2px' }}>{tV("label")}</p>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.18, color: '#f5f0e8', margin: 0, fontWeight: 300 }}>{tV("label_sub")}</p>
        </div>

        {/* Main venue name */}
        <h2
          className="venue-title"
          style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            fontSize: 'clamp(52px, 9vw, 100px)',
            color: '#f5f0e8',
            lineHeight: 0.88,
            margin: '3rem 0 0.5rem',
          }}
        >
          ERA<br />HALL
        </h2>

        {/* Address */}
        <p style={{
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: 10, color: '#f5f0e8', opacity: 0.3, fontWeight: 200, margin: '0 0 1.5rem',
        }}>
          {tV("address")}
        </p>

        {/* Info lines */}
        <div className="venue-info" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.5rem' }}>
          {[
            { gold: tV('date'), geo: tV('day_name') },
            { gold: tV('time1'), geo: tV('time1_label') },
            { gold: tV('time2'), geo: tV('time2_label') },
          ].map(({ gold, geo }) => (
            <div key={gold} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c9a96e', opacity: 0.6, fontWeight: 300 }}>{gold}</span>
              <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 9, color: '#f5f0e8', opacity: 0.25, fontWeight: 200 }}>{geo}</span>
            </div>
          ))}
        </div>

        {/* Google Maps link */}
        <a
          href="https://www.google.com/maps/place/Era+Banquet+Hall/@41.5816842,41.5785035,18z"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 9,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#f5f0e8',
            opacity: 0.35,
            borderBottom: '0.5px solid rgba(245,240,232,0.15)',
            textDecoration: 'none',
            paddingBottom: 2,
            fontWeight: 300,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.35'; }}
        >
          {tV("maps")} →
        </a>

        {/* Bottom-right: BATUMI · GEORGIA */}
        <p style={{
          position: 'absolute',
          bottom: '2rem',
          right: 'clamp(1.5rem, 3.5vw, 4rem)',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase',
          opacity: 0.12, color: '#f5f0e8', margin: 0, fontWeight: 200,
        }}>
          {tV("city")}
        </p>
      </section>
    </>
  );
}

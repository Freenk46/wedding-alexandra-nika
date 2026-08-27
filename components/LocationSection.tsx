'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CornerFlower from './CornerFlower';

gsap.registerPlugin(ScrollTrigger);

const dmSerifItalic: React.CSSProperties = {
  fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
  fontStyle: 'italic',
};

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path d="M2 38 C2 16 16 2 38 2" stroke="currentColor" strokeWidth="1" />
      <path d="M2 24 C2 16 9 9 17 8" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="38" cy="2" r="1.6" fill="currentColor" />
      <circle cx="2" cy="38" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function LocationSection() {
  const tL = useTranslations("location");
  const tV = useTranslations("venue");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.location-frame', '.location-corner'], {
        opacity: 0, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.location-title', {
        y: 16, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.location-venue-name', {
        y: 30, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.location-info', {
        y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="paper-section"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CornerFlower src="/img/4.png" corner="tr" />
      <CornerFlower src="/img/10.png" corner="bl" />

      {/* Ornamental frame */}
      <div className="location-frame" />
      <CornerFlourish className="location-corner location-corner--tl" />
      <CornerFlourish className="location-corner location-corner--tr" />
      <CornerFlourish className="location-corner location-corner--br" />
      <CornerFlourish className="location-corner location-corner--bl" />

      {/* Title */}
      <p
        className="location-title"
        style={{
          ...dmSerifItalic,
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: '#1a1a1a',
          opacity: 0.85,
          maxWidth: 360,
          margin: '0 0 1rem',
        }}
      >
        {tL("title")}
      </p>

      {/* Venue name */}
      <h2
        className="location-venue-name"
        style={{
          fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
          fontSize: 'clamp(52px, 9vw, 100px)',
          color: '#1a1a1a',
          lineHeight: 0.9,
          margin: '0 0 1rem',
        }}
      >
        DREAMLAND<br />OASIS
      </h2>

      {/* Address */}
      <p style={{
        fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        fontSize: 14, color: '#1a1a1a', opacity: 0.85, fontWeight: 400, margin: '0 0 1.5rem',
      }}>
        {tL("address")}
      </p>

      {/* Divider */}
      <div className="location-divider">
        <span />
        <svg width="9" height="9" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" /></svg>
        <span />
      </div>

      {/* Info lines */}
      <div className="location-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: '1.75rem' }}>
        {[
          { gold: tV('date'), geo: tV('day_name') },
          { gold: tV('time1'), geo: tV('time1_label') },
        ].map(({ gold, geo }) => (
          <div key={gold} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#1a1a1a', opacity: 0.95, fontWeight: 500 }}>{gold}</span>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 13, color: '#1a1a1a', opacity: 0.65, fontWeight: 400 }}>{geo}</span>
          </div>
        ))}
      </div>

      {/* Google Maps link */}
      <a
        href="https://maps.app.goo.gl/6ZE36pXQEPvYJpLdA"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: 12,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          border: '1px solid var(--gold)',
          textDecoration: 'none',
          padding: '12px 20px',
          fontWeight: 500,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#1a1208'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
      >
        {tV("maps")} →
      </a>
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !img1Ref.current || !img2Ref.current || !captionRef.current) return;

      gsap.from(titleRef.current, {
        y: 80, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from([img1Ref.current, img2Ref.current], {
        opacity: 0, scale: 1.06, duration: 1, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.from(captionRef.current, {
        opacity: 0, y: 20, duration: 0.8, delay: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
        id="editorial-section"
        ref={sectionRef}
        style={{
          background: '#EAE6DD',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 5%',
          gap: 48,
        }}
      >
        {/* ── LEFT — date / location info ─────────────── */}
        <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
          {/* Section label */}
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#B8960C', marginBottom: 32,
          }}>
            WHERE &amp; WHEN
          </p>

          {/* Giant date */}
          <div
            ref={titleRef}
            className="editorial-title"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px, 12vw, 180px)',
              lineHeight: 0.88, color: '#111',
              letterSpacing: '-0.02em', marginBottom: 24,
            }}
          >
            <div>21</div>
            <div style={{ color: '#B8960C' }}>OCT</div>
            <div>2026</div>
          </div>

          {/* Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ width: 48, height: 1, background: '#B8960C', flexShrink: 0 }} />
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 32, color: '#111', margin: 0 }}>
              18:00
            </p>
          </div>

          {/* Location details grid */}
          <div
            ref={captionRef}
            className="editorial-caption"
            style={{
              borderTop: '1px solid rgba(17,17,17,0.15)',
              paddingTop: 24,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#B8960C', marginBottom: 8, margin: '0 0 8px' }}>
                ადგილი
              </p>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#111', lineHeight: 1.1, margin: 0 }}>
                ERA HALL
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(17,17,17,0.55)', marginTop: 4, margin: '4px 0 0' }}>
                აფსაროსის 41
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#B8960C', margin: '0 0 8px' }}>
                ქალაქი
              </p>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#111', lineHeight: 1.1, margin: 0 }}>
                BATUMI
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(17,17,17,0.55)', margin: '4px 0 0' }}>
                საქართველო
              </p>
            </div>
          </div>

          {/* Google Maps link */}
          <a
            href="https://www.google.com/maps/place/Era+Banquet+Hall/@41.5816842,41.5785035,18z"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32,
              fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#111', border: '1px solid rgba(17,17,17,0.3)',
              padding: '10px 20px', textDecoration: 'none', transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#B8960C';
              e.currentTarget.style.borderColor = '#B8960C';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(17,17,17,0.3)';
              e.currentTarget.style.color = '#111';
            }}
          >
            VIEW ON MAP →
          </a>
        </div>

        {/* ── RIGHT — photo + map embed ────────────────── */}
        <div
          className="editorial-right"
          style={{
            width: '38%', flexShrink: 0,
            display: 'flex', flexDirection: 'column',
            gap: 8, alignSelf: 'stretch',
          }}
        >
          {/* Photo */}
          <div
            ref={img1Ref}
            className="editorial-img"
            style={{
              position: 'relative', width: '80%', height: '40%',
              marginLeft: 'auto', filter: 'sepia(15%) contrast(1.05)',
            }}
          >
            <Image
              src="/Journey/Era.jpg"
              alt="ERA Hall"
              fill
              style={{ objectFit: 'cover' }}
              sizes="30vw"
            />
          </div>

          {/* Map embed */}
          <div
            ref={img2Ref}
            className="editorial-img"
            style={{
              width: '80%', height: '38%', marginLeft: 'auto',
              overflow: 'hidden', filter: 'sepia(30%) contrast(0.9)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d748.5!2d41.5785035!3d41.5816842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40678feee3e3b29f%3A0x1b2e94f26c8d60eb!2sEra%20Banquet%20Hall!5e0!3m2!1ska!2sge!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

  );
}

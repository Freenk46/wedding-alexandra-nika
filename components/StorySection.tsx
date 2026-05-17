'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const FLOATING = [
  { text: '♡', top: '12%', left: '18%', size: 32, color: '#c9a96e', rot: -15, font: 'var(--font-great-vibes), cursive' },
  { text: '♡', top: '55%', left: '12%', size: 20, color: 'var(--text-primary)', rot: 8, font: 'var(--font-great-vibes), cursive' },
  { text: '21.10', bottom: '20%', right: '18%', size: 18, color: 'rgba(74,64,53,0.5)', rot: -8, font: 'var(--font-dm-sans), DM Sans, sans-serif', spacing: '0.2em' },
  { text: '✦', top: '35%', left: '22%', size: 24, color: '#c9a96e', rot: 0, font: 'serif' },
  { text: '✦', bottom: '30%', right: '20%', size: 16, color: 'var(--text-primary)', rot: 20, font: 'serif' },
  { text: 'BATUMI', bottom: '15%', left: '15%', size: 13, color: 'rgba(74,64,53,0.5)', rot: -5, font: 'var(--font-dm-sans), DM Sans, sans-serif', spacing: '0.2em' },
] as const;

export default function StorySection() {
  const t = useTranslations("invitation");
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<HTMLDivElement[]>([]);
  const svgPath1Ref = useRef<SVGPathElement>(null);
  const svgPath2Ref = useRef<SVGPathElement>(null);
  const svgPath3Ref = useRef<SVGPathElement>(null);
  const svgCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const maxRotX = mobile ? 8 : 12;
    const maxRotY = mobile ? 12 : 18;
    const tiltMult = mobile ? 0.6 : 1;

    const ctx = gsap.context(() => {

      gsap.to(titleRef.current, {
        y: -120, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: 'bottom top', scrub: 1.5,
        },
      });

      gsap.fromTo(photoRef.current,
        { y: 60, rotation: -8 },
        {
          y: -40, rotation: -4, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', end: 'bottom top', scrub: 2,
          },
        }
      );

      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        if (mobile) gsap.set(el, { scale: 0.8 });
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 12,
          x: i % 3 === 0 ? 6 : -6,
          rotation: `+=${i % 2 === 0 ? 4 : -4}`,
          duration: 2.5 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.from(svgPath1Ref.current, {
        drawSVG: '0%', duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', toggleActions: 'play none none reverse',
        },
      });

      gsap.from(svgPath2Ref.current, {
        drawSVG: '0%', duration: 1.2, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%', toggleActions: 'play none none reverse',
        },
      });

      gsap.from(svgPath3Ref.current, {
        drawSVG: '0%', duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%', toggleActions: 'play none none reverse',
        },
      });

      gsap.from(svgCircleRef.current, {
        drawSVG: '0%', duration: 2, ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', toggleActions: 'play none none reverse',
        },
      });

      const section = sectionRef.current;
      const photo = photoRef.current;
      if (!section || !photo) return;

      const onPointerMove = (clientX: number, clientY: number) => {
        const rect = photo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (clientX - centerX) / (rect.width / 2);
        const dy = (clientY - centerY) / (rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        gsap.to(photo, {
          rotateX: Math.max(-maxRotX, Math.min(maxRotX, -dy * 25 * tiltMult)),
          rotateY: Math.max(-maxRotY, Math.min(maxRotY, dx * 35 * tiltMult)),
          rotateZ: 0, scale: 1.04,
          boxShadow: `${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,${0.2 + dist * 0.15})`,
          duration: 0.5, ease: 'power2.out',
        });

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const fx = (clientX - cx) / cx;
        const fy = (clientY - cy) / cy;

        floatingRefs.current.forEach((el, i) => {
          if (!el) return;
          const depth = 0.5 + (i % 3) * 0.3;
          gsap.to(el, { x: fx * 20 * depth, y: fy * 15 * depth, duration: 0.8, ease: 'power2.out' });
        });
      };

      const onPointerLeave = () => {
        gsap.to(photo, {
          rotateX: 0, rotateY: 0, rotateZ: -8, scale: 1,
          boxShadow: '6px 12px 40px rgba(0,0,0,0.18)',
          duration: 1.4, ease: 'elastic.out(1, 0.4)',
        });
      };

      const onMouseMove  = (e: MouseEvent)  => onPointerMove(e.clientX, e.clientY);
      const onMouseLeave = ()               => onPointerLeave();
      const onTouchMove  = (e: TouchEvent)  => {
        const touch = e.touches[0];
        if (!touch) return;
        onPointerMove(touch.clientX, touch.clientY);
      };
      const onTouchEnd = () => onPointerLeave();

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);
      section.addEventListener('touchmove', onTouchMove, { passive: true });
      section.addEventListener('touchend', onTouchEnd);

      let deviceOrientationHandler: ((e: DeviceOrientationEvent) => void) | null = null;
      if (mobile && typeof DeviceOrientationEvent !== 'undefined') {
        deviceOrientationHandler = (e: DeviceOrientationEvent) => {
          const x = (e.gamma ?? 0) / 90;
          const y = Math.min(Math.max((e.beta ?? 0) - 45, -45), 45) / 45;
          gsap.to(photo, {
            rotateX: Math.max(-maxRotX, Math.min(maxRotX, y * maxRotX)),
            rotateY: Math.max(-maxRotY, Math.min(maxRotY, x * maxRotY)),
            duration: 0.8, ease: 'power2.out',
          });
          floatingRefs.current.forEach((el, i) => {
            if (!el) return;
            const depth = 0.5 + (i % 3) * 0.3;
            gsap.to(el, { x: x * 15 * depth, y: y * 10 * depth, duration: 0.8, ease: 'power2.out' });
          });
        };
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }

      return () => {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
        section.removeEventListener('touchmove', onTouchMove);
        section.removeEventListener('touchend', onTouchEnd);
        if (deviceOrientationHandler) {
          window.removeEventListener('deviceorientation', deviceOrientationHandler);
        }
      };

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="invitation"
      ref={sectionRef}
      className="story-section"
      style={{ position: 'relative', overflow: 'visible', background: 'var(--bg-primary)' }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #c9a96e 0.8px, transparent 0.8px)',
        backgroundSize: '28px 28px',
        opacity: 0.22,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Ghost watermark — INVIT / ATION */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute', top: '-10px', left: '-20px',
          fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
          fontSize: 'clamp(90px, 17vw, 190px)',
          lineHeight: 0.85,
          color: 'rgba(180,170,155,0.18)',
          userSelect: 'none', pointerEvents: 'none', zIndex: 1,
        }}
      >
        <div>INVIT</div>
        <div>ATION</div>
      </div>

      {/* Accent circles */}
      <div className="story-deco" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -45%)',
        width: 'clamp(320px, 45vw, 600px)', height: 'clamp(320px, 45vw, 600px)',
        border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div className="story-deco" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-45%, -48%)',
        width: 'clamp(260px, 36vw, 480px)', height: 'clamp(260px, 36vw, 480px)',
        border: '1px solid rgba(201,169,110,0.12)', borderRadius: '50%',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* SVG decorations (arrow removed) */}
      <svg
        className="story-svg-deco"
        style={{
          position: 'absolute', top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw', height: '80vh',
          pointerEvents: 'none', zIndex: 2, overflow: 'visible',
        }}
        viewBox="0 0 600 700"
        fill="none"
      >
        <path ref={svgPath1Ref} d="M420 80 Q480 40 500 120" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
        <path ref={svgPath2Ref} d="M160 520 Q200 510 240 520 Q280 530 320 520 Q360 510 400 520" stroke="rgba(74,64,53,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path ref={svgPath3Ref} d="M140 200 L120 200 L120 500 L140 500" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
        <circle ref={svgCircleRef} cx="300" cy="350" r="220" stroke="rgba(74,64,53,0.3)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
      </svg>

      {/* Floating elements */}
      {FLOATING.map((f, i) => (
        <div
          key={i}
          ref={(el) => { if (el) floatingRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            top: 'top' in f ? f.top : undefined,
            bottom: 'bottom' in f ? f.bottom : undefined,
            left: 'left' in f ? f.left : undefined,
            right: 'right' in f ? f.right : undefined,
            fontSize: f.size, color: f.color, fontFamily: f.font,
            transform: `rotate(${f.rot}deg)`,
            letterSpacing: 'spacing' in f ? f.spacing : undefined,
            pointerEvents: 'none', zIndex: 4, userSelect: 'none',
          }}
        >
          {f.text}
        </div>
      ))}

      {/* Polaroid photo */}
      <div className="story-photo-pt" style={{
        position: 'relative', zIndex: 3,
        display: 'flex', justifyContent: 'center',
        perspective: '600px', perspectiveOrigin: '50% 50%',
        paddingTop: '28vh',
      }}>
        <div
          ref={photoRef}
          className="story-polaroid"
          style={{
            width: 'clamp(240px, 28vw, 380px)',
            padding: '16px 16px 56px',
            background: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
            <Image
              src="/img/5.jpg"
              alt="Alexandra and Nika"
              fill
              sizes="(max-width: 768px) 80vw, 32vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          </div>
          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--font-great-vibes), cursive',
            fontSize: 28, color: '#c9a96e',
            marginTop: 12,
          }}>
            Alexandra &amp; Nika ♡
          </p>
        </div>
      </div>

      {/* Text columns */}
      <div className="story-grid">

        {/* LEFT column */}
        <div>
          <p style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 10,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: 16, fontWeight: 300,
          }}>
            {t("label")}
          </p>
          <p style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 2.1,
            color: 'var(--text-primary)', maxWidth: 400, fontWeight: 300,
            whiteSpace: 'pre-line',
          }}>
            {t("body")}
          </p>
          <div style={{ width: 32, height: 1, background: 'rgba(201,169,110,0.5)', margin: '20px 0 12px' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(74,64,53,0.35)', fontWeight: 300,
          }}>
            {t("batumi")}
          </p>
        </div>

        {/* RIGHT column */}
        <div className="story-right-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 10,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: 16, fontWeight: 300,
          }}>
            {t("date_label")}
          </p>
          <p className="story-right-text" style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 'clamp(13px, 1.3vw, 16px)', lineHeight: 2.4,
            color: 'var(--text-primary)', maxWidth: 400, textAlign: 'right', fontWeight: 300,
            whiteSpace: 'pre-line',
          }}>
            {t("body_right")}
          </p>

          <a
            href="#rsvp"
            style={{
              marginTop: 40,
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#c9a96e', color: '#1a1208',
              padding: '11px 22px', cursor: 'pointer', borderRadius: 2,
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'transform 0.2s, background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#1a1208'; (e.currentTarget as HTMLAnchorElement).style.color = '#c9a96e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#c9a96e'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a1208'; }}
          >
            {t("rsvp_btn")}
          </a>
        </div>

      </div>

      {/* Gold bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 3,
        background: '#c9a96e',
      }} />
    </section>
  );
}

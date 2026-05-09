'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const FLOATING = [
  { text: '♡', top: '12%', left: '18%', size: 32, color: '#F05235', rot: -15, font: 'Caveat, cursive' },
  { text: 'YES!', top: '20%', right: '15%', size: 28, color: '#F05235', rot: 12, font: 'Caveat, cursive' },
  { text: '♡', top: '55%', left: '12%', size: 20, color: '#111', rot: 8, font: 'Caveat, cursive' },
  { text: '21.10', bottom: '20%', right: '18%', size: 18, color: '#888', rot: -8, font: 'DM Sans, sans-serif', spacing: '0.2em' },
  { text: '✦', top: '35%', left: '22%', size: 24, color: '#F05235', rot: 0, font: 'serif' },
  { text: '✦', bottom: '30%', right: '20%', size: 16, color: '#111', rot: 20, font: 'serif' },
  { text: 'BATUMI', bottom: '15%', left: '15%', size: 13, color: '#888', rot: -5, font: 'DM Sans, sans-serif', spacing: '0.2em' },
] as const;

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<HTMLDivElement[]>([]);
  const svgPath1Ref = useRef<SVGPathElement>(null);
  const svgArrow1Ref = useRef<SVGPathElement>(null);
  const svgPath2Ref = useRef<SVGPathElement>(null);
  const svgPath3Ref = useRef<SVGPathElement>(null);
  const svgCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;

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

      // DrawSVG and mouse interactions only on desktop
      if (!mobile) {
        gsap.from([svgPath1Ref.current, svgArrow1Ref.current], {
          drawSVG: '0%', duration: 1, ease: 'power2.out', stagger: 0.3,
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

        const onMouseMove = (e: MouseEvent) => {
          const rect = photo.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = (e.clientX - centerX) / (rect.width / 2);
          const dy = (e.clientY - centerY) / (rect.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);

          gsap.to(photo, {
            rotateX: Math.max(-12, Math.min(12, -dy * 25)),
            rotateY: Math.max(-18, Math.min(18, dx * 35)),
            rotateZ: 0, scale: 1.04,
            boxShadow: `${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,${0.2 + dist * 0.15})`,
            duration: 0.5, ease: 'power2.out',
          });

          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const fx = (e.clientX - cx) / cx;
          const fy = (e.clientY - cy) / cy;

          floatingRefs.current.forEach((el, i) => {
            if (!el) return;
            const depth = 0.5 + (i % 3) * 0.3;
            gsap.to(el, { x: fx * 20 * depth, y: fy * 15 * depth, duration: 0.8, ease: 'power2.out' });
          });
        };

        const onMouseLeave = () => {
          gsap.to(photo, {
            rotateX: 0, rotateY: 0, rotateZ: -8, scale: 1,
            boxShadow: '6px 12px 40px rgba(0,0,0,0.18)',
            duration: 1.4, ease: 'elastic.out(1, 0.4)',
          });
        };

        section.addEventListener('mousemove', onMouseMove);
        section.addEventListener('mouseleave', onMouseLeave);

        return () => {
          section.removeEventListener('mousemove', onMouseMove);
          section.removeEventListener('mouseleave', onMouseLeave);
        };
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="story-section"
      style={{ background: '#EAE6DD', position: 'relative', overflow: 'hidden' }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #111 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.06, pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Giant background title */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(80px, 20vw, 280px)',
          lineHeight: 0.85, letterSpacing: '-0.01em',
          userSelect: 'none', pointerEvents: 'none', zIndex: 1,
        }}
      >
        <div style={{ color: '#111' }}>OUR</div>
        <div style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>STORY</div>
      </div>

      {/* Accent circles — hidden on mobile via .story-deco */}
      <div className="story-deco" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -45%)',
        width: 'clamp(320px, 45vw, 600px)', height: 'clamp(320px, 45vw, 600px)',
        border: '1px solid rgba(240,82,53,0.2)', borderRadius: '50%',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div className="story-deco" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-45%, -48%)',
        width: 'clamp(260px, 36vw, 480px)', height: 'clamp(260px, 36vw, 480px)',
        border: '0.5px solid rgba(17,17,17,0.12)', borderRadius: '50%',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* SVG decorations — hidden on mobile via .story-deco */}
      <svg
        className="story-deco"
        style={{
          position: 'absolute', top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw', height: '80vh',
          pointerEvents: 'none', zIndex: 2, overflow: 'visible',
        }}
        viewBox="0 0 600 700"
        fill="none"
      >
        <path ref={svgPath1Ref} d="M420 80 Q480 40 500 120" stroke="#F05235" strokeWidth="2" strokeLinecap="round" />
        <path ref={svgArrow1Ref} d="M495 115 L500 120 L493 124" stroke="#F05235" strokeWidth="2" strokeLinecap="round" />
        <path ref={svgPath2Ref} d="M160 520 Q200 510 240 520 Q280 530 320 520 Q360 510 400 520" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path ref={svgPath3Ref} d="M140 200 L120 200 L120 500 L140 500" stroke="#F05235" strokeWidth="1.5" strokeLinecap="round" />
        <circle ref={svgCircleRef} cx="300" cy="350" r="220" stroke="#111" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
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
      }}>
        <div
          ref={photoRef}
          className="story-polaroid"
          style={{
            background: '#fff',
            padding: '16px 16px 56px',
            boxShadow: '6px 12px 40px rgba(0,0,0,0.18)',
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
            textAlign: 'center', fontFamily: 'Caveat, cursive',
            fontSize: 22, color: '#555', marginTop: 12,
          }}>
            Alexandra & Nika ♡
          </p>
        </div>
      </div>

      {/* Text columns — CSS handles 1-col on mobile */}
      <div className="story-grid">

        <div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#F05235', marginBottom: 20,
          }}>
            ჩვენი დასაწყისი
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.75,
            color: '#1A1A1A', maxWidth: 400,
          }}>
            ჩვენი ისტორია დაიწყო ბათუმში —
            ერთი შეხვედრით, რომელმაც
            ყველაფერი შეცვალა.
            ალექსანდრა და ნიკა —
            ორი ადამიანი, ერთი გზა.
          </p>
        </div>

        <div className="story-right-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#F05235', marginBottom: 20,
          }}>
            21 · 10 · 2026
          </p>
          <p className="story-right-text" style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.75,
            color: '#1A1A1A', maxWidth: 400, textAlign: 'right',
          }}>
            21 ოქტომბერი 2026 — ჩვენ ვამბობთ{' '}
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: '#F05235' }}>
              &ldquo;YES!&rdquo;
            </span>{' '}
            ბათუმში, ERA Hall-ში,
            ყველა ჩვენთვის ძვირფასი
            ადამიანის გარემოცვაში.
          </p>

          <div style={{
            marginTop: 40, display: 'flex', alignItems: 'center', gap: 12,
            background: '#111', color: '#fff',
            padding: '14px 28px', cursor: 'pointer', borderRadius: 2,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              overflow: 'hidden', position: 'relative', flexShrink: 0,
            }}>
              <Image src="/img/1.png" alt="couple" fill sizes="28px" style={{ objectFit: 'cover' }} />
            </div>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              RSVP გამაგზავნე
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

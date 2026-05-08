'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(titleRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.fromTo(photoRef.current,
        { y: 60, rotation: -8 },
        {
          y: -40,
          rotation: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );

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
          rotateZ: 0,
          scale: 1.04,
          boxShadow: `${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,${0.2 + dist * 0.15})`,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(photo, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: -8,
          scale: 1,
          boxShadow: '6px 12px 40px rgba(0,0,0,0.18)',
          duration: 1.4,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);

      return () => {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
      };

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        background: '#EAE6DD',
        minHeight: '140vh',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0 160px',
      }}
    >
      {/* GIANT TITLE — background */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(120px, 20vw, 280px)',
          lineHeight: 0.85,
          color: '#111',
          letterSpacing: '-0.01em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >

      </div>

      {/* POLAROID PHOTO — center, tilted */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '18vh',
        perspective: '600px',
        perspectiveOrigin: '50% 50%',
      }}>
        <div
          ref={photoRef}
          style={{
            background: '#fff',
            padding: '16px 16px 56px',
            boxShadow: '6px 12px 40px rgba(0,0,0,0.18)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            cursor: 'grab',
            width: 'clamp(260px, 32vw, 440px)',
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/5',
            overflow: 'hidden',
          }}>
            <Image
              src="/img/1.png"
              alt="Alexandra and Nika"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          </div>
          <p style={{
            textAlign: 'center',
            fontFamily: 'Caveat, cursive',
            fontSize: 22,
            color: '#555',
            marginTop: 12,
          }}>
            Alexandra & Nika ♡
          </p>
        </div>
      </div>

      {/* TEXT COLUMNS */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        padding: '100px 6% 0',
        alignItems: 'start',
      }}>

        {/* LEFT */}
        <div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#F05235',
            marginBottom: 20,
          }}>
            ჩვენი დასაწყისი
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.75,
            color: '#1A1A1A',
            maxWidth: 400,
          }}>
            ჩვენი ისტორია დაიწყო ბათუმში —
            ერთი შეხვედრით, რომელმაც
            ყველაფერი შეცვალა.
            ალექსანდრა და ნიკა —
            ორი ადამიანი, ერთი გზა.
          </p>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#F05235',
            marginBottom: 20,
          }}>
            21 · 10 · 2026
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.75,
            color: '#1A1A1A',
            maxWidth: 400,
            textAlign: 'right',
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
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#111',
            color: '#fff',
            padding: '14px 28px',
            cursor: 'pointer',
            borderRadius: 2,
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}>
              <Image src="/img/1.png" alt="couple" fill style={{ objectFit: 'cover' }} />
            </div>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              RSVP გამაგზავნე
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}

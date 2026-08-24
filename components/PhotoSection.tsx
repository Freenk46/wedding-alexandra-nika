'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CornerFlower from './CornerFlower';

gsap.registerPlugin(ScrollTrigger);

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

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.photo-frame', {
        y: 30, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.photo-frame-corner', {
        opacity: 0, duration: 1.1, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.photo-caption', {
        y: 12, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.photo-leaf--left', {
        opacity: 0, x: -20, y: 20, duration: 1, delay: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.photo-leaf--right', {
        opacity: 0, x: 20, y: 20, duration: 1, delay: 0.6, ease: 'power2.out',
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
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CornerFlower src="/img/7.png" corner="tl" />
      <CornerFlower src="/img/2.png" corner="br" />

      <div style={{ position: 'relative' }}>
        <CornerFlourish className="photo-frame-corner photo-frame-corner--tl" />
        <CornerFlourish className="photo-frame-corner photo-frame-corner--tr" />
        <CornerFlourish className="photo-frame-corner photo-frame-corner--br" />
        <CornerFlourish className="photo-frame-corner photo-frame-corner--bl" />

        <Image
          src="/img/palm_leaf_1.png"
          alt=""
          width={240}
          height={240}
          aria-hidden="true"
          className="photo-leaf photo-leaf--left"
        />
        <Image
          src="/img/palm_leaf_2.png"
          alt=""
          width={240}
          height={240}
          aria-hidden="true"
          className="photo-leaf photo-leaf--right"
        />

        <div className="photo-frame">
          <div className="photo-frame-img">
            <Image
              src="/img/6.jpg"
              alt="Alexandra and Nika"
              fill
              sizes="(max-width: 768px) 70vw, 380px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <p className="photo-caption">Alexandra &amp; Nika ♡</p>
    </section>
  );
}

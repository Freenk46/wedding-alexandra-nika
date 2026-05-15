'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!mainImageRef.current) return;
      if (!secondaryImageRef.current) return;

      const trigger = {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      };

      gsap.from(mainImageRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: trigger,
      });

      gsap.from(secondaryImageRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: trigger,
      });

      if (textRef.current) {
        gsap.from(textRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: trigger,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="gallery-section"
      style={{
        background: '#EAE6DD',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 4%',
        overflow: 'hidden',
      }}
    >
      {/* Main image — center, large */}
      <div
        ref={mainImageRef}
        className="gallery-main-image"
        style={{
          position: 'relative',
          width: '55%',
          height: '75vh',
          marginLeft: '20%',
          flexShrink: 0,
        }}
      >
        <Image
          src="/img/4.png"
          alt="Alexandra and Nika"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          sizes="52vw"
        />

        {/* Gold vertical bar — right edge */}
        <div className="gallery-gold-bar" style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 48,
          background: 'linear-gradient(to bottom, #B8960C, #8B6914)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#EAE6DD',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            margin: 0,
          }}>
            ALEXANDRA × NIKA
          </p>
        </div>
      </div>

      {/* Secondary image — left, overlapping */}
      <div
        ref={secondaryImageRef}
        className="gallery-secondary-image"
        style={{
          position: 'absolute',
          left: '6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '22%',
          height: '55vh',
          border: '6px solid #B8960C',
          zIndex: 4,
          boxShadow: '8px 8px 40px rgba(0,0,0,0.2)',
        }}
      >
        <Image
          src="/img/6.jpg"
          alt="Alexandra and Nika"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="22vw"
        />
      </div>

      {/* Bottom left label */}
      <div className="gallery-bottom-label" style={{
        position: 'absolute',
        bottom: 32,
        left: '6%',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 10,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(17,17,17,0.4)',
      }}>
        ENGAGEMENT SHOOT
      </div>

    </section>
  );
}

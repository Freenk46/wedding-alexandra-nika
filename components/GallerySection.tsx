'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/img/2.png', align: 'left'   },
  { src: '/img/3.png', align: 'right'  },
  { src: '/img/4.png', align: 'center' },
];

export default function GallerySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const itemRefs    = useRef<HTMLDivElement[]>([]);
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, bottom } = section.getBoundingClientRect();
      setLabelVisible(top <= 0 && bottom >= window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (mobile) {
        // Simple fade-in on mobile
        itemRefs.current.forEach((el) => {
          if (!el) return;
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      } else {
        // Desktop: parallax deco lines
        images.forEach((_, i) => {
          const deco = document.querySelector(`.deco-lines-${i}`);
          if (!deco) return;
          gsap.fromTo(deco,
            { y: -120 },
            {
              y: 60, ease: 'none',
              scrollTrigger: {
                trigger: deco,
                start: 'top bottom', end: 'bottom center', scrub: 0.8,
              },
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', zIndex: 20, pointerEvents: 'none',
        opacity: labelVisible ? 1 : 0, transition: 'opacity 0.6s ease',
      }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif', marginBottom: 16,
        }}>
          WHAT SAYING{' '}
          <span style={{ color: '#F05235', fontFamily: 'Caveat', fontSize: 20 }}>
            &ldquo;YES!&rdquo;
          </span>
          {' '}LOOKS LIKE
        </p>
        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(48px, 10vw, 140px)',
          color: '#fff', lineHeight: 0.9, letterSpacing: '-0.01em',
        }}>
          OUR<br />MOMENTS
        </h2>
      </div>

      <section ref={sectionRef} style={{ background: '#111', padding: '0 0 80px' }}>
        <div className="gallery-content">
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemRefs.current[i] = el; }}
              style={{ position: 'relative' }}
            >
              <div
                className="gallery-item-inner"
                style={{
                  marginLeft:  img.align === 'left'  ? '5%' : 'auto',
                  marginRight: img.align === 'right' ? '5%' : 'auto',
                }}
              >
                <Image
                  src={img.src}
                  alt={`moment-${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 36vw"
                  style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: 4 }}
                  priority={i < 2}
                />
                <div style={{
                  position: 'absolute', top: 16, left: 20,
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: 13,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Decorative lines — hidden on mobile via .gallery-deco */}
                <div
                  className={`gallery-deco deco-lines-${i}`}
                  style={{
                    position: 'absolute', top: '-220px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%', height: '220px',
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'flex-start', gap: '48px',
                    pointerEvents: 'none', zIndex: 10,
                  }}
                >
                  {[190, 140, 210, 100, 160].map((h, j) => (
                    <div key={j} style={{
                      width: '3px', height: h, background: '#FFFFFF',
                      marginTop: [0, 50, 10, 90, 35][j], flexShrink: 0,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

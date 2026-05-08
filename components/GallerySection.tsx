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
  { src: '/img/5.png', align: 'left'   },
  { src: '/img/6.png', align: 'right'  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
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
    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const deco = document.querySelector(`.deco-lines-${i}`);
        if (!deco) return;

        gsap.fromTo(deco,
          { y: -120 },
          {
            y: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: deco,
              start: 'top bottom',
              end: 'bottom center',
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 20,
        pointerEvents: 'none',
        opacity: labelVisible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        <p style={{
          fontSize: 11,
          letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif',
          marginBottom: 16,
        }}>
          WHAT SAYING{' '}
          <span style={{ color: '#F05235', fontFamily: 'Caveat', fontSize: 20 }}>
            &ldquo;YES!&rdquo;
          </span>
          {' '}LOOKS LIKE
        </p>
        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(64px, 10vw, 140px)',
          color: '#fff',
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
        }}>
          OUR<br />MOMENTS
        </h2>
      </div>

      <section
        ref={sectionRef}
        style={{ background: '#111', padding: '0 0 160px' }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14vh',
          paddingTop: '80vh',
          paddingBottom: '20vh',
          position: 'relative',
          zIndex: 1,
        }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>

              {/* IMAGE — overflow visible so lines show above */}
              <div style={{
                position: 'relative',
                marginLeft:  img.align === 'left'   ? '5%'  : 'auto',
                marginRight: img.align === 'right'  ? '5%'  : 'auto',
                width:  'clamp(280px, 36vw, 520px)',
                height: 'clamp(360px, 55vw, 680px)',
                borderRadius: 4,
                overflow: 'visible',
              }}>

                <Image
                  src={img.src}
                  alt={`moment-${i + 1}`}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: 4 }}
                  priority={i < 2}
                />
                <div style={{
                  position: 'absolute',
                  top: 16,
                  left: 20,
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.15em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* DECORATIVE LINES — last in DOM, renders over image */}
                <div
                  className={`deco-lines-${i}`}
                  style={{
                    position: 'absolute',
                    top: '-220px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '48px',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  {[190, 140, 210, 100, 160].map((h, j) => (
                    <div key={j} style={{
                      width: '3px',
                      height: h,
                      background: '#FFFFFF',
                      marginTop: [0, 50, 10, 90, 35][j],
                      flexShrink: 0,
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

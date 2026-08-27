'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import ScratchCircle from './ScratchCircle';
import { fireGoldConfetti } from '@/lib/confetti';
import CornerFlower from './CornerFlower';

export default function ScheduleSection() {
  const tS = useTranslations("schedule");
  const scheduleRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [circleSize, setCircleSize] = useState(104);
  const revealedRef = useRef(false);
  const completedCountRef = useRef(0);

  useEffect(() => {
    if (window.innerWidth < 400) setCircleSize(76);
  }, []);

  // Block downward scrolling once the schedule section has reached the top
  // of the viewport, for as long as the gate hasn't been fully scratched.
  useEffect(() => {
    if (revealed) return;

    const isGateActive = () => {
      if (revealedRef.current) return false;
      const rect = scheduleRef.current?.getBoundingClientRect();
      return !!rect && rect.top <= 1;
    };

    const wheelHandler = (e: WheelEvent) => {
      if (e.deltaY > 0 && isGateActive()) e.preventDefault();
    };
    let touchStartY = 0;
    const touchStartHandler = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const touchMoveHandler = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0;
      if (currentY < touchStartY && isGateActive()) e.preventDefault();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && isGateActive()) e.preventDefault();
    };

    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('touchstart', touchStartHandler, { passive: true });
    window.addEventListener('touchmove', touchMoveHandler, { passive: false });
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [revealed]);

  const handleScratchComplete = () => {
    completedCountRef.current += 1;
    if (completedCountRef.current < items.length || revealedRef.current) return;

    revealedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => setRevealed(true),
    });
    tl.to(headingRef.current, {
      opacity: 0, y: -12, height: 0, marginBottom: 0, duration: 0.5, ease: 'power2.in',
    });

    const rect = scheduleRef.current?.getBoundingClientRect();
    if (rect) {
      fireGoldConfetti(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height * 0.35) / window.innerHeight,
        60
      );
    }
  };

  useEffect(() => {
    if (!revealed) return;
    const ctx = gsap.context(() => {
      gsap.from('.schedule-announce', {
        y: -20, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.schedule-calendar-cta', {
        y: 16, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, [revealed]);

  const items = [
    { value: '3 OCT 2026', caption: tS('day_sub') },
    { value: '17:30', caption: tS('reception_sub') },
  ];

  return (
    <section
      id="where-when"
      ref={scheduleRef}
      className="paper-section"
      style={{
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 3.5vw, 4rem) clamp(5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CornerFlower src="/img/2.png" corner="tr" />
      <CornerFlower src="/img/8.png" corner="bl" />

      {/* "We're getting married!" — fades in once the dates are revealed */}
      {revealed && (
        <p className="schedule-announce">{tS('announce')}</p>
      )}

      {/* Instructional heading — collapses away once all three are scratched */}
      <div className="scratch-gate" ref={headingRef}>
        <p className="scratch-gate-hint">{tS("scratchHint")}</p>
        <h3 className="scratch-gate-title">{tS("scratchTitle")}</h3>
        <p className="scratch-gate-caption">{tS("scratchCaption")}</p>
      </div>

      {/* Scratch circles — each keeps its revealed value permanently visible */}
      <div className="schedule-scratch-row">
        {items.map((item) => (
          <div className="schedule-scratch-item" key={item.caption}>
            <ScratchCircle size={circleSize} value={item.value} onComplete={handleScratchComplete} />
            <span className="schedule-scratch-caption">{item.caption}</span>
          </div>
        ))}
      </div>

      {/* Add to Calendar — appears once all three dates are revealed */}
      {revealed && (
        <div className="schedule-calendar-cta" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nika+%C3%97+Alexandra+Wedding&dates=20261003T173000/20261003T230000&location=Dreamland+Oasis,+Batumi,+Georgia&details=Nika+%C3%97+Alexandra+Wedding+Event"
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
      )}
    </section>
  );
}

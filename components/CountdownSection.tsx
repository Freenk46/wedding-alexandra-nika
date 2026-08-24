'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import CornerFlower from './CornerFlower';

const TARGET = new Date('2026-10-21T18:00:00+04:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownSection() {
  const t = useTranslations('countdown');
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time?.days ?? 0, label: t('days') },
    { value: time?.hours ?? 0, label: t('hours') },
    { value: time?.minutes ?? 0, label: t('minutes') },
    { value: time?.seconds ?? 0, label: t('seconds') },
  ];

  return (
    <section
      className="paper-section"
      style={{
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1.5rem, 3.5vw, 4rem)',
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
      <CornerFlower src="/img/3.png" corner="tl" />
      <CornerFlower src="/img/9.png" corner="br" />

      <h2 className="countdown-title">{t('title')}</h2>

      <div className="countdown-row">
        {units.map((u) => (
          <div className="countdown-box" key={u.label}>
            <span className="countdown-number">{String(u.value).padStart(2, '0')}</span>
            <span className="countdown-label">{u.label}</span>
          </div>
        ))}
      </div>

      <p className="countdown-subtitle">{t('subtitle')}</p>
    </section>
  );
}

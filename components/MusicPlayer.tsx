'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const volume = 0.4;

  useEffect(() => { setMounted(true); }, []);

  // Fade in on mount
  useEffect(() => {
    if (!mounted) return;
    gsap.from(playerRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 2 });
  }, [mounted]);

  // Auto-play on first user interaction — disabled
  // useEffect(() => {
  //   if (!mounted) return;
  //   const startMusic = () => {
  //     const audio = audioRef.current;
  //     if (!audio || playing) return;
  //     audio.volume = volume;
  //     audio.play().then(() => setPlaying(true)).catch(() => {});
  //   };
  //   document.addEventListener('click', startMusic, { once: true });
  //   document.addEventListener('touchstart', startMusic, { once: true });
  //   document.addEventListener('scroll', startMusic, { once: true });
  //   return () => {
  //     document.removeEventListener('click', startMusic);
  //     document.removeEventListener('touchstart', startMusic);
  //     document.removeEventListener('scroll', startMusic);
  //   };
  // }, [mounted, playing]);

  // Collapse on scroll
  useEffect(() => {
    const onScroll = () => setExpanded(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Collapse on outside click
  useEffect(() => {
    if (!expanded) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!playerRef.current?.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [expanded]);

  // GSAP expand / collapse
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (expanded) {
      gsap.to(player, { width: 220, borderRadius: 4, duration: 0.4, ease: 'power3.out' });
      gsap.to('.music-player-content', { opacity: 1, duration: 0.3, delay: 0.2 });
    } else {
      gsap.to('.music-player-content', { opacity: 0, duration: 0.15 });
      gsap.to(player, { width: 44, borderRadius: '50%', duration: 0.4, ease: 'power3.inOut' });
    }
  }, [expanded]);

  // Equalizer bar animation
  useEffect(() => {
    const bars = barsRef.current;
    if (playing) {
      bars.forEach((bar, i) => {
        if (!bar) return;
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.4 + i * 0.1,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.08,
        });
      });
    } else {
      bars.forEach((bar) => {
        if (!bar) return;
        gsap.killTweensOf(bar);
        gsap.to(bar, { scaleY: 0.2, duration: 0.2 });
      });
    }
  }, [playing]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <audio ref={audioRef} src="/music/wedding.mp3" loop preload="auto" />

      <div
        ref={playerRef}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          zIndex: 999,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid rgba(184,150,12,0.3)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {/* Vinyl icon — always visible */}
        <div style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2px solid #B8960C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: playing ? 'vinyl-spin 3s linear infinite' : 'none',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#B8960C' }} />
          </div>
        </div>

        {/* Expanded content */}
        <div
          className="music-player-content"
          style={{
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingRight: 14,
            whiteSpace: 'nowrap',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            style={{ background: 'none', border: 'none', color: '#EAE6DD', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 2l11 6-11 6V2z" />
              </svg>
            )}
          </button>

          {/* Equalizer bars */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 16 }}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                ref={(el) => { if (el) barsRef.current[i] = el; }}
                style={{
                  width: 3,
                  height: 14,
                  background: '#B8960C',
                  borderRadius: 2,
                  transformOrigin: 'bottom',
                  transform: 'scaleY(0.2)',
                }}
              />
            ))}
          </div>

          {/* Label */}
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: 'rgba(234,230,221,0.6)' }}>
            A × N
          </span>
        </div>
      </div>
    </>
  );
}

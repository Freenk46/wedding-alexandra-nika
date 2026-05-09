'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolume, setShowVolume] = useState(false);
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fade in on mount
  useEffect(() => {
    if (!mounted) return;
    gsap.from(playerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 2,
    });
  }, [mounted]);

  // Auto-play on first user interaction
  useEffect(() => {
    if (!mounted) return;

    const startMusic = () => {
      const audio = audioRef.current;
      if (!audio || playing) return;

      audio.volume = volume;
      audio.play()
        .then(() => {
          setPlaying(true);
          animateBars(true);
        })
        .catch(() => {
          // Autoplay blocked — user must press play manually
        });
    };

    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
    document.addEventListener('scroll', startMusic, { once: true });

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('scroll', startMusic);
    };
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const animateBars = (start: boolean) => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      if (start) {
        gsap.to(bar, {
          scaleY: () => 0.3 + Math.random() * 0.7,
          duration: 0.3 + Math.random() * 0.3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.08,
        });
      } else {
        gsap.killTweensOf(bar);
        gsap.to(bar, {
          scaleY: 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      animateBars(false);
    } else {
      audio.volume = volume;
      audio.play();
      setPlaying(true);
      animateBars(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        loop
        preload="auto"
      />

      <div
        ref={playerRef}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(17,17,17,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '10px 16px',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause music' : 'Play music'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: '#EAE6DD',
            display: 'flex',
            alignItems: 'center',
            minWidth: 20,
            minHeight: 20,
          }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1"/>
              <rect x="9" y="2" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2l11 6-11 6V2z"/>
            </svg>
          )}
        </button>

        {/* Equalizer bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 20 }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={(el) => { if (el) barsRef.current[i] = el; }}
              style={{
                width: 3,
                height: 16,
                background: '#F05235',
                borderRadius: 2,
                transformOrigin: 'bottom',
                transform: 'scaleY(0.2)',
                opacity: playing ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }}
            />
          ))}
        </div>

        {/* Volume icon */}
        <button
          onClick={() => setShowVolume(!showVolume)}
          aria-label="Toggle volume"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: '#EAE6DD',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            minHeight: 20,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L4 6H1v4h3l4 4V2z"/>
            {volume > 0 && (
              <path d="M11 5.5a4 4 0 010 5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            )}
            {volume > 0.5 && (
              <path d="M13 3.5a7 7 0 010 9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            )}
          </svg>
        </button>

        {/* Volume slider */}
        {showVolume && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolume}
            aria-label="Volume"
            style={{
              width: 72,
              accentColor: '#F05235',
              cursor: 'pointer',
            }}
          />
        )}

        {/* Label */}
        <span style={{
          fontFamily: 'Caveat, cursive',
          fontSize: 13,
          color: 'rgba(234,230,221,0.5)',
          whiteSpace: 'nowrap',
        }}>
          A × N
        </span>
      </div>
    </>
  );
}

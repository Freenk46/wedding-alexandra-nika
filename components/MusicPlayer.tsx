'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume] = useState(0.4);
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<HTMLDivElement>(null);

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
  }, [mounted, playing, volume]);

  // Vinyl Spin Animation
  useEffect(() => {
    if (playing) {
      gsap.to(recordRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    } else {
      gsap.killTweensOf(recordRef.current);
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
      audio.play();
      setPlaying(true);
    }
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
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: 48,
          right: 24,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '8px 16px 8px 8px',
          borderRadius: 100,
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        }}
      >
        {/* Spinning Record */}
        <div
          ref={recordRef}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #111, #333, #111, #333, #111)',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            marginRight: 12,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', border: '2px solid #111' }} />
        </div>

        {/* Track Info */}
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 16 }}>
           <span style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 2 }}>
             {playing ? 'Now Playing' : 'Paused'}
           </span>
           <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 13, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
             A × N Wedding
           </span>
        </div>

        {/* Equalizer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 16 }}>
           {[0.6, 0.9, 0.5, 0.8].map((dur, i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: '100%',
                  background: 'var(--accent)',
                  borderRadius: 2,
                  transformOrigin: 'bottom',
                  animation: playing ? `eq ${dur}s ease-in-out infinite alternate ${i * 0.1}s` : 'none',
                  transform: playing ? 'scaleY(0.3)' : 'scaleY(0.2)',
                  opacity: playing ? 1 : 0.4,
                }}
              />
           ))}
        </div>

        <style>{`
          @keyframes eq {
            0% { transform: scaleY(0.3); }
            100% { transform: scaleY(1); }
          }
        `}</style>
      </div>
    </>
  );
}

export default function DividerMarquee() {
  return (
    <div style={{
      width: '100%',
      height: 56,
      background: 'var(--bg-secondary)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 14s linear infinite',
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 20,
        color: 'var(--accent)',
        letterSpacing: '0.14em',
      }}>
        {Array(6).fill('ALEXANDRA × NIKA × 21.10.2026 × ERA HALL × BATUMI × ').join('')}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

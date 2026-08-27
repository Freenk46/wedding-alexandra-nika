'use client';
import { useEffect, useState } from 'react';

type Flourish = 'bow' | 'chain' | 'spiralWave' | 'heartCharm' | 'coil';

const ANCHORS: { id: string; flourish: Flourish }[] = [
  { id: 'where-when', flourish: 'bow' },
  { id: 'thread-anchor-location', flourish: 'chain' },
  { id: 'thread-anchor-photo', flourish: 'spiralWave' },
  { id: 'rsvp', flourish: 'heartCharm' },
  { id: 'thread-anchor-footer', flourish: 'coil' },
];

// A full-circle loop that enters and exits at the same point (cx, cy), bulging to the right.
function loop(cx: number, cy: number, r: number) {
  return ` A ${r} ${r} 0 1 1 ${cx} ${cy + 2 * r} A ${r} ${r} 0 1 1 ${cx} ${cy}`;
}

function flourishSegment(type: Flourish, cx: number, cy: number): { d: string; exitY: number } {
  switch (type) {
    // Two generous loops side by side, like a tied ribbon bow.
    case 'bow': {
      const r = 30;
      const d = loop(cx - r, cy, r) + loop(cx + r, cy, r);
      return { d, exitY: cy };
    }
    // Three beaded loops in a row — small, large, small — like a chain link.
    case 'chain': {
      const r1 = 15;
      const r2 = 26;
      const d = loop(cx - r1 - r2, cy, r1) + loop(cx, cy, r2) + loop(cx + r1 + r2, cy, r1);
      return { d, exitY: cy };
    }
    // A flowing S-wave that curls into a small loop at the end.
    case 'spiralWave': {
      const d =
        ` Q ${cx + 34} ${cy + 18} ${cx} ${cy + 36}` +
        ` Q ${cx - 34} ${cy + 54} ${cx} ${cy + 72}` +
        loop(cx, cy + 72, 16);
      return { d, exitY: cy + 72 };
    }
    // A larger heart with a small loop above it, like a pendant charm.
    case 'heartCharm': {
      const r = 10;
      const d =
        loop(cx, cy - 34, r) +
        ` C ${cx - 28} ${cy - 12}, ${cx - 15} ${cy + 14}, ${cx} ${cy - 4}` +
        ` C ${cx + 15} ${cy + 14}, ${cx + 28} ${cy - 12}, ${cx} ${cy - 34}`;
      return { d, exitY: cy - 34 };
    }
    // A tightening three-turn coil, like a spring or a nautilus shell.
    case 'coil': {
      const d = loop(cx, cy, 32) + ` l 0 6` + loop(cx, cy + 38, 21) + ` l 0 5` + loop(cx, cy + 64, 11);
      return { d, exitY: cy + 64 };
    }
  }
}

export default function DecorThread() {
  const [geometry, setGeometry] = useState<{ d: string } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = document.getElementById('thread-container');
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width;
      const baseX = width * 0.5;

      const tops: number[] = [];
      const flourishes: Flourish[] = [];
      for (const a of ANCHORS) {
        const el = document.getElementById(a.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        tops.push(r.top - containerRect.top);
        flourishes.push(a.flourish);
      }
      if (tops.length === 0) return;

      const boundaries = [...tops, containerRect.height];
      const mids = tops.map((_, i) => (boundaries[i] + boundaries[i + 1]) / 2);

      let d = `M ${baseX} 0`;
      let curX = baseX;
      let curY = 0;

      mids.forEach((targetY, i) => {
        const wander = Math.sin(i * 1.7 + 0.6) * width * 0.28;
        const targetX = baseX + wander;
        const midY = curY + (targetY - curY) * 0.5;
        d += ` C ${curX} ${midY}, ${targetX} ${curY + (targetY - curY) * 0.15}, ${targetX} ${targetY}`;
        curX = targetX;
        curY = targetY;

        const { d: segment, exitY } = flourishSegment(flourishes[i], curX, curY);
        d += segment;
        curY = exitY;
      });

      d += ` L ${curX} ${containerRect.height}`;

      setGeometry({ d });
    };

    measure();
    const container = document.getElementById('thread-container');
    const ro = new ResizeObserver(() => measure());
    if (container) ro.observe(container);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  if (!geometry) return null;

  return (
    <svg
      className="decor-thread-svg"
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, pointerEvents: 'none', overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d={geometry.d}
        fill="none"
        stroke="rgba(201,169,110,0.62)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

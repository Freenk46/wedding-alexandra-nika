'use client';
import { useEffect, useState } from 'react';

type Flourish = 'loop' | 'infinity' | 'wave' | 'heart' | 'spiral';

const ANCHORS: { id: string; flourish: Flourish }[] = [
  { id: 'where-when', flourish: 'loop' },
  { id: 'thread-anchor-location', flourish: 'infinity' },
  { id: 'thread-anchor-photo', flourish: 'wave' },
  { id: 'rsvp', flourish: 'heart' },
  { id: 'thread-anchor-footer', flourish: 'spiral' },
];

// A full-circle loop that enters and exits at the same point (cx, cy), bulging to the right.
function loop(cx: number, cy: number, r: number) {
  return ` A ${r} ${r} 0 1 1 ${cx} ${cy + 2 * r} A ${r} ${r} 0 1 1 ${cx} ${cy}`;
}

function flourishSegment(type: Flourish, cx: number, cy: number): { d: string; exitY: number } {
  switch (type) {
    case 'loop': {
      const r = 22;
      return { d: loop(cx, cy, r), exitY: cy };
    }
    case 'infinity': {
      const r = 15;
      const d =
        loop(cx - r, cy, r) +
        loop(cx + r, cy, r);
      return { d, exitY: cy };
    }
    case 'wave': {
      const d = ` Q ${cx + 26} ${cy + 14} ${cx} ${cy + 28} Q ${cx - 26} ${cy + 42} ${cx} ${cy + 56}`;
      return { d, exitY: cy + 56 };
    }
    case 'heart': {
      const d =
        ` C ${cx - 19} ${cy - 18}, ${cx - 10} ${cy - 32}, ${cx} ${cy - 21}` +
        ` C ${cx + 10} ${cy - 32}, ${cx + 19} ${cy - 18}, ${cx} ${cy}`;
      return { d, exitY: cy };
    }
    case 'spiral': {
      const d = loop(cx, cy, 22) + ` L ${cx} ${cy + 48}` + loop(cx, cy + 48, 12);
      return { d, exitY: cy + 48 };
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

      const points: { cy: number; flourish: Flourish }[] = [];
      for (const a of ANCHORS) {
        const el = document.getElementById(a.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        points.push({ cy: r.top - containerRect.top, flourish: a.flourish });
      }
      if (points.length === 0) return;

      let d = `M ${baseX} 0`;
      let curX = baseX;
      let curY = 0;

      points.forEach((p, i) => {
        const wander = Math.sin(i * 1.7 + 0.6) * width * 0.28;
        const targetX = baseX + wander;
        const targetY = p.cy;
        const midY = curY + (targetY - curY) * 0.5;
        d += ` C ${curX} ${midY}, ${targetX} ${curY + (targetY - curY) * 0.15}, ${targetX} ${targetY}`;
        curX = targetX;
        curY = targetY;

        const { d: segment, exitY } = flourishSegment(p.flourish, curX, curY);
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
        stroke="rgba(201,169,110,0.6)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

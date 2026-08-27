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
      const r = 13;
      return { d: loop(cx, cy, r), exitY: cy };
    }
    case 'infinity': {
      const r = 9;
      const d =
        loop(cx - r, cy, r) +
        loop(cx + r, cy, r);
      return { d, exitY: cy };
    }
    case 'wave': {
      const d = ` Q ${cx + 16} ${cy + 9} ${cx} ${cy + 18} Q ${cx - 16} ${cy + 27} ${cx} ${cy + 36}`;
      return { d, exitY: cy + 36 };
    }
    case 'heart': {
      const d =
        ` C ${cx - 12} ${cy - 11}, ${cx - 6} ${cy - 20}, ${cx} ${cy - 13}` +
        ` C ${cx + 6} ${cy - 20}, ${cx + 12} ${cy - 11}, ${cx} ${cy}`;
      return { d, exitY: cy };
    }
    case 'spiral': {
      const d = loop(cx, cy, 13) + ` L ${cx} ${cy + 30}` + loop(cx, cy + 30, 7);
      return { d, exitY: cy + 30 };
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
      const baseX = Math.max(28, Math.min(width * 0.1, 60));

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
        const wander = Math.sin(i * 1.7 + 0.6) * Math.min(width * 0.035, 26);
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
        stroke="rgba(201,169,110,0.55)"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

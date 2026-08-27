'use client';
import { useEffect, useState } from 'react';

type Flourish = 'bell' | 'wineGlass' | 'heart' | 'rings' | 'bouquet';

const ANCHORS: { id: string; flourish: Flourish }[] = [
  { id: 'where-when', flourish: 'bell' },
  { id: 'thread-anchor-location', flourish: 'wineGlass' },
  { id: 'thread-anchor-photo', flourish: 'heart' },
  { id: 'rsvp', flourish: 'rings' },
  { id: 'thread-anchor-footer', flourish: 'bouquet' },
];

// A full-circle loop that enters and exits at the same point (cx, cy), bulging to the right.
function loop(cx: number, cy: number, r: number) {
  return ` A ${r} ${r} 0 1 1 ${cx} ${cy + 2 * r} A ${r} ${r} 0 1 1 ${cx} ${cy}`;
}

function flourishSegment(type: Flourish, cx: number, cy: number): { d: string; exitY: number } {
  switch (type) {
    // A wedding bell: small hanging hook, then the domed body flaring to a wide rim.
    case 'bell': {
      const top = cy - 40;
      const d =
        loop(cx, top, 6) +
        ` C ${cx - 3} ${top + 2}, ${cx - 16} ${top + 10}, ${cx - 17} ${top + 30}` +
        ` C ${cx - 18} ${top + 42}, ${cx - 24} ${top + 46}, ${cx - 24} ${top + 53}` +
        ` Q ${cx} ${top + 62} ${cx + 24} ${top + 53}` +
        ` C ${cx + 24} ${top + 46}, ${cx + 18} ${top + 42}, ${cx + 17} ${top + 30}` +
        ` C ${cx + 16} ${top + 10}, ${cx + 3} ${top + 2}, ${cx} ${top}`;
      return { d, exitY: top };
    }
    // A wine glass: bowl, stem, base — entry/exit at the bowl's converging point.
    case 'wineGlass': {
      const d =
        ` C ${cx - 2} ${cy - 4}, ${cx - 15} ${cy - 14}, ${cx - 15} ${cy - 24}` +
        ` L ${cx + 15} ${cy - 24}` +
        ` C ${cx + 15} ${cy - 14}, ${cx + 2} ${cy - 4}, ${cx} ${cy}` +
        ` L ${cx} ${cy + 20}` +
        ` Q ${cx - 12} ${cy + 23} ${cx - 11} ${cy + 28}` +
        ` Q ${cx} ${cy + 31} ${cx + 11} ${cy + 28}` +
        ` Q ${cx + 12} ${cy + 23} ${cx} ${cy + 20}`;
      return { d, exitY: cy + 20 };
    }
    // A larger heart, entry/exit at the bottom cusp.
    case 'heart': {
      const d =
        ` C ${cx - 19} ${cy - 18}, ${cx - 10} ${cy - 32}, ${cx} ${cy - 21}` +
        ` C ${cx + 10} ${cy - 32}, ${cx + 19} ${cy - 18}, ${cx} ${cy}`;
      return { d, exitY: cy };
    }
    // Two interlocked wedding rings.
    case 'rings': {
      const r = 17;
      const offset = r * 1.3;
      const d = loop(cx - offset, cy, r) + loop(cx + offset, cy, r);
      return { d, exitY: cy };
    }
    // A small bouquet: three flowers on crossing stems, gathered into a basket.
    case 'bouquet': {
      const top = cy - 26;
      const d =
        loop(cx, top, 9) +
        ` L ${cx - 16} ${top + 12}` +
        loop(cx - 16, top + 12, 8) +
        ` L ${cx + 16} ${top + 12}` +
        loop(cx + 16, top + 12, 8) +
        ` L ${cx} ${top + 28}` +
        ` L ${cx - 14} ${top + 48}` +
        ` L ${cx + 14} ${top + 48}` +
        ` L ${cx + 8} ${top + 28}`;
      return { d, exitY: top + 48 };
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

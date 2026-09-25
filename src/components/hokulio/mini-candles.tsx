"use client";

import React, { useEffect, useState } from "react";

/**
 * Lightweight simulated candlestick strip for the FinTech bento card.
 * SVG-based, low frequency ticks — cheap enough to run alongside the hero canvas.
 */
/* deterministic PRNG — identical series on server & client to avoid hydration mismatch */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function initialCandles(): number[][] {
  const rand = seeded(20260925);
  const arr: number[][] = [];
  let p = 100;
  for (let i = 0; i < 26; i++) {
    const o = p;
    const c = o + (rand() - 0.48) * 6;
    const h = Math.max(o, c) + rand() * 2.2;
    const l = Math.min(o, c) - rand() * 2.2;
    arr.push([o, c, h, l]);
    p = c;
  }
  return arr;
}

export function MiniCandles({ reduced = false }: { reduced?: boolean }) {
  const [candles, setCandles] = useState<number[][]>(initialCandles);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setCandles((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        const drift = (Math.random() - 0.48) * 3.4;
        // mutate last candle
        next[next.length - 1] = [
          last[0],
          last[1] + drift,
          Math.max(last[2], last[1] + drift) + Math.random() * 1.1,
          Math.min(last[3], last[1] + drift) - Math.random() * 1.1,
        ];
        if (Math.random() > 0.55) {
          const o = next[next.length - 1][1];
          const c = o + (Math.random() - 0.48) * 5;
          next.push([
            o,
            c,
            Math.max(o, c) + Math.random() * 2,
            Math.min(o, c) - Math.random() * 2,
          ]);
          next.shift();
        }
        return next;
      });
    }, 620);
    return () => window.clearInterval(id);
  }, [reduced]);

  const W = 520;
  const H = 150;
  const pad = 6;
  const lows = candles.map((c) => c[3]);
  const highs = candles.map((c) => c[2]);
  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const span = max - min || 1;

  const x = (i: number) => pad + (i + 0.5) * ((W - pad * 2) / candles.length);
  const y = (v: number) => pad + (1 - (v - min) / span) * (H - pad * 2);
  const bw = Math.max(4, (W - pad * 2) / candles.length - 3.5);

  // MA(6) path
  const maPath = candles
    .map((_, i) => {
      if (i < 5) return null;
      const avg = (candles[i][1] + candles[i - 1][1] + candles[i - 2][1] + candles[i - 3][1] + candles[i - 4][1] + candles[i - 5][1]) / 6;
      return `${i === 5 ? "M" : "L"}${x(i).toFixed(1)},${y(avg).toFixed(1)}`;
    })
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mc-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00F5A0" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {candles.map((c, i) => {
        const up = c[1] >= c[0];
        const col = up ? "url(#mc-up)" : "#FF5470";
        const top = y(Math.max(c[0], c[1]));
        const bh = Math.max(2, Math.abs(y(c[0]) - y(c[1])));
        return (
          <g key={i}>
            <line
              x1={x(i)}
              y1={y(c[2])}
              x2={x(i)}
              y2={y(c[3])}
              stroke={up ? "#00F5A0" : "#FF5470"}
              strokeWidth="1.1"
              opacity="0.75"
            />
            <rect
              x={x(i) - bw / 2}
              y={top}
              width={bw}
              height={bh}
              rx="1.4"
              fill={col}
              opacity={up ? 0.9 : 0.85}
            />
          </g>
        );
      })}
      <path d={maPath} fill="none" stroke="#6366F1" strokeWidth="1.6" opacity="0.85" />
      <path d={maPath} fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

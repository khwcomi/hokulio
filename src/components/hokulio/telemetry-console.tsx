"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage, FadeText } from "./i18n";
import { cn } from "@/lib/utils";
import { Activity, Radio, Zap } from "lucide-react";

/* ── Simulated market engine ──────────────────────────────── */

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

const PAIRS = ["EURUSD", "GBPJPY", "XAUUSD", "NAS100", "USDCAD", "SPX500"];
const MAX_CANDLES = 130;
const VISIBLE = 56;

function newCandle(prevClose: number, vol: number, drift: number): Candle {
  const o = prevClose;
  const noise = (Math.random() - 0.5) * 2 * vol * 0.0009;
  const c = o * (1 + noise + drift * 0.00035);
  const h = Math.max(o, c) * (1 + Math.random() * vol * 0.0006);
  const l = Math.min(o, c) * (1 - Math.random() * vol * 0.0006);
  return { o, h, l, c, v: 0.2 + Math.random() * 0.8 };
}

export function TelemetryConsole() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, inside: false });

  const [price, setPrice] = useState(1.08432);
  const [changePct, setChangePct] = useState(0.42);
  const [feed, setFeed] = useState<
    { id: number; side: "BUY" | "SELL"; qty: string; pair: string; px: string; ms: string }[]
  >([]);
  const [pairIdx, setPairIdx] = useState(0);

  /* canvas engine */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;

    let candles: Candle[] = [];
    let base = 1.08432;
    {
      let p = base;
      for (let i = 0; i < MAX_CANDLES; i++) {
        const c = newCandle(p, 1, 0.05);
        candles.push(c);
        p = c.c;
      }
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tickCount = 0;
    let lastTick = performance.now();
    let lastFeed = performance.now();
    let feedId = 0;
    const TICK_MS = reduced ? 420 : 130;
    const CANDLE_MS = 14; // ticks per candle

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      // measure the chart zone (fixed CSS height, content-independent width).
      // the canvas is absolutely positioned — CSS governs layout, attributes
      // only set the backing store, so no resize feedback loop is possible.
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!running || !visible) return;

      /* advance simulation */
      if (now - lastTick >= TICK_MS) {
        lastTick = now;
        const m = mouse.current;
        // cursor drives volatility (x) and drift (y): top = bullish, bottom = bearish
        const vol = m.inside ? 0.35 + m.x * 1.9 : 0.9;
        const drift = m.inside ? (0.5 - m.y) * 1.6 : 0;
        const cur = candles[candles.length - 1];
        const noise = (Math.random() - 0.5) * 2 * vol * 0.00075;
        const nc = cur.c * (1 + noise + drift * 0.00028);
        cur.c = nc;
        cur.h = Math.max(cur.h, nc);
        cur.l = Math.min(cur.l, nc);
        cur.v = Math.min(1, cur.v + Math.random() * 0.12);

        tickCount++;
        if (tickCount >= CANDLE_MS) {
          tickCount = 0;
          candles.push(newCandle(cur.c, vol, drift));
          if (candles.length > MAX_CANDLES) candles.shift();
          setPairIdx((i) => (Math.random() > 0.75 ? (i + 1) % PAIRS.length : i));
        }

        const first = candles[Math.max(0, candles.length - VISIBLE)].c;
        setPrice(cur.c);
        setChangePct(((cur.c - first) / first) * 100);
      }

      /* execution feed */
      if (now - lastFeed >= (reduced ? 4200 : 1500)) {
        lastFeed = now;
        const side = Math.random() > 0.46 ? "BUY" : "SELL";
        const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
        const qty = (0.1 + Math.random() * 2.4).toFixed(2);
        const px =
          pair === "NAS100" || pair === "SPX500"
            ? (15000 + Math.random() * 900).toFixed(2)
            : (1.02 + Math.random() * 0.35).toFixed(5);
        const ms = (7 + Math.random() * 5).toFixed(1);
        feedId += 1;
        setFeed((f) =>
          [{ id: feedId, side: side as "BUY" | "SELL", qty, pair, px, ms }, ...f].slice(0, 9)
        );
      }

        /* ── render ── */
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const padL = 8 * dpr;
      const padR = 66 * dpr;
      const padT = 14 * dpr;
      const padB = 34 * dpr;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;
      const volH = plotH * 0.16;
      const chartH = plotH - volH - 6 * dpr;

      const view = candles.slice(-VISIBLE);
      const closesAll = candles.map((c) => c.c);
      let min = Infinity;
      let max = -Infinity;
      for (const c of view) {
        if (c.l < min) min = c.l;
        if (c.h > max) max = c.h;
      }
      const pad = (max - min) * 0.12;
      min -= pad;
      max += pad;

      const x = (i: number) => padL + (i + 0.5) * (plotW / view.length);
      const y = (p: number) => padT + chartH - ((p - min) / (max - min)) * chartH;

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      ctx.font = `${9.5 * dpr}px ui-monospace, monospace`;
      ctx.fillStyle = "rgba(161,161,170,0.55)";
      ctx.textAlign = "left";
      for (let g = 0; g <= 4; g++) {
        const gy = padT + (chartH / 4) * g;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(padL + plotW, gy);
        ctx.stroke();
        const gp = max - ((max - min) / 4) * g;
        ctx.fillText(gp.toFixed(4), padL + plotW + 8 * dpr, gy + 3 * dpr);
      }

      // volume bars
      const maxV = Math.max(...view.map((c) => c.v));
      view.forEach((c, i) => {
        const vh = (c.v / maxV) * volH;
        ctx.fillStyle =
          c.c >= c.o ? "rgba(0,245,160,0.14)" : "rgba(255,84,112,0.14)";
        ctx.fillRect(
          x(i) - (plotW / view.length) * 0.32,
          padT + chartH + 6 * dpr + (volH - vh),
          (plotW / view.length) * 0.64,
          vh
        );
      });

      // candles
      const cw = Math.max(2.5, (plotW / view.length) * 0.62);
      view.forEach((c, i) => {
        const up = c.c >= c.o;
        const col = up ? "#00F5A0" : "#FF5470";
        ctx.strokeStyle = col;
        ctx.fillStyle = col;
        ctx.lineWidth = Math.max(1, 1.1 * dpr);
        ctx.globalAlpha = i === view.length - 1 ? 1 : 0.88;
        // wick
        ctx.beginPath();
        ctx.moveTo(x(i), y(c.h));
        ctx.lineTo(x(i), y(c.l));
        ctx.stroke();
        // body
        const bodyTop = y(Math.max(c.o, c.c));
        const bodyH = Math.max(1.5 * dpr, Math.abs(y(c.o) - y(c.c)));
        if (up) {
          ctx.globalAlpha = i === view.length - 1 ? 0.95 : 0.8;
          ctx.fillRect(x(i) - cw / 2, bodyTop, cw, bodyH);
        } else {
          ctx.fillRect(x(i) - cw / 2, bodyTop, cw, bodyH);
        }
        ctx.globalAlpha = 1;
      });

      // moving averages
      const drawMA = (period: number, color: string) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4 * dpr;
        let started = false;
        view.forEach((_, i) => {
          const abs = candles.length - VISIBLE + i;
          if (abs < period) return;
          let sum = 0;
          for (let k = 0; k < period; k++) sum += closesAll[abs - k];
          const v = sum / period;
          const px = x(i);
          const py = y(v);
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        });
        ctx.stroke();
      };
      drawMA(7, "rgba(34,211,238,0.75)");
      drawMA(25, "rgba(99,102,241,0.85)");

      // last price line + tag
      const last = candles[candles.length - 1];
      const ly = y(last.c);
      const lastUp = last.c >= last.o;
      ctx.setLineDash([4 * dpr, 4 * dpr]);
      ctx.strokeStyle = lastUp ? "rgba(0,245,160,0.5)" : "rgba(255,84,112,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, ly);
      ctx.lineTo(padL + plotW, ly);
      ctx.stroke();
      ctx.setLineDash([]);

      const tagText = last.c.toFixed(5);
      ctx.font = `${10 * dpr}px ui-monospace, monospace`;
      const tagW = ctx.measureText(tagText).width + 12 * dpr;
      const tagH = 17 * dpr;
      ctx.fillStyle = lastUp ? "#00F5A0" : "#FF5470";
      const ty = Math.min(Math.max(ly - tagH / 2, padT), padT + chartH - tagH);
      ctx.beginPath();
      ctx.roundRect(padL + plotW + 4 * dpr, ty, tagW, tagH, 3 * dpr);
      ctx.fill();
      ctx.fillStyle = "#05130D";
      ctx.textAlign = "left";
      ctx.fillText(tagText, padL + plotW + 10 * dpr, ty + tagH / 2 + 3.5 * dpr);

      // crosshair at cursor
      const m = mouse.current;
      if (m.inside) {
        const cx = padL + m.x * plotW;
        const cy = padT + m.y * chartH;
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.setLineDash([3 * dpr, 5 * dpr]);
        ctx.beginPath();
        ctx.moveTo(cx, padT);
        ctx.lineTo(cx, padT + chartH);
        ctx.moveTo(padL, cy);
        ctx.lineTo(padL + plotW, cy);
        ctx.stroke();
        ctx.setLineDash([]);
        // price at cursor
        const cursorPx = max - ((cy - padT) / chartH) * (max - min);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(cx, cy, 2.4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `${9 * dpr}px ui-monospace, monospace`;
        ctx.fillStyle = "rgba(0,245,160,0.9)";
        ctx.textAlign = "left";
        ctx.fillText(cursorPx.toFixed(5), cx + 8 * dpr, cy - 7 * dpr);
      }

      // left fade edges
      const grad = ctx.createLinearGradient(padL, 0, padL + 30 * dpr, 0);
      grad.addColorStop(0, "rgba(9,10,15,0.85)");
      grad.addColorStop(1, "rgba(9,10,15,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(padL, padT - 6 * dpr, 30 * dpr, plotH + 12 * dpr);
    };

    if (reduced) {
      // single static frame
      running = true;
      draw(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVis = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const up = changePct >= 0;

  return (
    <div
      ref={wrapRef}
      className="glass-strong hairline-top relative overflow-hidden rounded-2xl shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]"
    >
      {/* scanline */}
      <div aria-hidden className="animate-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-transparent via-[#00F5A0]/[0.04] to-transparent" />

      {/* title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#00F5A0]/25 bg-[#00F5A0]/[0.08]">
            <Activity className="h-3.5 w-3.5 text-[#00F5A0]" />
          </span>
          <span className="truncate font-mono text-[11px] font-medium tracking-wide text-zinc-300">
            <FadeText>{t.hero.consoleTitle}</FadeText>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] tracking-widest text-zinc-400 sm:flex">
            <Radio className="h-3 w-3 animate-blink text-[#00F5A0]" />
            <FadeText>{t.hero.consolePair}</FadeText>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300">{PAIRS[pairIdx]}</span>
          </span>
          <span className="flex items-center gap-1 rounded-md border border-[#00F5A0]/30 bg-[#00F5A0]/[0.09] px-2 py-1 font-mono text-[10px] font-semibold text-[#00F5A0]">
            <Zap className="h-3 w-3" />
            &lt;12ms
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_168px]">
        {/* chart zone — fixed height, canvas absolutely positioned inside */}
        <div
          ref={wrapRef}
          className="relative h-[280px] w-full border-t border-white/[0.07] sm:h-[330px] lg:border-t-0"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full cursor-crosshair"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mouse.current = {
                x: Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1),
                y: Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1),
                inside: true,
              };
            }}
            onMouseLeave={() => {
              mouse.current.inside = false;
            }}
            aria-label="Simulated live candlestick chart — cursor adjusts volatility"
          />
          {/* live price overlay */}
          <div className="pointer-events-none absolute left-4 top-3 flex items-baseline gap-2.5">
            <span className="font-mono text-xl font-semibold tracking-tight text-white tabular-nums">
              {price.toFixed(5)}
            </span>
            <span
              className={cn(
                "font-mono text-xs font-medium tabular-nums",
                up ? "text-[#00F5A0]" : "text-[#FF5470]"
              )}
            >
              {up ? "▲" : "▼"} {Math.abs(changePct).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* execution feed rail */}
        <div className="flex min-h-[150px] flex-col border-t border-white/[0.07] lg:min-h-0 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
            <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">
              <FadeText>{t.hero.consoleFeed}</FadeText>
            </span>
            <span className="flex h-1.5 w-1.5">
              <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-[#00F5A0]" />
            </span>
          </div>
          <div className="hk-scroll flex-1 overflow-hidden px-3 py-2 lg:max-h-[318px]">
            <ul className="flex flex-col gap-1.5">
              {feed.length === 0 && (
                <li className="py-8 text-center font-mono text-[10px] text-zinc-600">
                  awaiting fills…
                </li>
              )}
              {feed.map((f, i) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-2 font-mono text-[9.5px] leading-4"
                  style={{ opacity: Math.max(0.25, 1 - i * 0.11) }}
                >
                  <span className={f.side === "BUY" ? "text-[#00F5A0]" : "text-[#FF5470]"}>
                    {f.side}
                  </span>
                  <span className="text-zinc-400">{f.qty}</span>
                  <span className="hidden text-zinc-500 sm:inline">{f.pair}</span>
                  <span className="text-zinc-300 tabular-nums">{f.px}</span>
                  <span className="text-[#00F5A0]/70 tabular-nums">{f.ms}ms</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 border-t border-white/[0.06] font-mono text-[9px] lg:grid-cols-1">
            <div className="border-r border-white/[0.06] px-3 py-2 lg:border-r-0">
              <div className="text-zinc-500">FILL RATE</div>
              <div className="mt-0.5 text-[11px] text-zinc-200">99.98%</div>
            </div>
            <div className="px-3 py-2">
              <div className="text-zinc-500">
                <FadeText>{t.hero.consoleLatency}</FadeText>
              </div>
              <div className="mt-0.5 text-[11px] text-[#00F5A0]">11.4ms median</div>
            </div>
          </div>
        </div>
      </div>

      {/* footer hint */}
      <div className="border-t border-white/[0.07] px-4 py-2.5">
        <p className="truncate text-center font-mono text-[9.5px] tracking-wide text-zinc-600 sm:text-left">
          ▸ <FadeText>{t.hero.consoleVolatility}</FadeText>
        </p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useLanguage, FadeText } from "./i18n";
import { Tilt } from "./shared";

/* deterministic pseudo-QR (21×21) with finder patterns */
function qrCells(size = 21): boolean[][] {
  let seed = 20260925;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const g: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => rand() > 0.52)
  );
  const finder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        g[r0 + r][c0 + c] = edge || core;
      }
    // quiet ring
    for (let r = -1; r <= 7; r++)
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r;
        const cc = c0 + c;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        if (r === -1 || r === 7 || c === -1 || c === 7) g[rr][cc] = false;
      }
  };
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);
  return g;
}
const QR = qrCells();

function PseudoQR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" className={className} aria-hidden>
      {QR.flatMap((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c} y={r} width="0.92" height="0.92" fill="#ECEFF4" rx="0.12" /> : null
        )
      )}
    </svg>
  );
}

export function WalletPass() {
  const { t } = useLanguage();
  return (
    <Tilt max={9}>
      <div className="relative mx-auto w-full max-w-[330px] select-none [transform-style:preserve-3d]">
        {/* glow under pass */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(closest-side,rgba(99,102,241,0.22),transparent)] blur-xl"
        />
        {/* pass body */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(150deg,#171A23_0%,#0B0D13_60%,#12141C_100%)] shadow-[0_30px_60px_-18px_rgba(0,0,0,0.85)]">
          {/* hole punch */}
          <div className="absolute -left-2.5 top-[54%] h-5 w-5 -translate-y-1/2 rounded-full border border-white/15 bg-[#0B0D13]" />
          <div className="absolute -right-2.5 top-[54%] h-5 w-5 -translate-y-1/2 rounded-full border border-white/15 bg-[#0B0D13]" />

          <div className="px-5 pb-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[8.5px] tracking-[0.28em] text-zinc-500">
                  <FadeText>{t.bento.card2Pass}</FadeText>
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                  TourPass
                  <span className="ml-1.5 rounded bg-white/10 px-1 py-0.5 align-middle font-mono text-[8px] tracking-normal text-zinc-300">
                    WALLET
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {/* apple wallet glyph */}
                <span className="flex items-center gap-1 rounded-md bg-white/[0.07] px-1.5 py-1">
                  <svg viewBox="0 0 384 512" className="h-3 w-3 fill-white" aria-hidden>
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span className="text-[8px] font-medium text-zinc-300">Wallet</span>
                </span>
                {/* google wallet glyph */}
                <span className="flex items-center gap-1 rounded-md bg-white/[0.07] px-1.5 py-1">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
                    <path fill="#4285F4" d="M4 6.5A2.5 2.5 0 0 1 6.5 4H11v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" />
                    <path fill="#34A853" d="M11 4h3.2c2.9 0 5.8 2.9 5.8 6.2 0 .6-.08 1.2-.24 1.8h-2.9l-2.66-4H11V4Z" />
                    <path fill="#FBBC04" d="M14.2 14h5.56A7.99 7.99 0 0 1 12.6 20H11v-6h3.2Z" />
                  </svg>
                  <span className="text-[8px] font-medium text-zinc-300">Wallet</span>
                </span>
              </div>
            </div>

            {/* route */}
            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">ICN · SEOUL</p>
                <p className="mt-0.5 text-2xl font-semibold tracking-tight text-white">07:40</p>
              </div>
              <div className="relative mx-3 flex-1">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <svg
                  className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#00F5A0]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">NRT · TOKYO</p>
                <p className="mt-0.5 text-2xl font-semibold tracking-tight text-white">09:55</p>
              </div>
            </div>
          </div>

          {/* perforation */}
          <div className="relative border-t border-dashed border-white/15">
            <div className="absolute inset-x-0 -top-px h-px bg-white/5" />
          </div>

          <div className="flex items-center gap-4 px-5 py-4">
            <PseudoQR className="h-16 w-16 shrink-0 rounded-md bg-[#ECEFF4]/10 p-1.5" />
            <div className="grid flex-1 grid-cols-3 gap-2 font-mono">
              <div>
                <p className="text-[8px] tracking-[0.18em] text-zinc-500">
                  <FadeText>{t.bento.card2Passenger}</FadeText>
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-200">H. KIM</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.18em] text-zinc-500">
                  <FadeText>{t.bento.card2Seat}</FadeText>
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-200">32A</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.18em] text-zinc-500">
                  <FadeText>{t.bento.card2Boarding}</FadeText>
                </p>
                <p className="mt-0.5 text-[10px] text-[#00F5A0]">06:55</p>
              </div>
            </div>
          </div>

          {/* barcode strip */}
          <div className="flex h-6 items-end gap-[3px] px-5 pb-3 opacity-70" aria-hidden>
            {Array.from({ length: 64 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 bg-zinc-400"
                style={{ height: `${40 + ((i * 7919) % 61)}%`, opacity: (i * 7919) % 3 ? 0.7 : 0.25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Cursor-following spotlight border card ───────────────── */

export function SpotlightCard({
  children,
  className,
  glow = "mint",
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "mint" | "ink" | "dual";
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const glowGradient =
    glow === "mint"
      ? "rgba(0, 245, 160, 0.16)"
      : glow === "ink"
        ? "rgba(99, 102, 241, 0.18)"
        : "rgba(99, 102, 241, 0.13), rgba(0, 245, 160, 0.10)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group/card relative rounded-2xl",
        // spotlight border layer
        "before:absolute before:inset-0 before:rounded-2xl before:p-px before:content-['']",
        "before:bg-[radial-gradient(560px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.22),transparent_45%)]",
        "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
        "before:[mask-composite:exclude]",
        "before:pointer-events-none",
        className
      )}
    >
      {/* ambient glow behind card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[32px] opacity-0 blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), ${glowGradient}, transparent 70%)`,
        }}
      />
      {/* inner surface */}
      <div className="glass hairline-top relative h-full overflow-hidden rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}

/* ── Count-up number (animates on scroll into view) ───────── */

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 1.8,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(
    `${prefix}${(0).toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ── Cyber backdrop: dot-matrix grid + ambient radial glows ─ */

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base canvas tint */}
      <div className="absolute inset-0 bg-[#090A0F]" />
      {/* cybernetic grid + dot matrix */}
      <div className="absolute inset-0 backdrop-grid mask-fade-y opacity-90" />
      <div className="absolute inset-0 backdrop-dots mask-fade-radial opacity-70" />
      {/* ambient glows */}
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,245,160,0.075),transparent)] blur-2xl" />
      <div className="absolute top-[38%] -right-56 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.085),transparent)] blur-2xl" />
      <div className="absolute bottom-[-200px] -left-56 h-[560px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(0,245,160,0.05),transparent)] blur-2xl" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_40%,transparent_55%,rgba(0,0,0,0.5))]" />
    </div>
  );
}

/* ── Section reveal wrapper ───────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Kicker chip ──────────────────────────────────────────── */

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
      <span className="h-1 w-1 rounded-full bg-[#00F5A0]" />
      {children}
    </div>
  );
}

/* ── Tilt wrapper (wallet pass QR tilt) ───────────────────── */

export function Tilt({
  children,
  className,
  max = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("[perspective:1000px]", className)}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, FadeText } from "./i18n";
import { useInquiry } from "./inquiry-drawer";
import { SpotlightCard, Reveal, CountUp, Kicker } from "./shared";
import { MiniCandles } from "./mini-candles";
import { WalletPass } from "./wallet-pass";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Bot,
  Check,
  Database,
  Gauge,
  GraduationCap,
  LineChart,
  Quote,
  ShieldCheck,
  Signal,
  Workflow,
} from "lucide-react";

/* ── Card 1 · FinTech Lab ─────────────────────────────────── */

function FinTechCard() {
  const { t } = useLanguage();
  const features = [t.bento.card1F1, t.bento.card1F2, t.bento.card1F3];
  const icons = [Bot, LineChart, GraduationCap];

  return (
    <SpotlightCard glow="mint" className="h-full">
      <div className="grid h-full grid-cols-1 sm:grid-cols-[1fr_1.1fr]">
        {/* copy */}
        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00F5A0]">
              <FadeText>{t.bento.card1Tag}</FadeText>
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-[#00F5A0]/25 bg-[#00F5A0]/[0.07] px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#00F5A0]">
              <span className="h-1 w-1 animate-blink rounded-full bg-[#00F5A0]" />
              LIVE
            </span>
          </div>
          <h3 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-white">
            <FadeText>{t.bento.card1Title}</FadeText>
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-400">
            <FadeText>{t.bento.card1Desc}</FadeText>
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {features.map((f, i) => {
              const Icon = icons[i];
              return (
                <li key={f} className="flex items-center gap-2.5 text-[12.5px] text-zinc-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05]">
                    <Icon className="h-3 w-3 text-[#00F5A0]" />
                  </span>
                  <FadeText>{f}</FadeText>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] tracking-wider text-zinc-400">
              EXEC &lt;<CountUp value={12} duration={1.4} />ms
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] tracking-wider text-zinc-400">
              SHARPE <CountUp value={3.4} decimals={1} duration={1.6} />
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9.5px] tracking-wider text-zinc-400">
              iOS + ANDROID
            </span>
          </div>
        </div>

        {/* live chart visual */}
        <div className="relative min-h-[220px] border-t border-white/[0.06] sm:border-l sm:border-t-0">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-4 pt-3.5 font-mono text-[9px] tracking-[0.18em] text-zinc-500">
              <span>CANDLEQ · FX SIM</span>
              <span className="flex items-center gap-1 text-[#00F5A0]">
                <Signal className="h-3 w-3" /> MA7 / MA25
              </span>
            </div>
            <div className="min-h-0 flex-1 p-2">
              <MiniCandles />
            </div>
            <div className="grid grid-cols-3 border-t border-white/[0.06] font-mono text-[9px]">
              <div className="px-4 py-2">
                <p className="text-zinc-500">WIN RATE</p>
                <p className="mt-0.5 text-[11px] text-zinc-200">
                  <CountUp value={68.2} decimals={1} suffix="%" duration={1.7} />
                </p>
              </div>
              <div className="border-x border-white/[0.06] px-4 py-2">
                <p className="text-zinc-500">ORDERS / DAY</p>
                <p className="mt-0.5 text-[11px] text-zinc-200">
                  <CountUp value={12400} duration={1.9} />
                </p>
              </div>
              <div className="px-4 py-2">
                <p className="text-zinc-500">SLIPPAGE</p>
                <p className="mt-0.5 text-[11px] text-[#00F5A0]">0.2 pips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Card 2 · TravelTech ──────────────────────────────────── */

function TravelCard() {
  const { t } = useLanguage();
  return (
    <SpotlightCard glow="ink" className="h-full">
      <div className="flex h-full flex-col p-6 sm:p-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#818CF8]">
          <FadeText>{t.bento.card2Tag}</FadeText>
        </span>
        <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-white">
          <FadeText>{t.bento.card2Title}</FadeText>
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">
          <FadeText>{t.bento.card2Desc}</FadeText>
        </p>
        <div className="mt-5">
          <WalletPass />
        </div>
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
          <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#818CF8]" />
          <p className="text-[12px] font-medium leading-relaxed text-zinc-300">
            <FadeText>{t.bento.card2Tagline}</FadeText>
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Card 3 · Enterprise Cloud ────────────────────────────── */

const REGIONS = [
  { id: "ap-northeast-2", ms: 3, load: 0.18 },
  { id: "ap-northeast-1", ms: 28, load: 0.42 },
  { id: "us-east-1", ms: 132, load: 0.61 },
  { id: "eu-west-1", ms: 187, load: 0.35 },
];

function CloudCard() {
  const { t } = useLanguage();
  return (
    <SpotlightCard glow="ink" className="h-full">
      <div className="flex h-full flex-col p-6 sm:p-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#818CF8]">
          <FadeText>{t.bento.card3Tag}</FadeText>
        </span>
        <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-white">
          <FadeText>{t.bento.card3Title}</FadeText>
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">
          <FadeText>{t.bento.card3Desc}</FadeText>
        </p>

        {/* providers */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { name: "AWS", dot: "#FF9900", cert: "SAP-C02" },
            { name: "AZURE", dot: "#38BDF8", cert: "AZ-305" },
            { name: "GCP", dot: "#4285F4", cert: "PCA" },
          ].map((p) => (
            <span
              key={p.name}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.dot }} />
              <span className="font-mono text-[10px] tracking-wider text-zinc-200">{p.name}</span>
              <span className="font-mono text-[8.5px] text-zinc-500">{p.cert}</span>
              <Check className="h-3 w-3 text-[#00F5A0]" />
            </span>
          ))}
        </div>

        {/* websocket pipeline */}
        <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/30 p-3.5">
          <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] text-zinc-500">
            <span>
              <FadeText>{t.bento.card3Pipelines}</FadeText>
            </span>
            <span className="flex items-center gap-1 text-[#00F5A0]">
              <span className="h-1 w-1 animate-blink rounded-full bg-[#00F5A0]" />
              STABLE
            </span>
          </div>
          <svg viewBox="0 0 300 40" className="mt-2 h-10 w-full" aria-hidden>
            <path d="M6 20 C 60 20, 90 6, 150 20 S 250 34, 294 18" fill="none" stroke="rgba(99,102,241,0.35)" strokeWidth="1.5" />
            <path
              d="M6 20 C 60 20, 90 6, 150 20 S 250 34, 294 18"
              fill="none"
              stroke="#00F5A0"
              strokeWidth="1.5"
              strokeDasharray="4 20"
              className="animate-flow"
            />
            <circle cx="6" cy="20" r="3" fill="#00F5A0" />
            <circle cx="150" cy="20" r="3" fill="#6366F1" />
            <circle cx="294" cy="18" r="3" fill="#00F5A0" />
          </svg>
          <div className="mt-1 flex flex-col gap-1.5">
            {REGIONS.map((r) => (
              <div key={r.id} className="flex items-center gap-2 font-mono text-[9px]">
                <span className="w-[104px] shrink-0 text-zinc-400">{r.id}</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00F5A0]/80 to-[#6366F1]/80"
                    style={{ width: `${Math.max(8, 100 - r.ms / 2.2)}%` }}
                  />
                </div>
                <span className="w-11 shrink-0 text-right text-zinc-300 tabular-nums">{r.ms}ms</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Database className="h-3.5 w-3.5 text-[#818CF8]" /> High-concurrency DB
            </span>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8.5px] tracking-[0.18em] text-zinc-500">
              <FadeText>{t.bento.card3Concurrency}</FadeText>
            </p>
            <p className="font-mono text-[13px] font-semibold text-white">
              <CountUp value={84} duration={1.6} />k+
            </p>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Card 4 · Bespoke Development ─────────────────────────── */

type Cat = "all" | "frontend" | "mobile" | "backend" | "infra";

const STACK: { name: string; cat: Exclude<Cat, "all">; note?: string }[] = [
  { name: "Next.js", cat: "frontend" },
  { name: "TypeScript", cat: "frontend" },
  { name: "React 19", cat: "frontend" },
  { name: "Tailwind CSS", cat: "frontend" },
  { name: "Flutter", cat: "mobile" },
  { name: "Swift", cat: "mobile" },
  { name: "Kotlin", cat: "mobile" },
  { name: "React Native", cat: "mobile" },
  { name: "Python FastAPI", cat: "backend" },
  { name: "Go", cat: "backend" },
  { name: "gRPC", cat: "backend" },
  { name: "PostgreSQL", cat: "backend" },
  { name: "Redis", cat: "backend" },
  { name: "Docker", cat: "infra" },
  { name: "Kubernetes", cat: "infra" },
  { name: "Terraform", cat: "infra" },
  { name: "AWS", cat: "infra" },
  { name: "Azure", cat: "infra" },
  { name: "GCP", cat: "infra" },
];

const DEPLOY_LINES = [
  "$ terraform apply -var env=prod · ✓ 42s",
  "$ kubectl rollout status api · ✓ 0 downtime",
  "$ wrangler deploy edge/worker · ✓ 118 pop",
  "$ pnpm test --coverage · ✓ 2,481 passed",
];

function BespokeCard() {
  const { t } = useLanguage();
  const { open } = useInquiry();
  const [cat, setCat] = useState<Cat>("all");
  const [line, setLine] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setLine((l) => (l + 1) % DEPLOY_LINES.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const filters: { key: Cat; label: string }[] = [
    { key: "all", label: t.bento.filterAll },
    { key: "frontend", label: t.bento.filterFrontend },
    { key: "mobile", label: t.bento.filterMobile },
    { key: "backend", label: t.bento.filterBackend },
    { key: "infra", label: t.bento.filterInfra },
  ];

  const visible = STACK.filter((s) => cat === "all" || s.cat === cat);

  return (
    <SpotlightCard glow="dual" className="h-full">
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-[480px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00F5A0]">
              <FadeText>{t.bento.card4Tag}</FadeText>
            </span>
            <h3 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-white">
              <FadeText>{t.bento.card4Title}</FadeText>
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-400">
              <FadeText>{t.bento.card4Desc}</FadeText>
            </p>
          </div>
          {/* mini terminal */}
          <div className="hidden w-[280px] shrink-0 rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-3 md:block">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FF5470]/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-[#00F5A0]/70" />
              <span className="ml-2 font-mono text-[8.5px] tracking-[0.18em] text-zinc-600">
                hokulio · ci
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="mt-2.5 break-keep font-mono text-[10px] leading-relaxed text-[#00F5A0]/90"
              >
                {DEPLOY_LINES[line]}
                <span className="animate-blink ml-0.5 inline-block h-3 w-[6px] translate-y-[2px] bg-[#00F5A0]/80" />
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* filter */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setCat(f.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-all duration-200",
                cat === f.key
                  ? "border-[#00F5A0]/45 bg-[#00F5A0]/[0.09] text-[#00F5A0]"
                  : "border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
              )}
            >
              <FadeText>{f.label}</FadeText>
            </button>
          ))}
        </div>

        {/* pills */}
        <motion.div layout className="mt-4 flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {visible.map((s) => (
              <motion.span
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group/pill flex cursor-default items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-[12px] font-medium text-zinc-300 transition-colors duration-200 hover:border-[#00F5A0]/40 hover:bg-[#00F5A0]/[0.06] hover:text-white"
              >
                <span className="h-1 w-1 rounded-full bg-[#6366F1] transition-colors group-hover/pill:bg-[#00F5A0]" />
                {s.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00F5A0]" /> SOC2-ready process
            </span>
            <span className="flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5 text-[#818CF8]" /> CI/CD by default
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Gauge className="h-3.5 w-3.5 text-[#00F5A0]" /> SLO-driven ops
            </span>
          </div>
          <button
            onClick={() => open(3)}
            className="group flex items-center gap-1.5 text-[12.5px] font-medium text-[#00F5A0] transition-colors hover:text-[#3DFFB8]"
          >
            <FadeText>{t.contact.cta}</FadeText>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Bento section ────────────────────────────────────────── */

export function Bento() {
  const { t } = useLanguage();
  return (
    <section id="fintech" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal className="flex flex-col items-start gap-5">
          <Kicker>{t.bento.kicker}</Kicker>
          <h2 className="max-w-[640px] text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[40px]">
            <FadeText block>{t.bento.title}</FadeText>
            <FadeText block className="text-gradient-ink">
              {t.bento.titleAccent}
            </FadeText>
          </h2>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-zinc-400">
            <FadeText>{t.bento.sub}</FadeText>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          <Reveal delay={0.05} className="lg:col-span-2">
            <FinTechCard />
          </Reveal>
          <Reveal id="traveltech" delay={0.12} className="scroll-mt-28">
            <TravelCard />
          </Reveal>
          <Reveal id="cloud" delay={0.05} className="scroll-mt-28">
            <CloudCard />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-2">
            <BespokeCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

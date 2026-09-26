"use client";

import React from "react";
import { useLanguage, FadeText } from "./i18n";
import { useInquiry } from "./inquiry-drawer";
import { CountUp, Reveal, Kicker, SpotlightCard } from "./shared";
import { BrandMark } from "./navbar";
import {
  Activity,
  ArrowRight,
  Cloud,
  Github,
  Mail,
  Sparkles,
} from "lucide-react";

/* ── Metric strip ─────────────────────────────────────────── */

export function MetricStrip() {
  const { t } = useLanguage();
  return (
    <section aria-label="Service guarantees" className="relative py-6 sm:py-8">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal>
          <div className="glass hairline-top relative overflow-hidden rounded-2xl">
            {/* shimmer sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.045)_48%,transparent_62%)] bg-[length:220%_100%]"
              style={{ animation: "hk-shimmer 5.5s linear infinite" }}
            />
            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.07] sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              {t.metrics.items.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col gap-1.5 px-5 py-5 sm:px-6 sm:py-6 ${
                    i === 4 ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""
                  }`}
                >
                  <span className="font-mono text-[26px] font-semibold leading-none tracking-tight text-white tabular-nums">
                    <CountUp
                      value={m.value}
                      decimals={m.decimals}
                      suffix={m.suffix}
                      duration={1.6 + i * 0.15}
                    />
                  </span>
                  <span className="text-[11px] leading-snug text-zinc-500">
                    <FadeText>{m.label}</FadeText>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Philosophy ───────────────────────────────────────────── */

export function Philosophy() {
  const { t } = useLanguage();
  return (
    <section id="philosophy" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky heading */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>{t.philosophy.kicker}</Kicker>
            <h2 className="mt-5 text-[30px] font-semibold leading-[1.14] tracking-[-0.02em] text-white sm:text-[38px]">
              <FadeText block>{t.philosophy.title}</FadeText>
            </h2>
            <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-zinc-400">
              <FadeText>{t.philosophy.sub}</FadeText>
            </p>
            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <div className="h-px w-16 bg-gradient-to-r from-[#00F5A0]/60 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">
                HK·DOCTRINE
              </span>
            </div>
          </Reveal>

          {/* principles */}
          <div className="flex flex-col">
            {t.philosophy.principles.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.06}>
                <div className="group relative flex gap-6 border-b border-white/[0.07] py-7 first:pt-0 sm:gap-9">
                  <span className="font-mono text-[13px] leading-7 text-[#00F5A0]/80 transition-colors group-hover:text-[#00F5A0]">
                    {p.no}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-tight text-white sm:text-[21px]">
                      <FadeText>{p.title}</FadeText>
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-zinc-400">
                      <FadeText>{p.body}</FadeText>
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#00F5A0]/50 to-[#6366F1]/50 transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact CTA ──────────────────────────────────────────── */

export function Contact() {
  const { t } = useLanguage();
  const { open } = useInquiry();
  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal>
          <SpotlightCard glow="dual" lift={false} className="overflow-hidden">
            <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
              {/* interior glows */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,245,160,0.14),transparent)] blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/4 h-[220px] w-[420px] translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.16),transparent)] blur-2xl"
              />
              <div className="relative flex flex-col items-center">
                <Kicker>{t.contact.kicker}</Kicker>
                <h2 className="mt-6 max-w-[620px] text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[44px]">
                  <FadeText block>{t.contact.title}</FadeText>
                </h2>
                <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-zinc-400">
                  <FadeText>{t.contact.sub}</FadeText>
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
                  <button
                    onClick={() => open()}
                    className="glow-cta group flex h-12 items-center gap-2 rounded-xl bg-[#00F5A0] px-7 text-[14.5px] font-semibold tracking-tight text-[#05130D] transition-all duration-300 hover:bg-[#3DFFB8]"
                  >
                    <Sparkles className="h-4 w-4" />
                    <FadeText>{t.contact.cta}</FadeText>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 font-mono text-[13px] text-zinc-200 transition-all duration-300 hover:border-white/25 hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#00F5A0]" />
                    {t.contact.email}
                  </a>
                </div>
                <p className="mt-7 font-mono text-[10.5px] tracking-wide text-zinc-600">
                  <FadeText>{t.contact.note}</FadeText>
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

export function Footer() {
  const { t, locale } = useLanguage();
  const { open } = useInquiry();

  const cols = [
    {
      title: t.footer.products,
      links: [
        { label: "CandleQ", href: "#fintech", icon: Activity },
        { label: "TourPass", href: "#traveltech", icon: Sparkles },
        { label: "Algo Engines", href: "#fintech", icon: Activity },
        { label: "Cloud Templates", href: "#cloud", icon: Cloud },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.philosophy, href: "#philosophy" },
        { label: t.nav.contact, href: "#contact" },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: "GitHub", href: "https://github.com/khwcomi", icon: Github },
        { label: t.contact.email, href: `mailto:${t.contact.email}`, icon: Mail },
      ],
    },
  ];

  return (
    <footer className="relative mt-auto border-t border-white/[0.07]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-7 w-7" />
              <span className="text-[16px] font-semibold tracking-tight text-white">Hokulio</span>
            </div>
            <p className="mt-3.5 max-w-[260px] text-[13px] leading-relaxed text-zinc-500">
              <FadeText>{t.footer.tagline}</FadeText>
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00F5A0]/20 bg-[#00F5A0]/[0.05] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-[#00F5A0]" />
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#7CF5C6]">
                <FadeText>{t.footer.allSystems}</FadeText>
              </span>
            </div>
          </div>

          {/* link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                <FadeText>{col.title}</FadeText>
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 transition-colors hover:text-white"
                    >
                      {l.icon && <l.icon className="h-3.5 w-3.5" />}
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] tracking-wide text-zinc-600">
            <FadeText>{t.footer.rights}</FadeText>
          </p>
          <div className="flex items-center gap-4 font-mono text-[10.5px] tracking-wide text-zinc-600">
            <span className="hidden sm:inline">37.5665°N, 126.9780°E · SEOUL</span>
            <span className="rounded border border-white/10 px-1.5 py-0.5 uppercase">
              {locale}
            </span>
            <button
              onClick={() => open()}
              className="text-zinc-500 transition-colors hover:text-[#00F5A0]"
            >
              <FadeText>{t.nav.cta}</FadeText>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

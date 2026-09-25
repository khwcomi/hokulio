"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage, FadeText } from "./i18n";
import { useInquiry } from "./inquiry-drawer";
import { TelemetryConsole } from "./telemetry-console";
import { ArrowDown, ArrowRight, FlaskConical, MousePointer2 } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();
  const { open } = useInquiry();

  return (
    <section id="top" className="relative overflow-hidden pt-[130px] sm:pt-[150px]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-24">
          {/* Copy */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00F5A0]/15">
                <FlaskConical className="h-3 w-3 text-[#00F5A0]" />
              </span>
              <span className="text-[11.5px] font-medium tracking-wide text-zinc-300">
                <FadeText>{t.hero.badge}</FadeText>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-[54px] lg:text-[58px]"
            >
              <FadeText block>{t.hero.titleA}</FadeText>
              <FadeText block className="text-gradient-mint pb-1.5">
                {t.hero.titleB}
              </FadeText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[540px] text-[15.5px] leading-relaxed text-zinc-400 sm:text-base"
            >
              <FadeText>{t.hero.sub}</FadeText>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#fintech"
                className="glow-cta group flex h-12 items-center gap-2 rounded-xl bg-[#00F5A0] px-6 text-[14.5px] font-semibold tracking-tight text-[#05130D] transition-all duration-300 hover:bg-[#3DFFB8]"
              >
                <FadeText>{t.hero.ctaPrimary}</FadeText>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => open()}
                className="flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 text-[14.5px] font-medium tracking-tight text-zinc-200 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                <FadeText>{t.hero.ctaSecondary}</FadeText>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600"
            >
              <MousePointer2 className="h-3 w-3" />
              <FadeText>{t.hero.scroll}</FadeText>
              <ArrowDown className="h-3 w-3 animate-bounce" />
            </motion.div>
          </div>

          {/* Live telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* console halo */}
            <div
              aria-hidden
              className="absolute -inset-10 rounded-[40px] bg-[radial-gradient(420px_circle_at_60%_35%,rgba(0,245,160,0.09),transparent_65%),radial-gradient(380px_circle_at_25%_75%,rgba(99,102,241,0.11),transparent_65%)] blur-xl"
            />
            <div className="relative">
              <TelemetryConsole />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

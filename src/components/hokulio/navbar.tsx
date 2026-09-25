"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage, LOCALES, FadeText } from "./i18n";
import { useInquiry } from "./inquiry-drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ChevronDown, Globe, Menu, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="hk-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F5A0" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" stroke="url(#hk-g)" strokeWidth="2" />
      <path d="M10 23V9M22 23V9M10 16H22" stroke="url(#hk-g)" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="22" cy="9" r="2.4" fill="#00F5A0" />
    </svg>
  );
}

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { open } = useInquiry();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#fintech", label: t.nav.fintech },
    { href: "#traveltech", label: t.nav.traveltech },
    { href: "#cloud", label: t.nav.cloud },
    { href: "#philosophy", label: t.nav.philosophy },
    { href: "#contact", label: t.nav.contact },
  ];

  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6",
          scrolled && "glass-strong"
        )}
      >
        {/* Brand + status */}
        <Link href="#top" className="group flex items-center gap-3" aria-label="Hokulio home">
          <BrandMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[8deg]" />
          <div className="flex flex-col">
            <span className="text-[17px] font-semibold leading-none tracking-tight text-white">
              Hokulio
              <span className="ml-1 align-super font-mono text-[9px] text-[#00F5A0]">®</span>
            </span>
            <span className="mt-1 hidden items-center gap-1.5 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-[#00F5A0]" />
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-zinc-500">
                <FadeText>{t.nav.status}</FadeText>
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-zinc-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              <FadeText>{l.label}</FadeText>
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Switch language"
              className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs font-medium text-zinc-300 outline-none transition-colors hover:border-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00F5A0]/40"
            >
              <Globe className="h-3.5 w-3.5 text-[#00F5A0]" />
              <span className="font-mono tracking-wide">{current.short}</span>
              <ChevronDown className="h-3 w-3 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-44 rounded-xl border-white/10 bg-[#0D0F16]/95 p-1.5 backdrop-blur-2xl"
            >
              {LOCALES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-[13px] text-zinc-300 outline-none transition-colors focus:bg-white/[0.06] focus:text-white",
                    locale === l.code && "text-white"
                  )}
                >
                  <span>{l.label}</span>
                  {locale === l.code ? (
                    <Check className="h-3.5 w-3.5 text-[#00F5A0]" />
                  ) : (
                    <span className="font-mono text-[10px] text-zinc-600">{l.short}</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA */}
          <button
            onClick={() => open()}
            className="glow-cta group hidden h-9 items-center gap-2 rounded-lg bg-[#00F5A0] px-4 text-[13px] font-semibold tracking-tight text-[#05130D] transition-all duration-300 hover:bg-[#3DFFB8] md:flex"
          >
            <TerminalSquare className="h-4 w-4" />
            <FadeText>{t.nav.cta}</FadeText>
          </button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label={t.nav.menu}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:text-white lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-white/10 bg-[#0D0F16]/95 backdrop-blur-2xl"
            >
              <SheetHeader className="pb-0 text-left">
                <SheetTitle className="flex items-center gap-2.5 font-sans">
                  <BrandMark className="h-7 w-7" />
                  <span className="text-white">Hokulio</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pt-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <FadeText>{l.label}</FadeText>
                  </Link>
                ))}
                <div className="mt-4 grid grid-cols-4 gap-1.5 border-t border-white/10 pt-4">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLocale(l.code)}
                      className={cn(
                        "rounded-lg border px-2 py-2 font-mono text-xs transition-colors",
                        locale === l.code
                          ? "border-[#00F5A0]/50 bg-[#00F5A0]/[0.1] text-[#00F5A0]"
                          : "border-white/10 text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {l.short}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    open();
                  }}
                  className="glow-cta mt-4 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00F5A0] text-sm font-semibold text-[#05130D]"
                >
                  <FadeText>{t.nav.cta}</FadeText>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* bottom hairline when scrolled */}
      <div
        className={cn(
          "mx-auto h-px max-w-[1280px] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </motion.header>
  );
}

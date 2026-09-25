"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, FadeText } from "./i18n";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CloudCog,
  Map,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Context so any section can open the brief drawer ─────── */

interface InquiryCtx {
  open: (preset?: number) => void;
}

const Ctx = createContext<InquiryCtx>({ open: () => {} });
export const useInquiry = () => useContext(Ctx);

const TYPE_ICONS = [Bot, Map, CloudCog, Smartphone];

export function InquiryDrawerProvider({ children }: { children: React.ReactNode }) {
  const [openState, setOpenState] = useState(false);
  const [typeIdx, setTypeIdx] = useState(0);
  const [budgetIdx, setBudgetIdx] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [refCode, setRefCode] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const open = useCallback((p?: number) => {
    if (typeof p === "number") setTypeIdx(p);
    setOpenState(true);
  }, []);

  const ctx = useMemo(() => ({ open }), [open]);

  // when transitioning to the success panel, reveal it from the top
  useEffect(() => {
    if (phase === "done") contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || phase !== "form") return;
    setPhase("sending");
    // Simulated transmission — replaced by real API integration in production
    window.setTimeout(() => {
      setRefCode(
        `HK-REF-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${new Date().getFullYear()}`
      );
      setPhase("done");
      toast({ title: t.drawer.toastTitle, description: t.drawer.toastBody });
    }, 1100);
  };

  const reset = () => {
    setPhase("form");
    setName("");
    setEmail("");
    setDetails("");
    setBudgetIdx(1);
  };

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <Drawer
        open={openState}
        onOpenChange={(o) => {
          setOpenState(o);
          if (!o && phase === "done") reset();
        }}
      >
        <DrawerContent
          ref={contentRef}
          className="mx-auto max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-t-2xl border-white/10 bg-[#0D0F16]/95 backdrop-blur-2xl hk-scroll sm:rounded-t-2xl"
        >
          <DrawerHeader className="pb-2 pt-6 text-left">
            <DrawerTitle className="flex items-center gap-2.5 font-sans text-lg font-semibold tracking-tight text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                <TerminalSquare className="h-4 w-4 text-[#00F5A0]" />
              </span>
              <FadeText>{t.drawer.title}</FadeText>
            </DrawerTitle>
            <p className="pt-1 text-sm leading-relaxed text-zinc-400">
              <FadeText>{t.drawer.sub}</FadeText>
            </p>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#00F5A0]/20 bg-[#00F5A0]/[0.06] px-3 py-2.5">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00F5A0]" />
              <p className="text-xs leading-relaxed text-[#7CF5C6]">
                <FadeText>{t.drawer.archNote}</FadeText>
              </p>
            </div>
          </DrawerHeader>

          {phase !== "done" ? (
            <form onSubmit={submit} className="flex flex-col gap-5 px-4 pb-8 sm:px-6">
              {/* Project type */}
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  <FadeText>{t.drawer.projectType}</FadeText>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {t.drawer.types.map((label, i) => {
                    const Icon = TYPE_ICONS[i];
                    const active = typeIdx === i;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setTypeIdx(i)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200",
                          active
                            ? "border-[#00F5A0]/50 bg-[#00F5A0]/[0.08] text-white shadow-[0_0_20px_rgba(0,245,160,0.12)]"
                            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            active ? "text-[#00F5A0]" : "text-zinc-500"
                          )}
                        />
                        <span className="truncate">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name + email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="hk-name" className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    <FadeText>{t.drawer.name}</FadeText>
                  </Label>
                  <Input
                    id="hk-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.drawer.namePh}
                    className="border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:ring-[#00F5A0]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="hk-email" className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    <FadeText>{t.drawer.email}</FadeText>
                  </Label>
                  <Input
                    id="hk-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.drawer.emailPh}
                    className="border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:ring-[#00F5A0]/40"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  <FadeText>{t.drawer.budget}</FadeText>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {t.drawer.budgets.map((b, i) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudgetIdx(i)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200",
                        budgetIdx === i
                          ? "border-[#6366F1]/60 bg-[#6366F1]/[0.14] text-white"
                          : "border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="hk-details" className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  <FadeText>{t.drawer.details}</FadeText>
                </Label>
                <Textarea
                  id="hk-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={t.drawer.detailsPh}
                  rows={4}
                  className="resize-none border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:ring-[#00F5A0]/40"
                />
              </div>

              <button
                type="submit"
                disabled={!valid || phase !== "form"}
                className={cn(
                  "group flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300",
                  valid
                    ? "glow-cta bg-[#00F5A0] text-[#05130D] hover:bg-[#3DFFB8]"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-zinc-600"
                )}
              >
                {phase === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <FadeText>{t.drawer.submitting}</FadeText>
                  </>
                ) : (
                  <>
                    <FadeText>{t.drawer.submit}</FadeText>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 px-6 pb-10 pt-4 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                <CheckCircle2 className="h-12 w-12 text-[#00F5A0]" />
              </motion.div>
              <h3 className="font-sans text-xl font-semibold tracking-tight text-white">
                <FadeText>{t.drawer.successTitle}</FadeText>
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                <FadeText>{t.drawer.successBody}</FadeText>
              </p>
              <code className="rounded-lg border border-white/10 bg-black/40 px-4 py-2 font-mono text-sm text-[#00F5A0]">
                {refCode}
              </code>
              <button
                onClick={() => {
                  setOpenState(false);
                  window.setTimeout(reset, 350);
                }}
                className="mt-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <FadeText>{t.drawer.close}</FadeText>
              </button>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </Ctx.Provider>
  );
}

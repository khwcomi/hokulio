"use client";

import { LanguageProvider } from "@/components/hokulio/i18n";
import { InquiryDrawerProvider } from "@/components/hokulio/inquiry-drawer";
import { Backdrop } from "@/components/hokulio/shared";
import { Navbar } from "@/components/hokulio/navbar";
import { Hero } from "@/components/hokulio/hero";
import { Bento } from "@/components/hokulio/bento";
import { MetricStrip, Philosophy, Contact, Footer } from "@/components/hokulio/sections";

export default function Home() {
  return (
    <LanguageProvider>
      <InquiryDrawerProvider>
        <div className="relative flex min-h-screen flex-col">
          <Backdrop />
          <Navbar />
          <main className="flex-1">
            <Hero />
            <Bento />
            <MetricStrip />
            <Philosophy />
            <Contact />
          </main>
          <Footer />
        </div>
      </InquiryDrawerProvider>
    </LanguageProvider>
  );
}

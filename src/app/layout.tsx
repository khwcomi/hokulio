import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hokulio — Turning Complex Hypotheses Into Scalable Production Code",
  description:
    "Hokulio is a premier full-stack engineering collective and proprietary product laboratory — institutional-grade algorithmic trading engines, Apple/Google Wallet travel ecosystems, and resilient AWS/Azure/GCP cloud architecture.",
  keywords: [
    "Hokulio",
    "algorithmic trading",
    "fintech engineering",
    "TravelTech",
    "enterprise cloud",
    "AWS",
    "Azure",
    "GCP",
    "bespoke software development",
  ],
  authors: [{ name: "Hokulio Labs" }],
  icons: {
    icon: "/hokulio-mark.svg",
  },
  openGraph: {
    title: "Hokulio — Bespoke Full-Stack Engineering & Proprietary Tech Lab",
    description:
      "Architects of institutional-grade algorithmic bots, Apple/Google Wallet travel ecosystems, and resilient AWS/Azure/GCP cloud backbones.",
    url: "https://hokulio.com",
    siteName: "Hokulio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hokulio — Bespoke Full-Stack Engineering",
    description:
      "Institutional-grade algorithmic trading, TravelTech ecosystems, and multi-cloud architecture.",
  },
};

export const viewport: Viewport = {
  themeColor: "#090A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans tracking-tight`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

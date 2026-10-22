import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { Mail } from "lucide-react";
import { ContactCard } from "@/components/contact/ContactCard.tsx";

export const metadata: Metadata = {
  title: "Contact & Communication Channels",
  description:
    "Direct contact options, verified public profiles, and communication guidelines for Eshan Roy (eshanized).",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--coral)]">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT CONTACT &amp; COMMUNICATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Initiate Direct Dialogue
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          I welcome technical correspondence regarding autonomous systems engineering, kernel-level Linux development, systems research, and open-source infrastructure.
        </p>
      </div>

      {/* Main Interactive Contact Component */}
      <ContactCard />
    </main>
  );
}

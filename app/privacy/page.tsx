import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Operational Transparency",
  description:
    "Zero tracking, zero commercial cookies, and local browser storage disclosure for Eshan Roy's engineering portfolio.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-emerald-500">
          <Shield className="w-3.5 h-3.5" />
          <span>TRANSPARENCY &amp; PRIVACY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Privacy Policy &amp; Data Transparency
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          This publication is engineered under sovereign, privacy-respecting principles. We believe personal developer portfolios should never subject visitors to surveillance capitalism.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
        {/* Core Guarantees */}
        <section className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)]">
            Core Privacy Guarantees
          </h2>
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Third-Party Telemetry:</strong> No Google Analytics, no Facebook pixels, no fingerprinting scripts.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Tracking Cookies:</strong> We do not issue or store advertising or behavioral tracking cookies.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Local Storage Use:</strong> Browser localStorage is used strictly to remember your visual theme preference (dark/light mode).
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Self-Contained Fonts:</strong> All typography is statically bundled; no external requests are made to third-party font networks.
              </span>
            </div>
          </div>
        </section>

        {/* Server Logs */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)]">
            Server Invariants &amp; Network Logging
          </h2>
          <p>
            When you request resources from <code className="text-xs bg-[var(--canvas-subtle)] px-1 py-0.5 rounded text-[var(--coral)]">{SITE_CONFIG.canonicalOrigin}</code>, standard web server logs (Apache / CDN edge nodes) record fundamental HTTP request data (IP address, user agent, requested URI, timestamp) strictly for transient network routing, rate limiting, and DDoS defense. These logs are automatically rotated and never combined with cross-site tracking profiles.
          </p>
        </section>

        {/* Inquiries */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)]">
            Contact Data
          </h2>
          <p>
            When you send an email to <code className="text-xs bg-[var(--canvas-subtle)] px-1 py-0.5 rounded text-[var(--coral)]">{SITE_CONFIG.email}</code>, your message and email address are used solely to converse with you. Your correspondence is never sold, leased, or added to marketing newsletters.
          </p>
        </section>

        {/* Return to Home */}
        <div className="pt-4 border-t border-[var(--border-subtle)]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--coral)] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

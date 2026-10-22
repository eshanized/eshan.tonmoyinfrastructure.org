import React from "react";
import Link from "next/link";
import { Rss, ExternalLink, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons.tsx";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--canvas-subtle)] text-[var(--ink-secondary)] text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Identity & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[var(--ink-primary)]">
              <div className="w-6 h-6 rounded bg-[var(--coral)]/10 border border-[var(--coral)]/30 flex items-center justify-center text-[var(--coral)]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-base tracking-tight">
                {SITE_CONFIG.name}
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                ({SITE_CONFIG.handle})
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-md text-[var(--ink-muted)]">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-2 text-xs font-mono text-[var(--ink-muted)] space-y-1">
              <p>
                Founder & Principal Architect at{" "}
                <a
                  href={SITE_CONFIG.organization.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--coral)] hover:underline inline-flex items-center gap-1"
                >
                  {SITE_CONFIG.organization.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p>Canonical: {SITE_CONFIG.canonicalOrigin}</p>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-primary)] font-semibold">
              Publication
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/research" className="hover:text-[var(--coral)] transition-colors">
                  Research & Papers
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[var(--coral)] transition-colors">
                  Engineering Journal
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--coral)] transition-colors">
                  Project Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--coral)] transition-colors">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/now" className="hover:text-[var(--coral)] transition-colors">
                  Now / Priorities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--coral)] transition-colors">
                  Direct Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--coral)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Feeds & Network */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-primary)] font-semibold">
              Feeds & Profiles
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="/feed.xml"
                  target="_blank"
                  rel="alternate"
                  type="application/rss+xml"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5 text-amber-500" />
                  <span>Combined RSS Feed</span>
                </a>
              </li>
              <li>
                <a
                  href="/journal-feed.xml"
                  target="_blank"
                  rel="alternate"
                  type="application/rss+xml"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Journal RSS Feed</span>
                </a>
              </li>
              <li>
                <a
                  href="/research-feed.xml"
                  target="_blank"
                  rel="alternate"
                  type="application/rss+xml"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Research RSS Feed</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (@eshanized)</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socialLinks.crates}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>crates.io / eshanized</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socialLinks.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[var(--coral)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Hugging Face</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--ink-muted)]">
          <p>© {new Date().getFullYear()} Eshan Roy. Dual-licensed under MIT and Apache 2.0.</p>
          <p className="flex items-center gap-1.5">
            <span>Production Release</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[var(--ink-primary)]">eshan.tonmoyinfrastructure.org</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

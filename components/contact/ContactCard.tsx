"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ExternalLink, Cpu } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons/BrandIcons.tsx";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
      {/* Primary Email Banner */}
      <div className="bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--coral)] uppercase font-semibold">
          <Mail className="w-4 h-4" />
          <span>Direct Electronic Mail</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-lg sm:text-2xl font-mono font-bold text-[var(--ink-primary)]">
              {SITE_CONFIG.email}
            </div>
            <p className="text-xs font-mono text-[var(--ink-muted)] mt-1">
              PGP / standard transport · Typical response within 48 business hours
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--ink-primary)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-colors cursor-pointer"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${SITE_CONFIG.email}?subject=[Inquiry]%20Systems%20Architecture`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--coral)] text-white text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Compose Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Topics Guidance */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--ink-primary)]">
          Recommended Inquiry Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1.5">
            <span className="font-semibold text-[var(--ink-primary)]">
              01 // Systems Architecture &amp; Runtimes
            </span>
            <p className="text-[var(--ink-secondary)] leading-relaxed">
              Discussions on M31A autonomous execution, cgroups v2 process sandboxing, or enterprise policy gates.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1.5">
            <span className="font-semibold text-[var(--ink-primary)]">
              02 // Research &amp; Academic Inquiries
            </span>
            <p className="text-[var(--ink-secondary)] leading-relaxed">
              Citations, technical reports, empirical replication data, or collaborative systems publications.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1.5">
            <span className="font-semibold text-[var(--ink-primary)]">
              03 // Open Source Stewardship
            </span>
            <p className="text-[var(--ink-secondary)] leading-relaxed">
              Contributions, packaging mirrors, or issue disclosures for Snigdha OS, Kyro, and TIVerse.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1.5">
            <span className="font-semibold text-[var(--ink-primary)]">
              04 // Institutional Matters (TIV)
            </span>
            <p className="text-[var(--ink-secondary)] leading-relaxed">
              Strategic partnerships or infrastructure advisories with Tonmoy Infrastructure &amp; Vision.
            </p>
          </div>
        </div>
      </div>

      {/* Network Profiles */}
      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
          Verified Online Channels
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--ink-secondary)]">
          <a
            href={SITE_CONFIG.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--coral)] inline-flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub (@eshanized)</span>
          </a>
          <span>·</span>
          <a
            href={SITE_CONFIG.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--coral)] inline-flex items-center gap-1.5 transition-colors"
          >
            <TwitterIcon className="w-4 h-4" />
            <span>X / Twitter (@eshanized)</span>
          </a>
          <span>·</span>
          <a
            href={SITE_CONFIG.socialLinks.crates}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--coral)] inline-flex items-center gap-1.5 transition-colors"
          >
            <Cpu className="w-4 h-4" />
            <span>crates.io</span>
          </a>
        </div>
      </div>
    </div>
  );
}

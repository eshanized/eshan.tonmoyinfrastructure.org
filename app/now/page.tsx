import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Now — Current Engineering Priorities",
  description:
    "What Eshan Roy (@eshanized) is building, researching, and focusing on right now. Dated updates from active engineering repositories.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/now`,
  },
};

const NOW_UPDATED_DATE = "2026-10-22";

const CURRENT_PRIORITIES = [
  {
    title: "M31A v0.1.5 Hardening & cgroups v2 Sandboxing",
    status: "Active Production Engineering",
    description:
      "Benchmarking the 11-stage policy gate and POSIX process confinement in M31A across Linux server environments. Expanding our test suite beyond 820 deterministic test passes.",
    relatedSlug: "/projects/m31a",
  },
  {
    title: "Kyro Local Desktop Automation & Tauri v2 Core",
    status: "Active Development",
    description:
      "Refining the multi-threaded Rust native core with Tauri v2 and React 19. Implementing zero-latency screen understanding and Model Context Protocol (MCP) integrations on local SQLite WAL storage.",
    relatedSlug: "/projects/kyro",
  },
  {
    title: "Snigdha OS Rolling Release Package Infrastructure",
    status: "Ongoing Systems Maintenance",
    description:
      "Maintaining upstream PKGBUILD recipes and testing kernel switcher compatibility with Linux 6.12+ Zen and LTS builds. Supporting Tonmoy Infrastructure mirror nodes.",
    relatedSlug: "/projects/snigdha-os",
  },
  {
    title: "Research on Autonomous Systems Verification",
    status: "Research & Writing",
    description:
      "Formalizing empirical verification protocols for autonomous development systems. Documenting mathematical proofs for non-bypassable policy gates and two-phase crash recovery.",
    relatedSlug: "/research/towards-autonomous-development-systems",
  },
];

export default function NowPage() {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--coral)]">
          <Clock className="w-3.5 h-3.5" />
          <span>CURRENT FOCUS // NOW PAGE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          What I&rsquo;m Working On Now
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          Inspired by Derek Sivers&rsquo; <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-[var(--coral)] underline">/now</a> movement, this page documents my active technical focus, current software releases, and engineering priorities.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)]">
          <Calendar className="w-3.5 h-3.5 text-[var(--coral)]" />
          <span>Last Verified Update: {NOW_UPDATED_DATE} · Location: India</span>
        </div>
      </div>

      {/* Priorities List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--ink-primary)]">
          Primary Engineering Tracks
        </h2>

        <div className="space-y-4">
          {CURRENT_PRIORITIES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 space-y-3 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-[var(--coral-subtle)] text-[var(--coral)] font-semibold border border-[var(--coral)]/30">
                  {item.status}
                </span>
                <Link
                  href={item.relatedSlug}
                  className="text-[var(--ink-muted)] hover:text-[var(--coral)] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Associated Project</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reading & Exploratory Interests */}
      <div className="p-6 rounded-xl bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-3 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-mono">
        <span className="text-xs uppercase font-bold text-[var(--ink-primary)] block">
          Current Exploratory Reading &amp; Research:
        </span>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Formal verification of runtime policy gate invariants using SMT solvers (Z3).</li>
          <li>Sub-8B quantization noise in LoRA matrices across heterogeneous CUDA kernels.</li>
          <li>Zero-copy kernel bypass networking in POSIX systems programming.</li>
        </ul>
      </div>
    </main>
  );
}

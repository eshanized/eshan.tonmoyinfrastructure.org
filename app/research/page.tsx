import type { Metadata } from "next";
import Link from "next/link";
import { getAllResearch } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { FileText, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons.tsx";

export const metadata: Metadata = {
  title: "Research & Technical Publications",
  description:
    "Technical frameworks, systems experiments, and empirical reports by Eshan Roy on autonomous development systems, runtime policy gating, and low-latency concurrency.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/research`,
  },
};

export default function ResearchIndexPage() {
  const research = getAllResearch();

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--coral)]">
          <FileText className="w-3.5 h-3.5" />
          <span>RESEARCH PUBLICATIONS &amp; TECHNICAL REPORTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Systems Research &amp; Empirical Frameworks
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          Rigorous technical frameworks, systems experiments, and architecture specifications. We investigate the boundaries between untrusted machine reasoning, compiled deterministic runtimes, and low-latency systems infrastructure.
        </p>

        {/* Status Distinction Notice */}
        <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--ink-muted)] font-mono space-y-1">
          <p className="font-semibold text-[var(--ink-primary)]">
            Editorial Disclosure &amp; Classification Standard:
          </p>
          <p>
            All publications clearly identify their classification: <strong className="text-[var(--ink-secondary)]">Research Framework</strong>, <strong className="text-[var(--ink-secondary)]">Technical Report</strong>, or <strong className="text-[var(--ink-secondary)]">Systems Experiment</strong>. We never imply peer review where work represents institutional or empirical technical reports.
          </p>
        </div>
      </div>

      {/* Publications Listing Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
          <span>{research.length} Published Document(s)</span>
          <span>Sorted: Newest First</span>
        </div>

        <div className="space-y-6">
          {research.map((paper) => (
            <article
              key={paper.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 sm:p-8 space-y-5 transition-all hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold border border-emerald-500/30">
                    {paper.type}
                  </span>
                  <span className="text-[var(--ink-muted)]">·</span>
                  <span className="text-[var(--coral)] font-semibold">{paper.identifier}</span>
                  <span className="text-[var(--ink-muted)]">·</span>
                  <span className="text-[var(--ink-muted)]">{paper.area}</span>
                </div>
                <span className="text-[var(--ink-muted)]">{paper.date}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] hover:text-[var(--coral)] transition-colors">
                  <Link href={`/research/${paper.slug}`}>{paper.title}</Link>
                </h2>
                <p className="text-xs font-mono text-[var(--ink-muted)]">
                  Authors: {paper.authors.map((a) => a.name).join(", ")}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[var(--ink-muted)] font-semibold">
                  Abstract:
                </span>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-[var(--ink-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  {paper.repositoryUrl && (
                    <a
                      href={paper.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center gap-1"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>
                  )}
                  <Link
                    href={`/research/${paper.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--coral)] text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

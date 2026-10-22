import type { Metadata } from "next";
import Link from "next/link";
import { getAllJournalArticles } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description:
    "Technical deep-dives by Eshan Roy covering autonomous runtime architecture, custom Linux kernel tooling, zero-trust desktop automation, and high-performance Rust concurrency.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/journal`,
  },
};

export default function JournalIndexPage() {
  const articles = getAllJournalArticles();

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-cyan-500">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ENGINEERING JOURNAL &amp; ARCHITECTURAL ESSAYS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Systems Engineering Journal
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          In-depth technical writeups on real systems code. We discuss architectural trade-offs, failure modes, lock-free concurrency, kernel tuning, and autonomous AI systems without marketing fluff.
        </p>
      </div>

      {/* Articles Listing */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
          <span>{articles.length} Technical Essay(s)</span>
          <span>Sorted: Newest First</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 flex flex-col justify-between space-y-5 transition-all hover:shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-semibold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readingTime} min</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors leading-snug">
                    <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink-muted)]">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed line-clamp-3">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-[var(--ink-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--ink-muted)]">By {article.author.name}</span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="text-[var(--coral)] font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

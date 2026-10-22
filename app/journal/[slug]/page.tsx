import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJournalArticles, getJournalArticleBySlug, getProjectBySlug } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { getJournalArticleJsonLd } from "@/lib/seo/json-ld.ts";
import { ArrowLeft, Clock, Calendar, ArrowRight, Layers } from "lucide-react";
import { ReadingProgress } from "@/components/journal/ReadingProgress.tsx";

interface JournalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllJournalArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `${SITE_CONFIG.canonicalOrigin}/journal/${article.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_CONFIG.canonicalOrigin}/journal/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updatedAt || article.date,
      authors: [article.author.name],
    },
  };
}

export default async function JournalDetailPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const articles = getAllJournalArticles();
  const currentIndex = articles.findIndex((a) => a.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const article = articles[currentIndex];
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const relatedProject = article.relatedProjectSlug
    ? getProjectBySlug(article.relatedProjectSlug)
    : null;

  const jsonLd = getJournalArticleJsonLd(article);

  return (
    <>
      <ReadingProgress />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)]">
          <Link
            href="/journal"
            className="hover:text-[var(--coral)] inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Journal Index</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--coral)]">{article.category}</span>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-semibold border border-cyan-500/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-[var(--ink-muted)]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--ink-muted)]">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime} min read</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed">
            {article.description}
          </p>

          {/* Associated Project Callout */}
          {relatedProject && (
            <div className="p-4 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--coral)] shrink-0" />
                <span className="text-[var(--ink-secondary)]">
                  Associated System: <strong className="text-[var(--ink-primary)]">{relatedProject.name}</strong> ({relatedProject.statusLabel})
                </span>
              </div>
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="text-[var(--coral)] font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Explore Project Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </header>

        {/* Table of Contents */}
        {article.toc && article.toc.length > 0 && (
          <nav aria-label="Article Table of Contents" className="p-5 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-3">
            <span className="text-xs font-mono font-semibold uppercase text-[var(--ink-primary)]">
              Table of Contents
            </span>
            <ul className="space-y-1.5 text-xs font-mono text-[var(--ink-secondary)]">
              {article.toc.map((item, idx) => (
                <li
                  key={idx}
                  style={{ paddingLeft: `${(item.level - 2) * 1.25}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[var(--coral)] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[var(--coral)]">§</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body */}
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Author Bio Box */}
        <footer className="pt-8 border-t border-[var(--border-subtle)] space-y-6">
          <div className="p-6 rounded-xl bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--ink-primary)]">
                Authored by {article.author.name}
              </span>
              <span className="text-[var(--coral)]">@{SITE_CONFIG.handle}</span>
            </div>
            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
              {article.author.role} at {article.author.affiliation}. Specializing in autonomous coding runtimes, Linux engineering, and high-performance Rust systems.
            </p>
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
            {prevArticle ? (
              <Link
                href={`/journal/${prevArticle.slug}`}
                className="p-4 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] transition-colors space-y-1 group"
              >
                <span className="text-[var(--ink-muted)] block">← Newer Article</span>
                <span className="font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] line-clamp-1">
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle && (
              <Link
                href={`/journal/${nextArticle.slug}`}
                className="p-4 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] transition-colors space-y-1 text-right group"
              >
                <span className="text-[var(--ink-muted)] block">Older Article →</span>
                <span className="font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] line-clamp-1">
                  {nextArticle.title}
                </span>
              </Link>
            )}
          </div>
        </footer>
      </article>
    </>
  );
}

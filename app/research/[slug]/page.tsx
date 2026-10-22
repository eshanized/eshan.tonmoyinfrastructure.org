import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllResearch, getResearchBySlug } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { getResearchPublicationJsonLd } from "@/lib/seo/json-ld.ts";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons.tsx";
import { BibtexCopy } from "@/components/research/BibtexCopy.tsx";

interface ResearchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const research = getAllResearch();
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getResearchBySlug(slug);
  if (!paper) return {};

  return {
    title: `${paper.title} — ${paper.identifier}`,
    description: paper.abstract,
    alternates: {
      canonical: `${SITE_CONFIG.canonicalOrigin}/research/${paper.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_CONFIG.canonicalOrigin}/research/${paper.slug}`,
      title: paper.title,
      description: paper.abstract,
      publishedTime: paper.date,
      modifiedTime: paper.updatedAt || paper.date,
      authors: paper.authors.map((a) => a.name),
    },
  };
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const paper = getResearchBySlug(slug);

  if (!paper) {
    notFound();
  }

  const jsonLd = getResearchPublicationJsonLd(paper);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)]">
        <Link
          href="/research"
          className="hover:text-[var(--coral)] inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Research Index</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--coral)]">{paper.identifier}</span>
      </div>

      {/* Paper Header */}
      <header className="space-y-6 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold border border-emerald-500/30">
            {paper.type}
          </span>
          <span className="text-[var(--ink-muted)]">·</span>
          <span className="text-[var(--coral)] font-bold">{paper.identifier}</span>
          <span className="text-[var(--ink-muted)]">·</span>
          <span className="text-[var(--ink-muted)]">{paper.area}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight leading-tight">
          {paper.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--ink-secondary)]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[var(--ink-primary)]">Authors:</span>
            <span>{paper.authors.map((a) => a.name).join(", ")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
            <span>{paper.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
            <span>{paper.readingTime} min read</span>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="p-6 rounded-xl bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--coral)]">
            Executive Abstract
          </span>
          <p className="text-sm leading-relaxed text-[var(--ink-primary)]">
            {paper.abstract}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          {paper.repositoryUrl && (
            <a
              href={paper.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
          {paper.projectSlug && (
            <Link
              href={`/projects/${paper.projectSlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--coral-subtle)] border border-[var(--coral)]/30 text-[var(--coral)] font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Explore Associated Project</span>
            </Link>
          )}
        </div>
      </header>

      {/* Table of Contents */}
      {paper.toc && paper.toc.length > 0 && (
        <nav aria-label="Paper Table of Contents" className="p-5 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-3">
          <span className="text-xs font-mono font-semibold uppercase text-[var(--ink-primary)]">
            Table of Contents
          </span>
          <ul className="space-y-1.5 text-xs font-mono text-[var(--ink-secondary)]">
            {paper.toc.map((item, idx) => (
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

      {/* Full Paper Body */}
      <div
        className="prose-editorial"
        dangerouslySetInnerHTML={{ __html: paper.contentHtml }}
      />

      {/* References */}
      {paper.references && paper.references.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
          <h2 className="text-xl font-bold text-[var(--ink-primary)]">
            References &amp; Prior Art
          </h2>
          <ol className="space-y-3 text-xs font-mono text-[var(--ink-secondary)] list-decimal pl-5">
            {paper.references.map((ref) => (
              <li key={ref.id} className="leading-relaxed">
                <span className="font-semibold text-[var(--ink-primary)]">{ref.title}</span> —{" "}
                {ref.authors.join(", ")} ({ref.year}).{" "}
                {ref.venue && <span className="italic">{ref.venue}. </span>}
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--coral)] underline ml-1"
                  >
                    [Source]
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* BibTeX Citation */}
      {paper.bibtex && (
        <section className="pt-6">
          <BibtexCopy bibtex={paper.bibtex} />
        </section>
      )}
    </article>
  );
}

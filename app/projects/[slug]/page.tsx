import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getResearchBySlug,
  getJournalArticleBySlug,
} from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { getProjectJsonLd } from "@/lib/seo/json-ld.ts";
import {
  ArrowLeft,
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BookOpen,
  Terminal,
  Shield,
  Layers,
} from "lucide-react";
import { M31ACockpit } from "@/components/visuals/M31ACockpit.tsx";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Architecture & Technical Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${SITE_CONFIG.canonicalOrigin}/projects/${project.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${SITE_CONFIG.canonicalOrigin}/projects/${project.slug}`,
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = getProjectJsonLd(project);
  const relatedResearch = project.relatedResearchSlug
    ? getResearchBySlug(project.relatedResearchSlug)
    : null;
  const relatedJournal = project.relatedJournalSlug
    ? getJournalArticleBySlug(project.relatedJournalSlug)
    : null;

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)]">
        <Link
          href="/projects"
          className="hover:text-[var(--coral)] inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Projects Portfolio</span>
        </Link>
        <span>/</span>
        <span className="text-[var(--coral)]">{project.name}</span>
      </div>

      {/* Case Study Header */}
      <header className="space-y-6 border-b border-[var(--border-subtle)] pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded bg-[var(--coral-subtle)] text-[var(--coral)] font-semibold border border-[var(--coral)]/30">
            {project.statusLabel}
          </span>
          <span className="text-[var(--ink-muted)]">·</span>
          <span className="text-[var(--ink-muted)]">{project.category}</span>
          <span className="text-[var(--ink-muted)]">·</span>
          <span className="text-[var(--ink-muted)]">Primary: {project.primaryLanguage}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] tracking-tight leading-tight">
            {project.name}
          </h1>
          <p className="text-base sm:text-xl font-mono text-[var(--coral)]">
            {project.tagline}
          </p>
        </div>

        <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed max-w-4xl">
          {project.summary}
        </p>

        {/* Action Link Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-mid)] text-[var(--ink-primary)] hover:border-[var(--coral)] transition-colors shadow-sm font-semibold"
          >
            <FolderGit2 className="w-4 h-4 text-[var(--coral)]" />
            <span>Official Repository</span>
            <ExternalLink className="w-3 h-3 text-[var(--ink-muted)]" />
          </a>

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3 h-3 text-[var(--ink-muted)]" />
            </a>
          )}

          {project.docsUrl && (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
            >
              <span>Documentation</span>
              <ExternalLink className="w-3 h-3 text-[var(--ink-muted)]" />
            </a>
          )}

          {project.releaseUrl && (
            <a
              href={project.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--coral-subtle)] border border-[var(--coral)]/30 text-[var(--coral)] font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Releases &amp; Binaries</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </header>

      {/* Special Interactive Cockpit for M31A */}
      {project.slug === "m31a" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--ink-primary)]">
              Interactive Runtime Telemetry
            </h2>
            <span className="text-xs font-mono text-[var(--ink-muted)]">Live Ratatui Simulation</span>
          </div>
          <M31ACockpit />
        </section>
      )}

      {/* Problem Statement & Intended Audience */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--coral)] font-bold">
            <Shield className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        <div className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-500 font-bold">
            <Layers className="w-4 h-4" />
            <span>Intended Audience</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            {project.intendedAudience}
          </p>
        </div>
      </section>

      {/* Architecture Highlight */}
      <section className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--coral)] font-bold">
          <Terminal className="w-4 h-4" />
          <span>Core Architecture &amp; Mental Model</span>
        </div>
        <p className="text-sm sm:text-base text-[var(--ink-primary)] leading-relaxed">
          {project.architectureHighlight}
        </p>
      </section>

      {/* Verified Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--ink-primary)]">
          Verified System Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.verifiedFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-mono text-[var(--ink-secondary)] leading-relaxed">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Decisions & Rationales */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--ink-primary)]">
          Architectural Decisions &amp; Rationales
        </h2>
        <div className="space-y-3">
          {project.technicalDecisions.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1.5"
            >
              <h3 className="text-sm font-bold text-[var(--ink-primary)] font-mono">
                {item.decision}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                <strong className="text-[var(--coral)] font-mono">Rationale: </strong>
                {item.rationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trade-offs & Known Limitations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--ink-primary)]">
          Technical Trade-offs &amp; Honest Limitations
        </h2>
        <div className="p-6 rounded-xl bg-[var(--canvas-card)] border border-[var(--border-subtle)] space-y-3">
          <ul className="space-y-2 text-xs sm:text-sm font-mono text-[var(--ink-secondary)]">
            {project.tradeoffsAndLimitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quickstart / Installation (if available) */}
      {project.quickstartCommands && project.quickstartCommands.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--ink-primary)]">
            Quickstart &amp; Execution
          </h2>
          <div className="bg-[#0b0c0f] text-[#f4f3ef] border border-white/[0.1] rounded-xl p-5 overflow-x-auto font-mono text-xs space-y-1">
            {project.quickstartCommands.map((cmd, idx) => (
              <div
                key={idx}
                className={cmd.startsWith("#") ? "text-[#71717a]" : "text-emerald-400 font-semibold"}
              >
                {cmd}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verification Evidence */}
      <section className="p-6 rounded-xl bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-2">
        <span className="text-xs font-mono uppercase text-[var(--coral)] font-bold">
          Empirical Verification Evidence
        </span>
        <p className="text-xs sm:text-sm font-mono text-[var(--ink-secondary)] leading-relaxed">
          {project.verificationEvidence}
        </p>
      </section>

      {/* Related Research & Articles */}
      {(relatedResearch || relatedJournal) && (
        <section className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
          <h2 className="text-xl font-bold text-[var(--ink-primary)]">
            Related Research &amp; Architectural Writing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedResearch && (
              <Link
                href={`/research/${relatedResearch.slug}`}
                className="p-5 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--coral)] transition-colors space-y-2 group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Research Paper</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors">
                  {relatedResearch.title}
                </h3>
                <p className="text-xs text-[var(--ink-muted)] line-clamp-2">
                  {relatedResearch.abstract}
                </p>
              </Link>
            )}

            {relatedJournal && (
              <Link
                href={`/journal/${relatedJournal.slug}`}
                className="p-5 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--coral)] transition-colors space-y-2 group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-500">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Journal Essay</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors">
                  {relatedJournal.title}
                </h3>
                <p className="text-xs text-[var(--ink-muted)] line-clamp-2">
                  {relatedJournal.description}
                </p>
              </Link>
            )}
          </div>
        </section>
      )}
    </article>
  );
}

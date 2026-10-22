import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  BookOpen,
  Layers,
  Cpu,
  Mail,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons.tsx";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import {
  getFeaturedProjects,
  getFeaturedResearch,
  getFeaturedJournalArticles,
  getAllProjects,
} from "@/lib/content/index.ts";
import { SystemTopology } from "@/components/visuals/SystemTopology.tsx";
import { M31ACockpit } from "@/components/visuals/M31ACockpit.tsx";
import { EcosystemMatrix } from "@/components/visuals/EcosystemMatrix.tsx";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const featuredResearch = getFeaturedResearch();
  const featuredJournal = getFeaturedJournalArticles();
  const allProjects = getAllProjects();

  return (
    <main id="main-content" className="w-full space-y-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 border-b border-[var(--border-subtle)] tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-card)] border border-[var(--border-mid)] text-xs font-mono text-[var(--ink-secondary)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SIGNAL // ESHAN ROY (@eshanized)</span>
            <span className="text-[var(--ink-muted)]">·</span>
            <span className="text-[var(--coral)]">Tonmoy Infrastructure &amp; Vision</span>
          </div>

          {/* Positioning Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--ink-primary)] leading-[1.15]">
              I build the systems beneath the software.
            </h1>
            <p className="text-base sm:text-xl text-[var(--ink-secondary)] leading-relaxed max-w-3xl">
              Systems engineer, open-source architect, and researcher. I design autonomous software-engineering runtimes with non-bypassable policy gates, Arch-based operating systems, and distributed developer infrastructure.
            </p>
          </div>

          {/* Primary Quick Routes */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--coral)] text-white text-xs sm:text-sm font-mono font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Explore Research</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-mid)] text-[var(--ink-primary)] text-xs sm:text-sm font-mono font-medium hover:bg-[var(--canvas-subtle)] transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>Engineering Journal</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-mid)] text-[var(--ink-primary)] text-xs sm:text-sm font-mono font-medium hover:bg-[var(--canvas-subtle)] transition-colors shadow-sm"
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Projects Portfolio</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--canvas-card)] border border-[var(--border-mid)] text-[var(--ink-secondary)] text-xs sm:text-sm font-mono font-medium hover:text-[var(--ink-primary)] transition-colors shadow-sm"
            >
              <span>About &amp; Philosophy</span>
            </Link>
          </div>

          {/* Direct Verified Social Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--ink-muted)]">
            <a
              href={SITE_CONFIG.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--coral)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/eshanized</span>
            </a>
            <span>/</span>
            <a
              href={SITE_CONFIG.socialLinks.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--coral)] transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>huggingface.co/eshanized</span>
            </a>
            <span>/</span>
            <a
              href={SITE_CONFIG.socialLinks.tonmoy}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--coral)] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>tonmoyinfrastructure.org</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Flagship Project Showcases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <span className="text-xs font-mono text-[var(--coral)] uppercase tracking-wider font-semibold">
              [CURATED WORK // FLAGSHIP SYSTEMS]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] mt-1">
              Flagship Engineering Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-[var(--coral)] hover:underline inline-flex items-center gap-1"
          >
            <span>View All 10 Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 flex flex-col justify-between space-y-6 transition-all hover:shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-[var(--coral-subtle)] text-[var(--coral)] font-semibold border border-[var(--coral)]/30">
                    {project.statusLabel}
                  </span>
                  <span className="text-[var(--ink-muted)]">{project.primaryLanguage}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-[var(--ink-muted)] mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {project.summary}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
                    Verified Capabilities:
                  </span>
                  <ul className="space-y-1 text-xs text-[var(--ink-secondary)] font-mono">
                    {project.verifiedFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-mono text-[var(--coral)] font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive M31A Cockpit Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <span className="text-xs font-mono text-[var(--coral)] uppercase tracking-wider font-semibold">
            [INTERACTIVE TELEMETRY // RATATUI RUNTIME]
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] mt-1">
            M31A Cockpit &amp; Autonomous Runtime
          </h2>
          <p className="text-sm text-[var(--ink-secondary)] mt-1 max-w-3xl">
            Simulated interactive terminal environment showing the 4-stage execution loop, 11-stage non-bypassable policy evaluation gate, and L0–L9 layered architecture.
          </p>
        </div>

        <M31ACockpit />
      </section>

      {/* 4. Recent Research Publications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <span className="text-xs font-mono text-[var(--coral)] uppercase tracking-wider font-semibold">
              [TECHNICAL INVESTIGATION // RESEARCH &amp; EXPERIMENTS]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] mt-1">
              Recent Research Publications
            </h2>
          </div>
          <Link
            href="/research"
            className="text-xs font-mono text-[var(--coral)] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Research Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredResearch.map((paper) => (
            <article
              key={paper.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold">
                    {paper.type}
                  </span>
                  <span className="text-[var(--ink-muted)]">·</span>
                  <span className="text-[var(--ink-muted)]">{paper.identifier}</span>
                  <span className="text-[var(--ink-muted)]">·</span>
                  <span className="text-[var(--ink-muted)]">{paper.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors leading-snug">
                  <Link href={`/research/${paper.slug}`}>{paper.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {paper.tags.map((tag) => (
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
                <Link
                  href={`/research/${paper.slug}`}
                  className="text-[var(--coral)] font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Read Paper &amp; Abstract</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {paper.repositoryUrl && (
                  <a
                    href={paper.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Downward Systems Topology Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SystemTopology />
      </section>

      {/* 6. Recent Engineering Journal Entries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <span className="text-xs font-mono text-[var(--coral)] uppercase tracking-wider font-semibold">
              [TECHNICAL JOURNAL // ENGINEERING ARTICLES]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)] mt-1">
              Engineering Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-xs font-mono text-[var(--coral)] hover:underline inline-flex items-center gap-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJournal.map((article) => (
            <article
              key={article.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 font-semibold">
                    {article.category}
                  </span>
                  <span>{article.readingTime} min read</span>
                </div>

                <h3 className="text-base font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors leading-snug">
                  <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--ink-muted)]">{article.date}</span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="text-[var(--coral)] font-semibold inline-flex items-center gap-0.5 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Sovereign Systems Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <EcosystemMatrix projects={allProjects} />
      </section>

      {/* 8. Institutional Context & Contact Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-12 relative overflow-hidden space-y-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--coral)] font-semibold">
              [STEWARDSHIP // COLLABORATION]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)]">
              Let&rsquo;s engineer software that endures.
            </h2>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Whether you are architecting autonomous agent runtimes, deploying sovereign Linux environments, or looking to collaborate on systems research with Tonmoy Infrastructure, my channels are open.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--coral)] text-white text-xs sm:text-sm font-mono font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              <span>Initiate Direct Inquiry</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--canvas-subtle)] text-[var(--ink-primary)] text-xs sm:text-sm font-mono font-medium hover:bg-[var(--canvas-card)] transition-colors"
            >
              <span>Read Full Biography &amp; Philosophy</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

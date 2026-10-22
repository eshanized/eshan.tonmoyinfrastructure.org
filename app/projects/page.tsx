import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { Layers, ArrowRight, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems Portfolio",
  description:
    "Curated engineering portfolio of Eshan Roy (eshanized). Systems software, autonomous coding runtimes (M31A, Kyro), Arch-based Linux (Snigdha OS), and distributed infrastructure.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/projects`,
  },
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-emerald-500">
          <Layers className="w-3.5 h-3.5" />
          <span>CURATED SYSTEMS &amp; OPEN SOURCE SOFTWARE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Engineering Portfolio &amp; Software Systems
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          A curated catalog of verified systems projects, operating software, autonomous runtimes, and developer tooling. Every listed project includes genuine implementation status and verified repository links.
        </p>

        {/* Status Definitions Ledger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-emerald-500">Active</span>
            <p className="text-[10px] text-[var(--ink-muted)]">In production use or active release cycle</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-cyan-500">Rolling</span>
            <p className="text-[10px] text-[var(--ink-muted)]">Continuous snapshotting and mirror releases</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-blue-500">Stable</span>
            <p className="text-[10px] text-[var(--ink-muted)]">Production environment with minimal drift</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-1">
            <span className="font-bold text-amber-500">Experimental</span>
            <p className="text-[10px] text-[var(--ink-muted)]">Exploratory research and prototyping</p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
          <span>{projects.length} Verified Systems Project(s)</span>
          <span>Filtered: All Systems</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--border-mid)] rounded-xl p-6 flex flex-col justify-between space-y-5 transition-all hover:shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className={`px-2 py-0.5 rounded font-semibold ${
                      project.status === "active"
                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                        : project.status === "rolling"
                        ? "bg-cyan-500/15 text-cyan-500 border border-cyan-500/30"
                        : "bg-[var(--border-subtle)] text-[var(--ink-muted)]"
                    }`}
                  >
                    {project.statusLabel}
                  </span>
                  <span className="text-[var(--ink-muted)]">{project.primaryLanguage}</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h2>
                  <p className="text-xs font-mono text-[var(--ink-muted)] mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)] font-semibold">
                    Key Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-[var(--ink-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[var(--coral)] font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center gap-1"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

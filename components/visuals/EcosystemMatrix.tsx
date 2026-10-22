"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, CheckCircle2 } from "lucide-react";
import type { ProjectCaseStudy } from "@/lib/content/schemas.ts";

interface EcosystemMatrixProps {
  projects: ProjectCaseStudy[];
}

export function EcosystemMatrix({ projects }: EcosystemMatrixProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("m31a");

  const selectedProject =
    projects.find((p) => p.slug === selectedSlug) || projects[0];

  return (
    <div className="w-full bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-5 sm:p-7 space-y-8">
      {/* Ecosystem Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--border-subtle)]">
        <div>
          <div className="text-xs font-mono text-[var(--coral)] uppercase tracking-wider font-semibold">
            [ECOSYSTEM_TOPOLOGY // CROSS-SYSTEM INTERCONNECTS]
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] mt-1">
            The Sovereign Systems Matrix
          </h3>
        </div>
        <div className="text-xs font-mono text-[var(--ink-muted)]">
          Select any node to inspect architectural linkages
        </div>
      </div>

      {/* Grid of Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {projects.map((project) => {
          const isSelected = project.slug === selectedSlug;
          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setSelectedSlug(project.slug)}
              className={`p-4 rounded-lg text-left transition-all border relative flex flex-col justify-between h-40 cursor-pointer ${
                isSelected
                  ? "border-[var(--coral)] bg-[var(--coral-subtle)] shadow-md"
                  : "border-[var(--border-subtle)] bg-[var(--canvas-subtle)] hover:border-[var(--border-mid)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)] mb-1">
                  <span>{project.category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      project.status === "active"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : project.status === "rolling"
                        ? "bg-cyan-500/15 text-cyan-500"
                        : "bg-[var(--border-subtle)] text-[var(--ink-muted)]"
                    }`}
                  >
                    {project.statusLabel.split(" · ")[0]}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--ink-primary)] truncate">
                  {project.name}
                </h4>
                <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 mt-1">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)] pt-2 border-t border-[var(--border-subtle)]">
                <span>{project.primaryLanguage}</span>
                <span className="text-[var(--coral)] text-xs flex items-center gap-0.5">
                  Inspect <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Node Deep Dive */}
      {selectedProject && (
        <div className="p-6 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[var(--coral)] font-semibold">
                  {selectedProject.statusLabel}
                </span>
                <span className="text-xs text-[var(--ink-muted)] font-mono">·</span>
                <span className="text-xs text-[var(--ink-muted)] font-mono">
                  {selectedProject.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[var(--ink-primary)] mt-1">
                {selectedProject.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${selectedProject.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--coral)] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--canvas-card)] text-xs font-mono text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            {selectedProject.summary}
          </p>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase text-[var(--ink-primary)] font-semibold">
              Verified Capabilities:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--ink-secondary)]">
              {selectedProject.verifiedFeatures.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

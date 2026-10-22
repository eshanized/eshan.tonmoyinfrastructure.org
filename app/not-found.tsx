import Link from "next/link";
import { ArrowLeft, FileText, BookOpen, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--coral)]">
        <span>ERROR 404 // OBJECT_NOT_FOUND</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-lg mx-auto leading-relaxed">
          The requested route does not exist or has migrated to a new canonical destination under the <code className="text-xs font-mono text-[var(--coral)]">eshan.tonmoyinfrastructure.org</code> publication schema.
        </p>
      </div>

      {/* Suggested Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-xl mx-auto">
        <Link
          href="/research"
          className="p-4 rounded-xl bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--coral)] transition-colors space-y-1.5 group"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500">
            <FileText className="w-3.5 h-3.5" />
            <span>Research</span>
          </div>
          <p className="text-xs text-[var(--ink-secondary)]">Technical papers &amp; empirical frameworks</p>
        </Link>

        <Link
          href="/journal"
          className="p-4 rounded-xl bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--coral)] transition-colors space-y-1.5 group"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-500">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal</span>
          </div>
          <p className="text-xs text-[var(--ink-secondary)]">Architectural writeups &amp; systems deep-dives</p>
        </Link>

        <Link
          href="/projects"
          className="p-4 rounded-xl bg-[var(--canvas-card)] border border-[var(--border-subtle)] hover:border-[var(--coral)] transition-colors space-y-1.5 group"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--coral)]">
            <Layers className="w-3.5 h-3.5" />
            <span>Projects</span>
          </div>
          <p className="text-xs text-[var(--ink-secondary)]">Flagship runtimes &amp; operating systems</p>
        </Link>
      </div>

      <div className="pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--coral)] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";
import { Cpu, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About Eshan Roy — Systems Engineering & Architecture Philosophy",
  description:
    "Biography, engineering philosophy, and open-source stewardship of Eshan Roy (eshanized), Founder and Principal Systems Architect at Tonmoy Infrastructure and Vision.",
  alternates: {
    canonical: `${SITE_CONFIG.canonicalOrigin}/about`,
  },
};

const PHILOSOPHY_PRINCIPLES = [
  {
    number: "01",
    statement: "Architecture before implementation",
    elaboration:
      "A codebase without an explicit mental model will inevitably evolve toward maximum entropy. Define layer boundaries, directional dependencies, and invariants before writing a single line of logic.",
    systemExample:
      "M31A's strict downward L0–L9 hierarchy ensures lower runtime layers never depend on UI or high-level agents.",
  },
  {
    number: "02",
    statement: "Measure before optimizing",
    elaboration:
      "Intuition about performance in systems programming and distributed infrastructure is almost always flawed. Collect profiling data, trace allocations, and inspect cache behavior before introducing complexity.",
    systemExample:
      "Benchmarking cache-line false sharing in Veda with Criterion before adding 64-byte alignment padding.",
  },
  {
    number: "03",
    statement: "Explicit failure beats mysterious failure",
    elaboration:
      "Silent fallbacks and swallowed errors create operational time bombs. When an assumption is violated, halt, panic, or return an explicit structured error that isolates the failure domain immediately.",
    systemExample:
      "11-stage policy evaluation gates in M31A reject unauthorized mutations deterministically rather than degrading silently.",
  },
  {
    number: "04",
    statement: "Security belongs in the architecture, not as an afterthought",
    elaboration:
      "Security cannot be bolted on at the API gateway or wrapped in regex filters. Isolation boundaries, process sandboxing, credential redaction, and least privilege must be primary architectural primitives.",
    systemExample:
      "OS-level process confinement using Linux cgroups v2, namespaces, and macOS Seatbelt sandboxes built into the core runner.",
  },
  {
    number: "05",
    statement: "Dependencies should earn their place",
    elaboration:
      "Every third-party crate or package is an architectural mortgage that carries supply-chain risk, transitive dependencies, and compilation overhead. If a standard library construct suffices, prefer it.",
    systemExample:
      "Keeping runtime binaries self-contained with minimal foreign dependencies and deterministic build targets.",
  },
  {
    number: "06",
    statement: "A system should remain understandable after its author leaves the room",
    elaboration:
      "Clever code is a liability. Software must be written for the engineer who maintains it at 3:00 AM during an outage. Clarity of data flow trumps micro-optimizations.",
    systemExample:
      "State machines with explicit transitions and atomic SQLite transaction event logs that any engineer can inspect with standard tooling.",
  },
  {
    number: "07",
    statement: "If it can be automated, automate it",
    elaboration:
      "Human memory is unreliable for repetitive operational sequences. Package builds, kernel configurations, lint gates, and regression testing must be encoded in reproducible scripts and pipelines.",
    systemExample:
      "Snigdha OS PKGBUILD automation and headless autonomous execution passes in CI pipelines.",
  },
  {
    number: "08",
    statement: "If it cannot be observed, it cannot be trusted",
    elaboration:
      "Systems running in production must emit telemetry, structured logs, and verifiable state diffs. Black-box operations are unacceptable in critical infrastructure.",
    systemExample:
      "Structured NDJSON event logs and live telemetry streaming with automated zero-leak credential scrubbing.",
  },
  {
    number: "09",
    statement: "If it cannot be recovered, it isn't finished",
    elaboration:
      "Hard crashes, power loss, and network partitions are normal operating conditions. A robust runtime must detect dirty state on boot and resume deterministically from atomic checkpoints.",
    systemExample:
      "Two-phase SQLite commits sealing each DAG task with SHA-256 manifests, allowing zero-loss recovery upon unexpected process termination.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <section className="space-y-6 border-b border-[var(--border-subtle)] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--coral)]">
          <Cpu className="w-3.5 h-3.5" />
          <span>BIOGRAPHY &amp; ENGINEERING STEWARDSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink-primary)] tracking-tight">
          Eshan Roy (<span className="text-[var(--coral)]">eshanized</span>)
        </h1>
        <p className="text-lg sm:text-xl font-mono text-[var(--ink-secondary)]">
          Founder &amp; Principal Systems Architect · Tonmoy Infrastructure and Vision
        </p>
      </section>

      {/* Narrative Biography */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-5 text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
          <h2 className="text-2xl font-bold text-[var(--ink-primary)]">
            Engineering Background &amp; Focus
          </h2>
          <p>
            I am a systems programmer and open-source architect based in India. Known online as <strong className="text-[var(--ink-primary)]">`eshanized`</strong>, I specialize in the layer beneath applications: operating systems, compiler-verified autonomous coding runtimes, process sandboxing, and developer infrastructure.
          </p>
          <p>
            As Founder and Principal Architect at <strong className="text-[var(--ink-primary)]">Tonmoy Infrastructure and Vision (TIV)</strong>, I lead the development of independent, sovereign software systems designed for long-term operational longevity. Our work rejects venture-backed hype and ephemeral trends, focusing instead on structural self-reliance, memory safety, and verifiable systems guarantees.
          </p>
          <p>
            My engineering work spans three core pillars:
          </p>
          <ul className="space-y-2 list-disc pl-5 font-mono text-xs sm:text-sm text-[var(--ink-primary)]">
            <li>
              <strong>Autonomous Runtimes:</strong> Creator of <em>M31A</em> (Rust-native autonomous engineering runtime with 11-stage policy gates) and <em>Kyro</em> (local-first desktop AI agent with Tauri v2 and SQLite WAL storage).
            </li>
            <li>
              <strong>Operating Systems:</strong> Lead Architect of <em>Snigdha OS</em>, an Arch-based Linux distribution ecosystem featuring custom kernel switching tools and automated package mirrors.
            </li>
            <li>
              <strong>Systems Tooling &amp; Infrastructure:</strong> Author of <em>Polaris</em> (distributed compute framework on crates.io), <em>Veda</em> (adaptive work-stealing parallel runtime in Rust), and <em>SLMGen</em> (dataset fine-tuning infrastructure for Small Language Models).
            </li>
          </ul>
        </div>

        {/* Quick Identity Card */}
        <div className="space-y-4">
          <div className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-4 text-xs font-mono">
            <h3 className="font-bold text-[var(--ink-primary)] uppercase tracking-wider text-[11px] pb-2 border-b border-[var(--border-subtle)]">
              Verified Identifiers
            </h3>
            <div className="space-y-2.5">
              <div>
                <span className="text-[var(--ink-muted)] block">Name</span>
                <span className="text-[var(--ink-primary)] font-semibold">Eshan Roy</span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)] block">Public Handle</span>
                <span className="text-[var(--coral)] font-semibold">eshanized</span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)] block">Organization</span>
                <a
                  href={SITE_CONFIG.organization.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-primary)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Tonmoy Infrastructure</span>
                  <ExternalLink className="w-3 h-3 text-[var(--coral)]" />
                </a>
              </div>
              <div>
                <span className="text-[var(--ink-muted)] block">Primary Languages</span>
                <span className="text-[var(--ink-primary)]">Rust, C, Go, Shell, TypeScript</span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)] block">Direct Email</span>
                <span className="text-[var(--ink-primary)]">{SITE_CONFIG.email}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
              <a
                href={SITE_CONFIG.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:text-[var(--coral)] transition-colors"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.crates}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:text-[var(--coral)] transition-colors"
              >
                <span>crates.io Packages</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:text-[var(--coral)] transition-colors"
              >
                <span>Hugging Face Checkpoints</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy: 9 Principles */}
      <section className="space-y-8 pt-8 border-t border-[var(--border-subtle)]">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase text-[var(--coral)] font-semibold">
            [FIRST PRINCIPLES // OPERATIONAL INVARIANTS]
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink-primary)]">
            Nine Principles That Govern Software When Hype Fades
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            These invariants guide every repository, architecture design, and systems experiment I maintain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl p-5 sm:p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-sm font-mono font-bold text-[var(--coral)]">
                  {principle.number}
                </span>
                <h3 className="text-base font-bold text-[var(--ink-primary)] leading-snug">
                  {principle.statement}
                </h3>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  {principle.elaboration}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--ink-muted)]">
                <strong className="text-[var(--ink-primary)]">Applied In: </strong>
                <span>{principle.systemExample}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

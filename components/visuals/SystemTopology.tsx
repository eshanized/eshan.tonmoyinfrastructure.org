"use client";

import React, { useState } from "react";
import { Terminal, Shield, Layers, Server, Sparkles, CheckCircle2 } from "lucide-react";

interface LayerDetail {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: React.ElementType;
  description: string;
  components: string[];
  invariants: string[];
}

const SYSTEM_LAYERS: LayerDetail[] = [
  {
    id: "l4-autonomy",
    name: "04 // Autonomous Intelligence",
    category: "M31A & Kyro Runtimes",
    color: "#ff5544",
    icon: Sparkles,
    description:
      "Untrusted LLM reasoning is strictly bounded by deterministic runtime authority. Natural language intent is transformed into topological DAGs with non-bypassable policy gates.",
    components: [
      "Topological DAG Planner (Wave execution)",
      "11-Stage Policy Evaluation Gate",
      "Ratatui Terminal Cockpit (m31a tui)",
      "Model Context Protocol (MCP) integrations",
    ],
    invariants: [
      "Intelligence is not authority",
      "Model outputs require empirical verification",
      "Zero-leak credential scrubbing on all telemetry",
    ],
  },
  {
    id: "l3-infra",
    name: "03 // Developer Infrastructure",
    category: "Polaris & Runstead",
    color: "#06b6d4",
    icon: Server,
    description:
      "Distributed compute frameworks and business hosting systems. Transforming asynchronous Rust functions into distributed cluster jobs with consensus.",
    components: [
      "Polaris Distributed Task Orchestrator (crates.io)",
      "Runstead Modern Hosting Lifecycle OS",
      "SLMGen Dataset Intelligence & Fine-Tuning",
      "Octate Terminal-Native AI Code Review",
    ],
    invariants: [
      "Declarative proc macros with zero boilerplate",
      "Fault-tolerant cluster heartbeats and node failover",
      "Single unified data plane for infrastructure and billing",
    ],
  },
  {
    id: "l2-concurrency",
    name: "02 // Concurrency & Allocation",
    category: "Veda Parallel Runtime",
    color: "#10b981",
    icon: Layers,
    description:
      "High-throughput multi-core execution engines. Eliminating lock contention and cross-socket memory bus saturation through lock-free algorithms.",
    components: [
      "Veda Adaptive Work-Stealing Runtime (veda-rs)",
      "Lock-Free Chase-Lev Task Deques",
      "NUMA-Aware Thread Affinity Pinning",
      "64-Byte Cache Line Padding (anti-false-sharing)",
    ],
    invariants: [
      "Sub-2 microsecond task dispatch latency",
      "Zero mutex locks on hot worker paths",
      "Memory locality preserved within local L3 channels",
    ],
  },
  {
    id: "l1-os",
    name: "01 // Operating Systems",
    category: "Snigdha OS & Workstations",
    color: "#f59e0b",
    icon: Terminal,
    description:
      "Rolling Arch-based Linux ecosystem engineered for performance, custom kernel tooling, and distraction-free developer workflows.",
    components: [
      "Snigdha OS Core (`snigdhaos-core`)",
      "Kernel Switcher CLI (`snigdhaos-kernel-switcher`)",
      "Automated PKGBUILD Mirror Pipelines",
      "Keyboard-First i3wm Tiling Configuration",
    ],
    invariants: [
      "Sub-200MB idle RAM memory footprint",
      "Zero forced telemetry or opaque configuration layers",
      "Direct systems control from kernel to window manager",
    ],
  },
  {
    id: "l0-hardware",
    name: "00 // Confinement & Hardware",
    category: "Host Kernel Invariants",
    color: "#8b5cf6",
    icon: Shield,
    description:
      "Low-level process sandboxing, resource limiters, and atomic storage primitives that provide non-bypassable safety.",
    components: [
      "Linux cgroups v2 (CPU/memory/pid ceilings)",
      "macOS Seatbelt Profiles & Windows Job Objects",
      "SQLite WAL Atomic Manifest Commits",
      "POSIX rlimits and Isolated Namespaces",
    ],
    invariants: [
      "Fork-bomb protection and process tree containment",
      "Two-phase crash recovery restores clean repository state",
      "No ambient authority granted to child processes",
    ],
  },
];

export function SystemTopology() {
  const [activeLayerId, setActiveLayerId] = useState<string>("l4-autonomy");

  const activeLayer =
    SYSTEM_LAYERS.find((l) => l.id === activeLayerId) || SYSTEM_LAYERS[0];

  return (
    <div className="w-full bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-lg p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--coral)] font-semibold">
            [ARCHITECTURAL MATRIX // DOWNWARD SYSTEM DEPENDENCY]
          </span>
          <h3 className="text-lg font-bold text-[var(--ink-primary)] mt-1">
            The Downward Systems Dependency Stack
          </h3>
        </div>
        <span className="text-xs font-mono text-[var(--ink-muted)]">
          Select any tier to inspect guarantees &amp; components
        </span>
      </div>

      {/* Layer Selector Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {SYSTEM_LAYERS.map((layer) => {
          const isSelected = layer.id === activeLayerId;
          const Icon = layer.icon;

          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayerId(layer.id)}
              className={`p-3.5 rounded-lg text-left transition-all border flex flex-col justify-between h-28 cursor-pointer ${
                isSelected
                  ? "border-[var(--coral)] bg-[var(--coral-subtle)] shadow-md"
                  : "border-[var(--border-subtle)] bg-[var(--canvas-subtle)] hover:border-[var(--border-mid)]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono font-bold text-[var(--coral)]">
                  {layer.name.split(" // ")[0]}
                </span>
                <Icon className="w-4 h-4 text-[var(--ink-muted)]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[var(--ink-primary)] truncate">
                  {layer.name.split(" // ")[1]}
                </h4>
                <p className="text-[10px] text-[var(--ink-muted)] truncate">
                  {layer.category}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Deep Dive */}
      <div className="p-5 rounded-lg bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] space-y-5 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[var(--coral)] font-semibold">
              {activeLayer.category}
            </span>
            <h4 className="text-base font-bold text-[var(--ink-primary)]">
              {activeLayer.name}
            </h4>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-[var(--ink-secondary)]">
            Invariant: Downward Compilation Only
          </span>
        </div>

        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          {activeLayer.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Components */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase text-[var(--ink-primary)]">
              Concrete Implemented Subsystems
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--ink-secondary)] font-mono">
              {activeLayer.components.map((comp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[var(--coral)] mt-0.5">▶</span>
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Invariants */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase text-[var(--ink-primary)]">
              Non-Bypassable Engineering Invariants
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--ink-secondary)] font-mono">
              {activeLayer.invariants.map((inv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

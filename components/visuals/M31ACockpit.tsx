"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Play, Cpu } from "lucide-react";

export function M31ACockpit() {
  const [activeTab, setActiveTab] = useState<"tui" | "loop" | "policy" | "layers">("tui");

  return (
    <div className="w-full bg-[#0a0a0d] text-[#f4f3ef] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl">
      {/* Cockpit Window Top Bar */}
      <div className="bg-[#121217] px-4 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-[#f4f3ef] font-semibold ml-2">
            m31a · ratatui cockpit
          </span>
          <span className="text-[10px] font-mono text-[#71717a] hidden sm:inline">
            [target: x86_64-unknown-linux-gnu · cgroups v2 active]
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 text-[11px] font-mono bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setActiveTab("tui")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "tui"
                ? "bg-[#ff5544] text-white font-medium"
                : "text-[#a1a1aa] hover:text-[#f4f3ef]"
            }`}
          >
            TUI Cockpit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("loop")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "loop"
                ? "bg-[#ff5544] text-white font-medium"
                : "text-[#a1a1aa] hover:text-[#f4f3ef]"
            }`}
          >
            4-Stage Loop
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("policy")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "policy"
                ? "bg-[#ff5544] text-white font-medium"
                : "text-[#a1a1aa] hover:text-[#f4f3ef]"
            }`}
          >
            11-Stage Gate
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("layers")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === "layers"
                ? "bg-[#ff5544] text-white font-medium"
                : "text-[#a1a1aa] hover:text-[#f4f3ef]"
            }`}
          >
            L0–L9 Hierarchy
          </button>
        </div>
      </div>

      {/* Main Interactive Screen Content */}
      <div className="p-4 sm:p-6 font-mono text-xs">
        {activeTab === "tui" && (
          <div className="space-y-4">
            {/* Mission Objective Header */}
            <div className="bg-[#141419] p-3 rounded-lg border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#a1a1aa]">MISSION: </span>
                <span className="text-white font-semibold">
                  Refactor AST parse validation &amp; enforce POSIX rlimits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: VERIFYING
                </span>
                <span className="text-[10px] text-[#71717a]">SESSION #842</span>
              </div>
            </div>

            {/* Simulated TUI Split Screen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Left Pane: DAG Tasks */}
              <div className="bg-[#0f0f14] p-3 rounded-lg border border-white/[0.06] space-y-2">
                <div className="text-[10px] text-[#ff5544] uppercase font-bold tracking-wider flex items-center justify-between">
                  <span>DAG Execution Plan</span>
                  <span>WAVE 2/3</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>✓ T01: Scan .env secrets</span>
                    <span className="text-[10px]">OK</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>✓ T02: Snapshot SQLite WAL</span>
                    <span className="text-[10px]">OK</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-400 bg-amber-500/10 p-1 rounded">
                    <span>▶ T03: Apply AST parser diff</span>
                    <span className="text-[10px] animate-pulse">RUNNING</span>
                  </div>
                  <div className="flex items-center justify-between text-[#71717a]">
                    <span>○ T04: Run cargo test</span>
                    <span className="text-[10px]">WAIT</span>
                  </div>
                  <div className="flex items-center justify-between text-[#71717a]">
                    <span>○ T05: SHA-256 seal manifest</span>
                    <span className="text-[10px]">WAIT</span>
                  </div>
                </div>
              </div>

              {/* Middle & Right Pane: Staged Diff & Policy Verdict */}
              <div className="md:col-span-2 bg-[#0f0f14] p-3 rounded-lg border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#a1a1aa]">STAGED DIFF: src/policy/gate.rs</span>
                  <span className="text-emerald-400 font-semibold">[VERIFIED BY TREE-SITTER]</span>
                </div>
                <div className="bg-black/60 p-2.5 rounded font-mono text-[11px] leading-relaxed overflow-x-auto border border-white/[0.04]">
                  <div className="text-emerald-400">+ pub fn check_path_traversal(target: &amp;Path) -&gt; Result&lt;(), PolicyError&gt; &#123;</div>
                  <div className="text-emerald-400">+     if target.starts_with(&quot;..&quot;) || target.is_absolute() &#123;</div>
                  <div className="text-emerald-400">+         return Err(PolicyError::PathTraversalDenied);</div>
                  <div className="text-emerald-400">+     &#125;</div>
                  <div className="text-emerald-400">+     Ok(())</div>
                  <div className="text-emerald-400">+ &#125;</div>
                  <div className="text-[#71717a]">&#47;&#47; Non-bypassable policy evaluation continues...</div>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#a1a1aa] border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Policy: ALLOW (All 11 criteria satisfied)</span>
                  </div>
                  <span>Sandbox: Linux cgroups v2 (2.0 GiB cap)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loop" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#141419] p-4 rounded-lg border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-[#ff5544]">
                <span className="font-bold text-sm">01 // PLAN</span>
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Repository symbol indexing via Tree-sitter AST and dependency graphing. Synthesizes an acyclic topological wave execution plan.
              </p>
            </div>
            <div className="bg-[#141419] p-4 rounded-lg border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="font-bold text-sm">02 // APPLY</span>
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Candidate mutations pass through the non-bypassable 11-stage policy gate. Approved diffs are written to in-memory staging buffers.
              </p>
            </div>
            <div className="bg-[#141419] p-4 rounded-lg border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="font-bold text-sm">03 // CHECK</span>
                <Play className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Compiler diagnostics and test harnesses execute within isolated process sandboxes (cgroups v2 ceilings, no network authority).
              </p>
            </div>
            <div className="bg-[#141419] p-4 rounded-lg border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="font-bold text-sm">04 // STATE</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Two-phase atomic SQLite WAL commit seals the post-execution state with SHA-256 digests. If any check fails, zero dirty changes remain.
              </p>
            </div>
          </div>
        )}

        {activeTab === "policy" && (
          <div className="space-y-3">
            <div className="text-xs text-[#a1a1aa]">
              The 11-stage evaluation pipeline rejects out-of-tree writes, secret leakage, and unverified commands deterministically:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px]">
              {[
                "01. Path Traversal Check (DENY)",
                "02. Sensitive File Blacklist (DENY)",
                "03. AST Parse Validation (DENY)",
                "04. Secret Scanning Heuristics (DENY)",
                "05. Write Volume Quotas (ASK)",
                "06. Network Boundary (DENY)",
                "07. Binary Execution Whitelist (DENY)",
                "08. Destructive Command Filter (DENY)",
                "09. Concurrency Lock State (ASK)",
                "10. Memory/CPU rlimits (DENY)",
                "11. Operator Approval Gate (ASK)",
              ].map((stage, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-[#141419] border border-white/[0.06] flex items-center justify-between"
                >
                  <span className="text-[#f4f3ef]">{stage.split(" (")[0]}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      stage.includes("DENY")
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {stage.includes("DENY") ? "DENY" : "ASK"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "layers" && (
          <div className="space-y-2 text-[11px]">
            <div className="text-xs text-[#a1a1aa] pb-1">
              Strict downward compilation: layer $L_k$ may only depend on $L_j$ where $j &lt; k$.
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { layer: "L9", name: "Agents", role: "Model reasoning" },
                { layer: "L8", name: "Cockpit", role: "Ratatui TUI" },
                { layer: "L7", name: "Task DAG", role: "Wave planner" },
                { layer: "L6", name: "Verify", role: "Diagnostics" },
                { layer: "L5", name: "Policy", role: "11-stage gate" },
                { layer: "L4", name: "Repo", role: "Git & Tree-sitter" },
                { layer: "L3", name: "Sandbox", role: "cgroups & Seatbelt" },
                { layer: "L2", name: "Store", role: "SQLite WAL" },
                { layer: "L1", name: "Redact", role: "Secret scanner" },
                { layer: "L0", name: "Core", role: "Primitives & Types" },
              ].map((item) => (
                <div
                  key={item.layer}
                  className="p-2 rounded bg-[#141419] border border-white/[0.06] space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#ff5544] font-bold">{item.layer}</span>
                    <span className="text-[#f4f3ef] font-semibold">{item.name}</span>
                  </div>
                  <p className="text-[10px] text-[#71717a]">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

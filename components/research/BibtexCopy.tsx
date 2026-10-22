"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function BibtexCopy({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy BibTeX:", err);
    }
  };

  return (
    <div className="bg-[var(--canvas-subtle)] border border-[var(--border-subtle)] rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-semibold text-[var(--ink-primary)] uppercase">
          BibTeX Citation
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--canvas-card)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--coral)] hover:border-[var(--coral)] transition-colors cursor-pointer"
          aria-label="Copy BibTeX citation to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy BibTeX</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-xs font-mono bg-[var(--canvas-card)] p-3 rounded border border-[var(--border-subtle)] overflow-x-auto text-[var(--ink-secondary)]">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}

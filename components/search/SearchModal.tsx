"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, FileText, BookOpen, Layers, ArrowRight } from "lucide-react";
import type { SearchIndexEntry } from "@/lib/content/index.ts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: SearchIndexEntry[];
}

export function SearchModal({ isOpen, onClose, entries }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event if closed
          window.dispatchEvent(new CustomEvent("open-search-modal"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();
  const filtered = trimmedQuery
    ? entries.filter((item) => {
        return (
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.subtitle.toLowerCase().includes(trimmedQuery) ||
          item.excerpt.toLowerCase().includes(trimmedQuery) ||
          item.tags.some((t) => t.toLowerCase().includes(trimmedQuery))
        );
      })
    : entries.slice(0, 8); // show first 8 items by default

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "research":
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case "journal":
        return <BookOpen className="w-4 h-4 text-cyan-500" />;
      case "project":
        return <Layers className="w-4 h-4 text-[var(--coral)]" />;
      default:
        return <FileText className="w-4 h-4 text-[var(--ink-muted)]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search research publications, journal articles, and projects"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--canvas-card)] border border-[var(--border-mid)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] gap-3 bg-[var(--canvas-subtle)]">
          <Search className="w-5 h-5 text-[var(--ink-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research, articles, systems projects, or tags... (Press Esc to close)"
            className="w-full bg-transparent text-[var(--ink-primary)] placeholder-[var(--ink-muted)] text-sm focus:outline-none"
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--ink-muted)]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-[var(--border-subtle)]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm text-[var(--ink-muted)]">
                No verified publications or projects match &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs text-[var(--ink-muted)]">
                Try searching for &ldquo;Rust&rdquo;, &ldquo;M31A&rdquo;, &ldquo;Kyro&rdquo;, &ldquo;Linux&rdquo;, or &ldquo;policy&rdquo;.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                onClick={onClose}
                className="group flex items-start gap-3.5 p-3 rounded-lg hover:bg-[var(--canvas-subtle)] transition-colors"
              >
                <div className="p-2 rounded bg-[var(--canvas)] border border-[var(--border-subtle)] shrink-0 mt-0.5">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--ink-muted)]">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-[var(--ink-muted)] truncate">
                      {item.subtitle}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--ink-secondary)] line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--coral)] group-hover:translate-x-1 transition-all shrink-0 self-center" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[var(--canvas-subtle)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
          <span>{filtered.length} publication(s) indexed</span>
          <span>Navigation: Click or Enter</span>
        </div>
      </div>
    </div>
  );
}

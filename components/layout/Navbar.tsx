"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Cpu } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle.tsx";
import { SearchModal } from "../search/SearchModal.tsx";
import type { SearchIndexEntry } from "@/lib/content/index.ts";

interface NavbarProps {
  searchEntries: SearchIndexEntry[];
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/journal", label: "Journal" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ searchEntries }: NavbarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener("open-search-modal", handleOpenSearch);
    return () => window.removeEventListener("open-search-modal", handleOpenSearch);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--canvas)]/85 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Identity / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Eshan Roy — Home"
          >
            <div className="w-8 h-8 rounded bg-[var(--coral)]/10 border border-[var(--coral)]/30 flex items-center justify-center text-[var(--coral)] group-hover:bg-[var(--coral)] group-hover:text-white transition-all">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[var(--ink-primary)] group-hover:text-[var(--coral)] transition-colors">
                Eshan Roy
              </span>
              <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                @eshanized
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    isActive
                      ? "text-[var(--coral)] bg-[var(--coral-subtle)] font-semibold"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--canvas-subtle)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Search, Theme, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--canvas-subtle)] text-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:border-[var(--border-mid)] transition-colors cursor-pointer"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1 py-0.2 bg-[var(--canvas-card)] border border-[var(--border-subtle)] rounded text-[var(--ink-muted)]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded border border-[var(--border-subtle)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--canvas)] px-4 py-4 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                    isActive
                      ? "text-[var(--coral)] bg-[var(--coral-subtle)] font-semibold"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--canvas-subtle)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        entries={searchEntries}
      />
    </>
  );
}

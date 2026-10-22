import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--coral)] focus:text-white focus:rounded focus:font-mono focus:text-sm focus:shadow-xl focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

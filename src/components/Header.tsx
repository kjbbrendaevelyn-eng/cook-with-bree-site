"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/recipes", label: "Recipes" },
  { href: "/stories", label: "Stories" },
  { href: "/cookbook", label: "Cookbook" },
  { href: "/my-kitchen", label: "My Kitchen" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-b border-cream-200 bg-cream-50/95 backdrop-blur-sm sticky top-0 z-50 pt-[env(safe-area-inset-top)] overflow-x-clip">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 min-w-0">
        <Link
          href="/"
          className="group min-w-0 flex-1 mr-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg sm:text-2xl text-warm-brown group-hover:text-terracotta-600 transition-colors truncate block">
            Cook with Bree
          </span>
          <span className="hidden sm:block text-xs text-warm-muted tracking-widest uppercase mt-0.5">
            Recipes & Stories
          </span>
        </Link>

        {/* Inline nav on wider screens; hamburger below */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-muted hover:text-terracotta-600 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full border border-cream-200 bg-white text-warm-brown"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform origin-center ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform origin-center ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-cream-200 bg-cream-50 max-h-[min(80vh,calc(100dvh-4rem))] overflow-y-auto overflow-x-hidden pb-[env(safe-area-inset-bottom)]"
        >
          <nav className="max-w-5xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-base font-medium text-warm-brown border-b border-cream-200 last:border-b-0 hover:text-terracotta-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

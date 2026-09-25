"use client";

import { useEffect, useId, useState } from "react";
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
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="border-b border-cream-200 bg-cream-50/95 backdrop-blur-sm sticky top-0 z-50 pt-[env(safe-area-inset-top)] overflow-x-clip">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 lg:py-5">
        <div className="flex items-center justify-between gap-3 min-w-0">
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

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0" aria-label="Main">
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
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full border border-cream-200 bg-white text-warm-brown hover:bg-cream-100 transition-colors"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav
          id={menuId}
          aria-label="Main"
          className={`lg:hidden overflow-x-hidden pb-[env(safe-area-inset-bottom)] ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="mt-3 pt-2 border-t border-cream-200 flex flex-col max-h-[min(80vh,calc(100dvh-4rem))] overflow-y-auto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-base font-medium text-warm-brown border-b border-cream-200 last:border-b-0 hover:text-terracotta-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

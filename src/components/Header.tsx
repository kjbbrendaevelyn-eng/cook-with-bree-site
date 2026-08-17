import Link from "next/link";

const navLinks = [
  { href: "/recipes", label: "Recipes" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-cream-200 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="font-display text-2xl text-warm-brown group-hover:text-terracotta-600 transition-colors">
            Cook with Bree
          </span>
          <span className="block text-xs text-warm-muted tracking-widest uppercase mt-0.5">
            Recipes & Stories
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-muted hover:text-terracotta-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

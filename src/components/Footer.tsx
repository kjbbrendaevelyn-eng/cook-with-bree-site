import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl text-warm-brown">Cook with Bree</p>
            <p className="text-sm text-warm-muted mt-1">
              Sharing the recipes and stories that fill my kitchen with love.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-warm-muted">
            <Link href="/recipes" className="hover:text-terracotta-600 transition-colors">
              Recipes
            </Link>
            <Link href="/stories" className="hover:text-terracotta-600 transition-colors">
              Stories
            </Link>
            <Link href="/about" className="hover:text-terracotta-600 transition-colors">
              About
            </Link>
          </div>
        </div>
        <p className="text-xs text-warm-muted/60 mt-8 text-center md:text-left">
          © {new Date().getFullYear()} Cook with Bree. Made with love and a little butter.
        </p>
      </div>
    </footer>
  );
}

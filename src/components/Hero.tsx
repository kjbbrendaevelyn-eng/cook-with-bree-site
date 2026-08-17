import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-400/10 via-cream-50 to-sage-400/10" />
      <div className="absolute top-10 right-10 text-8xl opacity-10 rotate-12">🌿</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-10 -rotate-12">🍋</div>
      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-4">
            Welcome to my kitchen
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-warm-brown leading-tight">
            Recipes worth sharing, stories worth telling
          </h1>
          <p className="text-lg text-warm-muted mt-6 leading-relaxed">
            Hi, I&apos;m Bree! This is where I share the dishes I make for the people I love —
            along with the memories, mishaps, and little moments that happen along the way.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/recipes"
              className="inline-flex items-center px-6 py-3 bg-terracotta-500 text-white rounded-full text-sm font-medium hover:bg-terracotta-600 transition-colors"
            >
              Browse Recipes
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center px-6 py-3 border border-warm-brown/20 text-warm-brown rounded-full text-sm font-medium hover:bg-cream-200 transition-colors"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

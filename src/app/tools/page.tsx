import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Favorite Tools",
  description:
    "Bree’s favorite baking and cooking tools — the pans, knives, and everyday gear behind Cook with Bree recipes.",
};

export default function ToolsPage() {
  const baking = getToolsByCategory("baking");
  const cooking = getToolsByCategory("cooking");

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-3">
          Kitchen
        </p>
        <h1 className="font-display text-4xl text-warm-brown">Favorite Tools</h1>
        <p className="text-warm-muted mt-3 text-lg leading-relaxed">
          The gear I actually reach for — from croissant mornings to weeknight stews. Build your
          kitchen slowly; start with what helps you cook the food you love.
        </p>
      </div>

      <section className="mb-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl text-warm-brown">Baking</h2>
          <p className="text-warm-muted mt-1">
            For bread, pastry, cakes, and anything that needs an oven
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {baking.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="font-display text-3xl text-warm-brown">Cooking</h2>
          <p className="text-warm-muted mt-1">
            Everyday tools for stews, stir-fries, rice, and skillet dinners
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooking.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <div className="mt-16 p-8 bg-cream-100 rounded-2xl border border-cream-200">
        <h2 className="font-display text-2xl text-warm-brown">A note on shopping links</h2>
        <p className="text-warm-muted mt-3 leading-relaxed">
          When shop links appear, they may be affiliate links — if you buy through them, I may
          earn a small commission at no extra cost to you. I only list tools I use in my own
          kitchen.
        </p>
      </div>
    </div>
  );
}

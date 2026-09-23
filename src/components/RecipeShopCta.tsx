import Link from "next/link";
import { getRecipeShopCta } from "@/lib/recipe-shop-ctas";

interface RecipeShopCtaProps {
  slug: string;
}

export default function RecipeShopCta({ slug }: RecipeShopCtaProps) {
  const cta = getRecipeShopCta(slug);

  return (
    <aside className="mt-14 pt-10 border-t border-cream-200">
      <p className="text-xs font-medium text-terracotta-600 uppercase tracking-widest">
        {cta.eyebrow}
      </p>
      <h2 className="font-display text-2xl text-warm-brown mt-2">{cta.title}</h2>
      <p className="text-warm-muted mt-3 leading-relaxed max-w-xl">{cta.body}</p>
      <Link
        href={cta.href}
        className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
      >
        {cta.ctaLabel} →
      </Link>
    </aside>
  );
}

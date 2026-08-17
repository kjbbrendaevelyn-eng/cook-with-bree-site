import Link from "next/link";
import type { Recipe } from "@/lib/content";
import { formatDate } from "@/lib/content";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block bg-white rounded-2xl border border-cream-200 overflow-hidden hover:shadow-lg hover:border-terracotta-400/30 transition-all duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-terracotta-400/20 to-sage-400/20 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {recipe.emoji || "🍽️"}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-terracotta-600 uppercase tracking-wide">
            {recipe.category}
          </span>
          <span className="text-warm-muted/40">·</span>
          <span className="text-xs text-warm-muted">{formatDate(recipe.date)}</span>
        </div>
        <h3 className="font-display text-xl text-warm-brown group-hover:text-terracotta-600 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-sm text-warm-muted mt-2 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-4 mt-4 text-xs text-warm-muted">
          <span>⏱ {recipe.prepTime} prep</span>
          <span>🔥 {recipe.cookTime} cook</span>
          <span>🍴 Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}

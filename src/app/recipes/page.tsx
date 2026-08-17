import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse all recipes from Cook with Bree — home-cooked meals for every occasion.",
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const categories = [...new Set(recipes.map((r) => r.category))];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-display text-4xl text-warm-brown">All Recipes</h1>
        <p className="text-warm-muted mt-2 text-lg">
          {recipes.length} recipes to fill your table with warmth
        </p>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-3 py-1 rounded-full bg-terracotta-400/10 text-terracotta-600 font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

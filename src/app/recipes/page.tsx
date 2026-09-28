import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/content";
import { getRecipeCategory, recipeCategories } from "@/lib/recipe-categories";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Browse all recipes from Cook with Bree — bread, mains, cakes, cookies, soups, breakfast, and sauces.",
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const groups = recipeCategories.map((category) => ({
    category,
    recipes: recipes.filter((r) => getRecipeCategory(r.category)?.id === category.id),
  }));
  const uncategorized = recipes.filter((r) => !getRecipeCategory(r.category));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-warm-brown">All Recipes</h1>
        <p className="text-warm-muted mt-2 text-lg">
          {recipes.length} recipes to fill your table with warmth
        </p>
        <nav aria-label="Recipe categories" className="flex flex-wrap gap-2 mt-6">
          {groups.map(({ category, recipes: items }) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`inline-flex items-center gap-1.5 min-h-10 px-4 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-sm transition-all ${category.chip}`}
            >
              <span aria-hidden>{category.emoji}</span>
              {category.label}
              <span className="text-xs opacity-70">{items.length}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-14">
        {groups.map(({ category, recipes: items }) => (
          <section key={category.id} id={category.id} className="scroll-mt-28">
            <div className="flex items-center gap-4 mb-6">
              <span
                aria-hidden
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${category.tile}`}
              >
                {category.emoji}
              </span>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-warm-brown">
                  {category.label}
                </h2>
                <p className="text-sm text-warm-muted">{category.blurb}</p>
              </div>
            </div>
            {items.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((recipe) => (
                  <RecipeCard key={recipe.slug} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-cream-200 bg-cream-100/60 px-6 py-10 text-center">
                <p className="font-display text-xl text-warm-brown">Coming soon</p>
                <p className="text-sm text-warm-muted mt-1">
                  I&apos;m testing these in my kitchen. Check back soon!
                </p>
              </div>
            )}
          </section>
        ))}

        {uncategorized.length > 0 && (
          <section id="more" className="scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl text-warm-brown mb-6">More recipes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uncategorized.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

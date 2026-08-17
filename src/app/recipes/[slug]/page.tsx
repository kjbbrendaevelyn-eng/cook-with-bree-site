import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRecipes, getRecipeBySlug, formatDate } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/recipes"
        className="text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
      >
        ← Back to recipes
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{recipe.emoji || "🍽️"}</span>
          <span className="text-xs font-medium text-terracotta-600 uppercase tracking-wide">
            {recipe.category}
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-warm-brown leading-tight">
          {recipe.title}
        </h1>
        <p className="text-lg text-warm-muted mt-4">{recipe.description}</p>
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-warm-muted">
          <span>{formatDate(recipe.date)}</span>
          <span className="text-warm-muted/40">·</span>
          <span>⏱ {recipe.prepTime} prep</span>
          <span>🔥 {recipe.cookTime} cook</span>
          <span>🍴 Serves {recipe.servings}</span>
        </div>
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-warm-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose-recipe mt-10"
        dangerouslySetInnerHTML={{ __html: recipe.content }}
      />
    </article>
  );
}

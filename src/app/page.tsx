import Link from "next/link";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import MealPlanCard from "@/components/MealPlanCard";
import EbookCard from "@/components/EbookCard";
import { getAllRecipes, getAllStories } from "@/lib/content";
import { getFeaturedMealPlans } from "@/lib/meal-plans";
import { getFeaturedEbooks } from "@/lib/ebooks";

export default async function HomePage() {
  const [recipes, stories] = await Promise.all([getAllRecipes(), getAllStories()]);
  const featuredRecipes = recipes.filter((r) => r.featured).slice(0, 3);
  const featuredStories = stories.filter((s) => s.featured).slice(0, 2);
  const featuredPlans = getFeaturedMealPlans().slice(0, 2);
  const featuredEbooks = getFeaturedEbooks().slice(0, 1);

  return (
    <>
      <Hero />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl text-warm-brown">Latest Recipes</h2>
            <p className="text-warm-muted mt-1">Fresh from the kitchen</p>
          </div>
          <Link
            href="/recipes"
            className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="bg-cream-100/50 border-y border-cream-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-warm-brown">From the Heart</h2>
              <p className="text-warm-muted mt-1">Stories from my kitchen and beyond</p>
            </div>
            <Link
              href="/stories"
              className="text-sm font-medium text-sage-600 hover:text-sage-500 transition-colors"
            >
              Read more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl text-warm-brown">Printable Meal Plans</h2>
            <p className="text-warm-muted mt-1">Buy once, print anytime</p>
          </div>
          <Link
            href="/meal-plans"
            className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            Shop all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPlans.map((plan) => (
            <MealPlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </section>

      {featuredEbooks.length > 0 && (
        <section className="bg-cream-100/50 border-y border-cream-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl text-warm-brown">Downloadable Ebook</h2>
                <p className="text-warm-muted mt-1">Stories and recipes in one PDF</p>
              </div>
              <Link
                href="/ebooks"
                className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
              >
                Shop ebooks →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredEbooks.map((book) => (
                <EbookCard key={book.slug} book={book} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <span className="text-5xl">👩‍🍳</span>
        <h2 className="font-display text-3xl text-warm-brown mt-4">
          Every recipe has a story
        </h2>
        <p className="text-warm-muted mt-3 max-w-lg mx-auto">
          I started this blog to share the food I love making — and the people and moments
          that inspire each dish. Pull up a chair and stay awhile.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center mt-6 text-sm font-medium text-terracotta-600 hover:text-terracotta-700 transition-colors"
        >
          Meet Bree →
        </Link>
      </section>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import MealPlanCard from "@/components/MealPlanCard";
import EbookCard from "@/components/EbookCard";
import ToolCard from "@/components/ToolCard";
import { getAllRecipes, getAllStories } from "@/lib/content";
import { getFeaturedMealPlans } from "@/lib/meal-plans";
import { getFeaturedEbooks } from "@/lib/ebooks";
import { getFeaturedTools } from "@/lib/tools";
import { getRecipeCategory, recipeCategories } from "@/lib/recipe-categories";

const togetherMoments = [
  {
    src: "/images/home/friends-chapati.jpg",
    alt: "Three young friends laughing and dusting flour while rolling chapati in a modern kitchen",
    title: "Flour everywhere, laughter everywhere",
    caption: "Chapati day with the girls is never tidy, and that's the point.",
    tint: "bg-mango-300",
  },
  {
    src: "/images/home/grandma-grandson.jpg",
    alt: "A grandmother guiding her grandson's hand as he stirs a pot of stew",
    title: "Recipes passed hand to hand",
    caption: "The best lessons happen at the stove, one stir at a time.",
    tint: "bg-leaf-300",
  },
  {
    src: "/images/home/shared-table.jpg",
    alt: "Family hands reaching into bowls of curry, rice, chapati and fruit on a colourful tablecloth",
    title: "Everyone reaches for the pot",
    caption: "Food tastes better when the table is crowded.",
    tint: "bg-hibiscus-300",
  },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  accent,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  linkLabel: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
      <div>
        <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${accent}`}>{eyebrow}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-warm-brown mt-2">{title}</h2>
        <p className="text-warm-muted mt-2">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center self-start sm:self-auto min-h-11 px-5 rounded-full bg-white text-sm font-semibold text-warm-brown shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [recipes, stories] = await Promise.all([getAllRecipes(), getAllStories()]);
  const featured = recipes.filter((r) => r.featured);
  const latestRecipes = [...featured, ...recipes.filter((r) => !r.featured)].slice(0, 3);
  const featuredStories = stories.filter((s) => s.featured).slice(0, 2);
  const featuredPlans = getFeaturedMealPlans().slice(0, 2);
  const featuredEbooks = getFeaturedEbooks().slice(0, 1);
  const featuredTools = getFeaturedTools().slice(0, 3);
  return (
    <>
      <Hero />

      <section className="bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-hibiscus-700">
            What are you craving?
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {recipeCategories.map((category) => {
              const count = recipes.filter(
                (r) => getRecipeCategory(r.category)?.id === category.id
              ).length;
              return (
                <Link
                  key={category.id}
                  href={`/recipes#${category.id}`}
                  className={`group flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all ${category.tile}`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform" aria-hidden>
                    {category.emoji}
                  </span>
                  <span className="font-display text-lg">{category.label}</span>
                  <span className="text-xs opacity-90">
                    {count > 0 ? `${count} recipe${count === 1 ? "" : "s"}` : "Coming soon"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Fresh from the pot"
            title="Latest Recipes"
            subtitle="What's been bubbling on my stove lately"
            href="/recipes"
            linkLabel="All recipes"
            accent="text-mango-700"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sunshine-50">
        <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-lagoon-200/70 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-leaf-700">
              Better together
            </p>
            <h2 className="font-display text-3xl sm:text-5xl text-warm-brown mt-2 leading-tight">
              Food is how we say <span className="text-hibiscus-700">&ldquo;I love you&rdquo;</span>
            </h2>
            <p className="text-warm-muted mt-4 text-base sm:text-lg">
              My favourite kitchen memories aren&apos;t about perfect dishes. They&apos;re about
              the people squeezed around the counter, the jokes, the tasting spoons, and the
              stories we tell while the pot simmers.
            </p>
          </div>

          <div className="grid gap-6 mt-12 md:grid-cols-3 md:items-start">
            {togetherMoments.map((moment, i) => (
              <figure
                key={moment.src}
                className={`group relative rounded-3xl bg-white p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  i === 1 ? "md:mt-10" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span
                    className={`absolute left-3 top-3 h-3 w-3 rounded-full ring-4 ring-white/70 ${moment.tint}`}
                    aria-hidden
                  />
                </div>
                <figcaption className="px-2 pt-4 pb-2">
                  <p className="font-display text-xl text-warm-brown">{moment.title}</p>
                  <p className="text-sm text-warm-muted mt-1">{moment.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lagoon-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeading
            eyebrow="From the heart"
            title="Stories"
            subtitle="The people and moments behind the food"
            href="/stories"
            linkLabel="Read more"
            accent="text-lagoon-700"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-mango-100 via-hibiscus-100 to-plum-100">
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sunshine-200/70 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Take Bree home"
            title="Meal Plans & Ebooks"
            subtitle="Printable plans and stories you can keep forever"
            href="/meal-plans"
            linkLabel="Shop all"
            accent="text-plum-700"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPlans.map((plan) => (
              <MealPlanCard key={plan.slug} plan={plan} />
            ))}
            {featuredEbooks.map((book) => (
              <EbookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-leaf-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Gear I love"
            title="My Kitchen"
            subtitle="The baking and cooking tools I actually use"
            href="/my-kitchen"
            linkLabel="View all"
            accent="text-leaf-700"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid overflow-hidden rounded-[2rem] bg-plum-100 shadow-xl md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[22rem]">
              <Image
                src="/images/home/shared-table.jpg"
                alt="A colourful home-cooked feast shared around the table"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 text-warm-brown">
              <span className="text-5xl" aria-hidden>
                👩🏾‍🍳
              </span>
              <h2 className="font-display text-3xl sm:text-4xl mt-4">Every recipe has a story</h2>
              <p className="text-warm-muted mt-4 leading-relaxed">
                I started this site to share the food I love making, and the people and moments
                that inspire each dish. Pull up a chair and stay awhile.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center self-start min-h-11 mt-8 px-6 rounded-full bg-white text-sm font-bold text-plum-700 shadow-sm hover:bg-plum-50 hover:-translate-y-0.5 transition-all"
              >
                Meet Bree →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButton from "@/components/BuyButton";
import { formatPrice, getAllMealPlans, getMealPlanBySlug } from "@/lib/meal-plans";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMealPlans().map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = getMealPlanBySlug(slug);
  if (!plan) return { title: "Meal Plan Not Found" };
  return {
    title: plan.title,
    description: plan.description,
  };
}

export default async function MealPlanPage({ params }: Props) {
  const { slug } = await params;
  const plan = getMealPlanBySlug(slug);
  if (!plan) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/meal-plans"
        className="text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
      >
        ← All meal plans
      </Link>

      <header className="mt-8">
        <span className="text-5xl">{plan.emoji}</span>
        <p className="text-xs font-medium text-terracotta-600 uppercase tracking-wide mt-4">
          {plan.format} · {plan.servings}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-warm-brown leading-tight mt-2">
          {plan.title}
        </h1>
        <p className="text-lg text-warm-muted mt-4 leading-relaxed">{plan.description}</p>
        <p className="font-display text-3xl text-warm-brown mt-6">{formatPrice(plan)}</p>
      </header>

      <BuyButton plan={plan} className="mt-8 max-w-sm" />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-warm-brown pb-2 border-b border-cream-200">
          What&apos;s included
        </h2>
        <ul className="mt-4 space-y-3">
          {plan.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-warm-muted">
              <span className="text-terracotta-500 font-bold shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 p-6 bg-cream-100 rounded-2xl border border-cream-200">
        <h2 className="font-display text-xl text-warm-brown">Printable &amp; reusable</h2>
        <p className="text-warm-muted mt-2 leading-relaxed">
          After purchase you get a PDF you can print at home or keep on your phone. Use it again
          any week — no subscription required.
        </p>
      </section>

      <p className="text-sm text-warm-muted mt-10">
        Looking for free recipes first?{" "}
        <Link href="/recipes" className="text-terracotta-600 hover:text-terracotta-700">
          Browse the recipe library →
        </Link>
      </p>
    </article>
  );
}

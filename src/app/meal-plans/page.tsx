import type { Metadata } from "next";
import MealPlanCard from "@/components/MealPlanCard";
import { getAllMealPlans } from "@/lib/meal-plans";

export const metadata: Metadata = {
  title: "Meal Plans",
  description:
    "Printable meal plans from Cook with Bree — grocery lists, prep notes, and weeknight-friendly menus you can buy and print at home.",
};

export default function MealPlansPage() {
  const plans = getAllMealPlans();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-3">
          Shop
        </p>
        <h1 className="font-display text-4xl text-warm-brown">Printable Meal Plans</h1>
        <p className="text-warm-muted mt-3 text-lg leading-relaxed">
          Ready-to-print plans with menus, grocery lists, and prep notes — so you can cook with
          less stress and more joy. Buy once, print anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <MealPlanCard key={plan.slug} plan={plan} />
        ))}
      </div>

      <div className="mt-16 p-8 bg-cream-100 rounded-2xl border border-cream-200">
        <h2 className="font-display text-2xl text-warm-brown">How it works</h2>
        <ol className="mt-4 space-y-3 text-warm-muted list-decimal list-inside">
          <li>Choose a meal plan that fits your week.</li>
          <li>Complete secure checkout (Stripe, Gumroad, or similar).</li>
          <li>Download your printable PDF instantly and cook all week.</li>
        </ol>
      </div>
    </div>
  );
}

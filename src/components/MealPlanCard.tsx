import Link from "next/link";
import type { MealPlan } from "@/lib/meal-plans";
import { formatPrice } from "@/lib/meal-plans";

interface MealPlanCardProps {
  plan: MealPlan;
}

export default function MealPlanCard({ plan }: MealPlanCardProps) {
  return (
    <Link
      href={`/meal-plans/${plan.slug}`}
      className="group block bg-white rounded-2xl border border-cream-200 p-6 hover:shadow-lg hover:border-terracotta-400/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {plan.emoji}
        </span>
        <span className="text-sm font-medium text-terracotta-600 shrink-0">
          {formatPrice(plan)}
        </span>
      </div>
      <p className="text-xs font-medium text-warm-muted uppercase tracking-wide mt-4">
        {plan.format} · {plan.servings}
      </p>
      <h3 className="font-display text-xl text-warm-brown group-hover:text-terracotta-600 transition-colors mt-1">
        {plan.title}
      </h3>
      <p className="text-sm text-warm-muted mt-2 line-clamp-3">{plan.summary}</p>
      <ul className="flex flex-wrap gap-2 mt-4">
        {plan.highlights.map((item) => (
          <li
            key={item}
            className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-warm-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="text-sm font-medium text-terracotta-600 mt-5 group-hover:text-terracotta-700 transition-colors">
        View plan →
      </p>
    </Link>
  );
}

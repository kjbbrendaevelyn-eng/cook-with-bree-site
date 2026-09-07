import { formatPrice, type MealPlan } from "@/lib/meal-plans";

interface BuyButtonProps {
  plan: MealPlan;
  className?: string;
}

export default function BuyButton({ plan, className = "" }: BuyButtonProps) {
  const ready = Boolean(plan.purchaseUrl.trim());

  if (!ready) {
    return (
      <div className={className}>
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-medium bg-cream-200 text-warm-muted cursor-not-allowed"
        >
          Coming soon — {formatPrice(plan)}
        </button>
        <p className="text-xs text-warm-muted mt-2 text-center">
          Purchase link will be available shortly.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <a
        href={plan.purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
      >
        Buy printable plan — {formatPrice(plan)}
      </a>
      <p className="text-xs text-warm-muted mt-2 text-center">
        Secure checkout · Instant PDF download after purchase
      </p>
    </div>
  );
}

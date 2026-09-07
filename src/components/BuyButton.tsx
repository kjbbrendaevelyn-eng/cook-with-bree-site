import { formatPrice, type MealPlan } from "@/lib/meal-plans";
import { formatEbookPrice, type Ebook } from "@/lib/ebooks";

type BuyProduct =
  | { kind: "meal-plan"; product: MealPlan }
  | { kind: "ebook"; product: Ebook };

interface BuyButtonProps {
  product: BuyProduct;
  className?: string;
}

export default function BuyButton({ product, className = "" }: BuyButtonProps) {
  const { purchaseUrl, priceLabel, ctaLabel, footnote } =
    product.kind === "meal-plan"
      ? {
          purchaseUrl: product.product.purchaseUrl,
          priceLabel: formatPrice(product.product),
          ctaLabel: `Buy printable plan — ${formatPrice(product.product)}`,
          footnote: "Secure checkout · Instant PDF download after purchase",
        }
      : {
          purchaseUrl: product.product.purchaseUrl,
          priceLabel: formatEbookPrice(product.product),
          ctaLabel: `Buy & download ebook — ${formatEbookPrice(product.product)}`,
          footnote: "Secure checkout · Instant PDF download after purchase",
        };

  const ready = Boolean(purchaseUrl.trim());

  if (!ready) {
    return (
      <div className={className}>
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-medium bg-cream-200 text-warm-muted cursor-not-allowed"
        >
          Coming soon — {priceLabel}
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
        href={purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
      >
        {ctaLabel}
      </a>
      <p className="text-xs text-warm-muted mt-2 text-center">{footnote}</p>
    </div>
  );
}

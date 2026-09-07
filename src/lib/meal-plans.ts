export interface MealPlan {
  slug: string;
  title: string;
  description: string;
  /** Short blurb shown on cards */
  summary: string;
  price: number;
  currency: string;
  /** e.g. "7-day plan", "Printable PDF" */
  format: string;
  servings: string;
  emoji: string;
  featured?: boolean;
  highlights: string[];
  includes: string[];
  /**
   * Checkout URL from Stripe Payment Links, Gumroad, Lemon Squeezy, etc.
   * Leave empty until you create the product — Buy button stays disabled.
   */
  purchaseUrl: string;
  /** Optional sample preview page path on this site */
  previewHref?: string;
}

export const mealPlans: MealPlan[] = [
  {
    slug: "easy-african-inspired-dinners",
    title: "Easy African Inspired Dinners",
    summary: "7 days of comforting African-inspired dinners you can actually cook after work.",
    description:
      "A printable 7-day meal plan built around favorites from my kitchen — chapati nights, pea stew, coconut rice, and simple protein sides — with a grocery list and prep notes so dinner feels doable all week.",
    price: 12,
    currency: "USD",
    format: "Printable PDF",
    servings: "Feeds 2–4",
    emoji: "🍽️",
    featured: true,
    highlights: ["7 dinners", "Grocery list", "Prep timeline"],
    includes: [
      "Full 7-day dinner calendar",
      "Printable grocery list organized by section",
      "Make-ahead and leftover tips",
      "Links to matching Cook with Bree recipes",
    ],
    purchaseUrl: "",
  },
  {
    slug: "special-dinner",
    title: "Special Dinner",
    summary: "A printable plan for when you want dinner to feel like an occasion — without the stress.",
    description:
      "A printable special-occasion dinner plan with shopping list, cooking timeline, and a beautiful menu you can pull off at home — perfect for guests, birthdays, or any night that deserves a little extra care.",
    price: 9,
    currency: "USD",
    format: "Printable PDF",
    servings: "Feeds 2–6",
    emoji: "✨",
    featured: true,
    highlights: ["Full menu", "Timing guide", "Shopping list"],
    includes: [
      "Starter, main, side, and sweet finish suggestions",
      "Hour-by-hour cooking timeline",
      "Printable shopping list",
      "Make-ahead tips so you're not stuck in the kitchen all evening",
    ],
    purchaseUrl: "",
  },
  {
    slug: "romantic-ugandan-dinner",
    title: "Romantic Ugandan Dinner",
    summary: "An intimate Ugandan-inspired dinner for two — warm, flavorful, and made for sharing.",
    description:
      "A printable date-night meal plan with shopping list, timeline, and a Ugandan-inspired menu for two — inspired by the kind of love that made Valentine's Day feel like a holiday in our house.",
    price: 7,
    currency: "USD",
    format: "Printable PDF",
    servings: "Dinner for 2",
    emoji: "💕",
    featured: true,
    highlights: ["Menu for 2", "Timing guide", "Shopping list"],
    includes: [
      "Ugandan-inspired menu for two",
      "Hour-by-hour cooking timeline",
      "Printable shopping list",
      "Table-setting and serving notes",
    ],
    purchaseUrl: "",
  },
];

export function getAllMealPlans(): MealPlan[] {
  return mealPlans;
}

export function getFeaturedMealPlans(): MealPlan[] {
  return mealPlans.filter((plan) => plan.featured);
}

export function getMealPlanBySlug(slug: string): MealPlan | null {
  return mealPlans.find((plan) => plan.slug === slug) ?? null;
}

export function formatPrice(plan: MealPlan): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.currency,
  }).format(plan.price);
}

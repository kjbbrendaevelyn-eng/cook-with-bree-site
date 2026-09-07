export interface Ebook {
  slug: string;
  title: string;
  description: string;
  summary: string;
  price: number;
  currency: string;
  format: string;
  pages: string;
  emoji: string;
  featured?: boolean;
  highlights: string[];
  includes: string[];
  /**
   * Checkout URL from Stripe Payment Links, Gumroad, Lemon Squeezy, etc.
   * Leave empty until you create the product — Buy button stays disabled.
   */
  purchaseUrl: string;
}

export const ebooks: Ebook[] = [
  {
    slug: "from-buziga-with-love",
    title: "From Buziga with Love",
    summary:
      "A downloadable ebook of Ugandan kitchen stories and recipes — from matooke and chapati to coconut rice and the meals that taste like home.",
    description:
      "From Buziga with Love is a printable, downloadable ebook from Cook with Bree — part memoir, part recipe collection. Inside you'll find the stories behind the food (family, Salma, Friday evenings, Valentine's Day in Uganda) alongside approachable recipes you can cook in your own kitchen.",
    price: 15,
    currency: "USD",
    format: "Downloadable PDF ebook",
    pages: "40+ pages",
    emoji: "📖",
    featured: true,
    highlights: ["Stories + recipes", "Instant download", "Print or keep digital"],
    includes: [
      "Kitchen stories from Uganda and beyond",
      "Selected Cook with Bree recipes in one place",
      "Printable PDF — read on phone, tablet, or print at home",
      "Lifetime access after purchase (re-download anytime)",
    ],
    purchaseUrl: "https://brendaevy.gumroad.com/l/from-buziga-with-love",
    // Local PDF for upload to Stripe/Gumroad: products/ebooks/from-buziga-with-love.pdf
    // Regenerate with: npm run ebook:generate
  },
];

export function getAllEbooks(): Ebook[] {
  return ebooks;
}

export function getFeaturedEbooks(): Ebook[] {
  return ebooks.filter((book) => book.featured);
}

export function getEbookBySlug(slug: string): Ebook | null {
  return ebooks.find((book) => book.slug === slug) ?? null;
}

export function formatEbookPrice(book: Ebook): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: book.currency,
  }).format(book.price);
}

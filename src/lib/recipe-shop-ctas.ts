export interface RecipeShopCta {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
}

/** Recipe-specific shop prompts. Unlisted recipes get the default CTA. */
const recipeShopCtas: Record<string, RecipeShopCta> = {
  chapati: {
    eyebrow: "Printable plan",
    title: "Make chapati night a whole week",
    body: "Easy African Inspired Dinners includes chapati nights, grocery lists, and prep notes so dinner stays doable.",
    href: "/meal-plans/easy-african-inspired-dinners",
    ctaLabel: "Get the meal plan",
  },
  "matooke-with-groundnut-sauce": {
    eyebrow: "Ebook",
    title: "More Ugandan kitchen stories & recipes",
    body: "From Buziga with Love gathers matooke, family stories, and the meals that taste like home in one printable ebook.",
    href: "/ebooks/from-buziga-with-love",
    ctaLabel: "Get the ebook",
  },
  "roasted-beef-luwombo": {
    eyebrow: "Date-night plan",
    title: "Cook a romantic Ugandan dinner for two",
    body: "A printable menu, shopping list, and timeline inspired by the kind of love that filled our house in Buziga.",
    href: "/meal-plans/romantic-ugandan-dinner",
    ctaLabel: "Get the dinner plan",
  },
  "coconut-rice": {
    eyebrow: "Printable plan",
    title: "Build a week around coconut rice",
    body: "Pair this pot with the Easy African Inspired Dinners plan — grocery list and seven comforting meals included.",
    href: "/meal-plans/easy-african-inspired-dinners",
    ctaLabel: "Get the meal plan",
  },
  "english-peas-stew": {
    eyebrow: "Printable plan",
    title: "Turn stew night into a full week",
    body: "Easy African Inspired Dinners gives you a grocery list and prep timeline around favorites like this.",
    href: "/meal-plans/easy-african-inspired-dinners",
    ctaLabel: "Get the meal plan",
  },
  "pork-curry": {
    eyebrow: "Special occasion",
    title: "Hosting? Take the stress out of dinner",
    body: "The Special Dinner plan has a full menu, shopping list, and hour-by-hour timeline you can actually follow.",
    href: "/meal-plans/special-dinner",
    ctaLabel: "Get the dinner plan",
  },
  "bean-stew": {
    eyebrow: "Ebook",
    title: "Bring home to your kitchen table",
    body: "From Buziga with Love — Ugandan kitchen stories and recipes you can download, print, and keep forever.",
    href: "/ebooks/from-buziga-with-love",
    ctaLabel: "Get the ebook",
  },
  "stir-fried-pork-with-cabbage": {
    eyebrow: "Printable plan",
    title: "Need a week of easy dinners?",
    body: "Skip the daily “what’s for dinner” spiral with a printable 7-day African-inspired plan.",
    href: "/meal-plans/easy-african-inspired-dinners",
    ctaLabel: "Get the meal plan",
  },
};

const defaultCta: RecipeShopCta = {
  eyebrow: "Cook with Bree shop",
  title: "Take this recipe further",
  body: "Printable meal plans and a downloadable ebook with Ugandan kitchen stories — buy once, keep forever.",
  href: "/meal-plans",
  ctaLabel: "Browse meal plans",
};

export function getRecipeShopCta(slug: string): RecipeShopCta {
  return recipeShopCtas[slug] ?? defaultCta;
}

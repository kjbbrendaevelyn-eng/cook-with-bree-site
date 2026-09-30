export interface RecipeCategory {
  id: string;
  label: string;
  emoji: string;
  blurb: string;
  chip: string;
  tile: string;
}

export const recipeCategories: RecipeCategory[] = [
  {
    id: "bread",
    label: "Bread",
    emoji: "🍞",
    blurb: "Loaves, flatbreads, and weekend bakes",
    chip: "bg-mango-100 text-mango-700",
    tile: "bg-mango-200 text-warm-brown",
  },
  {
    id: "main",
    label: "Main",
    emoji: "🍲",
    blurb: "Stews, curries, and meals for the whole table",
    chip: "bg-hibiscus-100 text-hibiscus-700",
    tile: "bg-hibiscus-200 text-warm-brown",
  },
  {
    id: "cakes",
    label: "Cakes",
    emoji: "🎂",
    blurb: "Celebration cakes and sweet slices",
    chip: "bg-plum-100 text-plum-700",
    tile: "bg-plum-200 text-warm-brown",
  },
  {
    id: "cookies",
    label: "Cookies",
    emoji: "🍪",
    blurb: "Little bakes for the biscuit tin",
    chip: "bg-sunshine-100 text-sunshine-700",
    tile: "bg-sunshine-200 text-warm-brown",
  },
  {
    id: "soups",
    label: "Soups",
    emoji: "🥣",
    blurb: "Warm bowls for cold days and sick days",
    chip: "bg-lagoon-100 text-lagoon-700",
    tile: "bg-lagoon-200 text-warm-brown",
  },
  {
    id: "breakfast",
    label: "Breakfast",
    emoji: "🍳",
    blurb: "Slow mornings and quick starts",
    chip: "bg-cream-200 text-terracotta-700",
    tile: "bg-cream-200 text-warm-brown",
  },
  {
    id: "sauces",
    label: "Sauces",
    emoji: "🫙",
    blurb: "Sauces and gravies to spoon over everything",
    chip: "bg-leaf-100 text-leaf-700",
    tile: "bg-leaf-200 text-warm-brown",
  },
];

export function getRecipeCategory(label: string): RecipeCategory | undefined {
  return recipeCategories.find((c) => c.label.toLowerCase() === label.trim().toLowerCase());
}

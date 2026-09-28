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
    chip: "bg-mango-100 text-mango-600",
    tile: "bg-mango-500 text-white",
  },
  {
    id: "main",
    label: "Main",
    emoji: "🍲",
    blurb: "Stews, curries, and meals for the whole table",
    chip: "bg-hibiscus-100 text-hibiscus-600",
    tile: "bg-hibiscus-500 text-white",
  },
  {
    id: "cakes",
    label: "Cakes",
    emoji: "🎂",
    blurb: "Celebration cakes and sweet slices",
    chip: "bg-plum-100 text-plum-600",
    tile: "bg-plum-500 text-white",
  },
  {
    id: "cookies",
    label: "Cookies",
    emoji: "🍪",
    blurb: "Little bakes for the biscuit tin",
    chip: "bg-mango-100 text-warm-brown",
    tile: "bg-mango-600 text-white",
  },
  {
    id: "soups",
    label: "Soups",
    emoji: "🥣",
    blurb: "Warm bowls for cold days and sick days",
    chip: "bg-lagoon-100 text-lagoon-500",
    tile: "bg-lagoon-500 text-white",
  },
  {
    id: "breakfast",
    label: "Breakfast",
    emoji: "🍳",
    blurb: "Slow mornings and quick starts",
    chip: "bg-sunshine-100 text-warm-brown",
    tile: "bg-sunshine-400 text-warm-brown",
  },
  {
    id: "sauces",
    label: "Sauces",
    emoji: "🫙",
    blurb: "Sauces and gravies to spoon over everything",
    chip: "bg-leaf-100 text-leaf-600",
    tile: "bg-leaf-500 text-white",
  },
];

export function getRecipeCategory(label: string): RecipeCategory | undefined {
  return recipeCategories.find((c) => c.label.toLowerCase() === label.trim().toLowerCase());
}

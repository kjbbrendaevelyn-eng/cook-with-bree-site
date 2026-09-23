export type ToolCategory = "baking" | "cooking";

export interface KitchenTool {
  slug: string;
  name: string;
  summary: string;
  why: string;
  category: ToolCategory;
  emoji: string;
  featured?: boolean;
  /**
   * Optional affiliate or shop URL (Amazon, etc.).
   * Leave empty until you add your link — “Shop” stays hidden.
   */
  shopUrl: string;
}

export const kitchenTools: KitchenTool[] = [
  // Baking
  {
    slug: "kitchen-scale",
    name: "Digital Kitchen Scale",
    summary: "Weigh flour and butter the way bakery recipes intend.",
    why: "Essential for croissants, brioche, and bread — cups lie, grams don’t.",
    category: "baking",
    emoji: "⚖️",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "mixing-bowls",
    name: "Nesting Mixing Bowls",
    summary: "A set of sturdy bowls for doughs, batters, and mise en place.",
    why: "Every bake starts here — banana bread, red velvet, pizza dough.",
    category: "baking",
    emoji: "🥣",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "baking-sheets",
    name: "Heavy Rimmed Baking Sheets",
    summary: "Sheet pans that don’t warp when the oven gets hot.",
    why: "Croissants, roasted veggies, and cookies all need a reliable tray.",
    category: "baking",
    emoji: "🍪",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "parchment-paper",
    name: "Parchment Paper",
    summary: "Nonstick lining for clean releases and easy cleanup.",
    why: "Keeps croissants and bread from sticking without extra grease.",
    category: "baking",
    emoji: "📄",
    shopUrl: "",
  },
  {
    slug: "rolling-pin",
    name: "Wooden Rolling Pin",
    summary: "For laminating dough and rolling chapati or pizza.",
    why: "Croissants and flatbreads need even pressure — this is the tool.",
    category: "baking",
    emoji: "🪵",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "bench-scraper",
    name: "Bench Scraper",
    summary: "Cut, lift, and clean dough without tearing it apart.",
    why: "A quiet hero for bread dough and croissant folds.",
    category: "baking",
    emoji: "🔪",
    shopUrl: "",
  },
  {
    slug: "cake-pans",
    name: "9-Inch Round Cake Pans (Set of 2)",
    summary: "Even layers for celebration cakes.",
    why: "Red velvet (and any layer cake) needs two matched pans.",
    category: "baking",
    emoji: "🎂",
    shopUrl: "",
  },
  {
    slug: "cooling-rack",
    name: "Wire Cooling Rack",
    summary: "Lets air circulate so bakes don’t steam underneath.",
    why: "Bread and cakes finish properly off the hot pan.",
    category: "baking",
    emoji: "🧊",
    shopUrl: "",
  },
  {
    slug: "hand-mixer",
    name: "Hand Mixer",
    summary: "Cream butter, whip frosting, mix batters without a stand mixer.",
    why: "Cream cheese frosting and cake batters come together fast.",
    category: "baking",
    emoji: "🔌",
    shopUrl: "",
  },
  {
    slug: "measuring-set",
    name: "Measuring Cups & Spoons",
    summary: "A complete set for wet and dry ingredients.",
    why: "Still handy even if you bake mostly by weight.",
    category: "baking",
    emoji: "🥄",
    shopUrl: "",
  },

  // Cooking
  {
    slug: "chefs-knife",
    name: "Chef’s Knife",
    summary: "One good knife for onions, meat, herbs, and everything between.",
    why: "Curries, stews, and stir-fries all start with a sharp blade.",
    category: "cooking",
    emoji: "🗡️",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "cutting-board",
    name: "Large Wooden Cutting Board",
    summary: "Stable surface for daily prep.",
    why: "Gives you room to work when dinner involves a full board of veg.",
    category: "cooking",
    emoji: "🪵",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "dutch-oven",
    name: "Dutch Oven / Heavy Pot",
    summary: "For slow simmers, stews, and one-pot dinners.",
    why: "Bean stew, pork curry, and soups love even, gentle heat.",
    category: "cooking",
    emoji: "🍲",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "cast-iron-skillet",
    name: "Cast Iron Skillet",
    summary: "Holds heat for searing, pan pizza, and golden crusts.",
    why: "Pan pizza and weeknight browning both live here.",
    category: "cooking",
    emoji: "🍳",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "large-skillet",
    name: "Large Nonstick or Stainless Skillet",
    summary: "Everyday pan for sauces, eggs, and stir-fries.",
    why: "Mushroom sauce and pork with cabbage need room to move.",
    category: "cooking",
    emoji: "🥘",
    shopUrl: "",
  },
  {
    slug: "wok",
    name: "Wok or Deep Stir-Fry Pan",
    summary: "High heat and fast tossing for stir-fries.",
    why: "Ideal when cabbage and pork need to sear, not steam.",
    category: "cooking",
    emoji: "🍜",
    shopUrl: "",
  },
  {
    slug: "wooden-spoon",
    name: "Wooden Spoon",
    summary: "Gentle stirring that won’t scratch your pots.",
    why: "The tool I reach for every stew and curry.",
    category: "cooking",
    emoji: "🥄",
    shopUrl: "",
  },
  {
    slug: "tongs",
    name: "Kitchen Tongs",
    summary: "Flip, toss, and serve without piercing the food.",
    why: "Makes browning chicken and turning chapati easier.",
    category: "cooking",
    emoji: "🥢",
    shopUrl: "",
  },
  {
    slug: "rice-cooker",
    name: "Rice Cooker",
    summary: "Set-and-forget rice — including coconut rice.",
    why: "Consistent rice while the rest of dinner happens on the stove.",
    category: "cooking",
    emoji: "🍚",
    featured: true,
    shopUrl: "",
  },
  {
    slug: "colander",
    name: "Colander",
    summary: "Drain pasta, rinse beans, wash greens.",
    why: "Alfredo night and bean stew both need one nearby.",
    category: "cooking",
    emoji: "🕳️",
    shopUrl: "",
  },
];

export function getAllTools(): KitchenTool[] {
  return kitchenTools;
}

export function getToolsByCategory(category: ToolCategory): KitchenTool[] {
  return kitchenTools.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): KitchenTool[] {
  return kitchenTools.filter((tool) => tool.featured);
}

export function getToolBySlug(slug: string): KitchenTool | null {
  return kitchenTools.find((tool) => tool.slug === slug) ?? null;
}

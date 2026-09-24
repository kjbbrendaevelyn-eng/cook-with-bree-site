export type RecipeSource = "site" | "personal";

export interface PersonalRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  category: string;
  emoji: string;
  createdAt: string;
  updatedAt: string;
}

export type MealPlanDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface MealPlanSlot {
  source: RecipeSource;
  /** Site recipe slug or personal recipe id */
  id: string;
  title: string;
  emoji: string;
}

export type WeeklyMealPlan = Partial<Record<MealPlanDay, MealPlanSlot>>;

const RECIPES_KEY = "cwb-personal-recipes";
const MEAL_PLAN_KEY = "cwb-weekly-meal-plan";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadPersonalRecipes(): PersonalRecipe[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(RECIPES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersonalRecipe[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePersonalRecipes(recipes: PersonalRecipe[]): void {
  if (!canUseStorage()) return;
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

export function loadWeeklyMealPlan(): WeeklyMealPlan {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(MEAL_PLAN_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as WeeklyMealPlan;
  } catch {
    return {};
  }
}

export function saveWeeklyMealPlan(plan: WeeklyMealPlan): void {
  if (!canUseStorage()) return;
  localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
}

export function createPersonalRecipeId(): string {
  return `personal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const MEAL_PLAN_DAYS: { key: MealPlanDay; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

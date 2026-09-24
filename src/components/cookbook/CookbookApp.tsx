"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { RecipeSummary } from "@/lib/content";
import {
  MEAL_PLAN_DAYS,
  type MealPlanDay,
  type MealPlanSlot,
  type PersonalRecipe,
  type WeeklyMealPlan,
  createPersonalRecipeId,
  loadPersonalRecipes,
  loadWeeklyMealPlan,
  savePersonalRecipes,
  saveWeeklyMealPlan,
} from "@/lib/cookbook-storage";

type Tab = "recipes" | "personal" | "planner";

interface CookbookAppProps {
  siteRecipes: RecipeSummary[];
}

const emptyForm = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  servings: "4",
  prepTime: "",
  cookTime: "",
  category: "Main",
  emoji: "🍽️",
};

export default function CookbookApp({ siteRecipes }: CookbookAppProps) {
  const [tab, setTab] = useState<Tab>("recipes");
  const [query, setQuery] = useState("");
  const [personalRecipes, setPersonalRecipes] = useState<PersonalRecipe[]>([]);
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>({});
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [assignDay, setAssignDay] = useState<MealPlanDay | null>(null);

  useEffect(() => {
    setPersonalRecipes(loadPersonalRecipes());
    setMealPlan(loadWeeklyMealPlan());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    savePersonalRecipes(personalRecipes);
  }, [personalRecipes, ready]);

  useEffect(() => {
    if (!ready) return;
    saveWeeklyMealPlan(mealPlan);
  }, [mealPlan, ready]);

  const filteredSite = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return siteRecipes;
    return siteRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }, [siteRecipes, query]);

  const filteredPersonal = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return personalRecipes;
    return personalRecipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.toLowerCase().includes(q)
    );
  }, [personalRecipes, query]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(recipe: PersonalRecipe) {
    setEditingId(recipe.id);
    setForm({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      category: recipe.category,
      emoji: recipe.emoji,
    });
    setTab("personal");
  }

  function handleSavePersonal(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;

    const now = new Date().toISOString();
    if (editingId) {
      setPersonalRecipes((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                ...form,
                title: form.title.trim(),
                updatedAt: now,
              }
            : r
        )
      );
    } else {
      const recipe: PersonalRecipe = {
        id: createPersonalRecipeId(),
        ...form,
        title: form.title.trim(),
        createdAt: now,
        updatedAt: now,
      };
      setPersonalRecipes((prev) => [recipe, ...prev]);
    }
    resetForm();
  }

  function deletePersonal(id: string) {
    if (!confirm("Delete this personal recipe?")) return;
    setPersonalRecipes((prev) => prev.filter((r) => r.id !== id));
    setMealPlan((prev) => {
      const next = { ...prev };
      for (const day of MEAL_PLAN_DAYS) {
        const slot = next[day.key];
        if (slot?.source === "personal" && slot.id === id) {
          delete next[day.key];
        }
      }
      return next;
    });
    if (editingId === id) resetForm();
  }

  function assignToDay(slot: MealPlanSlot, day: MealPlanDay) {
    setMealPlan((prev) => ({ ...prev, [day]: slot }));
    setAssignDay(null);
    setTab("planner");
  }

  function clearDay(day: MealPlanDay) {
    setMealPlan((prev) => {
      const next = { ...prev };
      delete next[day];
      return next;
    });
  }

  const tabs: { id: Tab; label: string; short: string }[] = [
    { id: "recipes", label: "Site recipes", short: "Site" },
    { id: "personal", label: "My recipes", short: "Mine" },
    { id: "planner", label: "Meal plan", short: "Plan" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mb-8 sm:mb-10 max-w-2xl">
        <p className="text-xs sm:text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-2 sm:mb-3">
          Personal cookbook
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-warm-brown">Cookbook App</h1>
        <p className="text-warm-muted mt-2 sm:mt-3 text-base sm:text-lg leading-relaxed">
          Browse Cook with Bree recipes, save your own, and build a weekly meal plan. Your
          personal recipes and plans stay on this device.
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-1 sm:flex sm:flex-wrap sm:gap-2 border-b border-cream-200 pb-3 sm:pb-4 mb-6 sm:mb-8 sticky top-[calc(3.25rem+env(safe-area-inset-top))] sm:top-[calc(4.5rem+env(safe-area-inset-top))] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 bg-cream-50/95 backdrop-blur-sm"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`min-h-11 px-2 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === item.id
                ? "bg-terracotta-500 text-white"
                : "bg-cream-100 text-warm-muted hover:text-terracotta-600"
            }`}
          >
            <span className="sm:hidden">{item.short}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>

      {(tab === "recipes" || tab === "personal") && (
        <div className="mb-5 sm:mb-6">
          <label className="sr-only" htmlFor="cookbook-search">
            Search recipes
          </label>
          <input
            id="cookbook-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes…"
            className="w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-base sm:text-sm text-warm-brown placeholder:text-warm-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta-400/40"
          />
        </div>
      )}

      {assignDay && (
        <div className="mb-5 sm:mb-6 p-4 rounded-2xl border border-terracotta-400/30 bg-terracotta-400/5 text-sm text-warm-muted">
          Pick a recipe below to add to{" "}
          <span className="font-medium text-warm-brown capitalize">{assignDay}</span>.{" "}
          <button
            type="button"
            onClick={() => setAssignDay(null)}
            className="text-terracotta-600 hover:text-terracotta-700 font-medium min-h-11 inline-flex items-center"
          >
            Cancel
          </button>
        </div>
      )}

      {tab === "recipes" && (
        <section>
          <p className="text-sm text-warm-muted mb-4">
            {filteredSite.length} recipe{filteredSite.length === 1 ? "" : "s"} from the site
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredSite.map((recipe) => (
              <article
                key={recipe.slug}
                className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-5 flex flex-col"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl sm:text-3xl shrink-0">{recipe.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wide text-warm-muted">
                      {recipe.category} · Site
                    </p>
                    <h2 className="font-display text-lg sm:text-xl text-warm-brown mt-1 break-words">
                      {recipe.title}
                    </h2>
                    <p className="text-sm text-warm-muted mt-2 line-clamp-2">{recipe.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 sm:items-center">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium bg-cream-100 text-terracotta-600 hover:bg-cream-200 transition-colors"
                  >
                    View recipe
                  </Link>
                  {assignDay ? (
                    <button
                      type="button"
                      onClick={() =>
                        assignToDay(
                          {
                            source: "site",
                            id: recipe.slug,
                            title: recipe.title,
                            emoji: recipe.emoji,
                          },
                          assignDay
                        )
                      }
                      className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors capitalize"
                    >
                      Add to {assignDay}
                    </button>
                  ) : (
                    <DayPicker
                      onPick={(day) =>
                        assignToDay(
                          {
                            source: "site",
                            id: recipe.slug,
                            title: recipe.title,
                            emoji: recipe.emoji,
                          },
                          day
                        )
                      }
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "personal" && (
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 sm:gap-10">
          <form
            onSubmit={handleSavePersonal}
            className="bg-cream-100/70 border border-cream-200 rounded-2xl p-4 sm:p-6 space-y-4 h-fit order-2 lg:order-1"
          >
            <h2 className="font-display text-xl sm:text-2xl text-warm-brown">
              {editingId ? "Edit recipe" : "Add a personal recipe"}
            </h2>
            <Field
              label="Title"
              value={form.title}
              onChange={(v) => setForm((f) => ({ ...f, title: v }))}
              required
            />
            <Field
              label="Short description"
              value={form.description}
              onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Category"
                value={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              />
              <Field
                label="Emoji"
                value={form.emoji}
                onChange={(v) => setForm((f) => ({ ...f, emoji: v }))}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field
                label="Servings"
                value={form.servings}
                onChange={(v) => setForm((f) => ({ ...f, servings: v }))}
              />
              <Field
                label="Prep"
                value={form.prepTime}
                onChange={(v) => setForm((f) => ({ ...f, prepTime: v }))}
                placeholder="15 min"
              />
              <Field
                label="Cook"
                value={form.cookTime}
                onChange={(v) => setForm((f) => ({ ...f, cookTime: v }))}
                placeholder="30 min"
              />
            </div>
            <TextArea
              label="Ingredients"
              value={form.ingredients}
              onChange={(v) => setForm((f) => ({ ...f, ingredients: v }))}
              placeholder={"1 onion\n2 cups rice\n…"}
              rows={5}
            />
            <TextArea
              label="Instructions"
              value={form.instructions}
              onChange={(v) => setForm((f) => ({ ...f, instructions: v }))}
              placeholder="Step by step…"
              rows={6}
            />
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="min-h-11 px-5 py-2.5 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
              >
                {editingId ? "Save changes" : "Save recipe"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="min-h-11 px-5 py-2.5 rounded-full text-sm font-medium text-warm-muted hover:text-terracotta-600"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>

          <div className="order-1 lg:order-2">
            <p className="text-sm text-warm-muted mb-4">
              {filteredPersonal.length} personal recipe
              {filteredPersonal.length === 1 ? "" : "s"}
              {!ready ? " · loading…" : ""}
            </p>
            {filteredPersonal.length === 0 ? (
              <p className="text-warm-muted leading-relaxed">
                No personal recipes yet. Use the form below to add one — it stays saved on this
                device.
              </p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredPersonal.map((recipe) => (
                  <article
                    key={recipe.id}
                    className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl sm:text-3xl shrink-0">{recipe.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-warm-muted">
                          {recipe.category} · Personal
                        </p>
                        <h3 className="font-display text-lg sm:text-xl text-warm-brown mt-1 break-words">
                          {recipe.title}
                        </h3>
                        {recipe.description && (
                          <p className="text-sm text-warm-muted mt-2">{recipe.description}</p>
                        )}
                        {recipe.ingredients && (
                          <pre className="mt-3 text-sm text-warm-muted whitespace-pre-wrap font-sans break-words">
                            {recipe.ingredients}
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(recipe)}
                        className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium bg-cream-100 text-terracotta-600"
                      >
                        Edit
                      </button>
                      {assignDay ? (
                        <button
                          type="button"
                          onClick={() =>
                            assignToDay(
                              {
                                source: "personal",
                                id: recipe.id,
                                title: recipe.title,
                                emoji: recipe.emoji,
                              },
                              assignDay
                            )
                          }
                          className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium bg-terracotta-500 text-white capitalize"
                        >
                          Add to {assignDay}
                        </button>
                      ) : (
                        <DayPicker
                          onPick={(day) =>
                            assignToDay(
                              {
                                source: "personal",
                                id: recipe.id,
                                title: recipe.title,
                                emoji: recipe.emoji,
                              },
                              day
                            )
                          }
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => deletePersonal(recipe.id)}
                        className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium text-warm-muted hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {tab === "planner" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-warm-brown">
                This week’s meal plan
              </h2>
              <p className="text-sm text-warm-muted mt-1 leading-relaxed">
                Assign site or personal recipes to each day. Want a printable PDF instead?{" "}
                <Link href="/meal-plans" className="text-terracotta-600 hover:text-terracotta-700">
                  Shop meal plans →
                </Link>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm("Clear the whole week?")) setMealPlan({});
              }}
              className="self-start min-h-11 px-4 rounded-full text-sm font-medium text-warm-muted hover:text-terracotta-600 border border-cream-200 bg-white"
            >
              Clear week
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {MEAL_PLAN_DAYS.map(({ key, label }) => {
              const slot = mealPlan[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl border border-cream-200 p-4 sm:p-5 min-h-[112px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg text-warm-brown">{label}</h3>
                    {slot && (
                      <button
                        type="button"
                        onClick={() => clearDay(key)}
                        className="min-h-11 px-3 text-sm text-warm-muted hover:text-terracotta-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {slot ? (
                    <div className="mt-3 flex items-start gap-3">
                      <span className="text-2xl shrink-0">{slot.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-warm-brown font-medium break-words">{slot.title}</p>
                        <p className="text-xs text-warm-muted uppercase tracking-wide mt-0.5">
                          {slot.source === "site" ? "Site recipe" : "Personal"}
                        </p>
                        {slot.source === "site" && (
                          <Link
                            href={`/recipes/${slot.id}`}
                            className="text-sm text-terracotta-600 hover:text-terracotta-700 mt-2 inline-flex min-h-11 items-center"
                          >
                            Open recipe →
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-col gap-2">
                      <p className="text-sm text-warm-muted">Nothing planned yet</p>
                      <button
                        type="button"
                        onClick={() => {
                          setAssignDay(key);
                          setTab("recipes");
                        }}
                        className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium bg-cream-100 text-terracotta-600"
                      >
                        Choose a site recipe
                      </button>
                      {personalRecipes.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setAssignDay(key);
                            setTab("personal");
                          }}
                          className="inline-flex items-center justify-center min-h-11 px-4 rounded-full text-sm font-medium text-terracotta-600 border border-cream-200"
                        >
                          Choose a personal recipe
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-warm-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full min-h-11 rounded-xl border border-cream-200 bg-white px-3 py-2.5 text-base sm:text-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta-400/40"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-warm-muted">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-1.5 w-full rounded-xl border border-cream-200 bg-white px-3 py-2.5 text-base sm:text-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta-400/40 resize-y"
      />
    </label>
  );
}

function DayPicker({ onPick }: { onPick: (day: MealPlanDay) => void }) {
  return (
    <label className="inline-flex items-center min-h-11">
      <span className="sr-only">Add to meal plan day</span>
      <select
        defaultValue=""
        onChange={(e) => {
          const value = e.target.value as MealPlanDay | "";
          if (!value) return;
          onPick(value);
          e.target.value = "";
        }}
        className="min-h-11 max-w-full rounded-full border border-cream-200 bg-white px-4 text-sm font-medium text-warm-muted focus:outline-none focus:ring-2 focus:ring-terracotta-400/40"
      >
        <option value="" disabled>
          Plan day
        </option>
        {MEAL_PLAN_DAYS.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

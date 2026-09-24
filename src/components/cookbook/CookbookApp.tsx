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

  const tabs: { id: Tab; label: string }[] = [
    { id: "recipes", label: "Site recipes" },
    { id: "personal", label: "My recipes" },
    { id: "planner", label: "Meal plan" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-3">
          Personal cookbook
        </p>
        <h1 className="font-display text-4xl text-warm-brown">Cookbook App</h1>
        <p className="text-warm-muted mt-3 text-lg leading-relaxed">
          Browse Cook with Bree recipes, save your own, and build a weekly meal plan. Your
          personal recipes and plans stay on this device.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-cream-200 pb-4 mb-8">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === item.id
                ? "bg-terracotta-500 text-white"
                : "bg-cream-100 text-warm-muted hover:text-terracotta-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {(tab === "recipes" || tab === "personal") && (
        <div className="mb-6">
          <label className="sr-only" htmlFor="cookbook-search">
            Search recipes
          </label>
          <input
            id="cookbook-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes…"
            className="w-full max-w-md rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-warm-brown placeholder:text-warm-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta-400/40"
          />
        </div>
      )}

      {assignDay && (
        <div className="mb-6 p-4 rounded-2xl border border-terracotta-400/30 bg-terracotta-400/5 text-sm text-warm-muted">
          Pick a recipe below to add to <span className="font-medium text-warm-brown">{assignDay}</span>.{" "}
          <button
            type="button"
            onClick={() => setAssignDay(null)}
            className="text-terracotta-600 hover:text-terracotta-700 font-medium"
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
          <div className="grid md:grid-cols-2 gap-4">
            {filteredSite.map((recipe) => (
              <article
                key={recipe.slug}
                className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{recipe.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wide text-warm-muted">
                      {recipe.category} · Site
                    </p>
                    <h2 className="font-display text-xl text-warm-brown mt-1">{recipe.title}</h2>
                    <p className="text-sm text-warm-muted mt-2 line-clamp-2">{recipe.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
                  >
                    View recipe →
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
                      className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
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
        <section className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
          <form
            onSubmit={handleSavePersonal}
            className="bg-cream-100/70 border border-cream-200 rounded-2xl p-6 space-y-4 h-fit"
          >
            <h2 className="font-display text-2xl text-warm-brown">
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
            <div className="grid grid-cols-2 gap-3">
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
            <div className="grid grid-cols-3 gap-3">
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
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
              >
                {editingId ? "Save changes" : "Save recipe"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-warm-muted hover:text-terracotta-600"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>

          <div>
            <p className="text-sm text-warm-muted mb-4">
              {filteredPersonal.length} personal recipe
              {filteredPersonal.length === 1 ? "" : "s"}
              {!ready ? " · loading…" : ""}
            </p>
            {filteredPersonal.length === 0 ? (
              <p className="text-warm-muted leading-relaxed">
                No personal recipes yet. Add one on the left — it stays saved in this browser.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredPersonal.map((recipe) => (
                  <article
                    key={recipe.id}
                    className="bg-white rounded-2xl border border-cream-200 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{recipe.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-warm-muted">
                          {recipe.category} · Personal
                        </p>
                        <h3 className="font-display text-xl text-warm-brown mt-1">
                          {recipe.title}
                        </h3>
                        {recipe.description && (
                          <p className="text-sm text-warm-muted mt-2">{recipe.description}</p>
                        )}
                        {recipe.ingredients && (
                          <pre className="mt-3 text-sm text-warm-muted whitespace-pre-wrap font-sans">
                            {recipe.ingredients}
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(recipe)}
                        className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
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
                          className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
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
                        className="text-sm font-medium text-warm-muted hover:text-red-600"
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
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl text-warm-brown">This week’s meal plan</h2>
              <p className="text-sm text-warm-muted mt-1">
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
              className="text-sm font-medium text-warm-muted hover:text-terracotta-600"
            >
              Clear week
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {MEAL_PLAN_DAYS.map(({ key, label }) => {
              const slot = mealPlan[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl border border-cream-200 p-5 min-h-[120px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg text-warm-brown">{label}</h3>
                    {slot && (
                      <button
                        type="button"
                        onClick={() => clearDay(key)}
                        className="text-xs text-warm-muted hover:text-terracotta-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {slot ? (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-2xl">{slot.emoji}</span>
                      <div>
                        <p className="text-warm-brown font-medium">{slot.title}</p>
                        <p className="text-xs text-warm-muted uppercase tracking-wide mt-0.5">
                          {slot.source === "site" ? "Site recipe" : "Personal"}
                        </p>
                        {slot.source === "site" && (
                          <Link
                            href={`/recipes/${slot.id}`}
                            className="text-sm text-terracotta-600 hover:text-terracotta-700 mt-1 inline-block"
                          >
                            Open →
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-sm text-warm-muted mb-2">Nothing planned yet</p>
                      <button
                        type="button"
                        onClick={() => {
                          setAssignDay(key);
                          setTab("recipes");
                        }}
                        className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
                      >
                        Choose a site recipe →
                      </button>
                      {personalRecipes.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setAssignDay(key);
                            setTab("personal");
                          }}
                          className="block mt-2 text-sm font-medium text-terracotta-600 hover:text-terracotta-700"
                        >
                          Choose a personal recipe →
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
        className="mt-1.5 w-full rounded-xl border border-cream-200 bg-white px-3 py-2.5 text-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta-400/40"
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
        className="mt-1.5 w-full rounded-xl border border-cream-200 bg-white px-3 py-2.5 text-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta-400/40 resize-y"
      />
    </label>
  );
}

function DayPicker({ onPick }: { onPick: (day: MealPlanDay) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-medium text-warm-muted hover:text-terracotta-600"
      >
        Plan day ▾
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-40 rounded-xl border border-cream-200 bg-white shadow-lg py-1">
          {MEAL_PLAN_DAYS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className="block w-full text-left px-3 py-2 text-sm text-warm-muted hover:bg-cream-100 hover:text-terracotta-600"
              onClick={() => {
                onPick(key);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

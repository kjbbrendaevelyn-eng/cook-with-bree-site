import type { Metadata } from "next";
import CookbookApp from "@/components/cookbook/CookbookApp";
import PwaInstallHint from "@/components/PwaInstallHint";
import { getRecipeSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookbook App",
  description:
    "Browse Cook with Bree recipes, save your own personal recipes, and build a weekly meal plan.",
};

export default function CookbookPage() {
  const siteRecipes = getRecipeSummaries();

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        <PwaInstallHint />
      </div>
      <CookbookApp siteRecipes={siteRecipes} />
    </>
  );
}

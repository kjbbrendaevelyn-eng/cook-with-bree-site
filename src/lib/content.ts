import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface RecipeFrontmatter {
  title: string;
  description: string;
  date: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: string;
  tags: string[];
  featured?: boolean;
  emoji?: string;
}

export interface StoryFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  emoji?: string;
}

export interface Recipe extends RecipeFrontmatter {
  slug: string;
  content: string;
}

export interface Story extends StoryFrontmatter {
  slug: string;
  content: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

function getSlugs(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const slugs = getSlugs("recipes");
  const recipes = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(contentDirectory, "recipes", `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const htmlContent = await markdownToHtml(content);
      return {
        slug,
        ...(data as RecipeFrontmatter),
        content: htmlContent,
      };
    })
  );
  return recipes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const fullPath = path.join(contentDirectory, "recipes", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);
  return {
    slug,
    ...(data as RecipeFrontmatter),
    content: htmlContent,
  };
}

export async function getAllStories(): Promise<Story[]> {
  const slugs = getSlugs("stories");
  const stories = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(contentDirectory, "stories", `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const htmlContent = await markdownToHtml(content);
      return {
        slug,
        ...(data as StoryFrontmatter),
        content: htmlContent,
      };
    })
  );
  return stories.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const fullPath = path.join(contentDirectory, "stories", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);
  return {
    slug,
    ...(data as StoryFrontmatter),
    content: htmlContent,
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

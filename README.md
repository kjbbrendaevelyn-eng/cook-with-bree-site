# Cook with Bree

A personal recipe blog and storytelling site built with Next.js.

## Getting Started

You'll need [Node.js](https://nodejs.org/) (v18 or later) installed.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Adding Content

### New Recipe

Create a markdown file in `content/recipes/` with frontmatter:

```markdown
---
title: "Your Recipe Name"
description: "A short description"
date: "2026-03-01"
prepTime: "15 min"
cookTime: "30 min"
servings: 4
category: "Dinner"
tags: ["quick", "family-friendly"]
featured: true
emoji: "🍕"
---

## Ingredients

- Item one
- Item two

## Instructions

1. Step one
2. Step two

## Bree's Notes

Your personal tips and stories about this recipe.
```

The filename becomes the URL slug (e.g., `my-recipe.md` → `/recipes/my-recipe`).

### Recipe Photos

Add images in `public/images/recipes/<slug>/`:

```
public/images/recipes/lemon-garlic-pasta/cover.jpg
public/images/recipes/grandmas-banana-bread/cover.jpg
```

Name your main photo **`cover.jpg`** (or `.png`, `.webp`). It appears on recipe cards and the recipe page automatically. See `public/images/recipes/README.md` for full details.

### New Story

Create a markdown file in `content/stories/`:

```markdown
---
title: "Your Story Title"
description: "A brief summary"
date: "2026-03-01"
tags: ["memories", "family"]
featured: true
emoji: "📖"
---

Your story content here. Write in plain markdown.
```

## Project Structure

```
content/
  recipes/     # Recipe markdown files
  stories/     # Story markdown files
src/
  app/         # Next.js pages
  components/  # Reusable UI components
  lib/         # Content parsing utilities
```

## Deploy

This site works great on [Vercel](https://vercel.com):

```bash
npm run build
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.

## Tech Stack

- **Next.js 15** — React framework with App Router
- **Tailwind CSS** — Styling
- **Markdown** — Content authoring
- **gray-matter + remark** — Markdown parsing

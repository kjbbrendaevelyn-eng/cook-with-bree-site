# Recipe Images

Add photos for each recipe in its matching folder. The folder name must match the recipe slug (the markdown filename without `.md`).

## Folder structure

```
public/images/recipes/
  lemon-garlic-pasta/
    cover.jpg          ← main photo (shown on cards & recipe page)
  grandmas-banana-bread/
    cover.jpg
  brioche-bread/
    cover.jpg
  cozy-chicken-soup/
    cover.jpg
  honey-roasted-vegetables/
    cover.jpg
```

## How to add a photo

1. Open the folder for your recipe (e.g. `lemon-garlic-pasta/`)
2. Add your main photo as **`cover.jpg`** (or `cover.png`, `cover.webp`)
3. Refresh the site — the image appears automatically

## Optional extra photos

You can add more images to any recipe folder for future use:

- `step-1.jpg`, `step-2.jpg` — process shots
- `hero.jpg` — alternate main photo (used if no `cover` image exists)

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## Tips

- Use landscape photos (~1200px wide) for best results
- Keep file sizes under 1 MB when possible
- Name new recipe folders to match the markdown slug in `content/recipes/`

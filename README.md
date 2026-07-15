# המטבח שלנו — Family Vegan Recipe Book

A private family vegan recipe book, deployed as a static site to GitHub Pages. Hebrew UI, RTL layout, filterable by protein type and category, with automatic nutrition calculation from ingredients.

## Stack

React + TypeScript + Vite, no backend. All content lives as JSON in the repo — the only way to add a recipe is to edit a file and `git push`, so the public site has no way for others to submit content.

## Adding a recipe

1. Create a new file in `src/data/recipes/`, e.g. `src/data/recipes/my-recipe.json`. Copy an existing recipe as a starting point.
2. Fill in the fields:
   - `id`: unique slug, matches the filename (without `.json`)
   - `title`: Hebrew title
   - `category`: array of category keys from `src/data/taxonomy.ts` (`CATEGORIES`)
   - `proteinType`: array of protein keys from `src/data/taxonomy.ts` (`PROTEIN_TYPES`)
   - `servings`, `prepTimeMinutes` (optional)
   - `ingredients`: array of either:
     - `{ "ingredientKey": "tofu", "amount": 200, "unit": "g" }` — for anything nutrition should be calculated from
     - `{ "text": "מלח לפי הטעם" }` — free text for seasoning/water/anything with no meaningful nutrition contribution
   - `instructions`: array of Hebrew strings, one step each
   - `sourceUrl`, `sourceName` (optional): link back to the original recipe if it came from a blog/site, shown at the bottom of the recipe page
3. If an ingredient you need isn't in `src/data/ingredients.json` yet, add it there first (per-100g protein/carbs/calories values). Keep the key in English/snake_case, `name` in Hebrew.
4. Save, then:
   ```bash
   git add src/data/recipes/my-recipe.json src/data/ingredients.json
   git commit -m "Add recipe: <name>"
   git push
   ```
5. GitHub Actions will build and redeploy automatically within a minute or two.

New recipes are auto-discovered — no need to register them anywhere else (`src/data/recipes/index.ts` loads every `.json` file in that folder).

## Adding a new category or protein type

Edit `src/data/taxonomy.ts` and add an entry to `CATEGORIES` or `PROTEIN_TYPES` with a `key` (English, used internally) and `label` (Hebrew, shown in the UI).

## Local development

```bash
npm install
npm run dev       # local dev server
npm test          # run nutrition calculator unit tests
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it via GitHub Pages. Enable Pages for this repo under **Settings → Pages → Source: GitHub Actions** (one-time setup).

The Vite `base` path in `vite.config.ts` is set to `/vegan-recipe-book/` — update it if the repo is renamed.

## Installing on your phone (PWA)

This is a Progressive Web App — it can be installed to the home screen and works offline once loaded:

- **iOS (Safari)**: open the site → Share → "Add to Home Screen"
- **Android (Chrome)**: open the site → menu (⋮) → "Add to Home screen" / "Install app"

It'll then open full-screen with its own icon, no browser address bar. To change the app icon/name, edit the `manifest` block in `vite.config.ts`. To regenerate the icon PNGs, run `npm install --no-save sharp` (it's not a standing dependency, since it's only needed for this one-off script) then `node scripts/generate-icons.mjs` — or just replace `public/pwa-*.png` with your own images at the same sizes: 192×192, 512×512, and a 512×512 maskable variant with ~12.5% padding.

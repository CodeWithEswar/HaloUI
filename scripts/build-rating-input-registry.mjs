import fs from 'fs';

const ratingInputComponent = fs.readFileSync('components/ui/rating-input.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const ratingInputRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "rating-input",
  "type": "registry:ui",
  "title": "Rating Input",
  "description": "An accessible single-value rating control for choosing a score from an ordered icon-based scale.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field"
  ],
  "files": [
    {
      "path": "components/ui/rating-input.tsx",
      "content": ratingInputComponent,
      "type": "registry:ui",
      "target": "components/ui/rating-input.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "forms-and-fields"
  ],
  "meta": {
    "status": "preview",
    "version": "1.0.0",
    "category": "forms-and-fields",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-25"
  }
};

fs.writeFileSync('public/r/rating-input.json', JSON.stringify(ratingInputRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/rating-input.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'rating-input');
  const entrySummary = {
    name: "rating-input",
    type: "registry:ui",
    title: "Rating Input",
    description: "An accessible single-value rating control for choosing a score from an ordered icon-based scale.",
    categories: ["forms-and-fields"],
    dependencies: ["@hugeicons/core-free-icons", "@hugeicons/react", "clsx", "tailwind-merge"],
    registryDependencies: ["field"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = entrySummary;
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json');
}

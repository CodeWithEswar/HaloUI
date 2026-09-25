import fs from 'fs';

const urlFieldComponent = fs.readFileSync('components/ui/url-field.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const urlFieldRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "url-field",
  "type": "registry:ui",
  "title": "URL Field",
  "description": "A URL-oriented text-entry control with browser-friendly input semantics, optional normalization, and clear validation affordances.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field",
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/url-field.tsx",
      "content": urlFieldComponent,
      "type": "registry:ui",
      "target": "components/ui/url-field.tsx"
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

fs.writeFileSync('public/r/url-field.json', JSON.stringify(urlFieldRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/url-field.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'url-field');
  const entrySummary = {
    name: "url-field",
    type: "registry:ui",
    title: "URL Field",
    description: "A URL-oriented text-entry control with browser-friendly input semantics, optional normalization, and clear validation affordances.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field", "halo-icon"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with url-field');
}

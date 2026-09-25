import fs from 'fs';

const currencyFieldComponent = fs.readFileSync('components/ui/currency-field.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const currencyFieldRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "currency-field",
  "type": "registry:ui",
  "title": "Currency Field",
  "description": "A locale-aware monetary entry control that separates numeric value from currency presentation.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "number-field",
    "field",
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/currency-field.tsx",
      "content": currencyFieldComponent,
      "type": "registry:ui",
      "target": "components/ui/currency-field.tsx"
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

fs.writeFileSync('public/r/currency-field.json', JSON.stringify(currencyFieldRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/currency-field.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'currency-field');
  const entrySummary = {
    name: "currency-field",
    type: "registry:ui",
    title: "Currency Field",
    description: "A locale-aware monetary entry control that separates numeric value from currency presentation.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["number-field", "field", "halo-icon"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with currency-field');
}

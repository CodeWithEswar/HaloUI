import fs from 'fs';

const numberFieldComponent = fs.readFileSync('components/ui/number-field.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const numberFieldRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "number-field",
  "type": "registry:ui",
  "title": "Number Field",
  "description": "An accessible numeric-entry control with keyboard editing, decimal precision, range boundaries, and optional increment/decrement actions.",
  "dependencies": [
    "@base-ui/react",
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
      "path": "components/ui/number-field.tsx",
      "content": numberFieldComponent,
      "type": "registry:ui",
      "target": "components/ui/number-field.tsx"
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

fs.writeFileSync('public/r/number-field.json', JSON.stringify(numberFieldRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/number-field.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'number-field');
  const entrySummary = {
    name: "number-field",
    type: "registry:ui",
    title: "Number Field",
    description: "An accessible numeric-entry control with keyboard editing, decimal precision, range boundaries, and optional increment/decrement actions.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@base-ui/react",
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
  console.log('Successfully updated public/r/registry.json with number-field');
}

import fs from 'fs';

const timePickerComponent = fs.readFileSync('components/ui/time-picker.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const timePickerRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "time-picker",
  "type": "registry:ui",
  "title": "Time Picker",
  "description": "An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.",
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
      "path": "components/ui/time-picker.tsx",
      "content": timePickerComponent,
      "type": "registry:ui",
      "target": "components/ui/time-picker.tsx"
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

fs.writeFileSync('public/r/time-picker.json', JSON.stringify(timePickerRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/time-picker.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'time-picker');
  const entrySummary = {
    name: "time-picker",
    type: "registry:ui",
    title: "Time Picker",
    description: "An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
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

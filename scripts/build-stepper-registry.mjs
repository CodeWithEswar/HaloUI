import fs from 'fs';

const stepperComponent = fs.readFileSync('components/ui/stepper.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const stepperRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "stepper",
  "type": "registry:ui",
  "title": "Stepper",
  "description": "A structured progress and navigation component for communicating a user's position within a bounded multi-step process.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/stepper.tsx",
      "content": stepperComponent,
      "type": "registry:ui",
      "target": "components/ui/stepper.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "navigation"
  ],
  "meta": {
    "status": "preview",
    "version": "1.0.0",
    "category": "navigation",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-26"
  }
};

fs.writeFileSync('public/r/stepper.json', JSON.stringify(stepperRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/stepper.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'stepper');
  const entrySummary = {
    name: "stepper",
    type: "registry:ui",
    title: "Stepper",
    description: "A structured progress and navigation component for communicating a user's position within a bounded multi-step process.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with stepper entry');
}

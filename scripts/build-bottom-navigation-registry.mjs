import fs from 'fs';

const bottomNavComponent = fs.readFileSync('components/ui/bottom-navigation.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const bottomNavRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "bottom-navigation",
  "type": "registry:ui",
  "title": "Bottom Navigation",
  "description": "A mobile-first persistent navigation surface for a small set of primary application destinations.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/bottom-navigation.tsx",
      "content": bottomNavComponent,
      "type": "registry:ui",
      "target": "components/ui/bottom-navigation.tsx"
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

fs.writeFileSync('public/r/bottom-navigation.json', JSON.stringify(bottomNavRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/bottom-navigation.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'bottom-navigation');
  const entrySummary = {
    name: "bottom-navigation",
    type: "registry:ui",
    title: "Bottom Navigation",
    description: "A mobile-first persistent navigation surface for a small set of primary application destinations.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with bottom-navigation entry');
}

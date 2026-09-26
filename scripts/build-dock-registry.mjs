import fs from 'fs';

const dockComponent = fs.readFileSync('components/ui/dock.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const dockRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "dock",
  "type": "registry:ui",
  "title": "Dock",
  "description": "A floating surface for a small set of high-value destinations and actions that should remain quickly accessible.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "tooltip"
  ],
  "files": [
    {
      "path": "components/ui/dock.tsx",
      "content": dockComponent,
      "type": "registry:ui",
      "target": "components/ui/dock.tsx"
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

fs.writeFileSync('public/r/dock.json', JSON.stringify(dockRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/dock.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'dock');
  const entrySummary = {
    name: "dock",
    type: "registry:ui",
    title: "Dock",
    description: "A floating surface for a small set of high-value destinations and actions that should remain quickly accessible.",
    categories: ["navigation"],
    registryDependencies: ["tooltip"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with dock entry');
}

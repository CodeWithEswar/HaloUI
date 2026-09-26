import fs from 'fs';

const treeNavigationComponent = fs.readFileSync('components/ui/tree-navigation.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const treeNavigationRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tree-navigation",
  "type": "registry:ui",
  "title": "Tree Navigation",
  "description": "A hierarchical expandable navigation component for navigating deeply nested destinations while preserving parent-child structure.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/tree-navigation.tsx",
      "content": treeNavigationComponent,
      "type": "registry:ui",
      "target": "components/ui/tree-navigation.tsx"
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

fs.writeFileSync('public/r/tree-navigation.json', JSON.stringify(treeNavigationRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/tree-navigation.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'tree-navigation');
  const entrySummary = {
    name: "tree-navigation",
    type: "registry:ui",
    title: "Tree Navigation",
    description: "A hierarchical expandable navigation component for navigating deeply nested destinations while preserving parent-child structure.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with tree-navigation entry');
}

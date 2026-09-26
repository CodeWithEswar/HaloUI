import fs from 'fs';

const sidebarComponent = fs.readFileSync('components/ui/sidebar.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const sidebarRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "sidebar",
  "type": "registry:ui",
  "title": "Sidebar",
  "description": "A responsive application navigation container for organizing primary destinations, grouped navigation, supporting actions, and optional collapsed states.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "button",
    "input",
    "separator",
    "sheet",
    "skeleton",
    "tooltip"
  ],
  "files": [
    {
      "path": "components/ui/sidebar.tsx",
      "content": sidebarComponent,
      "type": "registry:ui",
      "target": "components/ui/sidebar.tsx"
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

fs.writeFileSync('public/r/sidebar.json', JSON.stringify(sidebarRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/sidebar.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'sidebar');
  const entrySummary = {
    name: "sidebar",
    type: "registry:ui",
    title: "Sidebar",
    description: "A responsive application navigation container for organizing primary destinations, grouped navigation, supporting actions, and optional collapsed states.",
    categories: [
      "navigation"
    ],
    dependencies: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip"
    ]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with sidebar entry');
}

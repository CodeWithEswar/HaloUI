import fs from 'fs';

const menubarComponent = fs.readFileSync('components/ui/menubar.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const menubarRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "menubar",
  "type": "registry:ui",
  "title": "Menubar",
  "description": "An accessible persistent command bar for organizing related application actions into keyboard-operable menus.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "dropdown-menu"
  ],
  "files": [
    {
      "path": "components/ui/menubar.tsx",
      "content": menubarComponent,
      "type": "registry:ui",
      "target": "components/ui/menubar.tsx"
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

fs.writeFileSync('public/r/menubar.json', JSON.stringify(menubarRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/menubar.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'menubar');
  const entrySummary = {
    name: "menubar",
    type: "registry:ui",
    title: "Menubar",
    description: "An accessible persistent command bar for organizing related application actions into keyboard-operable menus.",
    categories: [
      "navigation"
    ],
    dependencies: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: [
      "dropdown-menu"
    ]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with menubar entry');
}

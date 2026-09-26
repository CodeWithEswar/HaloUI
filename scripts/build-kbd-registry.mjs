import fs from 'fs';

const kbdComponent = fs.readFileSync('components/ui/kbd.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const kbdRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "kbd",
  "type": "registry:ui",
  "title": "Kbd",
  "description": "A semantic visual representation of keyboard keys and shortcut combinations used in instructions, menus, commands, and interface hints.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/kbd.tsx",
      "content": kbdComponent,
      "type": "registry:ui",
      "target": "components/ui/kbd.tsx"
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
    "status": "stable",
    "version": "1.0.0",
    "category": "navigation",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-26"
  }
};

fs.writeFileSync('public/r/kbd.json', JSON.stringify(kbdRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/kbd.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'kbd');
  const entrySummary = {
    name: "kbd",
    type: "registry:ui",
    title: "Kbd",
    description: "A semantic visual representation of keyboard keys and shortcut combinations used in instructions, menus, commands, and interface hints.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with kbd entry');
}

import fs from 'fs';

const commandMenuComponent = fs.readFileSync('components/ui/command-menu.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const commandMenuRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "command-menu",
  "type": "registry:ui",
  "title": "Command Menu",
  "description": "Search-driven command collection surface engineered with cmdk filtering, roving keyboard navigation, and HaloUI Liquid Glass optics.",
  "dependencies": [
    "cmdk",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "dialog"
  ],
  "files": [
    {
      "path": "components/ui/command-menu.tsx",
      "content": commandMenuComponent,
      "type": "registry:ui",
      "target": "components/ui/command-menu.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "overlays"
  ],
  "meta": {
    "status": "stable",
    "version": "1.0.0",
    "category": "overlays",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-26"
  }
};

fs.writeFileSync('public/r/command-menu.json', JSON.stringify(commandMenuRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/command-menu.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'command-menu');
  const entrySummary = {
    name: "command-menu",
    type: "registry:ui",
    title: "Command Menu",
    description: "Search-driven command collection surface engineered with cmdk filtering, roving keyboard navigation, and HaloUI Liquid Glass optics.",
    categories: ["overlays"],
    registryDependencies: ["dialog"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with command-menu');
}

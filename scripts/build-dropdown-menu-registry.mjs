import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Dropdown Menu Registry Definition ===");

const dropdownMenuComponent = fs.readFileSync('components/ui/dropdown-menu.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const dropdownMenuItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "dropdown-menu",
  "type": "registry:ui",
  "title": "Dropdown Menu",
  "description": "Button-triggered temporary action menu engineered with HaloUI Balanced Liquid Glass optics, roving keyboard navigation, submenus, and composite menu semantics.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/dropdown-menu.tsx",
      "target": "components/ui/dropdown-menu.tsx",
      "type": "registry:ui",
      "content": dropdownMenuComponent
    },
    {
      "path": "styles/halo-tokens.css",
      "target": "styles/halo-tokens.css",
      "type": "registry:ui",
      "content": haloTokens
    },
    {
      "path": "styles/halo-material.css",
      "target": "styles/halo-material.css",
      "type": "registry:ui",
      "content": haloMaterial
    }
  ]
};

// Write public/r/dropdown-menu.json
fs.writeFileSync('public/r/dropdown-menu.json', JSON.stringify(dropdownMenuItem, null, 2), 'utf-8');
console.log("✓ Created public/r/dropdown-menu.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'dropdown-menu');
registry.items.push({
  name: "dropdown-menu",
  type: "registry:ui",
  title: "Dropdown Menu",
  description: "Button-triggered temporary action menu engineered with HaloUI Balanced Liquid Glass optics, roving keyboard navigation, submenus, and composite menu semantics.",
  dependencies: [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26"
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with dropdown-menu");

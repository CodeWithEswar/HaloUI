import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Submenu Registry Definition ===");

const submenuComponent = fs.readFileSync('components/ui/submenu.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const submenuItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "submenu",
  "type": "registry:ui",
  "title": "Submenu",
  "description": "Shared nested menu branch infrastructure engineered with HaloUI Balanced Liquid Glass optics, triangular hover grace corridors, boundary collision flipping, and WAI-ARIA arrow navigation.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "dropdown-menu",
    "context-menu"
  ],
  "files": [
    {
      "path": "components/ui/submenu.tsx",
      "target": "components/ui/submenu.tsx",
      "type": "registry:ui",
      "content": submenuComponent
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

// Write public/r/submenu.json
fs.writeFileSync('public/r/submenu.json', JSON.stringify(submenuItem, null, 2), 'utf-8');
console.log("✓ Created public/r/submenu.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'submenu');
registry.items.push({
  name: "submenu",
  type: "registry:ui",
  title: "Submenu",
  description: "Shared nested menu branch infrastructure engineered with HaloUI Balanced Liquid Glass optics, triangular hover grace corridors, boundary collision flipping, and WAI-ARIA arrow navigation.",
  dependencies: [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "dropdown-menu",
    "context-menu"
  ],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26"
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with submenu");

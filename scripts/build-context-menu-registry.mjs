import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Context Menu Registry Definition ===");

const contextMenuComponent = fs.readFileSync('components/ui/context-menu.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const contextMenuItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "context-menu",
  "type": "registry:ui",
  "title": "Context Menu",
  "description": "Pointer and context-triggered floating action surface engineered with HaloUI Balanced Liquid Glass optics, zero backdrop dimming, boundary collision handling, and WAI-ARIA roving keyboard navigation.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/context-menu.tsx",
      "target": "components/ui/context-menu.tsx",
      "type": "registry:ui",
      "content": contextMenuComponent
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

// Write public/r/context-menu.json
fs.writeFileSync('public/r/context-menu.json', JSON.stringify(contextMenuItem, null, 2), 'utf-8');
console.log("✓ Created public/r/context-menu.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'context-menu');
registry.items.push({
  name: "context-menu",
  type: "registry:ui",
  title: "Context Menu",
  description: "Pointer and context-triggered floating action surface engineered with HaloUI Balanced Liquid Glass optics, zero backdrop dimming, boundary collision handling, and WAI-ARIA roving keyboard navigation.",
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
console.log("✓ Updated public/r/registry.json with context-menu");

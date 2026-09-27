import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Description List Registry Definition ===");

const component = fs.readFileSync('components/ui/description-list.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "description-list",
  "type": "registry:ui",
  "title": "Description List",
  "description": "Label/value metadata display primitive with automatic container-aware reflow, native semantic dl/dt/dd elements, and restrained HaloUI Liquid Glass materials.",
  "dependencies": [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/description-list.tsx",
      "target": "components/ui/description-list.tsx",
      "type": "registry:ui",
      "content": component
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

// Write public/r/description-list.json
fs.writeFileSync('public/r/description-list.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/description-list.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'description-list');
registry.items.push({
  name: "description-list",
  type: "registry:ui",
  title: "Description List",
  description: "Label/value metadata display primitive with automatic container-aware reflow, native semantic dl/dt/dd elements, and restrained HaloUI Liquid Glass materials.",
  dependencies: [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/description-list.tsx",
      target: "components/ui/description-list.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Description List Registry Build Complete ===\n");

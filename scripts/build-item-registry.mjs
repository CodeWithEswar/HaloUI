import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Item Registry Definition ===");

const itemComponent = fs.readFileSync('components/ui/item.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const itemRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "item",
  "type": "registry:ui",
  "title": "Item",
  "description": "Reusable list-row and content-item primitive organizing visual, textual, metadata, and action elements into a responsive, repeatable row.",
  "dependencies": [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/item.tsx",
      "target": "components/ui/item.tsx",
      "type": "registry:ui",
      "content": itemComponent
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

// Write public/r/item.json
fs.writeFileSync('public/r/item.json', JSON.stringify(itemRegistryItem, null, 2), 'utf-8');
console.log("✓ Created public/r/item.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'item');
registry.items.push({
  name: "item",
  type: "registry:ui",
  title: "Item",
  description: "Reusable list-row and content-item primitive organizing visual, textual, metadata, and action elements into a responsive, repeatable row.",
  dependencies: [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/item.tsx",
      type: "registry:ui",
      target: "components/ui/item.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    },
    {
      path: "styles/halo-material.css",
      type: "registry:ui",
      target: "styles/halo-material.css"
    }
  ]
});

// Sort alphabetically by name
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with item");

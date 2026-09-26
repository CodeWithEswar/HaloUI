import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Card Registry Definition ===");

const cardComponent = fs.readFileSync('components/ui/card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const cardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "card",
  "type": "registry:ui",
  "title": "Card",
  "description": "Foundational content surface grouping related information, metrics, and actions with restrained liquid optical material.",
  "dependencies": [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/card.tsx",
      "target": "components/ui/card.tsx",
      "type": "registry:ui",
      "content": cardComponent
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

// Write public/r/card.json
fs.writeFileSync('public/r/card.json', JSON.stringify(cardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'card');
registry.items.push({
  name: "card",
  type: "registry:ui",
  title: "Card",
  description: "Foundational content surface grouping related information, metrics, and actions with restrained liquid optical material.",
  dependencies: [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/card.tsx",
      type: "registry:ui",
      target: "components/ui/card.tsx"
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
console.log("✓ Updated public/r/registry.json with card");

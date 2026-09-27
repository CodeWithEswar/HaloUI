import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building List Registry Definition ===");

const listComponent = fs.readFileSync('components/ui/list.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const listRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "list",
  "type": "registry:ui",
  "title": "List",
  "description": "Structured collection primitive organizing repeated related items with automatic container-aware responsiveness, semantic HTML, and restrained HaloUI Liquid Glass materials.",
  "dependencies": [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/list.tsx",
      "target": "components/ui/list.tsx",
      "type": "registry:ui",
      "content": listComponent
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

// Write public/r/list.json
fs.writeFileSync('public/r/list.json', JSON.stringify(listRegistryItem, null, 2), 'utf-8');
console.log("✓ Created public/r/list.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'list');
registry.items.push({
  name: "list",
  type: "registry:ui",
  title: "List",
  description: "Structured collection primitive organizing repeated related items with automatic container-aware responsiveness, semantic HTML, and restrained HaloUI Liquid Glass materials.",
  dependencies: [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/list.tsx",
      type: "registry:ui",
      target: "components/ui/list.tsx"
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
console.log("✓ Updated public/r/registry.json with list");

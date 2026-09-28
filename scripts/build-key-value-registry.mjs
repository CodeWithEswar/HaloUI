import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Key Value Registry Definition ===");

const component = fs.readFileSync('components/ui/key-value.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "key-value",
  "type": "registry:ui",
  "title": "Key Value",
  "description": "Compact label and value metadata display primitive with container-aware responsive reflow, zero glass-on-glass noise, and restrained HaloUI Liquid Glass outer boundaries.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/key-value.tsx",
      "target": "components/ui/key-value.tsx",
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

// Write public/r/key-value.json
fs.writeFileSync('public/r/key-value.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/key-value.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'key-value');
registry.items.push({
  name: "key-value",
  type: "registry:ui",
  title: "Key Value",
  description: "Compact label and value metadata display primitive with container-aware responsive reflow, zero glass-on-glass noise, and restrained HaloUI Liquid Glass outer boundaries.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/key-value.tsx",
      target: "components/ui/key-value.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Key Value Registry Build Complete ===\n");

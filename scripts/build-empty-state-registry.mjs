import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Empty State Registry Definition ===");

const component = fs.readFileSync('components/ui/empty-state.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "empty-state",
  "type": "registry:ui",
  "title": "Empty State",
  "description": "No-data and no-result guidance surface primitive with container-aware responsive reflow, clear action hierarchy, and restrained HaloUI Liquid Glass outer boundaries.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/empty-state.tsx",
      "target": "components/ui/empty-state.tsx",
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

// Write public/r/empty-state.json
fs.writeFileSync('public/r/empty-state.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/empty-state.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'empty-state');
registry.items.push({
  name: "empty-state",
  type: "registry:ui",
  title: "Empty State",
  description: "No-data and no-result guidance surface primitive with container-aware responsive reflow, clear action hierarchy, and restrained HaloUI Liquid Glass outer boundaries.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/empty-state.tsx",
      target: "components/ui/empty-state.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Empty State Registry Build Complete ===\n");

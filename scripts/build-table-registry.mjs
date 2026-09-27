import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Table Registry Definition ===");

const component = fs.readFileSync('components/ui/table.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "table",
  "type": "registry:ui",
  "title": "Table",
  "description": "Semantic tabular data presentation primitive with container-aware horizontal scroll containment, density scales, and restrained HaloUI Liquid Glass outer boundary.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/table.tsx",
      "target": "components/ui/table.tsx",
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

// Write public/r/table.json
fs.writeFileSync('public/r/table.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/table.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'table');
registry.items.push({
  name: "table",
  type: "registry:ui",
  title: "Table",
  description: "Semantic tabular data presentation primitive with container-aware horizontal scroll containment, density scales, and restrained HaloUI Liquid Glass outer boundary.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/table.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort alphabetically by name
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (total items: ${registry.items.length})`);

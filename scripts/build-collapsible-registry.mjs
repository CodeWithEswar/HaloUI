import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Collapsible Registry Definition ===");

const component = fs.readFileSync('components/ui/collapsible.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "collapsible",
  "type": "registry:ui",
  "title": "Collapsible",
  "description": "Independent expandable disclosure panel with controlled/uncontrolled state, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
  "dependencies": [
    "@base-ui/react@^1.8.0",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/collapsible.tsx",
      "target": "components/ui/collapsible.tsx",
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

// Write public/r/collapsible.json
fs.writeFileSync('public/r/collapsible.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/collapsible.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'collapsible');
registry.items.push({
  name: "collapsible",
  type: "registry:ui",
  title: "Collapsible",
  description: "Independent expandable disclosure panel with controlled/uncontrolled state, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
  dependencies: [
    "@base-ui/react@^1.8.0",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/collapsible.tsx",
      target: "components/ui/collapsible.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Collapsible Registry Build Complete ===\n");

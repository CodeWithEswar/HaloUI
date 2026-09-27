import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Accordion Registry Definition ===");

const component = fs.readFileSync('components/ui/accordion.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "accordion",
  "type": "registry:ui",
  "title": "Accordion",
  "description": "Stacked expandable disclosure sections with coordinated single/multiple item models, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
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
      "path": "components/ui/accordion.tsx",
      "target": "components/ui/accordion.tsx",
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

// Write public/r/accordion.json
fs.writeFileSync('public/r/accordion.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/accordion.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'accordion');
registry.items.push({
  name: "accordion",
  type: "registry:ui",
  title: "Accordion",
  description: "Stacked expandable disclosure sections with coordinated single/multiple item models, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
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
      path: "components/ui/accordion.tsx",
      target: "components/ui/accordion.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Accordion Registry Build Complete ===\n");

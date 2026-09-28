import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Timeline Registry Definition ===");

const component = fs.readFileSync('components/ui/timeline.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "timeline",
  "type": "registry:ui",
  "title": "Timeline",
  "description": "Chronological event sequence primitive with container-aware responsive reflow, aligned optical connectors, and restrained HaloUI Liquid Glass outer boundaries.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/timeline.tsx",
      "target": "components/ui/timeline.tsx",
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

// Write public/r/timeline.json
fs.writeFileSync('public/r/timeline.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/timeline.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'timeline');
registry.items.push({
  name: "timeline",
  type: "registry:ui",
  title: "Timeline",
  description: "Chronological event sequence primitive with container-aware responsive reflow, aligned optical connectors, and restrained HaloUI Liquid Glass outer boundaries.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/timeline.tsx",
      target: "components/ui/timeline.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Timeline Registry Build Complete ===\n");

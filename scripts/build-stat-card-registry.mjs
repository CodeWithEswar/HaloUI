import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Stat Card Registry Definition ===");

const statCardComponent = fs.readFileSync('components/ui/stat-card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const statCardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "stat-card",
  "type": "registry:ui",
  "title": "Stat Card",
  "description": "Opinionated single-metric summary surface communicating a primary quantitative value, category context, and decoupled trend sentiment.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "card"
  ],
  "files": [
    {
      "path": "components/ui/stat-card.tsx",
      "target": "components/ui/stat-card.tsx",
      "type": "registry:ui",
      "content": statCardComponent
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

// Write public/r/stat-card.json
fs.writeFileSync('public/r/stat-card.json', JSON.stringify(statCardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/stat-card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'stat-card');
registry.items.push({
  name: "stat-card",
  type: "registry:ui",
  title: "Stat Card",
  description: "Opinionated single-metric summary surface communicating a primary quantitative value, category context, and decoupled trend sentiment.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "card"
  ],
  files: [
    {
      path: "components/ui/stat-card.tsx",
      type: "registry:ui",
      target: "components/ui/stat-card.tsx"
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
console.log("✓ Updated public/r/registry.json with stat-card");

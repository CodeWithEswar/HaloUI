import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Feature Card Registry Definition ===");

const featureCardComponent = fs.readFileSync('components/ui/feature-card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const featureCardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "feature-card",
  "type": "registry:ui",
  "title": "Feature Card",
  "description": "Opinionated feature and capability communication surface presenting a visual identifier, title, concise description, supporting highlights, and optional actions.",
  "dependencies": [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "card"
  ],
  "files": [
    {
      "path": "components/ui/feature-card.tsx",
      "target": "components/ui/feature-card.tsx",
      "type": "registry:ui",
      "content": featureCardComponent
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

// Write public/r/feature-card.json
fs.writeFileSync('public/r/feature-card.json', JSON.stringify(featureCardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/feature-card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'feature-card');
registry.items.push({
  name: "feature-card",
  type: "registry:ui",
  title: "Feature Card",
  description: "Opinionated feature and capability communication surface presenting a visual identifier, title, concise description, supporting highlights, and optional actions.",
  dependencies: [
    "@radix-ui/react-slot",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "card"
  ],
  files: [
    {
      path: "components/ui/feature-card.tsx",
      type: "registry:ui",
      target: "components/ui/feature-card.tsx"
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
console.log("✓ Updated public/r/registry.json with feature-card");

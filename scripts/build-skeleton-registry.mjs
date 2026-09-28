import fs from 'node:fs';

console.log("=== Building Skeleton Registry Definition ===");

const component = fs.readFileSync('components/ui/skeleton.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "skeleton",
  "type": "registry:ui",
  "title": "Skeleton",
  "description": "Content loading placeholder engineered with Subtle Liquid Glass channels, zero per-fragment backdrop filters, and vestibular reduced-motion safety.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/skeleton.tsx",
      "target": "components/ui/skeleton.tsx",
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

// Write public/r/skeleton.json
fs.writeFileSync('public/r/skeleton.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/skeleton.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'skeleton');
registry.items.push({
  name: "skeleton",
  type: "registry:ui",
  title: "Skeleton",
  description: "Content loading placeholder engineered with Subtle Liquid Glass channels, zero per-fragment backdrop filters, and vestibular reduced-motion safety.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/skeleton.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

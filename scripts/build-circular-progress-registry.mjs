import fs from 'node:fs';

console.log("=== Building Circular Progress Registry Definition ===");

const component = fs.readFileSync('components/ui/circular-progress.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "circular-progress",
  "type": "registry:ui",
  "title": "Circular Progress",
  "description": "Compact radial completion indicator engineered with scalable SVG coordinate geometry, Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/circular-progress.tsx",
      "target": "components/ui/circular-progress.tsx",
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

// Write public/r/circular-progress.json
fs.writeFileSync('public/r/circular-progress.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/circular-progress.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'circular-progress');
registry.items.push({
  name: "circular-progress",
  type: "registry:ui",
  title: "Circular Progress",
  description: "Compact radial completion indicator engineered with scalable SVG coordinate geometry, Subtle Liquid Glass track channels, and WAI-ARIA progressbar semantics.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/circular-progress.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

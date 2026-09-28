import fs from 'node:fs';

console.log("=== Building Spinner Registry Definition ===");

const component = fs.readFileSync('components/ui/spinner.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "spinner",
  "type": "registry:ui",
  "title": "Spinner",
  "description": "Indeterminate activity indicator engineered with pure SVG stroke geometry, currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/spinner.tsx",
      "target": "components/ui/spinner.tsx",
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

// Write public/r/spinner.json
fs.writeFileSync('public/r/spinner.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/spinner.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'spinner');
registry.items.push({
  name: "spinner",
  type: "registry:ui",
  title: "Spinner",
  description: "Indeterminate activity indicator engineered with pure SVG stroke geometry, currentColor inheritance, zero-cost CSS rotation, and reduced-motion fallbacks.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/spinner.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

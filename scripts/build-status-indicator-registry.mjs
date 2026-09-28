import fs from 'node:fs';

console.log("=== Building Status Indicator Registry Definition ===");

const component = fs.readFileSync('components/ui/status-indicator.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "status-indicator",
  "type": "registry:ui",
  "title": "Status Indicator",
  "description": "Dot/icon + text state representation engineered for high-density tables, lists, and cards with minimal near-flat Liquid Glass optics and zero layout overhead.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/status-indicator.tsx",
      "target": "components/ui/status-indicator.tsx",
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

// Write public/r/status-indicator.json
fs.writeFileSync('public/r/status-indicator.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/status-indicator.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'status-indicator');
registry.items.push({
  name: "status-indicator",
  type: "registry:ui",
  title: "Status Indicator",
  description: "Dot/icon + text state representation engineered for high-density tables, lists, and cards with minimal near-flat Liquid Glass optics and zero layout overhead.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/status-indicator.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

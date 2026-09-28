import fs from 'node:fs';

console.log("=== Building Loading Overlay Registry Definition ===");

const component = fs.readFileSync('components/ui/loading-overlay.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "loading-overlay",
  "type": "registry:ui",
  "title": "Loading Overlay",
  "description": "Scoped blocking/loading surface engineered with Balanced Liquid Glass optics, pointer and keyboard interaction blocking, and automatic container reflow.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "spinner"
  ],
  "files": [
    {
      "path": "components/ui/loading-overlay.tsx",
      "target": "components/ui/loading-overlay.tsx",
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

// Write public/r/loading-overlay.json
fs.writeFileSync('public/r/loading-overlay.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/loading-overlay.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'loading-overlay');
registry.items.push({
  name: "loading-overlay",
  type: "registry:ui",
  title: "Loading Overlay",
  description: "Scoped blocking/loading surface engineered with Balanced Liquid Glass optics, pointer and keyboard interaction blocking, and automatic container reflow.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "spinner"
  ],
  files: [
    {
      path: "components/ui/loading-overlay.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

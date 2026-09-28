import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Metric Registry Definition ===");

const component = fs.readFileSync('components/ui/metric.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "metric",
  "type": "registry:ui",
  "title": "Metric",
  "description": "Standalone quantitative metric presentation primitive with tabular numeric typography, container-aware responsive reflow, and restrained HaloUI Liquid Glass materials.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/metric.tsx",
      "target": "components/ui/metric.tsx",
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

// Write public/r/metric.json
fs.writeFileSync('public/r/metric.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/metric.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'metric');
registry.items.push({
  name: "metric",
  type: "registry:ui",
  title: "Metric",
  description: "Standalone quantitative metric presentation primitive with tabular numeric typography, container-aware responsive reflow, and restrained HaloUI Liquid Glass materials.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/metric.tsx",
      target: "components/ui/metric.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Metric Registry Build Complete ===\n");

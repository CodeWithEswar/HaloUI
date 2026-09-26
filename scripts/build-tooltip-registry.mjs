import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Tooltip Registry Definition ===");

const tooltipComponent = fs.readFileSync('components/ui/tooltip.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const tooltipItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tooltip",
  "type": "registry:ui",
  "title": "Tooltip",
  "description": "Brief contextual label and supplemental help associated with an interface element, engineered with HaloUI Liquid Glass optics, skip-delay provider orchestration, and non-modal focus isolation.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/tooltip.tsx",
      "target": "components/ui/tooltip.tsx",
      "type": "registry:ui",
      "content": tooltipComponent
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

// Write public/r/tooltip.json
fs.writeFileSync('public/r/tooltip.json', JSON.stringify(tooltipItem, null, 2), 'utf-8');
console.log("✓ Created public/r/tooltip.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'tooltip');
registry.items.push({
  name: "tooltip",
  type: "registry:ui",
  title: "Tooltip",
  description: "Brief contextual label and supplemental help associated with an interface element, engineered with HaloUI Liquid Glass optics, skip-delay provider orchestration, and non-modal focus isolation.",
  dependencies: [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26"
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with tooltip");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Popover Registry Definition ===");

const popoverComponent = fs.readFileSync('components/ui/popover.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const popoverItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "popover",
  "type": "registry:ui",
  "title": "Popover",
  "description": "An anchored transient floating surface engineered with HaloUI liquid glass physical optics, collision-aware boundary positioning, origin-anchored reveal kinematics, and zero backdrop dimming.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "button"
  ],
  "files": [
    {
      "path": "components/ui/popover.tsx",
      "target": "components/ui/popover.tsx",
      "type": "registry:ui",
      "content": popoverComponent
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

// Write public/r/popover.json
fs.writeFileSync('public/r/popover.json', JSON.stringify(popoverItem, null, 2), 'utf-8');
console.log("✓ Created public/r/popover.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Filter out existing popover if present, then add new entry
registry.items = registry.items.filter((item) => item.name !== 'popover');
registry.items.push({
  name: "popover",
  type: "registry:ui",
  title: "Popover",
  description: "An anchored transient floating surface engineered with HaloUI liquid glass physical optics, collision-aware boundary positioning, origin-anchored reveal kinematics, and zero backdrop dimming.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "button"
  ],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26"
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with popover");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Tour Popover Registry Definition ===");

const tourPopoverComponent = fs.readFileSync('components/ui/tour-popover.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const tourPopoverItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tour-popover",
  "type": "registry:ui",
  "title": "Tour Popover",
  "description": "An anchored instructional onboarding surface engineered with a controlled tour state machine, dynamic target resolution, collision-aware positioning, missing-target recovery, and HaloUI liquid glass physical optics.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "button",
    "icon-button"
  ],
  "files": [
    {
      "path": "components/ui/tour-popover.tsx",
      "target": "components/ui/tour-popover.tsx",
      "type": "registry:ui",
      "content": tourPopoverComponent
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

// Write public/r/tour-popover.json
fs.writeFileSync('public/r/tour-popover.json', JSON.stringify(tourPopoverItem, null, 2), 'utf-8');
console.log("✓ Created public/r/tour-popover.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Filter out existing tour-popover if present, then add new entry
registry.items = registry.items.filter((item) => item.name !== 'tour-popover');
registry.items.push({
  name: "tour-popover",
  type: "registry:ui",
  title: "Tour Popover",
  description: "An anchored instructional onboarding surface engineered with a controlled tour state machine, dynamic target resolution, collision-aware positioning, missing-target recovery, and HaloUI liquid glass physical optics.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "button",
    "icon-button"
  ],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26"
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with tour-popover");

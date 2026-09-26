import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Hover Card Registry Definition ===");

const hoverCardComponent = fs.readFileSync('components/ui/hover-card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const hoverCardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hover-card",
  "type": "registry:ui",
  "title": "Hover Card",
  "description": "Supplemental destination or entity preview opened through accessible hover and focus behavior, engineered with HaloUI liquid glass physical optics and uncompromised link navigation semantics.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/hover-card.tsx",
      "target": "components/ui/hover-card.tsx",
      "type": "registry:ui",
      "content": hoverCardComponent
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

// Write public/r/hover-card.json
fs.writeFileSync('public/r/hover-card.json', JSON.stringify(hoverCardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/hover-card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Filter out existing hover-card if present, then add new entry
registry.items = registry.items.filter((item) => item.name !== 'hover-card');
registry.items.push({
  name: "hover-card",
  type: "registry:ui",
  title: "Hover Card",
  description: "Supplemental destination or entity preview opened through accessible hover and focus behavior, engineered with HaloUI liquid glass physical optics and uncompromised link navigation semantics.",
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
console.log("✓ Updated public/r/registry.json with hover-card");

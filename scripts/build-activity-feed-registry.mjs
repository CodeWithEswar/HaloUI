import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Activity Feed Registry Definition ===");

const component = fs.readFileSync('components/ui/activity-feed.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "activity-feed",
  "type": "registry:ui",
  "title": "Activity Feed",
  "description": "Scannable recent activity stream primitive with actor identity preservation, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/activity-feed.tsx",
      "target": "components/ui/activity-feed.tsx",
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

// Write public/r/activity-feed.json
fs.writeFileSync('public/r/activity-feed.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/activity-feed.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'activity-feed');
registry.items.push({
  name: "activity-feed",
  type: "registry:ui",
  title: "Activity Feed",
  description: "Scannable recent activity stream primitive with actor identity preservation, container-aware responsive reflow, and restrained HaloUI Liquid Glass outer boundaries.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/activity-feed.tsx",
      target: "components/ui/activity-feed.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Activity Feed Registry Build Complete ===\n");

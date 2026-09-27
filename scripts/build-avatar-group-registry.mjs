import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Avatar Group Registry Definition ===");

const avatarGroupComponent = fs.readFileSync('components/ui/avatar-group.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const avatarGroupItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "avatar-group",
  "type": "registry:ui",
  "title": "Avatar Group",
  "description": "Composition primitive arranging multiple Avatar components into a compact, overlapping identity cluster with automatic overflow truncation.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "avatar"
  ],
  "files": [
    {
      "path": "components/ui/avatar-group.tsx",
      "target": "components/ui/avatar-group.tsx",
      "type": "registry:ui",
      "content": avatarGroupComponent
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

// Write public/r/avatar-group.json
fs.writeFileSync('public/r/avatar-group.json', JSON.stringify(avatarGroupItem, null, 2), 'utf-8');
console.log("✓ Created public/r/avatar-group.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'avatar-group');
registry.items.push({
  name: "avatar-group",
  type: "registry:ui",
  title: "Avatar Group",
  description: "Composition primitive arranging multiple Avatar components into a compact, overlapping identity cluster with automatic overflow truncation.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "avatar"
  ],
  files: [
    {
      path: "components/ui/avatar-group.tsx",
      type: "registry:ui",
      target: "components/ui/avatar-group.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    },
    {
      path: "styles/halo-material.css",
      type: "registry:ui",
      target: "styles/halo-material.css"
    }
  ]
});

// Sort alphabetically by name
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with avatar-group");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Profile Card Registry Definition ===");

const profileCardComponent = fs.readFileSync('components/ui/profile-card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const profileCardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "profile-card",
  "type": "registry:ui",
  "title": "Profile Card",
  "description": "Compact identity summary surface presenting an entity's avatar, display name, professional role, presence status, metadata, and optional actions.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "card",
    "avatar"
  ],
  "files": [
    {
      "path": "components/ui/profile-card.tsx",
      "target": "components/ui/profile-card.tsx",
      "type": "registry:ui",
      "content": profileCardComponent
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

// Write public/r/profile-card.json
fs.writeFileSync('public/r/profile-card.json', JSON.stringify(profileCardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/profile-card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'profile-card');
registry.items.push({
  name: "profile-card",
  type: "registry:ui",
  title: "Profile Card",
  description: "Compact identity summary surface presenting an entity's avatar, display name, professional role, presence status, metadata, and optional actions.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "card",
    "avatar"
  ],
  files: [
    {
      path: "components/ui/profile-card.tsx",
      type: "registry:ui",
      target: "components/ui/profile-card.tsx"
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

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with profile-card");

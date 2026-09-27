import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Avatar Registry Definition ===");

const avatarComponent = fs.readFileSync('components/ui/avatar.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const avatarItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "avatar",
  "type": "registry:ui",
  "title": "Avatar",
  "description": "Small identity primitive presenting an entity image with graceful initials or glyph fallback, accessible badge indicators, and overlapping group stacks.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/avatar.tsx",
      "target": "components/ui/avatar.tsx",
      "type": "registry:ui",
      "content": avatarComponent
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

// Write public/r/avatar.json
fs.writeFileSync('public/r/avatar.json', JSON.stringify(avatarItem, null, 2), 'utf-8');
console.log("✓ Created public/r/avatar.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'avatar');
registry.items.push({
  name: "avatar",
  type: "registry:ui",
  title: "Avatar",
  description: "Small identity primitive presenting an entity image with graceful initials or glyph fallback, accessible badge indicators, and overlapping group stacks.",
  dependencies: [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/avatar.tsx",
      type: "registry:ui",
      target: "components/ui/avatar.tsx"
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
console.log("✓ Updated public/r/registry.json with avatar");

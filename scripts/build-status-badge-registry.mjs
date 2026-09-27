import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Badge & Status Badge Registry Definitions ===");

const badgeComponent = fs.readFileSync('components/ui/badge.tsx', 'utf-8');
const statusBadgeComponent = fs.readFileSync('components/ui/status-badge.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

// 1. Badge registry item
const badgeItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "badge",
  "type": "registry:ui",
  "title": "Badge",
  "description": "Foundational compact inline label primitive communicating category, count, or classification.",
  "dependencies": [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "files": [
    {
      "path": "components/ui/badge.tsx",
      "target": "components/ui/badge.tsx",
      "type": "registry:ui",
      "content": badgeComponent
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

fs.writeFileSync('public/r/badge.json', JSON.stringify(badgeItem, null, 2), 'utf-8');
console.log("✓ Created public/r/badge.json");

// 2. Status Badge registry item
const statusBadgeItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "status-badge",
  "type": "registry:ui",
  "title": "Status Badge",
  "description": "Compact semantic state indicator communicating operational health, workflow phase, or system status with decoupled tone intent.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "badge"
  ],
  "files": [
    {
      "path": "components/ui/status-badge.tsx",
      "target": "components/ui/status-badge.tsx",
      "type": "registry:ui",
      "content": statusBadgeComponent
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

fs.writeFileSync('public/r/status-badge.json', JSON.stringify(statusBadgeItem, null, 2), 'utf-8');
console.log("✓ Created public/r/status-badge.json");

// 3. Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'badge' && item.name !== 'status-badge');

registry.items.push({
  name: "badge",
  type: "registry:ui",
  title: "Badge",
  description: "Foundational compact inline label primitive communicating category, count, or classification.",
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  files: [
    {
      path: "components/ui/badge.tsx",
      type: "registry:ui",
      target: "components/ui/badge.tsx"
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

registry.items.push({
  name: "status-badge",
  type: "registry:ui",
  title: "Status Badge",
  description: "Compact semantic state indicator communicating operational health, workflow phase, or system status with decoupled tone intent.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "badge"
  ],
  files: [
    {
      path: "components/ui/status-badge.tsx",
      type: "registry:ui",
      target: "components/ui/status-badge.tsx"
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

registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with badge and status-badge");

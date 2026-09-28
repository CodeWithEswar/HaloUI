import fs from 'node:fs';

console.log("=== Building Banner Registry Definition ===");

const component = fs.readFileSync('components/ui/banner.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "banner",
  "type": "registry:ui",
  "title": "Banner",
  "description": "Persistent page and section announcement primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and full-width or contained layout modes.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  "registryDependencies": [
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/banner.tsx",
      "target": "components/ui/banner.tsx",
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

// Write public/r/banner.json
fs.writeFileSync('public/r/banner.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/banner.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'banner');
registry.items.push({
  name: "banner",
  type: "registry:ui",
  title: "Banner",
  description: "Persistent page and section announcement primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and full-width or contained layout modes.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  registryDependencies: [
    "halo-icon"
  ],
  files: [
    {
      path: "components/ui/banner.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

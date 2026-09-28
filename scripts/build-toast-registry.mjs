import fs from 'node:fs';

console.log("=== Building Toast Registry Definition ===");

const component = fs.readFileSync('components/ui/toast.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "toast",
  "type": "registry:ui",
  "title": "Toast",
  "description": "Ephemeral application feedback surface engineered with Balanced Liquid Glass, stacked swipe physics, non-intrusive portal rendering, and mobile-safe viewport margins.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  "registryDependencies": [
    "button",
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/toast.tsx",
      "target": "components/ui/toast.tsx",
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

// Write public/r/toast.json
fs.writeFileSync('public/r/toast.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/toast.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'toast');
registry.items.push({
  name: "toast",
  type: "registry:ui",
  title: "Toast",
  description: "Ephemeral application feedback surface engineered with Balanced Liquid Glass, stacked swipe physics, non-intrusive portal rendering, and mobile-safe viewport margins.",
  dependencies: [
    "@base-ui/react",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  registryDependencies: [
    "button",
    "halo-icon"
  ],
  files: [
    {
      path: "components/ui/toast.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

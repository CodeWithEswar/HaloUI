import fs from 'node:fs';

console.log("=== Building Callout Registry Definition ===");

const component = fs.readFileSync('components/ui/callout.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "callout",
  "type": "registry:ui",
  "title": "Callout",
  "description": "Contextual documentation and technical guidance callout primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and 5 semantic tones.",
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
      "path": "components/ui/callout.tsx",
      "target": "components/ui/callout.tsx",
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

// Write public/r/callout.json
fs.writeFileSync('public/r/callout.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/callout.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'callout');
registry.items.push({
  name: "callout",
  type: "registry:ui",
  title: "Callout",
  description: "Contextual documentation and technical guidance callout primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and 5 semantic tones.",
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
      path: "components/ui/callout.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

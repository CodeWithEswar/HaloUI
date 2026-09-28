import fs from 'node:fs';

console.log("=== Building Alert Registry Definition ===");

const component = fs.readFileSync('components/ui/alert.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "alert",
  "type": "registry:ui",
  "title": "Alert",
  "description": "Contextual inline semantic feedback surface engineered with Subtle Liquid Glass, automatic container-aware reflow, Hugeicons iconography, and accessible WAI-ARIA role semantics.",
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
      "path": "components/ui/alert.tsx",
      "target": "components/ui/alert.tsx",
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

// Write public/r/alert.json
fs.writeFileSync('public/r/alert.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/alert.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'alert');
registry.items.push({
  name: "alert",
  type: "registry:ui",
  title: "Alert",
  description: "Contextual inline semantic feedback surface engineered with Subtle Liquid Glass, automatic container-aware reflow, Hugeicons iconography, and accessible WAI-ARIA role semantics.",
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
      path: "components/ui/alert.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log("✓ Updated public/r/registry.json (total items: " + registry.items.length + ")");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Carousel Registry Definition ===");

const component = fs.readFileSync('components/ui/carousel.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "carousel",
  "type": "registry:ui",
  "title": "Carousel",
  "description": "Sequential content presentation primitive engineered with proven Embla carousel physics, container-aware responsiveness, liquid glass navigation controls, and accessible pagination.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "embla-carousel-react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "button"
  ],
  "files": [
    {
      "path": "components/ui/carousel.tsx",
      "target": "components/ui/carousel.tsx",
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

// Write public/r/carousel.json
fs.writeFileSync('public/r/carousel.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/carousel.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'carousel');
registry.items.push({
  name: "carousel",
  type: "registry:ui",
  title: "Carousel",
  description: "Sequential content presentation primitive engineered with proven Embla carousel physics, container-aware responsiveness, liquid glass navigation controls, and accessible pagination.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "embla-carousel-react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "button"
  ],
  files: [
    {
      path: "components/ui/carousel.tsx",
      target: "components/ui/carousel.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Carousel Registry Build Complete ===\n");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Marquee Registry Definition ===");

const component = fs.readFileSync('components/ui/marquee.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "marquee",
  "type": "registry:ui",
  "title": "Marquee",
  "description": "Continuous content presentation strip primitive engineered with pure CSS transforms, reduced-motion-first fallback, accessible clone isolation, and restrained HaloUI Liquid Glass optics.",
  "dependencies": [
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/marquee.tsx",
      "target": "components/ui/marquee.tsx",
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

// Write public/r/marquee.json
fs.writeFileSync('public/r/marquee.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/marquee.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'marquee');
registry.items.push({
  name: "marquee",
  type: "registry:ui",
  title: "Marquee",
  description: "Continuous content presentation strip primitive engineered with pure CSS transforms, reduced-motion-first fallback, accessible clone isolation, and restrained HaloUI Liquid Glass optics.",
  dependencies: [
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/marquee.tsx",
      target: "components/ui/marquee.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Marquee Registry Build Complete ===\n");

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building JSON Viewer Registry Definition ===");

const component = fs.readFileSync('components/ui/json-viewer.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "json-viewer",
  "type": "registry:ui",
  "title": "JSON Viewer",
  "description": "Structured hierarchical JSON inspection primitive with accessible disclosure controls, tokenized container-aware indentation, and restrained HaloUI Liquid Glass optics.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "copy-button"
  ],
  "files": [
    {
      "path": "components/ui/json-viewer.tsx",
      "target": "components/ui/json-viewer.tsx",
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

// Write public/r/json-viewer.json
fs.writeFileSync('public/r/json-viewer.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/json-viewer.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'json-viewer');
registry.items.push({
  name: "json-viewer",
  type: "registry:ui",
  title: "JSON Viewer",
  description: "Structured hierarchical JSON inspection primitive with accessible disclosure controls, tokenized container-aware indentation, and restrained HaloUI Liquid Glass optics.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "copy-button"
  ],
  files: [
    {
      path: "components/ui/json-viewer.tsx",
      target: "components/ui/json-viewer.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== JSON Viewer Registry Build Complete ===\n");

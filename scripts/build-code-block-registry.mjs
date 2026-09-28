import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Code Block Registry Definition ===");

const component = fs.readFileSync('components/ui/code-block.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "code-block",
  "type": "registry:ui",
  "title": "Code Block",
  "description": "Source-accurate code presentation primitive engineered with container-aware layout, unselectable tabular line numbers, line highlighting, and restrained HaloUI Liquid Glass optics.",
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
      "path": "components/ui/code-block.tsx",
      "target": "components/ui/code-block.tsx",
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

// Write public/r/code-block.json
fs.writeFileSync('public/r/code-block.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/code-block.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'code-block');
registry.items.push({
  name: "code-block",
  type: "registry:ui",
  title: "Code Block",
  description: "Source-accurate code presentation primitive engineered with container-aware layout, unselectable tabular line numbers, line highlighting, and restrained HaloUI Liquid Glass optics.",
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
      path: "components/ui/code-block.tsx",
      target: "components/ui/code-block.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort registry items alphabetically
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (${registry.items.length} items total)`);
console.log("=== Code Block Registry Build Complete ===\n");

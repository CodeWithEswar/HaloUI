import fs from 'node:fs';

console.log("=== Building Tree View Registry Definition ===");

const component = fs.readFileSync('components/ui/tree-view.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tree-view",
  "type": "registry:ui",
  "title": "Tree View",
  "description": "Hierarchical data display primitive with WAI-ARIA Tree View semantics, roving tabindex keyboard navigation, container-aware deep nesting reflow, and restrained HaloUI Liquid Glass framing.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "checkbox"
  ],
  "files": [
    {
      "path": "components/ui/tree-view.tsx",
      "target": "components/ui/tree-view.tsx",
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

// Write public/r/tree-view.json
fs.writeFileSync('public/r/tree-view.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/tree-view.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'tree-view');
registry.items.push({
  name: "tree-view",
  type: "registry:ui",
  title: "Tree View",
  description: "Hierarchical data display primitive with WAI-ARIA Tree View semantics, roving tabindex keyboard navigation, container-aware deep nesting reflow, and restrained HaloUI Liquid Glass framing.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "checkbox"
  ],
  files: [
    {
      path: "components/ui/tree-view.tsx",
      type: "registry:ui"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated ${registryPath} with tree-view entry (total items: ${registry.items.length})`);

import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building Data Table Registry Definition ===");

const component = fs.readFileSync('components/ui/data-table.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const registryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "data-table",
  "type": "registry:ui",
  "title": "Data Table",
  "description": "Interactive data-management composition built on Table and TanStack Table with sorting, filtering, selection, pagination, and restrained HaloUI Liquid Glass materials.",
  "dependencies": [
    "@tanstack/react-table",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "table",
    "button",
    "input",
    "dropdown-menu",
    "select",
    "checkbox",
    "badge"
  ],
  "files": [
    {
      "path": "components/ui/data-table.tsx",
      "target": "components/ui/data-table.tsx",
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

// Write public/r/data-table.json
fs.writeFileSync('public/r/data-table.json', JSON.stringify(registryItem, null, 2) + '\n', 'utf-8');
console.log("✓ Created public/r/data-table.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'data-table');
registry.items.push({
  name: "data-table",
  type: "registry:ui",
  title: "Data Table",
  description: "Interactive data-management composition built on Table and TanStack Table with sorting, filtering, selection, pagination, and restrained HaloUI Liquid Glass materials.",
  dependencies: [
    "@tanstack/react-table",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "table",
    "button",
    "input",
    "dropdown-menu",
    "select",
    "checkbox",
    "badge"
  ],
  files: [
    {
      path: "components/ui/data-table.tsx",
      type: "registry:ui"
    }
  ]
});

// Sort alphabetically by name
registry.items.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
console.log(`✓ Updated public/r/registry.json (total items: ${registry.items.length})`);

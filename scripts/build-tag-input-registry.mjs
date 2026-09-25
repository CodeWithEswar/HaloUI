import fs from 'fs';
import path from 'path';

const tagInputComponent = fs.readFileSync('components/ui/tag-input.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const tagInputRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tag-input",
  "type": "registry:ui",
  "title": "Tag Input",
  "description": "A freeform token-entry control for creating, editing, and removing multiple short text values.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field",
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/tag-input.tsx",
      "content": tagInputComponent,
      "type": "registry:ui",
      "target": "components/ui/tag-input.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "forms-and-fields"
  ],
  "meta": {
    "status": "preview",
    "version": "1.0.0",
    "category": "forms-and-fields",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-25"
  }
};

fs.writeFileSync('public/r/tag-input.json', JSON.stringify(tagInputRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/tag-input.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'tag-input');
  const entrySummary = {
    name: "tag-input",
    type: "registry:ui",
    title: "Tag Input",
    description: "A freeform token-entry control for creating, editing, and removing multiple short text values.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field", "halo-icon"],
    files: [
      {
        path: "components/ui/tag-input.tsx",
        type: "registry:ui",
        target: "components/ui/tag-input.tsx"
      },
      {
        path: "styles/halo-tokens.css",
        type: "registry:ui",
        target: "styles/halo-tokens.css"
      }
    ],
    meta: {
      status: "preview",
      version: "1.0.0",
      category: "forms-and-fields",
      accessibility: "WCAG 2.1 AA",
      lastUpdated: "2026-09-25"
    }
  };

  if (existingIndex >= 0) {
    items[existingIndex] = entrySummary;
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with tag-input');
}

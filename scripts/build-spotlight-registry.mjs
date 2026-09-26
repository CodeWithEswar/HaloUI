import fs from 'fs';

const spotlightComponent = fs.readFileSync('components/ui/spotlight.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const spotlightRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "spotlight",
  "type": "registry:ui",
  "title": "Spotlight",
  "description": "Large global discovery surface engineered for application-wide search across heterogeneous entities, files, people, and commands with HaloUI Liquid Glass optics.",
  "dependencies": [
    "@base-ui/react",
    "cmdk",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "dialog"
  ],
  "files": [
    {
      "path": "components/ui/spotlight.tsx",
      "content": spotlightComponent,
      "type": "registry:ui",
      "target": "components/ui/spotlight.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "overlays"
  ],
  "meta": {
    "status": "stable",
    "version": "1.0.0",
    "category": "overlays",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-26"
  }
};

fs.writeFileSync('public/r/spotlight.json', JSON.stringify(spotlightRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/spotlight.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'spotlight');
  const entrySummary = {
    name: "spotlight",
    type: "registry:ui",
    title: "Spotlight",
    description: "Large global discovery surface engineered for application-wide search across heterogeneous entities, files, people, and commands with HaloUI Liquid Glass optics.",
    categories: ["overlays"],
    registryDependencies: ["dialog"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with spotlight');
}

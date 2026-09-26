import fs from 'fs';

const lightboxComponent = fs.readFileSync('components/ui/lightbox.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const lightboxRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "lightbox",
  "type": "registry:ui",
  "title": "Lightbox",
  "description": "Focused media viewer overlay engineered for high-fidelity image inspection and galleries with deep optical Halo Scrim and Liquid Glass floating controls.",
  "dependencies": [
    "@base-ui/react",
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
      "path": "components/ui/lightbox.tsx",
      "content": lightboxComponent,
      "type": "registry:ui",
      "target": "components/ui/lightbox.tsx"
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

fs.writeFileSync('public/r/lightbox.json', JSON.stringify(lightboxRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/lightbox.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'lightbox');
  const entrySummary = {
    name: "lightbox",
    type: "registry:ui",
    title: "Lightbox",
    description: "Focused media viewer overlay engineered for high-fidelity image inspection and galleries with deep optical Halo Scrim and Liquid Glass floating controls.",
    categories: ["overlays"],
    registryDependencies: ["dialog"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with lightbox');
}

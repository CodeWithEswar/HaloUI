import fs from 'fs';

const sidebarRailComponent = fs.readFileSync('components/ui/sidebar-rail.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const sidebarRailRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "sidebar-rail",
  "type": "registry:ui",
  "title": "Sidebar Rail",
  "description": "A compact navigation rail for preserving essential application navigation when the primary Sidebar is collapsed.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "sidebar",
    "tooltip",
    "button"
  ],
  "files": [
    {
      "path": "components/ui/sidebar-rail.tsx",
      "content": sidebarRailComponent,
      "type": "registry:ui",
      "target": "components/ui/sidebar-rail.tsx"
    },
    {
      "path": "styles/halo-tokens.css",
      "content": haloTokensCss,
      "type": "registry:ui",
      "target": "styles/halo-tokens.css"
    }
  ],
  "categories": [
    "navigation"
  ],
  "meta": {
    "status": "preview",
    "version": "1.0.0",
    "category": "navigation",
    "accessibility": "WCAG 2.1 AA",
    "lastUpdated": "2026-09-26"
  }
};

fs.writeFileSync('public/r/sidebar-rail.json', JSON.stringify(sidebarRailRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/sidebar-rail.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'sidebar-rail');
  const entrySummary = {
    name: "sidebar-rail",
    type: "registry:ui",
    title: "Sidebar Rail",
    description: "A compact navigation rail for preserving essential application navigation when the primary Sidebar is collapsed.",
    categories: ["navigation"],
    registryDependencies: ["sidebar", "tooltip", "button"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with sidebar-rail entry');
}

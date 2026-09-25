import fs from 'fs';

const breadcrumbComponent = fs.readFileSync('components/ui/breadcrumb.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const breadcrumbRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "breadcrumb",
  "type": "registry:ui",
  "title": "Breadcrumb",
  "description": "A semantic navigation trail that communicates the current page's position within a hierarchical structure.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/breadcrumb.tsx",
      "content": breadcrumbComponent,
      "type": "registry:ui",
      "target": "components/ui/breadcrumb.tsx"
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

fs.writeFileSync('public/r/breadcrumb.json', JSON.stringify(breadcrumbRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/breadcrumb.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'breadcrumb');
  const entrySummary = {
    name: "breadcrumb",
    type: "registry:ui",
    title: "Breadcrumb",
    description: "A semantic navigation trail that communicates the current page's position within a hierarchical structure.",
    categories: [
      "navigation"
    ],
    dependencies: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with breadcrumb entry');
}

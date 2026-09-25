import fs from 'fs';

const tabsComponent = fs.readFileSync('components/ui/tabs.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const tabsRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "tabs",
  "type": "registry:ui",
  "title": "Tabs",
  "description": "An accessible tabbed interface for switching between peer content views within the same context.",
  "dependencies": [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/tabs.tsx",
      "content": tabsComponent,
      "type": "registry:ui",
      "target": "components/ui/tabs.tsx"
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
    "lastUpdated": "2026-09-25"
  }
};

fs.writeFileSync('public/r/tabs.json', JSON.stringify(tabsRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/tabs.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'tabs');
  const entrySummary = {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description: "An accessible tabbed interface for switching between peer content views within the same context.",
    categories: [
      "navigation"
    ],
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
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
  console.log('Successfully updated public/r/registry.json with tabs entry');
}

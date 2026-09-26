import fs from 'fs';

const linkPreviewComponent = fs.readFileSync('components/ui/link-preview.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const linkPreviewRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "link-preview",
  "type": "registry:ui",
  "title": "Link Preview",
  "description": "A navigation link that reveals concise supplemental destination context without replacing the link's native navigation behavior.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/link-preview.tsx",
      "content": linkPreviewComponent,
      "type": "registry:ui",
      "target": "components/ui/link-preview.tsx"
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

fs.writeFileSync('public/r/link-preview.json', JSON.stringify(linkPreviewRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/link-preview.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'link-preview');
  const entrySummary = {
    name: "link-preview",
    type: "registry:ui",
    title: "Link Preview",
    description: "A navigation link that reveals concise supplemental destination context without replacing the link's native navigation behavior.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with link-preview entry');
}

import fs from 'fs';

const formMessageComponent = fs.readFileSync('components/ui/form-message.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const formMessageRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "form-message",
  "type": "registry:ui",
  "title": "Form Message",
  "description": "A semantic field-level message for communicating validation errors, success, warnings, or concise supporting feedback.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field"
  ],
  "files": [
    {
      "path": "components/ui/form-message.tsx",
      "content": formMessageComponent,
      "type": "registry:ui",
      "target": "components/ui/form-message.tsx"
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

fs.writeFileSync('public/r/form-message.json', JSON.stringify(formMessageRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/form-message.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'form-message');
  const entrySummary = {
    name: "form-message",
    type: "registry:ui",
    title: "Form Message",
    description: "A semantic field-level message for communicating validation errors, success, warnings, or concise supporting feedback.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: [
      "field"
    ]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = entrySummary;
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json');
}

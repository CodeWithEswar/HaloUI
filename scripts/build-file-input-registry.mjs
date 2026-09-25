import fs from 'fs';

const fileInputComponent = fs.readFileSync('components/ui/file-input.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const fileInputRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "file-input",
  "type": "registry:ui",
  "title": "File Input",
  "description": "An accessible native file-selection control with HaloUI form styling and clear selected-file feedback.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field"
  ],
  "files": [
    {
      "path": "components/ui/file-input.tsx",
      "content": fileInputComponent,
      "type": "registry:ui",
      "target": "components/ui/file-input.tsx"
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

fs.writeFileSync('public/r/file-input.json', JSON.stringify(fileInputRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/file-input.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'file-input');
  const entrySummary = {
    name: "file-input",
    type: "registry:ui",
    title: "File Input",
    description: "An accessible native file-selection control with HaloUI form styling and clear selected-file feedback.",
    categories: ["forms-and-fields"],
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with file-input');
}

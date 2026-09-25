import fs from 'fs';

const fileUploadComponent = fs.readFileSync('components/ui/file-upload.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const fileUploadRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "file-upload",
  "type": "registry:ui",
  "title": "File Upload",
  "description": "An accessible client-side file-upload workflow with native file selection, drag-and-drop, validation, queue state management, progress tracking, cancellation, retry, and transport-agnostic application integration.",
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  "registryDependencies": [
    "field"
  ],
  "files": [
    {
      "path": "components/ui/file-upload.tsx",
      "content": fileUploadComponent,
      "type": "registry:ui",
      "target": "components/ui/file-upload.tsx"
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

fs.writeFileSync('public/r/file-upload.json', JSON.stringify(fileUploadRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/file-upload.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'file-upload');
  const entrySummary = {
    name: "file-upload",
    type: "registry:ui",
    title: "File Upload",
    description: "An accessible client-side file-upload workflow with native file selection, drag-and-drop, validation, queue state management, progress tracking, cancellation, retry, and transport-agnostic application integration.",
    categories: ["forms-and-fields"],
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "@hugeicons/react",
      "@hugeicons/core-free-icons"
    ],
    registryDependencies: ["field"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json');
}

import fs from 'fs';

const phoneFieldComponent = fs.readFileSync('components/ui/phone-field.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const phoneFieldRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "phone-field",
  "type": "registry:ui",
  "title": "Phone Field",
  "description": "A structured phone-number input for entering international telephone numbers with country context, formatting, and accessible validation support.",
  "dependencies": [
    "libphonenumber-js",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field",
    "halo-icon"
  ],
  "files": [
    {
      "path": "components/ui/phone-field.tsx",
      "content": phoneFieldComponent,
      "type": "registry:ui",
      "target": "components/ui/phone-field.tsx"
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

fs.writeFileSync('public/r/phone-field.json', JSON.stringify(phoneFieldRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/phone-field.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'phone-field');
  const entrySummary = {
    name: "phone-field",
    type: "registry:ui",
    title: "Phone Field",
    description: "A structured phone-number input for entering international telephone numbers with country context, formatting, and accessible validation support.",
    categories: ["forms-and-fields"],
    dependencies: [
      "libphonenumber-js",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field", "halo-icon"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with phone-field');
}

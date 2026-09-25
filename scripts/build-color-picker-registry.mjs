import fs from 'fs';

const colorPickerComponent = fs.readFileSync('components/ui/color-picker.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const colorPickerRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "color-picker",
  "type": "registry:ui",
  "title": "Color Picker",
  "description": "An accessible color-selection control combining visual color adjustment (2D Saturation/Brightness canvas and 1D Hue spectrum) with precise textual hexadecimal entry and zero optical material contamination.",
  "dependencies": [
    "@radix-ui/react-popover",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "field"
  ],
  "files": [
    {
      "path": "components/ui/color-picker.tsx",
      "content": colorPickerComponent,
      "type": "registry:ui",
      "target": "components/ui/color-picker.tsx"
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

fs.writeFileSync('public/r/color-picker.json', JSON.stringify(colorPickerRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/color-picker.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'color-picker');
  const entrySummary = {
    name: "color-picker",
    type: "registry:ui",
    title: "Color Picker",
    description: "An accessible color-selection control combining visual color adjustment (2D Saturation/Brightness canvas and 1D Hue spectrum) with precise textual hexadecimal entry and zero optical material contamination.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@radix-ui/react-popover",
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
  console.log('Successfully updated public/r/registry.json');
}

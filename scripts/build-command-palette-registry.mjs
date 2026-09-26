import fs from 'fs';

const commandPaletteComponent = fs.readFileSync('components/ui/command-palette.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const commandPaletteRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "command-palette",
  "type": "registry:ui",
  "title": "Command Palette",
  "description": "A keyboard-first searchable interface for quickly finding and activating application commands and destinations.",
  "dependencies": [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "cmdk",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/command-palette.tsx",
      "content": commandPaletteComponent,
      "type": "registry:ui",
      "target": "components/ui/command-palette.tsx"
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

fs.writeFileSync('public/r/command-palette.json', JSON.stringify(commandPaletteRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/command-palette.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'command-palette');
  const entrySummary = {
    name: "command-palette",
    type: "registry:ui",
    title: "Command Palette",
    description: "A keyboard-first searchable interface for quickly finding and activating application commands and destinations.",
    categories: ["navigation"],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...entrySummary };
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json with command-palette entry');
}

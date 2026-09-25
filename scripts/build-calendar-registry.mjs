import fs from 'fs';

const calendarComponent = fs.readFileSync('components/ui/calendar.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const calendarRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "calendar",
  "type": "registry:ui",
  "title": "Calendar",
  "description": "An accessible standalone calendar surface for navigating and selecting calendar dates.",
  "dependencies": [
    "react-day-picker",
    "date-fns",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/calendar.tsx",
      "content": calendarComponent,
      "type": "registry:ui",
      "target": "components/ui/calendar.tsx"
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

fs.writeFileSync('public/r/calendar.json', JSON.stringify(calendarRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/calendar.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'calendar');
  const entrySummary = {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description: "An accessible standalone calendar surface for navigating and selecting calendar dates.",
    categories: ["forms-and-fields"],
    dependencies: [
      "react-day-picker",
      "date-fns",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: []
  };

  if (existingIndex >= 0) {
    items[existingIndex] = entrySummary;
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json');
}

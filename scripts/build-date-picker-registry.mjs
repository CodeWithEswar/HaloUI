import fs from 'fs';

const datePickerComponent = fs.readFileSync('components/ui/date-picker.tsx', 'utf8');
const calendarComponent = fs.readFileSync('components/ui/calendar.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const datePickerRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "date-picker",
  "type": "registry:ui",
  "title": "Date Picker",
  "description": "An accessible calendar-backed control for selecting a single calendar date.",
  "dependencies": [
    "@radix-ui/react-popover",
    "react-day-picker",
    "date-fns",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "calendar",
    "field"
  ],
  "files": [
    {
      "path": "components/ui/date-picker.tsx",
      "content": datePickerComponent,
      "type": "registry:ui",
      "target": "components/ui/date-picker.tsx"
    },
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

fs.writeFileSync('public/r/date-picker.json', JSON.stringify(datePickerRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/date-picker.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'date-picker');
  const entrySummary = {
    name: "date-picker",
    type: "registry:ui",
    title: "Date Picker",
    description: "An accessible calendar-backed control for selecting a single calendar date.",
    categories: ["forms-and-fields"],
    dependencies: [
      "@radix-ui/react-popover",
      "react-day-picker",
      "date-fns",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["calendar", "field"]
  };

  if (existingIndex >= 0) {
    items[existingIndex] = entrySummary;
  } else {
    items.push(entrySummary);
  }

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log('Successfully updated public/r/registry.json');
}

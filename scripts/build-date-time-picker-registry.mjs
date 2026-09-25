import fs from 'fs';

const dateTimePickerComponent = fs.readFileSync('components/ui/date-time-picker.tsx', 'utf8');
const calendarComponent = fs.readFileSync('components/ui/calendar.tsx', 'utf8');
const timePickerComponent = fs.readFileSync('components/ui/time-picker.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const dateTimePickerRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "date-time-picker",
  "type": "registry:ui",
  "title": "Date Time Picker",
  "description": "An accessible control for selecting one calendar date and one local clock time as a combined date-time value.",
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
    "time-picker",
    "field"
  ],
  "files": [
    {
      "path": "components/ui/date-time-picker.tsx",
      "content": dateTimePickerComponent,
      "type": "registry:ui",
      "target": "components/ui/date-time-picker.tsx"
    },
    {
      "path": "components/ui/calendar.tsx",
      "content": calendarComponent,
      "type": "registry:ui",
      "target": "components/ui/calendar.tsx"
    },
    {
      "path": "components/ui/time-picker.tsx",
      "content": timePickerComponent,
      "type": "registry:ui",
      "target": "components/ui/time-picker.tsx"
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

fs.writeFileSync('public/r/date-time-picker.json', JSON.stringify(dateTimePickerRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/date-time-picker.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'date-time-picker');
  const entrySummary = {
    name: "date-time-picker",
    type: "registry:ui",
    title: "Date Time Picker",
    description: "An accessible control for selecting one calendar date and one local clock time as a combined date-time value.",
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
    registryDependencies: [
      "calendar",
      "time-picker",
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

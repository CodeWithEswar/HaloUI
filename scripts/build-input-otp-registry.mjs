import fs from 'fs';
import path from 'path';

const inputOtpComponent = fs.readFileSync('components/ui/input-otp.tsx', 'utf8');
const haloTokensCss = fs.readFileSync('styles/halo-tokens.css', 'utf8');

const inputOtpRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "input-otp",
  "type": "registry:ui",
  "title": "Input OTP",
  "description": "A segmented one-time-code input optimized for short verification codes, paste, mobile keyboards, and platform OTP autofill.",
  "dependencies": [
    "input-otp",
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
      "path": "components/ui/input-otp.tsx",
      "content": inputOtpComponent,
      "type": "registry:ui",
      "target": "components/ui/input-otp.tsx"
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

fs.writeFileSync('public/r/input-otp.json', JSON.stringify(inputOtpRegistryItem, null, 2), 'utf8');
console.log('Successfully generated public/r/input-otp.json');

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const items = registry.items || registry;
  const existingIndex = items.findIndex(item => item.name === 'input-otp');
  const entrySummary = {
    name: "input-otp",
    type: "registry:ui",
    title: "Input OTP",
    description: "A segmented one-time-code input optimized for short verification codes, paste, mobile keyboards, and platform OTP autofill.",
    categories: ["forms-and-fields"],
    dependencies: [
      "input-otp",
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
  console.log('Successfully updated public/r/registry.json with input-otp');
}


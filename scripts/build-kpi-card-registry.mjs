import fs from 'node:fs';
import path from 'node:path';

console.log("=== Building KPI Card Registry Definition ===");

const kpiCardComponent = fs.readFileSync('components/ui/kpi-card.tsx', 'utf-8');
const haloTokens = fs.readFileSync('styles/halo-tokens.css', 'utf-8');
const haloMaterial = fs.readFileSync('styles/halo-material.css', 'utf-8');

const kpiCardItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "kpi-card",
  "type": "registry:ui",
  "title": "KPI Card",
  "description": "Performance-oriented metric surface communicating a primary quantitative value, delta, decoupled trend sentiment, target/SLA baselines, and optional bounded progress.",
  "dependencies": [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  "registryDependencies": [
    "card"
  ],
  "files": [
    {
      "path": "components/ui/kpi-card.tsx",
      "target": "components/ui/kpi-card.tsx",
      "type": "registry:ui",
      "content": kpiCardComponent
    },
    {
      "path": "styles/halo-tokens.css",
      "target": "styles/halo-tokens.css",
      "type": "registry:ui",
      "content": haloTokens
    },
    {
      "path": "styles/halo-material.css",
      "target": "styles/halo-material.css",
      "type": "registry:ui",
      "content": haloMaterial
    }
  ]
};

// Write public/r/kpi-card.json
fs.writeFileSync('public/r/kpi-card.json', JSON.stringify(kpiCardItem, null, 2), 'utf-8');
console.log("✓ Created public/r/kpi-card.json");

// Update public/r/registry.json
const registryPath = 'public/r/registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

registry.items = registry.items.filter((item) => item.name !== 'kpi-card');
registry.items.push({
  name: "kpi-card",
  type: "registry:ui",
  title: "KPI Card",
  description: "Performance-oriented metric surface communicating a primary quantitative value, delta, decoupled trend sentiment, target/SLA baselines, and optional bounded progress.",
  dependencies: [
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: [
    "card"
  ],
  files: [
    {
      path: "components/ui/kpi-card.tsx",
      type: "registry:ui",
      target: "components/ui/kpi-card.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    },
    {
      path: "styles/halo-material.css",
      type: "registry:ui",
      target: "styles/halo-material.css"
    }
  ]
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log("✓ Updated public/r/registry.json with kpi-card");

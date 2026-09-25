import fs from "fs";

const selectSource = fs.readFileSync("components/ui/select.tsx", "utf8");
const haloIconSource = fs.readFileSync("components/icons/halo-icon.tsx", "utf8");
const haloTokensCss = fs.readFileSync("styles/halo-tokens.css", "utf8");

const selectRegistryItem = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "select",
  "type": "registry:ui",
  "title": "Select",
  "description": "An accessible custom option picker for selecting one value from a structured list of choices.",
  "dependencies": [
    "@base-ui/react",
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/select.tsx",
      "content": selectSource,
      "type": "registry:ui",
      "target": "components/ui/select.tsx"
    },
    {
      "path": "components/icons/halo-icon.tsx",
      "content": haloIconSource,
      "type": "registry:ui",
      "target": "components/icons/halo-icon.tsx"
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

fs.writeFileSync("public/r/select.json", JSON.stringify(selectRegistryItem, null, 2) + "\n", "utf8");
console.log("Successfully generated public/r/select.json");

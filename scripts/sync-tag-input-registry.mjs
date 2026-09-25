import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const tagInputComponentPath = path.join(rootDir, "components/ui/tag-input.tsx");
const haloTokensPath = path.join(rootDir, "styles/halo-tokens.css");
const registryJsonPath = path.join(rootDir, "public/r/registry.json");
const tagInputRegistryPath = path.join(rootDir, "public/r/tag-input.json");

const tagInputContent = fs.readFileSync(tagInputComponentPath, "utf8");
const haloTokensContent = fs.readFileSync(haloTokensPath, "utf8");

const registryItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "tag-input",
  type: "registry:ui",
  title: "Tag Input",
  description: "An accessible multi-token tag editor with two-stage deletion, delimiter and paste tokenization, duplicate prevention, and keyboard navigation.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@hugeicons/core-free-icons",
    "@hugeicons/react"
  ],
  registryDependencies: [
    "field",
    "halo-icon"
  ],
  files: [
    {
      path: "components/ui/tag-input.tsx",
      content: tagInputContent,
      type: "registry:ui",
      target: "components/ui/tag-input.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      content: haloTokensContent,
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    }
  ],
  categories: [
    "forms-and-fields"
  ],
  meta: {
    status: "preview",
    version: "1.0.0",
    category: "forms-and-fields",
    accessibility: "WCAG 2.1 AA",
    lastUpdated: "2026-09-25"
  }
};

fs.writeFileSync(tagInputRegistryPath, JSON.stringify(registryItem, null, 2), "utf8");
console.log("Wrote public/r/tag-input.json");

// Update public/r/registry.json
const registry = JSON.parse(fs.readFileSync(registryJsonPath, "utf8"));
const existingIndex = registry.items.findIndex(item => item.name === "tag-input");

const registrySummaryItem = {
  name: "tag-input",
  type: "registry:ui",
  title: "Tag Input",
  description: "An accessible multi-token tag editor with two-stage deletion, delimiter and paste tokenization, duplicate prevention, and keyboard navigation.",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@hugeicons/core-free-icons",
    "@hugeicons/react"
  ],
  registryDependencies: [
    "field",
    "halo-icon"
  ],
  files: [
    {
      path: "components/ui/tag-input.tsx",
      type: "registry:ui",
      target: "components/ui/tag-input.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    }
  ],
  categories: [
    "forms-and-fields"
  ],
  meta: {
    status: "preview",
    version: "1.0.0",
    category: "forms-and-fields",
    accessibility: "WCAG 2.1 AA",
    lastUpdated: "2026-09-25"
  }
};

if (existingIndex >= 0) {
  registry.items[existingIndex] = registrySummaryItem;
} else {
  registry.items.push(registrySummaryItem);
}

fs.writeFileSync(registryJsonPath, JSON.stringify(registry, null, 2), "utf8");
console.log("Updated public/r/registry.json with tag-input");

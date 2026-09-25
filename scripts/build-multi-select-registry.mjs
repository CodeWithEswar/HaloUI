import fs from "fs";

const multiSelectContent = fs.readFileSync("components/ui/multi-select.tsx", "utf8");
const haloIconContent = fs.readFileSync("components/icons/halo-icon.tsx", "utf8");
const haloTokensContent = fs.readFileSync("styles/halo-tokens.css", "utf8");

const item = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  name: "multi-select",
  type: "registry:ui",
  title: "Multi Select",
  description: "A searchable multi-value picker for selecting and managing multiple options as removable tokens.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: ["field"],
  files: [
    {
      path: "components/ui/multi-select.tsx",
      content: multiSelectContent,
      type: "registry:ui",
      target: "components/ui/multi-select.tsx"
    },
    {
      path: "components/icons/halo-icon.tsx",
      content: haloIconContent,
      type: "registry:ui",
      target: "components/icons/halo-icon.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      content: haloTokensContent,
      type: "registry:ui",
      target: "styles/halo-tokens.css"
    }
  ],
  categories: ["forms-and-fields"],
  meta: {
    status: "preview",
    version: "1.0.0",
    category: "forms-and-fields",
    accessibility: "WCAG 2.1 AA",
    lastUpdated: "2026-09-25"
  }
};

fs.writeFileSync("public/r/multi-select.json", JSON.stringify(item, null, 2) + "\n");
console.log("Created public/r/multi-select.json");

// Register in public/r/registry.json
const registryPath = "public/r/registry.json";
if (fs.existsSync(registryPath)) {
  const reg = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const existingIdx = reg.items.findIndex(i => i.name === "multi-select");
  const regEntry = {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files: item.files.map(f => ({ path: f.path, type: f.type, target: f.target })),
    categories: item.categories,
    meta: item.meta
  };
  if (existingIdx >= 0) {
    reg.items[existingIdx] = regEntry;
  } else {
    reg.items.push(regEntry);
  }
  fs.writeFileSync(registryPath, JSON.stringify(reg, null, 2) + "\n");
  console.log("Updated public/r/registry.json with multi-select");
}

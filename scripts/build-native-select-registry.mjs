import fs from "fs";

const selectCode = fs.readFileSync("components/ui/native-select.tsx", "utf8");
const tokensCode = fs.readFileSync("styles/halo-tokens.css", "utf8");
const haloIconCode = fs.readFileSync("components/icons/halo-icon.tsx", "utf8");

const selectJson = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  name: "native-select",
  type: "registry:ui",
  title: "Native Select",
  description: "A styled native select for simple, reliable single-value choices using the browser and operating system's built-in selection behavior.",
  dependencies: [
    "clsx",
    "tailwind-merge",
    "@hugeicons/react",
    "@hugeicons/core-free-icons"
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/native-select.tsx",
      content: selectCode,
      type: "registry:ui",
      target: "components/ui/native-select.tsx"
    },
    {
      path: "components/icons/halo-icon.tsx",
      content: haloIconCode,
      type: "registry:ui",
      target: "components/icons/halo-icon.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      content: tokensCode,
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

fs.writeFileSync("public/r/native-select.json", JSON.stringify(selectJson, null, 2), "utf8");
console.log("✓ Created public/r/native-select.json");

// Register in registry.json
const registryJson = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
if (!registryJson.items.some(i => i.name === "native-select")) {
  registryJson.items.push({
    name: "native-select",
    type: "registry:ui",
    title: "Native Select",
    description: "A styled native select for simple, reliable single-value choices using the browser and operating system's built-in selection behavior.",
    dependencies: ["clsx", "tailwind-merge", "@hugeicons/react", "@hugeicons/core-free-icons"],
    registryDependencies: [],
    files: [
      { path: "components/ui/native-select.tsx", type: "registry:ui", target: "components/ui/native-select.tsx" },
      { path: "components/icons/halo-icon.tsx", type: "registry:ui", target: "components/icons/halo-icon.tsx" },
      { path: "styles/halo-tokens.css", type: "registry:ui", target: "styles/halo-tokens.css" }
    ],
    categories: ["forms-and-fields"],
    meta: {
      status: "preview",
      version: "1.0.0",
      category: "forms-and-fields",
      accessibility: "WCAG 2.1 AA",
      lastUpdated: "2026-09-25"
    }
  });
  fs.writeFileSync("public/r/registry.json", JSON.stringify(registryJson, null, 2), "utf8");
  console.log("✓ Added native-select to public/r/registry.json");
} else {
  console.log("native-select already in registry.json");
}

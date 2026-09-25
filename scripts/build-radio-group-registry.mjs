import fs from "fs";

const radioGroupContent = fs.readFileSync("components/ui/radio-group.tsx", "utf8");
const haloIconContent = fs.readFileSync("components/icons/halo-icon.tsx", "utf8");
const haloTokensContent = fs.readFileSync("styles/halo-tokens.css", "utf8");

const item = {
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  name: "radio-group",
  type: "registry:ui",
  title: "Radio Group",
  description: "An accessible mutually exclusive option set for selecting one value from a related group.",
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
      path: "components/ui/radio-group.tsx",
      content: radioGroupContent,
      type: "registry:ui",
      target: "components/ui/radio-group.tsx"
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

fs.writeFileSync("public/r/radio-group.json", JSON.stringify(item, null, 2) + "\n");
console.log("Created public/r/radio-group.json");

// Register in public/r/registry.json
const registryPath = "public/r/registry.json";
if (fs.existsSync(registryPath)) {
  const reg = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const existingIdx = reg.items.findIndex(i => i.name === "radio-group");
  const regEntry = {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description: "An accessible mutually exclusive option set for selecting one value from a related group.",
    dependencies: [
      "@base-ui/react",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field"]
  };

  if (existingIdx >= 0) {
    reg.items[existingIdx] = regEntry;
  } else {
    reg.items.push(regEntry);
  }
  fs.writeFileSync(registryPath, JSON.stringify(reg, null, 2) + "\n");
  console.log("Updated public/r/registry.json with radio-group");
}

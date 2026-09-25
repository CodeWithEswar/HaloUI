import fs from "node:fs";

const switchContent = fs.readFileSync("components/ui/switch.tsx", "utf8");
const tokensContent = fs.readFileSync("styles/halo-tokens.css", "utf8");

const registryItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "switch",
  type: "registry:ui",
  title: "Switch",
  description: "An accessible binary control for immediately turning a setting on or off.",
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: ["field"],
  files: [
    {
      path: "components/ui/switch.tsx",
      content: switchContent,
      type: "registry:ui",
      target: "components/ui/switch.tsx"
    },
    {
      path: "styles/halo-tokens.css",
      content: tokensContent,
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

fs.writeFileSync("public/r/switch.json", JSON.stringify(registryItem, null, 2));

const registry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
if (!registry.items.some(i => i.name === "switch")) {
  registry.items.push({
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "An accessible binary control for immediately turning a setting on or off.",
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field"],
    files: [
      {
        path: "components/ui/switch.tsx",
        type: "registry:ui",
        target: "components/ui/switch.tsx"
      },
      {
        path: "styles/halo-tokens.css",
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
  });
  fs.writeFileSync("public/r/registry.json", JSON.stringify(registry, null, 2));
}

console.log("Switch registry files generated successfully.");

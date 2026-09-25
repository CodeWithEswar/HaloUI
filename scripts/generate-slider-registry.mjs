import fs from "node:fs";

const sliderContent = fs.readFileSync("components/ui/slider.tsx", "utf8");
const tokensContent = fs.readFileSync("styles/halo-tokens.css", "utf8");

const registryItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "slider",
  type: "registry:ui",
  title: "Slider",
  description: "An accessible single-value range control for choosing a numeric value within defined minimum and maximum bounds.",
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  registryDependencies: ["field"],
  files: [
    {
      path: "components/ui/slider.tsx",
      content: sliderContent,
      type: "registry:ui",
      target: "components/ui/slider.tsx"
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

fs.writeFileSync("public/r/slider.json", JSON.stringify(registryItem, null, 2));

const registry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf8"));
if (!registry.items.some(i => i.name === "slider")) {
  registry.items.push({
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description: "An accessible single-value range control for choosing a numeric value within defined minimum and maximum bounds.",
    dependencies: [
      "@base-ui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["field"],
    files: [
      {
        path: "components/ui/slider.tsx",
        type: "registry:ui",
        target: "components/ui/slider.tsx"
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

console.log("Slider registry generated successfully.");

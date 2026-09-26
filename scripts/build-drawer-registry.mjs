import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(file, "utf8");
const cssFiles = ["styles/halo-tokens.css", "styles/halo-material.css"];
const fileEntry = (file, source = file) => ({
  path: file,
  target: file,
  type: "registry:ui",
  content: read(source),
});

const drawerItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "drawer",
  type: "registry:ui",
  title: "Drawer",
  description:
    "A touch-friendly contextual surface powered by Base UI Drawer, engineered with velocity swipe dismissal, multi-step snap points, mobile safe area padding, and 10-layer Liquid Glass optical physics.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: ["button"],
  files: [
    fileEntry("components/ui/drawer.tsx"),
    ...cssFiles.map((f) => fileEntry(f)),
  ],
  meta: {
    status: "production",
    version: "2.0.0",
    category: "overlays-and-menus",
    lastUpdated: "2026-09-26",
  },
};

fs.writeFileSync(
  "public/r/drawer.json",
  JSON.stringify(drawerItem, null, 2) + "\n"
);
console.log("✓ Wrote public/r/drawer.json");

// Update public/r/registry.json
const catalogPath = "public/r/registry.json";
if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(read(catalogPath));
  const { files, ...summary } = drawerItem;
  const idx = catalog.items.findIndex((item) => item.name === "drawer");
  if (idx >= 0) {
    catalog.items[idx] = { ...catalog.items[idx], ...summary };
  } else {
    catalog.items.push(summary);
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
  console.log("✓ Updated public/r/registry.json with drawer");
}

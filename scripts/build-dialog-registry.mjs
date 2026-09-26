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

const dialogItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "dialog",
  type: "registry:ui",
  title: "Dialog",
  description:
    "An accessible modal task surface engineered with HaloUI liquid glass physical optics, calibrated optical scrim diffusion, and strict focus trapping.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: ["button"],
  files: [
    fileEntry("components/ui/dialog.tsx"),
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
  "public/r/dialog.json",
  JSON.stringify(dialogItem, null, 2) + "\n"
);
console.log("✓ Wrote public/r/dialog.json");

// Update public/r/registry.json
const catalogPath = "public/r/registry.json";
if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(read(catalogPath));
  const { files, ...summary } = dialogItem;
  const idx = catalog.items.findIndex((item) => item.name === "dialog");
  if (idx >= 0) {
    catalog.items[idx] = { ...catalog.items[idx], ...summary };
  } else {
    catalog.items.push(summary);
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
  console.log("✓ Updated public/r/registry.json with dialog");
}

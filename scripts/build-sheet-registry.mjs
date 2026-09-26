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

const sheetItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "sheet",
  type: "registry:ui",
  title: "Sheet",
  description:
    "An edge-anchored overlay panel engineered with HaloUI liquid glass physical optics, directional slide kinematics, concentric meniscus border curvature, and calibrated optical scrim diffusion.",
  dependencies: [
    "@base-ui/react",
    "@hugeicons/core-free-icons",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: ["button"],
  files: [
    fileEntry("components/ui/sheet.tsx"),
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
  "public/r/sheet.json",
  JSON.stringify(sheetItem, null, 2) + "\n"
);
console.log("✓ Wrote public/r/sheet.json");

// Update public/r/registry.json
const catalogPath = "public/r/registry.json";
if (fs.existsSync(catalogPath)) {
  const catalog = JSON.parse(read(catalogPath));
  const { files, ...summary } = sheetItem;
  const idx = catalog.items.findIndex((item) => item.name === "sheet");
  if (idx >= 0) {
    catalog.items[idx] = { ...catalog.items[idx], ...summary };
  } else {
    catalog.items.push(summary);
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
  console.log("✓ Updated public/r/registry.json with sheet");
}

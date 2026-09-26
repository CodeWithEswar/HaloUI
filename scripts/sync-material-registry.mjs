import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(file, "utf8");
const cssFiles = ["styles/halo-tokens.css", "styles/halo-material.css"];
const fileEntry = (file, source = file) => ({ path: file, target: file, type: "registry:ui", content: read(source) });
const modified = new Set(["button", "icon-button", "select", "segmented-control", "switch", "slider", "dock", "bottom-navigation", "command-palette"]);
const foundations = ["halo-surface", "halo-edge", "halo-highlight", "halo-refraction-layer", "halo-noise", "halo-glow", "halo-portal-surface"];

// Dock's existing tooltip dependency was previously absent from the local catalog.
fs.writeFileSync("public/r/tooltip.json", JSON.stringify({
  $schema: "https://ui.shadcn.com/schema/registry-item.json", name: "tooltip", type: "registry:ui",
  title: "Tooltip", description: "Accessible tooltip used by HaloUI floating controls.",
  dependencies: ["@base-ui/react", "clsx", "tailwind-merge"], registryDependencies: [],
  files: [fileEntry("components/ui/tooltip.tsx")],
}, null, 2) + "\n");

for (const name of foundations) {
  const dest = `public/r/${name}.json`;
  const item = fs.existsSync(dest) ? JSON.parse(read(dest)) : {
    $schema: "https://ui.shadcn.com/schema/registry-item.json", name, type: "registry:ui",
    title: name.split("-").map(s => s[0].toUpperCase() + s.slice(1)).join(" "),
    description: "Source-owned HaloUI optical foundation.",
  };
  item.dependencies = ["@radix-ui/react-slot", "clsx", "tailwind-merge"];
  item.registryDependencies = name === "halo-portal-surface" ? ["halo-surface", "halo-glow"] : [];
  item.files = [fileEntry(`components/ui/${name}.tsx`, `components/haloui/foundations/${name}.tsx`), ...cssFiles.map(f => fileEntry(f))];
  item.meta = { ...item.meta, status: "preview", version: "2.0.0", category: "foundations", lastUpdated: "2026-09-26" };
  fs.writeFileSync(dest, JSON.stringify(item, null, 2) + "\n");
}

let count = 0;
for (const filename of fs.readdirSync("public/r")) {
  if (!filename.endsWith(".json") || filename === "registry.json") continue;
  const dest = path.join("public/r", filename);
  const item = JSON.parse(read(dest));
  if (!item.files?.some(f => f.path === cssFiles[0])) continue;
  for (const css of cssFiles) {
    const existing = item.files.find(f => f.path === css);
    if (existing) existing.content = read(css);
    else item.files.push(fileEntry(css));
  }
  if (modified.has(item.name)) {
    for (const file of item.files) {
      if (file.path === `components/ui/${item.name}.tsx`) file.content = read(file.path);
    }
  }
  fs.writeFileSync(dest, JSON.stringify(item, null, 2) + "\n");
  count++;
}
const catalogPath = "public/r/registry.json";
const catalog = JSON.parse(read(catalogPath));
for (const name of foundations) {
  const item = JSON.parse(read(`public/r/${name}.json`));
  const { files, ...summary } = item;
  const i = catalog.items.findIndex(entry => entry.name === name);
  if (i < 0) catalog.items.push(summary);
  else catalog.items[i] = { ...catalog.items[i], ...summary };
}
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
console.log(`Synchronized material CSS in ${count} items and ${foundations.length} foundation sources.`);

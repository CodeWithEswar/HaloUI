import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== Verifying HaloUI Sidebar Rail (07) Implementation ===\n");

// 1. Verify component file exists
const componentPath = path.resolve("components/ui/sidebar-rail.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/sidebar-rail.tsx must exist");
const componentCode = fs.readFileSync(componentPath, "utf-8");

// 2. Hugeicons only, zero Lucide
assert.ok(!componentCode.includes("lucide-react"), "Must NOT import lucide-react");
assert.ok(componentCode.includes("@hugeicons/core-free-icons"), "Must import @hugeicons/core-free-icons");
assert.ok(componentCode.includes("HaloIcon"), "Must use HaloIcon");

// 3. Verify compound exports
const expectedExports = [
  "SidebarRail",
  "SidebarRailHeader",
  "SidebarRailContent",
  "SidebarRailFooter",
  "SidebarRailLink",
  "SidebarRailAction",
  "SidebarRailExpand",
];
for (const exp of expectedExports) {
  assert.ok(componentCode.includes(exp), `Must export ${exp}`);
}
console.log("✓ Component exports and Hugeicon bindings verified");

// 4. Registry files
const registryFilePath = path.resolve("public/r/sidebar-rail.json");
assert.ok(fs.existsSync(registryFilePath), "public/r/sidebar-rail.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFilePath, "utf-8"));
assert.equal(registryJson.name, "sidebar-rail");
assert.equal(registryJson.type, "registry:ui");
assert.ok(registryJson.files.some((f) => f.path === "components/ui/sidebar-rail.tsx"), "Must include sidebar-rail.tsx");
assert.ok(registryJson.registryDependencies.includes("sidebar"), "Must declare registry dependency on sidebar");
assert.ok(registryJson.dependencies.includes("@hugeicons/core-free-icons"), "Must include @hugeicons/core-free-icons");
console.log("✓ Registry JSON verified");

// 5. registry.json entry
const mainRegistryPath = path.resolve("public/r/registry.json");
const mainRegistryJson = JSON.parse(fs.readFileSync(mainRegistryPath, "utf-8"));
assert.ok(
  mainRegistryJson.items.some((item) => item.name === "sidebar-rail"),
  "public/r/registry.json must contain sidebar-rail entry"
);
console.log("✓ Main registry catalog verified");

// 6. Docs page files exist
assert.ok(fs.existsSync("app/components/sidebar-rail/page.tsx"), "Docs page must exist");
assert.ok(fs.existsSync("app/components/sidebar-rail/layout.tsx"), "Docs layout must exist");
assert.ok(fs.existsSync("app/components/sidebar-rail/sidebar-rail-preview-stage.tsx"), "Preview stage must exist");
assert.ok(fs.existsSync("app/components/sidebar-rail/sidebar-rail-demonstrations.tsx"), "Demonstrations must exist");

// 7. Verify no ASCII diagrams in documentation
const docsCode = fs.readFileSync("app/components/sidebar-rail/page.tsx", "utf-8");
assert.ok(!docsCode.includes("language=\"text\""), "Must not use text codeblocks for diagrams");
assert.ok(!docsCode.includes("├──"), "Must not contain ASCII tree diagrams");
assert.ok(!docsCode.includes("└──"), "Must not contain ASCII tree diagrams");
console.log("✓ Docs page and preview stage verified without ASCII diagrams");

console.log("\n=== ALL SIDEBAR RAIL VERIFICATIONS PASSED ===");

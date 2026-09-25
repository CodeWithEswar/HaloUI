import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== Verifying HaloUI Navigation Menu (04) Implementation ===\n");

// 1. Verify component file exists
const componentPath = path.resolve("components/ui/navigation-menu.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/navigation-menu.tsx must exist");
const componentCode = fs.readFileSync(componentPath, "utf-8");

// 2. Hugeicons only, zero Lucide
assert.ok(!componentCode.includes("lucide-react"), "Must NOT import lucide-react");
assert.ok(componentCode.includes("@hugeicons/core-free-icons"), "Must import @hugeicons/core-free-icons");
assert.ok(componentCode.includes("ChevronDownIcon"), "Must use ChevronDownIcon");
assert.ok(componentCode.includes("HaloIcon"), "Must use HaloIcon");

// 3. Liquid optical floating surface
assert.ok(componentCode.includes("halo-liquid-glass-surface"), "Must use halo-liquid-glass-surface for popup/viewport");

// 4. Verify compound exports
const expectedExports = [
  "NavigationMenu",
  "NavigationMenuList",
  "NavigationMenuItem",
  "NavigationMenuTrigger",
  "NavigationMenuContent",
  "NavigationMenuLink",
  "NavigationMenuPositioner",
  "NavigationMenuViewport",
  "navigationMenuTriggerStyle",
];
for (const exp of expectedExports) {
  assert.ok(componentCode.includes(exp), `Must export ${exp}`);
}
console.log("✓ Component exports and optical styling verified");

// 5. Registry files
const registryFilePath = path.resolve("public/r/navigation-menu.json");
assert.ok(fs.existsSync(registryFilePath), "public/r/navigation-menu.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFilePath, "utf-8"));
assert.equal(registryJson.name, "navigation-menu");
assert.equal(registryJson.type, "registry:ui");
assert.ok(registryJson.files.some((f) => f.path === "components/ui/navigation-menu.tsx"), "Must include navigation-menu.tsx");
assert.ok(registryJson.dependencies.includes("@base-ui/react"), "Must include @base-ui/react dependency");
assert.ok(registryJson.dependencies.includes("@hugeicons/core-free-icons"), "Must include @hugeicons/core-free-icons");
console.log("✓ Registry JSON verified");

// 6. registry.json entry
const mainRegistryPath = path.resolve("public/r/registry.json");
const mainRegistryJson = JSON.parse(fs.readFileSync(mainRegistryPath, "utf-8"));
assert.ok(
  mainRegistryJson.items.some((item) => item.name === "navigation-menu"),
  "public/r/registry.json must contain navigation-menu"
);
console.log("✓ Registered in public/r/registry.json");

// 7. Docs files
const docsFiles = [
  "app/components/navigation-menu/layout.tsx",
  "app/components/navigation-menu/page.tsx",
  "app/components/navigation-menu/navigation-menu-preview-stage.tsx",
  "app/components/navigation-menu/navigation-menu-demonstrations.tsx",
];
for (const file of docsFiles) {
  const filePath = path.resolve(file);
  assert.ok(fs.existsSync(filePath), `${file} must exist`);
  const content = fs.readFileSync(filePath, "utf-8");
  // Check for forbidden ASCII diagrams
  assert.ok(!content.includes("├──"), `${file} must not contain ASCII tree diagrams`);
  assert.ok(!content.includes("└──"), `${file} must not contain ASCII tree diagrams`);
  assert.ok(!content.includes("language=\"text\""), `${file} must not use text codeblocks for diagrams`);
}
console.log("✓ Docs shell files and non-ASCII presentation verified");

// 8. Canonical navigation.ts
const navConfigPath = path.resolve("lib/docs/navigation.ts");
const navConfig = fs.readFileSync(navConfigPath, "utf-8");
assert.ok(navConfig.includes("/components/navigation-menu"), "lib/docs/navigation.ts must include Navigation Menu");
console.log("✓ Canonical navigation.ts updated");

console.log("\n========================================================");
console.log("🎉 ALL NAVIGATION MENU VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

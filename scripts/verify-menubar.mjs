import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== Verifying HaloUI Menubar (05) Implementation ===\n");

// 1. Verify component file exists
const componentPath = path.resolve("components/ui/menubar.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/menubar.tsx must exist");
const componentCode = fs.readFileSync(componentPath, "utf-8");

// 2. Hugeicons only, zero Lucide
assert.ok(!componentCode.includes("lucide-react"), "Must NOT import lucide-react");
assert.ok(componentCode.includes("@hugeicons/core-free-icons"), "Must import @hugeicons/core-free-icons");
assert.ok(componentCode.includes("HaloIcon"), "Must use HaloIcon");
assert.ok(componentCode.includes("Tick01Icon"), "Must use Tick01Icon for checkbox indicator");

// 3. Verify compound exports
const expectedExports = [
  "Menubar",
  "MenubarMenu",
  "MenubarTrigger",
  "MenubarContent",
  "MenubarItem",
  "MenubarCheckboxItem",
  "MenubarRadioGroup",
  "MenubarRadioItem",
  "MenubarLabel",
  "MenubarSeparator",
  "MenubarShortcut",
  "MenubarSub",
  "MenubarSubTrigger",
  "MenubarSubContent",
];
for (const exp of expectedExports) {
  assert.ok(componentCode.includes(exp), `Must export ${exp}`);
}
console.log("✓ Component exports and Hugeicon bindings verified");

// 4. Registry files
const registryFilePath = path.resolve("public/r/menubar.json");
assert.ok(fs.existsSync(registryFilePath), "public/r/menubar.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFilePath, "utf-8"));
assert.equal(registryJson.name, "menubar");
assert.equal(registryJson.type, "registry:ui");
assert.ok(registryJson.files.some((f) => f.path === "components/ui/menubar.tsx"), "Must include menubar.tsx");
assert.ok(registryJson.dependencies.includes("@base-ui/react"), "Must include @base-ui/react dependency");
assert.ok(registryJson.dependencies.includes("@hugeicons/core-free-icons"), "Must include @hugeicons/core-free-icons");
console.log("✓ Registry JSON verified");

// 5. registry.json entry
const mainRegistryPath = path.resolve("public/r/registry.json");
const mainRegistryJson = JSON.parse(fs.readFileSync(mainRegistryPath, "utf-8"));
assert.ok(
  mainRegistryJson.items.some((item) => item.name === "menubar"),
  "public/r/registry.json must contain menubar"
);
console.log("✓ Registered in public/r/registry.json");

// 6. Docs files
const docsFiles = [
  "app/components/menubar/layout.tsx",
  "app/components/menubar/page.tsx",
  "app/components/menubar/menubar-preview-stage.tsx",
  "app/components/menubar/menubar-demonstrations.tsx",
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

// 7. Verify dev server endpoint serves menubar.json
const res = await fetch("http://localhost:3000/r/menubar.json");
assert.equal(res.status, 200, "http://localhost:3000/r/menubar.json must return 200 OK");
const servedJson = await res.json();
assert.equal(servedJson.name, "menubar");
console.log("✓ Served live from http://localhost:3000/r/menubar.json");

console.log("\n========================================================");
console.log("🎉 ALL MENUBAR VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

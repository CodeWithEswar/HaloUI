import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== Verifying HaloUI Sidebar (06) Implementation ===\n");

// 1. Verify component file exists
const componentPath = path.resolve("components/ui/sidebar.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/sidebar.tsx must exist");
const componentCode = fs.readFileSync(componentPath, "utf-8");

// 2. Hugeicons only, zero Lucide
assert.ok(!componentCode.includes("lucide-react"), "Must NOT import lucide-react");
assert.ok(componentCode.includes("@hugeicons/core-free-icons"), "Must import @hugeicons/core-free-icons");
assert.ok(componentCode.includes("HaloIcon"), "Must use HaloIcon");
assert.ok(componentCode.includes("SidebarLeftIcon"), "Must use SidebarLeftIcon for trigger");

// 3. Verify compound exports
const expectedExports = [
  "SidebarProvider",
  "Sidebar",
  "SidebarHeader",
  "SidebarContent",
  "SidebarFooter",
  "SidebarGroup",
  "SidebarGroupLabel",
  "SidebarGroupContent",
  "SidebarMenu",
  "SidebarMenuItem",
  "SidebarMenuButton",
  "SidebarMenuSub",
  "SidebarMenuSubItem",
  "SidebarMenuSubButton",
  "SidebarSeparator",
  "SidebarTrigger",
  "SidebarRail",
  "SidebarInset",
  "useSidebar",
];
for (const exp of expectedExports) {
  assert.ok(componentCode.includes(exp), `Must export ${exp}`);
}
console.log("✓ Component exports and Hugeicon bindings verified");

// 4. Registry files
const registryFilePath = path.resolve("public/r/sidebar.json");
assert.ok(fs.existsSync(registryFilePath), "public/r/sidebar.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFilePath, "utf-8"));
assert.equal(registryJson.name, "sidebar");
assert.equal(registryJson.type, "registry:ui");
assert.ok(registryJson.files.some((f) => f.path === "components/ui/sidebar.tsx"), "Must include sidebar.tsx");
assert.ok(registryJson.dependencies.includes("@base-ui/react"), "Must include @base-ui/react dependency");
assert.ok(registryJson.dependencies.includes("@hugeicons/core-free-icons"), "Must include @hugeicons/core-free-icons");
console.log("✓ Registry JSON verified");

// 5. registry.json entry
const mainRegistryPath = path.resolve("public/r/registry.json");
const mainRegistryJson = JSON.parse(fs.readFileSync(mainRegistryPath, "utf-8"));
assert.ok(
  mainRegistryJson.items.some((item) => item.name === "sidebar"),
  "public/r/registry.json must contain sidebar"
);
console.log("✓ Registered in public/r/registry.json");

// 6. Docs files
const docsFiles = [
  "app/components/sidebar/layout.tsx",
  "app/components/sidebar/page.tsx",
  "app/components/sidebar/sidebar-preview-stage.tsx",
  "app/components/sidebar/sidebar-demonstrations.tsx",
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

// 7. Verify dev server endpoint serves sidebar.json
const res = await fetch("http://localhost:3000/r/sidebar.json");
assert.equal(res.status, 200, "http://localhost:3000/r/sidebar.json must return 200 OK");
const servedJson = await res.json();
assert.equal(servedJson.name, "sidebar");
console.log("✓ Served live from http://localhost:3000/r/sidebar.json");

console.log("\n========================================================");
console.log("🎉 ALL SIDEBAR VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

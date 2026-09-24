import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 12: Action Bar Quality Gate & Verification ===\n");

// 1. Verify component source exists
const componentPath = path.resolve("components/ui/action-bar.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/action-bar.tsx must exist");
const componentContent = fs.readFileSync(componentPath, "utf-8");

// 2. Verify exports and TypeScript types
assert.ok(componentContent.includes("export const ActionBar ="), "ActionBar must be exported");
assert.ok(componentContent.includes("export const ActionBarGroup ="), "ActionBarGroup must be exported");
assert.ok(componentContent.includes("export const ActionBarLabel ="), "ActionBarLabel must be exported");
assert.ok(componentContent.includes("export const ActionBarSeparator ="), "ActionBarSeparator must be exported");
assert.ok(componentContent.includes("export const actionBarVariants ="), "actionBarVariants must be exported");
assert.ok(componentContent.includes("export type ActionBarDensity ="), "ActionBarDensity type must be exported");
assert.ok(componentContent.includes("export interface ActionBarProps"), "ActionBarProps interface must be exported");
console.log("✓ Core ActionBar exports and TypeScript types verified");

// 3. Verify data-slots and toolbar semantics
assert.ok(componentContent.includes('data-slot="action-bar"'), "Must have data-slot='action-bar'");
assert.ok(componentContent.includes('data-slot="action-bar-group"'), "Must have data-slot='action-bar-group'");
assert.ok(componentContent.includes('data-slot="action-bar-label"'), "Must have data-slot='action-bar-label'");
assert.ok(componentContent.includes('data-slot="action-bar-separator"'), "Must have data-slot='action-bar-separator'");
assert.ok(componentContent.includes('role="toolbar"'), "Container must have role='toolbar'");
console.log("✓ Semantic data-slots and toolbar role verified");

// 4. Critical Architecture: Focus rings never clipped (overflow-visible)
assert.ok(componentContent.includes("overflow-visible"), "Must use overflow-visible to prevent clipping child focus rings");
console.log("✓ Unclipped focus ring architecture (overflow-visible) verified");

// 5. Static registry file in public/r/action-bar.json
const staticRegistryPath = path.resolve("public/r/action-bar.json");
assert.ok(fs.existsSync(staticRegistryPath), "public/r/action-bar.json must exist");
const staticRegistryJson = JSON.parse(fs.readFileSync(staticRegistryPath, "utf-8"));
assert.equal(staticRegistryJson.name, "action-bar");
assert.equal(staticRegistryJson.title, "Action Bar");
assert.equal(staticRegistryJson.meta.category, "actions");
assert.equal(staticRegistryJson.meta.status, "preview");
assert.ok(staticRegistryJson.registryDependencies.includes("button"), "Registry must declare button dependency");
assert.ok(staticRegistryJson.registryDependencies.includes("icon-button"), "Registry must declare icon-button dependency");
assert.ok(staticRegistryJson.registryDependencies.includes("button-group"), "Registry must declare button-group dependency");
console.log("✓ Static registry public/r/action-bar.json verified");

// 6. Central registry catalog (public/r/registry.json)
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const foundInRegistry = registryJson.items.some((item) => item.name === "action-bar");
assert.ok(foundInRegistry, "action-bar must be indexed in public/r/registry.json items");
console.log("✓ Central registry catalog public/r/registry.json verified");

// 7. Dynamic registry endpoint (app/r/[name]/route.ts)
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "action-bar"'), "app/r/[name]/route.ts must handle cleanName === 'action-bar'");
console.log("✓ Dynamic registry route handler verified");

// 8. Docs navigation entry (lib/docs/navigation.ts)
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('title: "Action Bar"'), "lib/docs/navigation.ts must contain Action Bar title");
assert.ok(navContent.includes('href: "/components/action-bar"'), "lib/docs/navigation.ts must route to /components/action-bar");
console.log("✓ Documentation navigation tree verified");

// 9. Documentation Page & Preview Stage existence
const pagePath = path.resolve("app/components/action-bar/page.tsx");
const stagePath = path.resolve("app/components/action-bar/action-bar-preview-stage.tsx");
const demosPath = path.resolve("app/components/action-bar/action-bar-demonstrations.tsx");
assert.ok(fs.existsSync(pagePath), "app/components/action-bar/page.tsx must exist");
assert.ok(fs.existsSync(stagePath), "app/components/action-bar/action-bar-preview-stage.tsx must exist");
assert.ok(fs.existsSync(demosPath), "app/components/action-bar/action-bar-demonstrations.tsx must exist");
console.log("✓ Documentation page, preview stage, and demonstrations verified");

console.log("\n>>> ALL ACTION BAR QUALITY GATES PASSED SUCCESSFULLY! <<<\n");

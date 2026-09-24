import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 11: Segmented Control Quality Gate & Verification ===\n");

// 1. Verify component source exists
const componentPath = path.resolve("components/ui/segmented-control.tsx");
assert.ok(fs.existsSync(componentPath), "components/ui/segmented-control.tsx must exist");
const componentContent = fs.readFileSync(componentPath, "utf-8");

// 2. Verify exports and TypeScript types
assert.ok(componentContent.includes("export const SegmentedControl ="), "SegmentedControl must be exported");
assert.ok(componentContent.includes("export const SegmentedControlItem ="), "SegmentedControlItem must be exported");
assert.ok(componentContent.includes("export const segmentedControlVariants ="), "segmentedControlVariants must be exported");
assert.ok(componentContent.includes("export const segmentedControlItemVariants ="), "segmentedControlItemVariants must be exported");
assert.ok(componentContent.includes("export type SegmentedControlSize ="), "SegmentedControlSize type must be exported");
assert.ok(componentContent.includes("export interface SegmentedControlProps"), "SegmentedControlProps interface must be exported");
assert.ok(componentContent.includes("export interface SegmentedControlItemProps"), "SegmentedControlItemProps interface must be exported");
console.log("✓ Core SegmentedControl exports and TypeScript types verified");

// 3. Verify Base UI RadioGroup and Radio primitive integration
assert.ok(componentContent.includes('from "@base-ui/react/radio-group"'), "Must import RadioGroup from @base-ui/react/radio-group");
assert.ok(componentContent.includes('from "@base-ui/react/radio"'), "Must import Radio from @base-ui/react/radio");
assert.ok(componentContent.includes('data-slot="segmented-control"'), "Must have data-slot='segmented-control'");
assert.ok(componentContent.includes('data-slot="segmented-control-item"'), "Must have data-slot='segmented-control-item'");
console.log("✓ Base UI RadioGroup/Radio primitive integration and data-slot verified");

// 4. Critical Architecture: Single Selection, Mutually Exclusive, Non-Empty Contract
assert.ok(!componentContent.includes('type="multiple"'), "Must NOT expose type='multiple' (Segmented Control is strictly single-selection)");
assert.ok(componentContent.includes("RadioGroupPrimitive"), "Uses RadioGroup for strict mutual exclusivity");
console.log("✓ Single selection mutual exclusivity contract verified");

// 5. Independent Focus Ring & Material Substrate
assert.ok(componentContent.includes("halo-focus-ring"), "Must implement halo-focus-ring token");
assert.ok(componentContent.includes("focus-visible:ring-"), "Focus ring must be independently active on keyboard focus");
console.log("✓ Independent double-contrast focus ring verified");

// 6. Static registry file in public/r/segmented-control.json
const staticRegistryPath = path.resolve("public/r/segmented-control.json");
assert.ok(fs.existsSync(staticRegistryPath), "public/r/segmented-control.json must exist");
const staticRegistryJson = JSON.parse(fs.readFileSync(staticRegistryPath, "utf-8"));
assert.equal(staticRegistryJson.name, "segmented-control");
assert.equal(staticRegistryJson.title, "Segmented Control");
assert.equal(staticRegistryJson.meta.category, "actions");
assert.equal(staticRegistryJson.meta.status, "preview");
assert.ok(staticRegistryJson.dependencies.includes("@base-ui/react"), "Registry must declare @base-ui/react dependency");
assert.ok(staticRegistryJson.registryDependencies.includes("halo-icon"), "Registry must declare halo-icon dependency");
console.log("✓ Static registry public/r/segmented-control.json verified");

// 7. Central registry index (public/r/registry.json)
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const foundInRegistry = registryJson.items.some((item) => item.name === "segmented-control");
assert.ok(foundInRegistry, "segmented-control must be indexed in public/r/registry.json items");
console.log("✓ Central registry catalog public/r/registry.json verified");

// 8. Dynamic registry endpoint (app/r/[name]/route.ts)
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "segmented-control"'), "app/r/[name]/route.ts must handle cleanName === 'segmented-control'");
console.log("✓ Dynamic registry route handler verified");

// 9. Docs navigation entry (lib/docs/navigation.ts)
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('title: "Segmented Control"'), "lib/docs/navigation.ts must contain Segmented Control title");
assert.ok(navContent.includes('href: "/components/segmented-control"'), "lib/docs/navigation.ts must route to /components/segmented-control");
console.log("✓ Documentation navigation tree verified");

// 10. Documentation Page & Preview Stage existence
const pagePath = path.resolve("app/components/segmented-control/page.tsx");
const stagePath = path.resolve("app/components/segmented-control/segmented-control-preview-stage.tsx");
const demosPath = path.resolve("app/components/segmented-control/segmented-control-demonstrations.tsx");
assert.ok(fs.existsSync(pagePath), "app/components/segmented-control/page.tsx must exist");
assert.ok(fs.existsSync(stagePath), "app/components/segmented-control/segmented-control-preview-stage.tsx must exist");
assert.ok(fs.existsSync(demosPath), "app/components/segmented-control/segmented-control-demonstrations.tsx must exist");
console.log("✓ Documentation page, preview stage, and demonstrations verified");

console.log("\n>>> ALL SEGMENTED CONTROL QUALITY GATES PASSED SUCCESSFULLY! <<<\n");

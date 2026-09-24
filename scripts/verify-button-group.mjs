import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 03: Button Group Quality Gate & Verification ===\n");

// 1. Verify component source exists
const buttonGroupSourcePath = path.resolve("components/ui/button-group.tsx");
assert.ok(fs.existsSync(buttonGroupSourcePath), "components/ui/button-group.tsx must exist");
const buttonGroupContent = fs.readFileSync(buttonGroupSourcePath, "utf-8");

// 2. Verify exports
assert.ok(buttonGroupContent.includes("export const ButtonGroup ="), "ButtonGroup must be exported");
assert.ok(buttonGroupContent.includes("export const buttonGroupVariants ="), "buttonGroupVariants must be exported");
assert.ok(buttonGroupContent.includes("export type ButtonGroupOrientation ="), "ButtonGroupOrientation type must be exported");
assert.ok(buttonGroupContent.includes("export interface ButtonGroupProps"), "ButtonGroupProps interface must be exported");
console.log("✓ Core ButtonGroup exports verified");

// 3. Verify data attributes and native container semantics
assert.ok(buttonGroupContent.includes('data-slot="button-group"'), "Must have data-slot='button-group'");
assert.ok(buttonGroupContent.includes('data-orientation={orientation}'), "Must have data-orientation");
console.log("✓ Native container data attributes verified");

// 4. Verify horizontal and vertical orientations
assert.ok(buttonGroupContent.includes("horizontal:"), "Must support horizontal orientation");
assert.ok(buttonGroupContent.includes("vertical:"), "Must support vertical orientation");
console.log("✓ Both horizontal and vertical orientations verified");

// 5. Verify connected geometry: collapsing radii & overlapping seams
assert.ok(buttonGroupContent.includes("rounded-e-none"), "Horizontal start child must collapse end radius");
assert.ok(buttonGroupContent.includes("rounded-s-none"), "Horizontal end child must collapse start radius");
assert.ok(buttonGroupContent.includes("rounded-none"), "Middle children must collapse all radii");
assert.ok(buttonGroupContent.includes("-ms-px"), "Must overlap horizontal borders with -ms-px");
assert.ok(buttonGroupContent.includes("rounded-b-none"), "Vertical start child must collapse bottom radius");
assert.ok(buttonGroupContent.includes("rounded-t-none"), "Vertical end child must collapse top radius");
assert.ok(buttonGroupContent.includes("-mt-px"), "Must overlap vertical borders with -mt-px");
console.log("✓ Connected geometry and overlapping border seams verified");

// 6. Verify focus layering and NO overflow clipping
assert.ok(buttonGroupContent.includes("focus-visible:z-20"), "Focused child must elevate to z-20 to unclip focus ring");
assert.ok(!buttonGroupContent.includes("overflow-hidden"), "ButtonGroup container must NOT use overflow-hidden");
console.log("✓ Focus ring layering (focus-visible:z-20, no overflow clipping) verified");

// 7. Verify registry item in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const groupRegistryItem = registryJson.items.find((item) => item.name === "button-group");

assert.ok(groupRegistryItem, "Registry item for 'button-group' must exist in registry.json");
assert.equal(groupRegistryItem.title, "Button Group", "Registry item title must be 'Button Group'");
assert.equal(groupRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(groupRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(groupRegistryItem.files.some((f) => f.target === "components/ui/button-group.tsx"), "Must target components/ui/button-group.tsx");
console.log("✓ Registry definition verified in public/r/registry.json");

// 8. Verify static public/r/button-group.json exists
const staticGroupPath = path.resolve("public/r/button-group.json");
assert.ok(fs.existsSync(staticGroupPath), "public/r/button-group.json must exist");
const staticGroupJson = JSON.parse(fs.readFileSync(staticGroupPath, "utf-8"));
assert.equal(staticGroupJson.name, "button-group");
assert.equal(staticGroupJson.title, "Button Group");
console.log("✓ Static public/r/button-group.json verified");

// 9. Verify dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "button-group"'), "app/r/[name]/route.ts must handle button-group");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 10. Verify navigation order: Actions -> Button -> Icon Button -> Button Group
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/button-group"'), "Docs navigation must have Button Group link");
const buttonIdx = navContent.indexOf('href: "/components/button"');
const iconButtonIdx = navContent.indexOf('href: "/components/icon-button"');
const groupIdx = navContent.indexOf('href: "/components/button-group"');
assert.ok(buttonIdx !== -1 && iconButtonIdx !== -1 && groupIdx !== -1, "All 3 components must exist in navigation");
assert.ok(buttonIdx < iconButtonIdx && iconButtonIdx < groupIdx, "Navigation order must be: Button -> Icon Button -> Button Group");
console.log("✓ Docs navigation verified: Actions → Button → Icon Button → Button Group");

// 11. Verify docs page and layout
assert.ok(fs.existsSync(path.resolve("app/components/button-group/page.tsx")), "app/components/button-group/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/button-group/layout.tsx")), "app/components/button-group/layout.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/button-group/button-group-preview-stage.tsx")), "app/components/button-group/button-group-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/button-group/button-group-demonstrations.tsx")), "app/components/button-group/button-group-demonstrations.tsx must exist");
console.log("✓ Documentation page, layout (DocsShell), and preview components verified");

console.log("\n========================================================");
console.log("🎉 ALL BUTTON GROUP QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");

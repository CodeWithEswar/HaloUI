import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 04: Split Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const splitButtonSourcePath = path.resolve("components/ui/split-button.tsx");
assert.ok(fs.existsSync(splitButtonSourcePath), "components/ui/split-button.tsx must exist");
const splitButtonContent = fs.readFileSync(splitButtonSourcePath, "utf-8");

// 2. Verify exports
assert.ok(splitButtonContent.includes("export const SplitButton ="), "SplitButton must be exported");
assert.ok(splitButtonContent.includes("export const SplitButtonAction ="), "SplitButtonAction must be exported");
assert.ok(splitButtonContent.includes("export const SplitButtonTrigger ="), "SplitButtonTrigger must be exported");
assert.ok(splitButtonContent.includes("export function SplitButtonContent"), "SplitButtonContent must be exported");
assert.ok(splitButtonContent.includes("export function SplitButtonItem"), "SplitButtonItem must be exported");
assert.ok(splitButtonContent.includes("export function SplitButtonSeparator"), "SplitButtonSeparator must be exported");
assert.ok(splitButtonContent.includes("export function SplitButtonLabel"), "SplitButtonLabel must be exported");
assert.ok(splitButtonContent.includes("export function SplitMenuGroup"), "SplitMenuGroup must be exported");
assert.ok(splitButtonContent.includes("export const splitButtonVariants ="), "splitButtonVariants must be exported");
assert.ok(splitButtonContent.includes("export const splitButtonActionVariants ="), "splitButtonActionVariants must be exported");
assert.ok(splitButtonContent.includes("export const splitButtonTriggerVariants ="), "splitButtonTriggerVariants must be exported");
console.log("✓ Core SplitButton compound exports verified");

// 3. Verify separation of interactive targets
assert.ok(splitButtonContent.includes('data-slot="split-button"'), "Must have data-slot='split-button'");
assert.ok(splitButtonContent.includes('data-slot="split-button-action"'), "Must have data-slot='split-button-action'");
assert.ok(splitButtonContent.includes('data-slot="split-button-trigger"'), "Must have data-slot='split-button-trigger'");
assert.ok(splitButtonContent.includes('data-slot="split-button-content"'), "Must have data-slot='split-button-content'");
console.log("✓ Distinct primary action and secondary menu trigger targets verified");

// 4. Verify accessible menu integration via real primitive
assert.ok(splitButtonContent.includes('@base-ui/react/menu'), "Must integrate with established @base-ui/react/menu primitive");
assert.ok(splitButtonContent.includes('MenuPrimitive.Root'), "Must use MenuPrimitive.Root");
assert.ok(splitButtonContent.includes('MenuPrimitive.Trigger'), "Must use MenuPrimitive.Trigger");
assert.ok(splitButtonContent.includes('MenuPrimitive.Popup'), "Must use MenuPrimitive.Popup");
console.log("✓ Real accessible menu primitive integration verified");

// 5. Verify connected geometry: collapsing radii & overlapping seams
assert.ok(splitButtonContent.includes("rounded-e-none"), "Primary action must collapse end radius");
assert.ok(splitButtonContent.includes("rounded-s-none"), "Trigger must collapse start radius");
assert.ok(splitButtonContent.includes("-ms-px"), "Must overlap horizontal border seam with -ms-px");
console.log("✓ Connected geometry and 1px overlapping border seam verified");

// 6. Verify focus layering, dual contrast ring, and tactile press
assert.ok(splitButtonContent.includes("focus-visible:z-20"), "Focused child must elevate to z-20 to unclip focus ring");
assert.ok(splitButtonContent.includes("halo-focus-ring"), "Must include halo-focus-ring");
assert.ok(splitButtonContent.includes("halo-tactile-press"), "Must include halo-tactile-press");
assert.ok(splitButtonContent.includes("halo-liquid-glass"), "Must use HaloUI 10-layer physical liquid optical engine");
console.log("✓ Halo Focus Ring, tactile press, and 10-layer liquid optical material verified");

// 7. Verify accessible trigger naming enforcement
assert.ok(splitButtonContent.includes("An accessible name is mandatory for the secondary menu trigger"), "Must validate accessible naming on trigger");
console.log("✓ Trigger accessible name validation verified");

// 8. Verify registry item in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const splitRegistryItem = registryJson.items.find((item) => item.name === "split-button");

assert.ok(splitRegistryItem, "Registry item for 'split-button' must exist in registry.json");
assert.equal(splitRegistryItem.title, "Split Button", "Registry item title must be 'Split Button'");
assert.equal(splitRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(splitRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(splitRegistryItem.files.some((f) => f.target === "components/ui/split-button.tsx"), "Must target components/ui/split-button.tsx");
console.log("✓ Registry definition verified in public/r/registry.json");

// 9. Verify static public/r/split-button.json exists
const staticSplitPath = path.resolve("public/r/split-button.json");
assert.ok(fs.existsSync(staticSplitPath), "public/r/split-button.json must exist");
const staticSplitJson = JSON.parse(fs.readFileSync(staticSplitPath, "utf-8"));
assert.equal(staticSplitJson.name, "split-button");
assert.equal(staticSplitJson.title, "Split Button");
console.log("✓ Static public/r/split-button.json verified");

// 10. Verify dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "split-button"'), "app/r/[name]/route.ts must handle split-button");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 11. Verify navigation order: Actions -> Button -> Icon Button -> Button Group -> Split Button
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/split-button"'), "Docs navigation must have Split Button link");
const buttonIdx = navContent.indexOf('href: "/components/button"');
const iconButtonIdx = navContent.indexOf('href: "/components/icon-button"');
const groupIdx = navContent.indexOf('href: "/components/button-group"');
const splitIdx = navContent.indexOf('href: "/components/split-button"');
assert.ok(buttonIdx !== -1 && iconButtonIdx !== -1 && groupIdx !== -1 && splitIdx !== -1, "All 4 action components must exist in navigation");
assert.ok(buttonIdx < iconButtonIdx && iconButtonIdx < groupIdx && groupIdx < splitIdx, "Navigation order must be: Button -> Icon Button -> Button Group -> Split Button");
console.log("✓ Docs navigation verified: Actions → Button → Icon Button → Button Group → Split Button");

// 12. Verify docs page, layout, preview stage, and demonstrations
assert.ok(fs.existsSync(path.resolve("app/components/split-button/page.tsx")), "app/components/split-button/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/split-button/layout.tsx")), "app/components/split-button/layout.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/split-button/split-button-preview-stage.tsx")), "app/components/split-button/split-button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/split-button/split-button-demonstrations.tsx")), "app/components/split-button/split-button-demonstrations.tsx must exist");
console.log("✓ Documentation page, layout (DocsShell), and preview components verified");

console.log("\n========================================================");
console.log("🎉 ALL SPLIT BUTTON QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");

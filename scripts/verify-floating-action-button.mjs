import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 07: Floating Action Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const fabSourcePath = path.resolve("components/ui/floating-action-button.tsx");
assert.ok(fs.existsSync(fabSourcePath), "components/ui/floating-action-button.tsx must exist");
const fabContent = fs.readFileSync(fabSourcePath, "utf-8");

// 2. Verify exports
assert.ok(fabContent.includes("export const FloatingActionButton ="), "FloatingActionButton must be exported");
assert.ok(fabContent.includes("export const floatingActionButtonVariants ="), "floatingActionButtonVariants must be exported");
assert.ok(fabContent.includes("export type FloatingActionButtonVariant ="), "FloatingActionButtonVariant type must be exported");
assert.ok(fabContent.includes("export type FloatingActionButtonSize ="), "FloatingActionButtonSize type must be exported");
assert.ok(fabContent.includes("export interface FloatingActionButtonProps"), "FloatingActionButtonProps interface must be exported");
console.log("✓ Core FloatingActionButton exports and TypeScript types verified");

// 3. Verify native button semantics and data-slot
assert.ok(fabContent.includes('data-slot="floating-action-button"'), "Must have data-slot='floating-action-button'");
assert.ok(fabContent.includes('type={asChild ? undefined : (type ?? "button")}'), "Must default button type safely to 'button'");
assert.ok(fabContent.includes("const Comp = asChild ? Slot : \"button\""), "Must use real HTML button or Radix Slot");
console.log("✓ Native button semantics and Radix Slot polymorphism verified");

// 4. Critical Architecture: Layout-Neutral Placement (NO default fixed positioning)
assert.ok(!fabContent.includes("position: fixed"), "Must NOT hardcode 'position: fixed' into component default classes");
assert.ok(!fabContent.includes("bottom-6 right-6"), "Must NOT hardcode viewport offsets into component default classes");
assert.ok(!fabContent.includes("fixed "), "Must NOT hardcode 'fixed' into component default classes");
console.log("✓ Layout neutrality verified (placement is strictly consumer/container-owned)");

// 5. Critical Motion Rule: NO continuous floating / bobbing animation
assert.ok(!fabContent.includes("halo-motion-float"), "Must NOT implement continuous float animation");
assert.ok(!fabContent.includes("infinite"), "Must NOT use infinite animation loops");
assert.ok(fabContent.includes("halo-tactile-press"), "Must use interactive tactile press physics");
console.log("✓ Motion architecture verified (spatial elevation without perpetual bobbing)");

// 6. Sizing, Geometry, and Extended support
assert.ok(fabContent.includes("size-14"), "Default size must provide 56px (size-14) touch target");
assert.ok(fabContent.includes("size-16"), "Large size must provide 64px (size-16) touch target");
assert.ok(fabContent.includes("extended: {"), "Must support explicit extended variant");
assert.ok(fabContent.includes("rounded-full"), "Must use rounded-full geometry for both circular and capsule forms");
console.log("✓ Sizing (56px/64px), capsule geometry, and extended presentation verified");

// 7. Accessibility: Double-contrast focus ring and dev accessible-name check
assert.ok(fabContent.includes("focus-visible:z-20"), "Must elevate focus ring to z-20 for unclipped visibility over drop shadows");
assert.ok(fabContent.includes("halo-focus-ring"), "Must integrate shared halo-focus-ring");
assert.ok(fabContent.includes("aria-label"), "Must inspect accessible name in development mode");
console.log("✓ Double-contrast focus ring (z-20) and accessible name audit verified");

// 8. Static registry file in public/r/floating-action-button.json
const staticFabPath = path.resolve("public/r/floating-action-button.json");
assert.ok(fs.existsSync(staticFabPath), "public/r/floating-action-button.json must exist");
const staticFabJson = JSON.parse(fs.readFileSync(staticFabPath, "utf-8"));
assert.equal(staticFabJson.name, "floating-action-button");
assert.equal(staticFabJson.title, "Floating Action Button");
assert.equal(staticFabJson.meta.category, "actions");
assert.equal(staticFabJson.meta.status, "preview");
assert.ok(staticFabJson.files.some((f) => f.target === "components/ui/floating-action-button.tsx"));
console.log("✓ Static public/r/floating-action-button.json verified");

// 9. Registry definition in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const fabRegistryItem = registryJson.items.find((item) => item.name === "floating-action-button");
assert.ok(fabRegistryItem, "Registry item for 'floating-action-button' must exist in registry.json");
assert.equal(fabRegistryItem.title, "Floating Action Button");
assert.equal(fabRegistryItem.meta.category, "actions");
console.log("✓ Registry definition verified in public/r/registry.json");

// 10. Dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "floating-action-button"'), "app/r/[name]/route.ts must handle floating-action-button");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 11. Navigation order: Actions 01-07
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/floating-action-button"'), "Docs navigation must have Floating Action Button link");
const toggleGroupIdx = navContent.indexOf('href: "/components/toggle-group"');
const fabIdx = navContent.indexOf('href: "/components/floating-action-button"');
assert.ok(fabIdx > toggleGroupIdx, "Floating Action Button must be positioned after Toggle Group");
console.log("✓ Navigation order Actions 01-07 verified in lib/docs/navigation.ts");

// 12. Documentation and Preview Stage files
const pagePath = path.resolve("app/components/floating-action-button/page.tsx");
const layoutPath = path.resolve("app/components/floating-action-button/layout.tsx");
const stagePath = path.resolve("app/components/floating-action-button/floating-action-button-preview-stage.tsx");
const demosPath = path.resolve("app/components/floating-action-button/floating-action-button-demonstrations.tsx");

assert.ok(fs.existsSync(pagePath), "app/components/floating-action-button/page.tsx must exist");
assert.ok(fs.existsSync(layoutPath), "app/components/floating-action-button/layout.tsx must exist");
assert.ok(fs.existsSync(stagePath), "app/components/floating-action-button/floating-action-button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(demosPath), "app/components/floating-action-button/floating-action-button-demonstrations.tsx must exist");

const demosContent = fs.readFileSync(demosPath, "utf-8");
assert.ok(demosContent.includes("FloatingActionButtonBackgroundResponsePreview"), "Must implement BackgroundResponsePreview centerpiece");
assert.ok(demosContent.includes("FloatingActionButtonSizesPreview"), "Must implement SizesPreview");
assert.ok(demosContent.includes("FloatingActionButtonExtendedPreview"), "Must implement ExtendedPreview");
assert.ok(demosContent.includes("FloatingActionButtonPlacementPreview"), "Must implement PlacementPreview");
assert.ok(demosContent.includes("FloatingActionButtonStatesPreview"), "Must implement StatesPreview");
assert.ok(demosContent.includes("FloatingActionButtonKeyboardPreview"), "Must implement KeyboardPreview");
console.log("✓ Complete documentation and demonstration suite verified");

console.log("\n========================================================");
console.log("🎉 ALL FLOATING ACTION BUTTON QUALITY GATES PASSED!");
console.log("========================================================\n");

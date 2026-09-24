import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 02: Icon Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const iconButtonSourcePath = path.resolve("components/ui/icon-button.tsx");
assert.ok(fs.existsSync(iconButtonSourcePath), "components/ui/icon-button.tsx must exist");
const iconButtonContent = fs.readFileSync(iconButtonSourcePath, "utf-8");

// 2. Verify exports
assert.ok(iconButtonContent.includes("export const IconButton ="), "IconButton must be exported");
assert.ok(iconButtonContent.includes("export const iconButtonVariants ="), "iconButtonVariants must be exported");
assert.ok(iconButtonContent.includes("export type IconButtonVariant ="), "IconButtonVariant type must be exported");
assert.ok(iconButtonContent.includes("export type IconButtonSize ="), "IconButtonSize type must be exported");
assert.ok(iconButtonContent.includes("export interface IconButtonProps"), "IconButtonProps interface must be exported");
console.log("✓ Core IconButton exports verified");

// 3. Verify native semantics & default type="button" & data attributes
assert.ok(iconButtonContent.includes('type={asChild ? undefined : (type ?? "button")}'), "IconButton must default to type='button' when rendered as native button");
assert.ok(iconButtonContent.includes('data-slot="icon-button"'), "IconButton must have data-slot='icon-button'");
assert.ok(iconButtonContent.includes('data-variant={variant}'), "IconButton must have data-variant");
assert.ok(iconButtonContent.includes('data-size={size}'), "IconButton must have data-size");
console.log("✓ Native button semantics and data attributes verified");

// 4. Verify accessible naming contract & dev checking
assert.ok(iconButtonContent.includes("hasAccessibleName"), "IconButton must check for accessible name in development");
assert.ok(iconButtonContent.includes("aria-label"), "IconButton must check aria-label");
assert.ok(!iconButtonContent.includes("accessibleName="), "Must not invent proprietary accessibleName prop; must use standard web platform aria-label");
console.log("✓ Platform-standard accessible naming contract verified");

// 5. Verify all canonical variants (NO link, NO decorative variants)
const expectedVariants = ["default", "secondary", "outline", "ghost", "destructive"];
for (const variant of expectedVariants) {
  assert.ok(iconButtonContent.includes(`${variant}:`), `iconButtonVariants must implement variant: ${variant}`);
}
assert.ok(!iconButtonContent.includes("link:"), "IconButton must NOT implement link variant");
assert.ok(!iconButtonContent.includes("glow:"), "IconButton must NOT implement decorative glow variant");
assert.ok(!iconButtonContent.includes("liquid:"), "IconButton must NOT implement decorative liquid variant");
console.log(`✓ All 5 canonical variants verified: ${expectedVariants.join(", ")}`);

// 6. Verify square sizes
const expectedSizes = ["sm", "default", "lg"];
for (const size of expectedSizes) {
  assert.ok(iconButtonContent.includes(`${size}:`), `iconButtonVariants must implement size: ${size}`);
}
assert.ok(iconButtonContent.includes("size-8"), "sm size must be 32px (size-8)");
assert.ok(iconButtonContent.includes("size-10"), "default size must be 40px (size-10)");
assert.ok(iconButtonContent.includes("size-12"), "lg size must be 48px (size-12)");
console.log(`✓ Square geometry scale verified: ${expectedSizes.join(", ")} (32px, 40px, 48px)`);

// 7. Verify material integration: No default glow, no default refraction, minimal DOM pseudo-element specular catch
assert.ok(!iconButtonContent.includes("HaloGlow"), "IconButton must NOT import or nest HaloGlow by default");
assert.ok(!iconButtonContent.includes("HaloRefractionLayer"), "IconButton must NOT import or nest HaloRefractionLayer by default");
assert.ok(iconButtonContent.includes("halo-focus-ring"), "IconButton must reuse Halo Focus Ring infrastructure");
assert.ok(iconButtonContent.includes("halo-tactile-press"), "IconButton must reuse Halo tactile press motion");
assert.ok(iconButtonContent.includes("halo-liquid-glass"), "IconButton must use halo-liquid-glass optical engine");
console.log("✓ Material foundations properly integrated (no glow, no refraction, liquid glass engine)");

// 8. Verify registry item in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const iconButtonRegistryItem = registryJson.items.find((item) => item.name === "icon-button");

assert.ok(iconButtonRegistryItem, "Registry item for 'icon-button' must exist in registry.json");
assert.equal(iconButtonRegistryItem.title, "Icon Button", "Registry item title must be 'Icon Button'");
assert.equal(iconButtonRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(iconButtonRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(iconButtonRegistryItem.files.some((f) => f.target === "components/ui/icon-button.tsx"), "Must target components/ui/icon-button.tsx");
console.log("✓ Registry definition verified in public/r/registry.json");

// 9. Verify static public/r/icon-button.json exists
const staticIconButtonPath = path.resolve("public/r/icon-button.json");
assert.ok(fs.existsSync(staticIconButtonPath), "public/r/icon-button.json must exist");
const staticIconButtonJson = JSON.parse(fs.readFileSync(staticIconButtonPath, "utf-8"));
assert.equal(staticIconButtonJson.name, "icon-button");
assert.equal(staticIconButtonJson.title, "Icon Button");
console.log("✓ Static public/r/icon-button.json verified");

// 10. Verify dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "icon-button"'), "app/r/[name]/route.ts must handle icon-button");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 11. Verify navigation configuration: Actions -> Button -> Icon Button
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/icon-button"'), "Docs navigation must have Icon Button link");
const buttonIdx = navContent.indexOf('href: "/components/button"');
const iconButtonIdx = navContent.indexOf('href: "/components/icon-button"');
assert.ok(buttonIdx !== -1 && iconButtonIdx !== -1, "Both Button and Icon Button must exist in docs navigation");
assert.ok(buttonIdx < iconButtonIdx, "Button must precede Icon Button in Actions section");
console.log("✓ Docs navigation verified: Actions → Button → Icon Button");

// 12. Verify docs page and preview files
assert.ok(fs.existsSync(path.resolve("app/components/icon-button/page.tsx")), "app/components/icon-button/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/icon-button/icon-button-preview-stage.tsx")), "app/components/icon-button/icon-button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/icon-button/icon-button-demonstrations.tsx")), "app/components/icon-button/icon-button-demonstrations.tsx must exist");
console.log("✓ Documentation page and preview components verified");

console.log("\n========================================================");
console.log("🎉 ALL ICON BUTTON QUALITY GATE CHECKS PASSED!");
console.log("========================================================\n");

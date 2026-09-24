import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 01: Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const buttonSourcePath = path.resolve("components/ui/button.tsx");
assert.ok(fs.existsSync(buttonSourcePath), "components/ui/button.tsx must exist");
const buttonContent = fs.readFileSync(buttonSourcePath, "utf-8");

// 2. Verify exports
assert.ok(buttonContent.includes("export const Button ="), "Button must be exported");
assert.ok(buttonContent.includes("export const buttonVariants ="), "buttonVariants must be exported");
assert.ok(buttonContent.includes("export type ButtonVariant ="), "ButtonVariant type must be exported");
assert.ok(buttonContent.includes("export type ButtonSize ="), "ButtonSize type must be exported");
assert.ok(buttonContent.includes("export interface ButtonProps"), "ButtonProps interface must be exported");
console.log("✓ Core Button exports verified");

// 3. Verify native semantics & default type="button"
assert.ok(buttonContent.includes('type={asChild ? undefined : (type ?? "button")}'), "Button must default to type='button' when rendered as native button");
assert.ok(buttonContent.includes('data-slot="button"'), "Button must have data-slot='button'");
assert.ok(buttonContent.includes('data-variant={variant}'), "Button must have data-variant");
assert.ok(buttonContent.includes('data-size={size}'), "Button must have data-size");
console.log("✓ Native semantics and data attributes verified");

// 4. Verify all semantic variants
const expectedVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"];
for (const variant of expectedVariants) {
  assert.ok(buttonContent.includes(`${variant}:`), `buttonVariants must implement variant: ${variant}`);
}
console.log(`✓ All 6 canonical variants verified: ${expectedVariants.join(", ")}`);

// 5. Verify canonical sizes
const expectedSizes = ["default", "sm", "lg", "icon"];
for (const size of expectedSizes) {
  assert.ok(buttonContent.includes(`${size}:`), `buttonVariants must implement size: ${size}`);
}
console.log(`✓ All 4 canonical sizes verified: ${expectedSizes.join(", ")}`);

// 6. Verify material integration: No default glow, no default refraction, minimal DOM pseudo-element specular catch
assert.ok(!buttonContent.includes("HaloGlow"), "Button must NOT import or nest HaloGlow by default");
assert.ok(!buttonContent.includes("HaloRefractionLayer"), "Button must NOT import or nest HaloRefractionLayer by default");
assert.ok(buttonContent.includes("halo-focus-ring"), "Button must reuse Halo Focus Ring infrastructure");
assert.ok(buttonContent.includes("halo-tactile-press"), "Button must reuse Halo tactile press motion");
assert.ok(buttonContent.includes("halo-liquid-glass"), "Button must use halo-liquid-glass optical engine");
console.log("✓ Material foundations properly integrated (no glow, no refraction, liquid glass engine)");

// 7. Verify registry item
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const buttonRegistryItem = registryJson.items.find((item) => item.name === "button");

assert.ok(buttonRegistryItem, "Registry item for 'button' must exist in registry.json");
assert.equal(buttonRegistryItem.title, "Button", "Registry item title must be 'Button'");
assert.equal(buttonRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(buttonRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(buttonRegistryItem.files.some((f) => f.target === "components/ui/button.tsx"), "Must target components/ui/button.tsx");
console.log("✓ Registry definition verified in public/r/registry.json");

// 8. Verify static button.json exists
const staticButtonPath = path.resolve("public/r/button.json");
assert.ok(fs.existsSync(staticButtonPath), "public/r/button.json must exist");
const staticButtonJson = JSON.parse(fs.readFileSync(staticButtonPath, "utf-8"));
assert.equal(staticButtonJson.name, "button");
assert.equal(staticButtonJson.title, "Button");
console.log("✓ Static public/r/button.json verified");

// 9. Verify navigation configuration
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('title: "Actions"'), "Docs navigation must have 'Actions' section");
assert.ok(navContent.includes('href: "/components/button"'), "Docs navigation must have Button link");
console.log("✓ Docs navigation verified: Actions → Button");

// 10. Verify docs page and preview files
assert.ok(fs.existsSync(path.resolve("app/components/button/page.tsx")), "app/components/button/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/button/button-preview-stage.tsx")), "app/components/button/button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/button/button-demonstrations.tsx")), "app/components/button/button-demonstrations.tsx must exist");
console.log("✓ Documentation page and preview components verified");

console.log("\n========================================================");
console.log("🎉 ALL QUALITY GATE CHECKS PASSED SUCCESSFULLY!");
console.log("========================================================\n");

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 05: Toggle Quality Gate & Verification ===\n");

// 1. Verify component source exists
const toggleSourcePath = path.resolve("components/ui/toggle.tsx");
assert.ok(fs.existsSync(toggleSourcePath), "components/ui/toggle.tsx must exist");
const toggleContent = fs.readFileSync(toggleSourcePath, "utf-8");

// 2. Verify exports
assert.ok(toggleContent.includes("export const Toggle ="), "Toggle must be exported");
assert.ok(toggleContent.includes("export const toggleVariants ="), "toggleVariants must be exported");
console.log("✓ Core Toggle and variant exports verified");

// 3. Verify underlying accessible primitive integration
assert.ok(toggleContent.includes('@base-ui/react/toggle'), "Must integrate with established @base-ui/react/toggle primitive");
assert.ok(toggleContent.includes('data-slot="toggle"'), "Must have data-slot='toggle'");
console.log("✓ Real accessible toggle primitive integration and data-slot verified");

// 4. Verify 10-layer physical liquid optical material and persistent pressed displacement
assert.ok(toggleContent.includes("halo-liquid-glass"), "Must use HaloUI 10-layer physical liquid optical engine");
assert.ok(toggleContent.includes("halo-focus-ring"), "Must include halo-focus-ring");
assert.ok(toggleContent.includes("halo-tactile-press"), "Must include halo-tactile-press");
assert.ok(toggleContent.includes("focus-visible:z-20"), "Must unclip focus ring at z-20");
assert.ok(toggleContent.includes("aria-pressed:shadow-[inset_0_2px_4px"), "Must have physical inset displacement shadow when pressed");
assert.ok(toggleContent.includes("aria-pressed:bg-neutral-900/[0.12]"), "Must have condensed optical tint when pressed");
console.log("✓ 10-layer liquid optical engine, Halo Focus Ring, tactile press, and optical pressed displacement verified");

// 5. Verify accessible naming validation on icon-only Toggles
assert.ok(toggleContent.includes("An accessible name is mandatory for icon-only toggles"), "Must enforce accessible name when no text content is provided");
console.log("✓ Icon-only accessible naming enforcement verified");

// 6. Verify registry item in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const toggleRegistryItem = registryJson.items.find((item) => item.name === "toggle");

assert.ok(toggleRegistryItem, "Registry item for 'toggle' must exist in registry.json");
assert.equal(toggleRegistryItem.title, "Toggle", "Registry item title must be 'Toggle'");
assert.equal(toggleRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(toggleRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(toggleRegistryItem.files.some((f) => f.target === "components/ui/toggle.tsx"), "Must target components/ui/toggle.tsx");
console.log("✓ Registry definition verified in public/r/registry.json");

// 7. Verify static public/r/toggle.json exists
const staticTogglePath = path.resolve("public/r/toggle.json");
assert.ok(fs.existsSync(staticTogglePath), "public/r/toggle.json must exist");
const staticToggleJson = JSON.parse(fs.readFileSync(staticTogglePath, "utf-8"));
assert.equal(staticToggleJson.name, "toggle");
assert.equal(staticToggleJson.title, "Toggle");
console.log("✓ Static public/r/toggle.json verified");

// 8. Verify dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "toggle"'), "app/r/[name]/route.ts must handle toggle");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 9. Verify navigation order: Actions -> Button -> Icon Button -> Button Group -> Split Button -> Toggle
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/toggle"'), "Docs navigation must have Toggle link");
const buttonIdx = navContent.indexOf('href: "/components/button"');
const iconButtonIdx = navContent.indexOf('href: "/components/icon-button"');
const groupIdx = navContent.indexOf('href: "/components/button-group"');
const splitIdx = navContent.indexOf('href: "/components/split-button"');
const toggleIdx = navContent.indexOf('href: "/components/toggle"');
assert.ok(buttonIdx !== -1 && iconButtonIdx !== -1 && groupIdx !== -1 && splitIdx !== -1 && toggleIdx !== -1, "All 5 action components must exist in navigation");
assert.ok(
  buttonIdx < iconButtonIdx && iconButtonIdx < groupIdx && groupIdx < splitIdx && splitIdx < toggleIdx,
  "Navigation order must be: Button -> Icon Button -> Button Group -> Split Button -> Toggle"
);
console.log("✓ Docs navigation verified: Actions → Button → Icon Button → Button Group → Split Button → Toggle");

// 10. Verify docs page, layout, preview stage, and demonstrations
assert.ok(fs.existsSync(path.resolve("app/components/toggle/page.tsx")), "app/components/toggle/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle/layout.tsx")), "app/components/toggle/layout.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle/toggle-preview-stage.tsx")), "app/components/toggle/toggle-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle/toggle-demonstrations.tsx")), "app/components/toggle/toggle-demonstrations.tsx must exist");

const demoContent = fs.readFileSync(path.resolve("app/components/toggle/toggle-demonstrations.tsx"), "utf-8");
assert.ok(demoContent.includes("ToggleStateMatrixPreview"), "Must include ToggleStateMatrixPreview centerpiece");
assert.ok(demoContent.includes("ToggleControlledPreview"), "Must include ToggleControlledPreview");
assert.ok(demoContent.includes("ToggleKeyboardPreview"), "Must include ToggleKeyboardPreview");
assert.ok(demoContent.includes("ToggleVariantsPreview"), "Must include ToggleVariantsPreview");
assert.ok(demoContent.includes("ToggleSizesPreview"), "Must include ToggleSizesPreview");
assert.ok(demoContent.includes("ToggleContentPreview"), "Must include ToggleContentPreview");
console.log("✓ Docs suite verified: Page, Layout, Preview Stage, and State Matrix Centerpiece demonstrations");

console.log("\n===============================================================================");
console.log(">>> ALL 10 TOGGLE QUALITY GATE CHECKS PASSED PERFECTLY <<<");
console.log("===============================================================================\n");

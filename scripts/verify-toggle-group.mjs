import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 06: Toggle Group Quality Gate & Verification ===\n");

// 1. Verify component source exists
const toggleGroupSourcePath = path.resolve("components/ui/toggle-group.tsx");
assert.ok(fs.existsSync(toggleGroupSourcePath), "components/ui/toggle-group.tsx must exist");
const toggleGroupContent = fs.readFileSync(toggleGroupSourcePath, "utf-8");

// 2. Verify exports
assert.ok(toggleGroupContent.includes("export const ToggleGroup ="), "ToggleGroup must be exported");
assert.ok(toggleGroupContent.includes("export const ToggleGroupItem ="), "ToggleGroupItem must be exported");
assert.ok(toggleGroupContent.includes("export const toggleGroupVariants ="), "toggleGroupVariants must be exported");
assert.ok(toggleGroupContent.includes("export function useToggleGroupContext"), "useToggleGroupContext must be exported");
console.log("✓ Core ToggleGroup and ToggleGroupItem compound exports verified");

// 3. Verify data-slots and integration with Base UI primitive
assert.ok(toggleGroupContent.includes('data-slot="toggle-group"'), "Must have data-slot='toggle-group'");
assert.ok(toggleGroupContent.includes('data-slot="toggle-group-item"'), "Must have data-slot='toggle-group-item'");
assert.ok(toggleGroupContent.includes('@base-ui/react/toggle-group'), "Must integrate with Base UI ToggleGroup primitive");
console.log("✓ Data-slot attributes and Base UI primitive integration verified");

// 4. Verify connected geometry, overlapping seam, and focus ring layering
assert.ok(toggleGroupContent.includes("-ms-px"), "Connected horizontal group must overlap 1px seams with -ms-px");
assert.ok(toggleGroupContent.includes("-mt-px"), "Connected vertical group must overlap 1px seams with -mt-px");
assert.ok(toggleGroupContent.includes("rounded-e-none"), "Must collapse inner radii on horizontal items");
assert.ok(toggleGroupContent.includes("rounded-b-none"), "Must collapse inner radii on vertical items");
assert.ok(toggleGroupContent.includes("focus-visible:z-20"), "Must elevate focus ring to z-20 to unclip perimeter");
assert.ok(toggleGroupContent.includes("z-[5]"), "Must elevate pressed item above neighboring rest borders");
console.log("✓ Connected geometry, 1px overlapping seams, and unclipped focus ring layering verified");

// 5. Verify registry definition in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const tgRegistryItem = registryJson.items.find((item) => item.name === "toggle-group");

assert.ok(tgRegistryItem, "Registry item for 'toggle-group' must exist in registry.json");
assert.equal(tgRegistryItem.title, "Toggle Group", "Registry item title must be 'Toggle Group'");
assert.equal(tgRegistryItem.meta.category, "actions", "Category must be 'actions'");
assert.equal(tgRegistryItem.meta.status, "preview", "Status must be 'preview'");
assert.ok(tgRegistryItem.registryDependencies.includes("toggle"), "Must declare 'toggle' registry dependency");
assert.ok(tgRegistryItem.files.some((f) => f.target === "components/ui/toggle-group.tsx"), "Must target components/ui/toggle-group.tsx");
console.log("✓ Registry definition and 'toggle' dependency verified in public/r/registry.json");

// 6. Verify static public/r/toggle-group.json exists
const staticTgPath = path.resolve("public/r/toggle-group.json");
assert.ok(fs.existsSync(staticTgPath), "public/r/toggle-group.json must exist");
const staticTgJson = JSON.parse(fs.readFileSync(staticTgPath, "utf-8"));
assert.equal(staticTgJson.name, "toggle-group");
assert.equal(staticTgJson.title, "Toggle Group");
assert.ok(staticTgJson.registryDependencies.includes("toggle"));
console.log("✓ Static public/r/toggle-group.json verified");

// 7. Verify dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "toggle-group"'), "app/r/[name]/route.ts must handle toggle-group");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 8. Verify navigation order: Actions -> Button -> Icon Button -> Button Group -> Split Button -> Toggle -> Toggle Group
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('href: "/components/toggle-group"'), "Docs navigation must have Toggle Group link");
const buttonIdx = navContent.indexOf('href: "/components/button"');
const iconButtonIdx = navContent.indexOf('href: "/components/icon-button"');
const groupIdx = navContent.indexOf('href: "/components/button-group"');
const splitIdx = navContent.indexOf('href: "/components/split-button"');
const toggleIdx = navContent.indexOf('href: "/components/toggle"');
const toggleGroupIdx = navContent.indexOf('href: "/components/toggle-group"');

assert.ok(
  buttonIdx !== -1 &&
  iconButtonIdx !== -1 &&
  groupIdx !== -1 &&
  splitIdx !== -1 &&
  toggleIdx !== -1 &&
  toggleGroupIdx !== -1,
  "All 6 action components must exist in navigation"
);
assert.ok(
  buttonIdx < iconButtonIdx &&
  iconButtonIdx < groupIdx &&
  groupIdx < splitIdx &&
  splitIdx < toggleIdx &&
  toggleIdx < toggleGroupIdx,
  "Navigation order must be: Button -> Icon Button -> Button Group -> Split Button -> Toggle -> Toggle Group"
);
console.log("✓ Docs navigation verified: Actions → Button → Icon Button → Button Group → Split Button → Toggle → Toggle Group");

// 9. Verify docs page, layout, preview stage, and demonstrations
assert.ok(fs.existsSync(path.resolve("app/components/toggle-group/page.tsx")), "app/components/toggle-group/page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle-group/layout.tsx")), "app/components/toggle-group/layout.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle-group/toggle-group-preview-stage.tsx")), "app/components/toggle-group/toggle-group-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/toggle-group/toggle-group-demonstrations.tsx")), "app/components/toggle-group/toggle-group-demonstrations.tsx must exist");

const demoContent = fs.readFileSync(path.resolve("app/components/toggle-group/toggle-group-demonstrations.tsx"), "utf-8");
assert.ok(demoContent.includes("ToggleGroupSinglePreview"), "Must include ToggleGroupSinglePreview");
assert.ok(demoContent.includes("ToggleGroupMultiPreview"), "Must include ToggleGroupMultiPreview");
assert.ok(demoContent.includes("ToggleGroupGeometryPreview"), "Must include ToggleGroupGeometryPreview");
assert.ok(demoContent.includes("ToggleGroupVariantsPreview"), "Must include ToggleGroupVariantsPreview");
assert.ok(demoContent.includes("ToggleGroupSizesPreview"), "Must include ToggleGroupSizesPreview");
assert.ok(demoContent.includes("ToggleGroupOrientationPreview"), "Must include ToggleGroupOrientationPreview");
assert.ok(demoContent.includes("ToggleGroupControlledPreview"), "Must include ToggleGroupControlledPreview");
assert.ok(demoContent.includes("ToggleGroupKeyboardPreview"), "Must include ToggleGroupKeyboardPreview");
console.log("✓ Complete documentation suite verified: Page, Layout, Preview Stage, and 8 Demonstrations");

console.log("\n===============================================================================");
console.log(">>> ALL 9 TOGGLE GROUP QUALITY GATE CHECKS PASSED PERFECTLY <<<");
console.log("===============================================================================\n");

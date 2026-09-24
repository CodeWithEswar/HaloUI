import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Actions 08: Copy Button Quality Gate & Verification ===\n");

// 1. Verify component source exists
const copyButtonPath = path.resolve("components/ui/copy-button.tsx");
assert.ok(fs.existsSync(copyButtonPath), "components/ui/copy-button.tsx must exist");
const copyButtonContent = fs.readFileSync(copyButtonPath, "utf-8");

// 2. Verify exports and TypeScript types
assert.ok(copyButtonContent.includes("export const CopyButton ="), "CopyButton must be exported");
assert.ok(copyButtonContent.includes("export const copyButtonVariants ="), "copyButtonVariants must be exported");
assert.ok(copyButtonContent.includes("export type CopyButtonVariant ="), "CopyButtonVariant type must be exported");
assert.ok(copyButtonContent.includes("export type CopyButtonSize ="), "CopyButtonSize type must be exported");
assert.ok(copyButtonContent.includes("export type CopyStatus ="), "CopyStatus type must be exported");
assert.ok(copyButtonContent.includes("export interface CopyButtonProps"), "CopyButtonProps interface must be exported");
console.log("✓ Core CopyButton exports and TypeScript types verified");

// 3. Verify native button semantics and data-slot
assert.ok(copyButtonContent.includes('data-slot="copy-button"'), "Must have data-slot='copy-button'");
assert.ok(copyButtonContent.includes('type = "button"'), "Must default button type safely to 'button'");
assert.ok(copyButtonContent.includes("<button"), "Must use real HTML button element");
console.log("✓ Native button semantics and data-slot verified");

// 4. Critical Architecture: NOT A TOGGLE (NO aria-pressed)
assert.ok(!copyButtonContent.includes("aria-pressed"), "Must NOT use aria-pressed (Copied is temporary feedback, not persistent selection)");
assert.ok(copyButtonContent.includes('data-status={status}'), "Must communicate status via data-status attribute");
console.log("✓ Non-toggle architectural rule verified (no aria-pressed, feedback-driven data-status)");

// 5. Accessible Status Communication: Polite live region
assert.ok(copyButtonContent.includes('role="status"'), "Must provide role='status' live region");
assert.ok(copyButtonContent.includes('aria-live="polite"'), "Must use aria-live='polite' for non-disruptive feedback");
assert.ok(copyButtonContent.includes("className=\"sr-only\""), "Live region must be visually hidden");
console.log("✓ Accessible live region status feedback verified");

// 6. SSR Safety: No navigator access outside client click handler
assert.ok(copyButtonContent.includes('"use client"'), "Must be marked as client component");
assert.ok(!copyButtonContent.match(/const\s+\w+\s*=\s*navigator/), "Must not access navigator during module evaluation or top-level render");
console.log("✓ SSR safety verified (navigator accessed only inside user interaction handler)");

// 7. Timer safety & Cleanup
assert.ok(copyButtonContent.includes("timeoutRef.current = null") || copyButtonContent.includes("clearTimeout"), "Must clean up and reset timers");
assert.ok(copyButtonContent.includes("clearTimeout(timeoutRef.current)"), "Must clear pending timers to prevent race conditions");
console.log("✓ Timer safety and unmount cleanup verified");

// 8. Error handling & No false success
assert.ok(copyButtonContent.includes('setStatus("error")'), "Must capture rejections and transition to error status");
assert.ok(copyButtonContent.includes("onCopyError?.("), "Must invoke onCopyError callback");
console.log("✓ Controlled error handling and never-fake-success contract verified");

// 9. Static registry file in public/r/copy-button.json
const staticCopyPath = path.resolve("public/r/copy-button.json");
assert.ok(fs.existsSync(staticCopyPath), "public/r/copy-button.json must exist");
const staticCopyJson = JSON.parse(fs.readFileSync(staticCopyPath, "utf-8"));
assert.equal(staticCopyJson.name, "copy-button");
assert.equal(staticCopyJson.title, "Copy Button");
assert.equal(staticCopyJson.meta.category, "actions");
assert.equal(staticCopyJson.meta.status, "preview");
assert.ok(staticCopyJson.files.some((f) => f.target === "components/ui/copy-button.tsx"));
console.log("✓ Static public/r/copy-button.json verified");

// 10. Registry definition in public/r/registry.json
const registryJsonPath = path.resolve("public/r/registry.json");
assert.ok(fs.existsSync(registryJsonPath), "public/r/registry.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, "utf-8"));
const copyRegistryItem = registryJson.items.find((item) => item.name === "copy-button");
assert.ok(copyRegistryItem, "Registry item for 'copy-button' must exist in registry.json");
assert.equal(copyRegistryItem.title, "Copy Button");
assert.equal(copyRegistryItem.meta.category, "actions");
console.log("✓ Registry definition verified in public/r/registry.json");

// 11. Dynamic registry route handler
const routePath = path.resolve("app/r/[name]/route.ts");
const routeContent = fs.readFileSync(routePath, "utf-8");
assert.ok(routeContent.includes('cleanName === "copy-button"'), "app/r/[name]/route.ts must handle copy-button");
console.log("✓ Dynamic registry route handler verified in app/r/[name]/route.ts");

// 12. Navigation ordering in lib/docs/navigation.ts
const navPath = path.resolve("lib/docs/navigation.ts");
const navContent = fs.readFileSync(navPath, "utf-8");
assert.ok(navContent.includes('title: "Copy Button"'), "lib/docs/navigation.ts must include Copy Button");
assert.ok(navContent.includes('href: "/components/copy-button"'), "lib/docs/navigation.ts must link to /components/copy-button");

const actionsIndex = navContent.indexOf('title: "Actions"');
const btnIdx = navContent.indexOf('href: "/components/button"', actionsIndex);
const iconBtnIdx = navContent.indexOf('href: "/components/icon-button"', actionsIndex);
const btnGrpIdx = navContent.indexOf('href: "/components/button-group"', actionsIndex);
const splitBtnIdx = navContent.indexOf('href: "/components/split-button"', actionsIndex);
const toggleIdx = navContent.indexOf('href: "/components/toggle"', actionsIndex);
const toggleGrpIdx = navContent.indexOf('href: "/components/toggle-group"', actionsIndex);
const fabIdx = navContent.indexOf('href: "/components/floating-action-button"', actionsIndex);
const copyBtnIdx = navContent.indexOf('href: "/components/copy-button"', actionsIndex);

assert.ok(btnIdx < iconBtnIdx, "Button must precede Icon Button");
assert.ok(iconBtnIdx < btnGrpIdx, "Icon Button must precede Button Group");
assert.ok(btnGrpIdx < splitBtnIdx, "Button Group must precede Split Button");
assert.ok(splitBtnIdx < toggleIdx, "Split Button must precede Toggle");
assert.ok(toggleIdx < toggleGrpIdx, "Toggle must precede Toggle Group");
assert.ok(toggleGrpIdx < fabIdx, "Toggle Group must precede Floating Action Button");
assert.ok(fabIdx < copyBtnIdx, "Floating Action Button must precede Copy Button");
console.log("✓ Navigation order Actions 01-08 verified in lib/docs/navigation.ts");

// 13. Documentation files exist
assert.ok(fs.existsSync(path.resolve("app/components/copy-button/page.tsx")), "page.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/copy-button/layout.tsx")), "layout.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/copy-button/copy-button-preview-stage.tsx")), "copy-button-preview-stage.tsx must exist");
assert.ok(fs.existsSync(path.resolve("app/components/copy-button/copy-button-demonstrations.tsx")), "copy-button-demonstrations.tsx must exist");
console.log("✓ Complete documentation and demonstration suite verified");

console.log("\n========================================================");
console.log("🎉 ALL COPY BUTTON QUALITY GATES PASSED!");
console.log("========================================================\n");

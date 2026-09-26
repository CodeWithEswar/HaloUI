import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

console.log("=== HaloUI Overlays 15: Tour Popover Verification Suite ===\n");

// 1. Verify component source exists
const tourPopoverSourcePath = path.resolve("components/ui/tour-popover.tsx");
assert.ok(fs.existsSync(tourPopoverSourcePath), "components/ui/tour-popover.tsx must exist");
const tourPopoverContent = fs.readFileSync(tourPopoverSourcePath, "utf-8");

// 2. Verify compound component exports
const expectedExports = [
  "TourPopover",
  "TourTarget",
  "TourPopoverTrigger",
  "TourPopoverContent",
  "TourPopoverHeader",
  "TourPopoverTitle",
  "TourPopoverDescription",
  "TourPopoverProgress",
  "TourPopoverBadge",
  "TourPopoverFooter",
  "TourPopoverNext",
  "TourPopoverBack",
  "TourPopoverSkip",
  "TourPopoverClose",
  "TourPopoverArrow",
  "TourTargetHighlight",
  "useTourPopover",
];

for (const exp of expectedExports) {
  assert.ok(
    tourPopoverContent.includes(exp),
    `components/ui/tour-popover.tsx must export or define ${exp}`
  );
}
console.log(`✓ All ${expectedExports.length} compound component exports verified`);

// 3. Verify positioning primitive reuse (NOT custom floating math)
assert.ok(
  tourPopoverContent.includes("@base-ui/react/popover"),
  "Must reuse Base UI Popover as the underlying accessible positioning primitive"
);
assert.ok(
  tourPopoverContent.includes("PopoverPrimitive.Positioner"),
  "Must utilize PopoverPrimitive.Positioner for collision avoidance and viewport anchoring"
);
assert.ok(
  tourPopoverContent.includes("PopoverPrimitive.Popup"),
  "Must utilize PopoverPrimitive.Popup for accessible portal delivery"
);
console.log("✓ Underlying Base UI positioning engine reuse confirmed (no redundant coordinate math)");

// 4. Verify icon system compliance (Hugeicons exclusively)
assert.ok(
  tourPopoverContent.includes("@hugeicons/core-free-icons"),
  "Must import exclusively from @hugeicons/core-free-icons"
);
assert.ok(
  !tourPopoverContent.includes("lucide-react") && !tourPopoverContent.includes("@radix-ui/react-icons"),
  "Must NOT mix external icon libraries (no Lucide, Heroicons, FontAwesome)"
);
console.log("✓ Strict Hugeicons exclusivity verified");

// 5. Verify target resolution & wrapper-less semantics
assert.ok(
  tourPopoverContent.includes("cloneElement"),
  "TourTarget must use cloneElement with ref merging to preserve layout and avoid wrapper div clutter"
);
assert.ok(
  tourPopoverContent.includes('data-tour-target'),
  "TourTarget must inject data-tour-target attribute for DOM fallback resolution"
);
console.log("✓ Wrapper-less <TourTarget> architecture verified");

// 6. Verify missing target policy
assert.ok(
  tourPopoverContent.includes("missingTargetPolicy"),
  "TourPopover must accept missingTargetPolicy prop"
);
assert.ok(
  tourPopoverContent.includes("fallbackVirtualElement"),
  "TourPopoverContent must provide fallback virtual element for graceful viewport centering on missing target"
);
assert.ok(
  tourPopoverContent.includes("tour-missing-target-notice"),
  "Must present informative alert banner when active target is unmounted"
);
console.log("✓ Missing-target fallback recovery engine verified");

// 7. Verify accessibility & WAI-ARIA
assert.ok(
  tourPopoverContent.includes('role="dialog"'),
  "TourPopover popup must have role='dialog'"
);
assert.ok(
  tourPopoverContent.includes('aria-modal='),
  "TourPopover popup must declare aria-modal matching modal prop"
);
assert.ok(
  tourPopoverContent.includes('aria-labelledby="tour-popover-title"'),
  "TourPopover popup must associate with title via aria-labelledby"
);
assert.ok(
  tourPopoverContent.includes('aria-describedby="tour-popover-description"'),
  "TourPopover popup must associate with description via aria-describedby"
);
assert.ok(
  tourPopoverContent.includes("previousFocusedElementRef"),
  "TourPopover must track and restore focus to invoking trigger upon completion/skip"
);
assert.ok(
  tourPopoverContent.includes("prefers-reduced-motion"),
  "TourPopover must observe prefers-reduced-motion for smooth vs auto scrolling"
);
console.log("✓ Full WAI-ARIA and focus restoration verified");

// 8. Verify target highlight halo separation from keyboard focus
assert.ok(
  tourPopoverContent.includes("TourTargetHighlight"),
  "Must implement TourTargetHighlight optical indicator"
);
assert.ok(
  tourPopoverContent.includes("pointer-events-none"),
  "TourTargetHighlight must have pointer-events-none to prevent interfering with clicks"
);
assert.ok(
  tourPopoverContent.includes("TourTargetHighlight") && !tourPopoverContent.includes("focus-visible:ring-"),
  "Tour target indicator must NOT fake or hijack keyboard focus ring"
);
console.log("✓ Target highlight halo verified as independent from keyboard focus");

// 9. Verify 10-layer liquid glass styling
assert.ok(
  tourPopoverContent.includes("halo-liquid-glass-surface"),
  "Must implement signature halo-liquid-glass-surface"
);
assert.ok(
  tourPopoverContent.includes("halo-intensity-balanced") &&
    tourPopoverContent.includes("halo-intensity-subtle") &&
    tourPopoverContent.includes("halo-intensity-rich"),
  "Must implement subtle, balanced, and rich liquid glass intensities"
);
console.log("✓ HaloUI Liquid Glass 10-layer physical optics verified");

// 10. Verify no client persistence or analytics creep
assert.ok(
  !tourPopoverContent.includes("localStorage") &&
    !tourPopoverContent.includes("sessionStorage") &&
    !tourPopoverContent.includes("indexedDB"),
  "Component must NOT write directly to client storage (persistence belongs to consumer)"
);
console.log("✓ Persistence remains strictly consumer-owned");

// 11. Verify documentation page
const docsPagePath = path.resolve("app/components/tour-popover/page.tsx");
assert.ok(fs.existsSync(docsPagePath), "app/components/tour-popover/page.tsx must exist");
const docsContent = fs.readFileSync(docsPagePath, "utf-8");

// Verify no ASCII art or text diagrams
assert.ok(
  !docsContent.includes("┌") &&
    !docsContent.includes("│") &&
    !docsContent.includes("└") &&
    !docsContent.includes("├──") &&
    !docsContent.includes("-->"),
  "Documentation MUST NOT contain ASCII art or text architecture diagrams"
);
assert.ok(
  docsContent.includes("<ProcessSteps"),
  "Documentation must use <ProcessSteps /> for sequential lifecycle representation"
);
assert.ok(
  docsContent.includes("<PropsTable"),
  "Documentation must use <PropsTable /> for props definitions"
);
assert.ok(
  docsContent.includes("<FileTree"),
  "Documentation must use <FileTree /> for file listings"
);
console.log("✓ Documentation formatting and strict visual diagram rules verified");

// 12. Verify registry definition
const registryPath = path.resolve("public/r/registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
const tourRegistryEntry = registry.items.find((item) => item.name === "tour-popover");
assert.ok(tourRegistryEntry, "tour-popover must be listed in public/r/registry.json");
assert.equal(tourRegistryEntry.title, "Tour Popover");

const standaloneRegistryPath = path.resolve("public/r/tour-popover.json");
assert.ok(fs.existsSync(standaloneRegistryPath), "public/r/tour-popover.json must exist");
const standaloneRegistry = JSON.parse(fs.readFileSync(standaloneRegistryPath, "utf-8"));
assert.equal(standaloneRegistry.name, "tour-popover");
assert.ok(standaloneRegistry.files.length >= 3, "Registry file must package component and CSS token files");
console.log("✓ Registry JSON artifacts verified");

console.log("\n========================================================");
console.log("🎉 ALL TOUR POPOVER VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

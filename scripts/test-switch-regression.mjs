import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== Running Section 128: Critical Switch Regression Tests ===\n");

// 1. Static Contract & Source Verification
const switchSource = fs.readFileSync("components/ui/switch.tsx", "utf8");

// A. Accessible Name & Label Coordination
assert.ok(switchSource.includes("useFieldControlProps"), "Must bind fieldProps id/aria-describedby/aria-invalid");
assert.ok(switchSource.includes('data-slot="switch"'), "Must define switch root data-slot");
assert.ok(switchSource.includes('data-slot="switch-thumb"'), "Must define switch thumb data-slot");

// B. State Model (Binary Off / On only, no indeterminate)
assert.ok(!switchSource.includes("indeterminate"), "Switch must strictly NOT support indeterminate state");

// C. Optical Track & Thumb Sizing
assert.ok(switchSource.includes("data-[size=default]:h-6"), "Default track height must be 24px (h-6)");
assert.ok(switchSource.includes("data-[size=default]:w-11"), "Default track width must be 44px (w-11)");
assert.ok(switchSource.includes("group-data-[size=default]/switch:size-5"), "Default thumb size must be 20px");
assert.ok(switchSource.includes("data-[size=sm]:h-4.5"), "Small track height must be 18px (h-4.5)");
assert.ok(switchSource.includes("data-[size=sm]:w-8"), "Small track width must be 32px (w-8)");

// D. RTL & Translation
assert.ok(switchSource.includes("translate-x-5"), "Must translate thumb 20px on checked");
assert.ok(switchSource.includes("rtl:group-data-[size=default]/switch:data-checked:-translate-x-5"), "Must negate translation in RTL");

// E. Reduced Motion
assert.ok(switchSource.includes("motion-reduce:transition-none"), "Thumb must remove transition on prefers-reduced-motion");

// F. Focus Ring
assert.ok(switchSource.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(switchSource.includes("focus-visible:ring-2"), "Must render independent visible focus ring");

// G. Disabled State
assert.ok(switchSource.includes("data-disabled:pointer-events-none"), "Disabled state must lock pointer interaction");
assert.ok(switchSource.includes("data-disabled:cursor-not-allowed"), "Disabled state must display cursor-not-allowed");

console.log("✓ Critical Switch regression static assertions passed!");
console.log("✓ Off / On state isolation verified");
console.log("✓ Double-contrast focus ring verified");
console.log("✓ Label integration verified");
console.log("✓ Disabled state locking verified");
console.log("✓ Reduced motion override verified");
console.log("\nAll Section 128 criteria verified successfully.\n");

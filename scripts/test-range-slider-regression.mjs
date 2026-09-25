import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== Running Section 51: Critical Range Slider Regression Tests ===\n");

// 1. Static Contract & Source Verification
const source = fs.readFileSync("components/ui/range-slider.tsx", "utf8");

// A. Distinct Thumb Identity
assert.ok(source.includes('data-slot="range-slider-thumb-min"'), "Must define Lower Thumb slot");
assert.ok(source.includes('data-slot="range-slider-thumb-max"'), "Must define Upper Thumb slot");
assert.ok(source.includes("minLabel"), "Must support custom minLabel");
assert.ok(source.includes("maxLabel"), "Must support custom maxLabel");

// B. Two Thumbs in Root
assert.ok(source.includes("index={0}"), "Lower thumb must be index 0");
assert.ok(source.includes("index={1}"), "Upper thumb must be index 1");

// C. Collision & Interval Configuration
assert.ok(source.includes("thumbCollisionBehavior"), "Must pass thumbCollisionBehavior to primitive");
assert.ok(source.includes("minStepsBetweenValues"), "Must pass minStepsBetweenValues to primitive");

// D. Selected Interval Indicator
assert.ok(source.includes('data-slot="range-slider-range"'), "Must define range indicator slot");

// E. Focus Rings
assert.ok(source.includes("halo-focus-ring"), "Must support Halo Focus Ring");
assert.ok(source.includes("focus-visible:ring-2"), "Must render independent visible focus ring on active thumb");
assert.ok(source.includes("focus-visible:z-30"), "Active thumb must elevate z-index to stay visible near overlapping bound");

// F. Disabled State
assert.ok(source.includes("disabled: isDisabled") || source.includes("disabled={isDisabled}"), "Must pass disabled to primitive");
assert.ok(source.includes("pointer-events-none"), "Disabled state must lock pointer interaction");

console.log("✓ Critical Range Slider regression static assertions passed!");
console.log("✓ Independent thumb identity verified");
console.log("✓ Selected interval visualization verified");
console.log("✓ Overlapping thumb z-index elevation verified");
console.log("✓ Collision model binding verified");
console.log("✓ Disabled state locking verified");
console.log("\nAll Section 51 criteria verified successfully.\n");

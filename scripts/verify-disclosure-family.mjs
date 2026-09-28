import fs from "node:fs";

console.log("=== Verifying Shared Disclosure Family (Accordion & Collapsible) ===");

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failures++;
  }
}

// 1. Verify Navigation sequence
console.log("\n1. Verifying Navigation Order...");
const navContent = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
const accordionIndex = navContent.indexOf('href: "/components/accordion"');
const collapsibleIndex = navContent.indexOf('href: "/components/collapsible"');

assert(accordionIndex !== -1, "Accordion is in navigation");
assert(collapsibleIndex !== -1, "Collapsible is in navigation");
assert(accordionIndex < collapsibleIndex, "Accordion precedes Collapsible in navigation (Data Display 15 -> 16)");

// 2. Verify Component Architectures
console.log("\n2. Verifying Optical and Responsive Consistency...");
const accSource = fs.readFileSync("components/ui/accordion.tsx", "utf-8");
const colSource = fs.readFileSync("components/ui/collapsible.tsx", "utf-8");

assert(accSource.includes("variant === \"glass\"") && colSource.includes("variant === \"glass\""), "Both support restrained Liquid Glass variant");
assert(accSource.includes("@container/accordion") && colSource.includes("@container/collapsible"), "Both declare container query contexts");
assert(accSource.includes("focus-visible:ring-2") && colSource.includes("focus-visible:ring-2"), "Both implement independent Halo Focus Ring");
assert(accSource.includes("break-words") && colSource.includes("break-words"), "Both protect long trigger headers with break-words");

// 3. Verify Registry Availability
console.log("\n3. Verifying Registry Items...");
const registry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const hasAccordion = registry.items.some(i => i.name === "accordion");
const hasCollapsible = registry.items.some(i => i.name === "collapsible");

assert(hasAccordion, "registry.json includes accordion");
assert(hasCollapsible, "registry.json includes collapsible");

console.log("\n=======================================================");
if (failures === 0) {
  console.log("✓ SHARED DISCLOSURE FAMILY REGRESSION PASSED!");
  process.exit(0);
} else {
  console.error(`✗ ${failures} DISCLOSURE FAMILY REGRESSION CHECKS FAILED!`);
  process.exit(1);
}

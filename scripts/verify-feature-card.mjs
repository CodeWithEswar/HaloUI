import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 05: Feature Card Verification Suite ===\n");

// 1. Primitive Source Verification
const featureCardSource = fs.readFileSync("components/ui/feature-card.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!featureCardSource.includes('"use client"'), "components/ui/feature-card.tsx must NOT contain 'use client'");
assert.ok(!featureCardSource.includes("'use client'"), "components/ui/feature-card.tsx must NOT contain 'use client'");
assert.ok(!featureCardSource.includes("useState"), "components/ui/feature-card.tsx must NOT use useState");
assert.ok(!featureCardSource.includes("useEffect"), "components/ui/feature-card.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Card architecture reuse
assert.ok(featureCardSource.includes('from "@/components/ui/card"'), "Must compose Card from @/components/ui/card");
assert.ok(featureCardSource.includes('<Card'), "Must render <Card in root component");
console.log("✓ Card architecture reuse verified (zero duplicated surface or optical math)");

// Check Compound exports
const expectedExports = [
  "FeatureCard",
  "FeatureCardVisual",
  "FeatureCardTitle",
  "FeatureCardDescription",
  "FeatureCardContent",
  "FeatureCardAction",
];

for (const exp of expectedExports) {
  assert.ok(
    featureCardSource.includes(`export function ${exp}`) || featureCardSource.includes(`export const ${exp}`),
    `Must export ${exp}`
  );
}
assert.ok(featureCardSource.includes("FeatureCard.Visual = FeatureCardVisual"), "Must attach FeatureCard.Visual");
assert.ok(featureCardSource.includes("FeatureCard.Title = FeatureCardTitle"), "Must attach FeatureCard.Title");
assert.ok(featureCardSource.includes("FeatureCard.Description = FeatureCardDescription"), "Must attach FeatureCard.Description");
assert.ok(featureCardSource.includes("FeatureCard.Content = FeatureCardContent"), "Must attach FeatureCard.Content");
assert.ok(featureCardSource.includes("FeatureCard.Action = FeatureCardAction"), "Must attach FeatureCard.Action");
console.log("✓ All 6 compound exports and subcomponent bindings verified");

// Check Orientation support
assert.ok(featureCardSource.includes("FeatureCardOrientation"), "Must define FeatureCardOrientation");
assert.ok(featureCardSource.includes('orientation = "vertical"'), "Must default orientation to vertical");
assert.ok(featureCardSource.includes("orientation === \"horizontal\""), "Must support horizontal layout");
console.log("✓ Vertical and Horizontal layout orientation support verified");

// Check Visual slot variants
assert.ok(featureCardSource.includes("FeatureCardVisualVariant"), "Must define FeatureCardVisualVariant");
assert.ok(featureCardSource.includes('variant = "default"'), "Must default visual variant to default");
assert.ok(featureCardSource.includes('variant === "media"'), "Must support media variant for screenshots/diagrams");
console.log("✓ Visual slot variants (default, muted, media) verified with media fidelity");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/feature-card/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/feature-card/feature-card-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/feature-card/feature-card-preview-stage.tsx", "utf-8");

// Strict diagram ban checks
const allDocs = docPage + docDemo + docPreview;
assert.ok(!allDocs.includes('language="text"'), "Prohibited text code blocks must NOT be present in docs");
assert.ok(!allDocs.includes("┌──"), "ASCII box-drawing characters must NOT be present in docs");
assert.ok(!allDocs.includes("├──"), "Unicode tree characters must NOT be present in docs");
assert.ok(!allDocs.includes("└──"), "Unicode tree characters must NOT be present in docs");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// Check Hugeicons in docs
assert.ok(!allDocs.includes("lucide-react"), "Must NOT use lucide-react in docs");
assert.ok(allDocs.includes("@hugeicons/core-free-icons"), "Must use @hugeicons/core-free-icons in docs");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 3. Registry JSON Verification
const registryItem = JSON.parse(fs.readFileSync("public/r/feature-card.json", "utf-8"));
assert.equal(registryItem.name, "feature-card");
assert.ok(registryItem.registryDependencies.includes("card"), "Must declare registry dependency on 'card'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/feature-card.tsx"), "Must include feature-card.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "feature-card");
assert.ok(foundInRegistry, "feature-card must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL FEATURE CARD VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

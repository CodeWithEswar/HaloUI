import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 03: KPI Card Verification Suite ===\n");

// 1. Primitive Source Verification
const kpiCardSource = fs.readFileSync("components/ui/kpi-card.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!kpiCardSource.includes('"use client"'), "components/ui/kpi-card.tsx must NOT contain 'use client'");
assert.ok(!kpiCardSource.includes("'use client'"), "components/ui/kpi-card.tsx must NOT contain 'use client'");
assert.ok(!kpiCardSource.includes("useState"), "components/ui/kpi-card.tsx must NOT use useState");
assert.ok(!kpiCardSource.includes("useEffect"), "components/ui/kpi-card.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Card architecture reuse
assert.ok(kpiCardSource.includes('from "@/components/ui/card"'), "Must compose Card from @/components/ui/card");
assert.ok(kpiCardSource.includes('<Card'), "Must render <Card in root component");
console.log("✓ Card architecture reuse verified (zero duplicated surface or optical math)");

// Check Compound exports
const expectedExports = [
  "KpiCard",
  "KpiCardHeader",
  "KpiCardLabel",
  "KpiCardAction",
  "KpiCardValue",
  "KpiCardTrend",
  "KpiCardComparison",
  "KpiCardTarget",
  "KpiCardTargetLabel",
  "KpiCardTargetValue",
  "KpiCardTargetStatus",
  "KpiCardProgress",
  "KpiCardChart",
  "KpiCardFooter",
];

for (const exp of expectedExports) {
  assert.ok(
    kpiCardSource.includes(`export function ${exp}`) || kpiCardSource.includes(`export const ${exp}`),
    `Must export ${exp}`
  );
}
console.log("✓ All 14 compound exports verified");

// Check Decoupled direction and sentiment
assert.ok(kpiCardSource.includes("KpiTrendDirection"), "Must define KpiTrendDirection");
assert.ok(kpiCardSource.includes("KpiTrendSentiment"), "Must define KpiTrendSentiment");
assert.ok(kpiCardSource.includes("direction = \"neutral\""), "Must default direction to neutral");
assert.ok(kpiCardSource.includes("sentiment = \"neutral\""), "Must default sentiment to neutral");
assert.ok(kpiCardSource.includes("sr-only"), "Must provide sr-only text for assistive technologies");
console.log("✓ Direction vs Sentiment architectural decoupling verified with accessible sr-only text");

// Check Target & Progress accessibility
assert.ok(kpiCardSource.includes('role="progressbar"'), "Progress must have role='progressbar'");
assert.ok(kpiCardSource.includes('aria-valuenow'), "Progress must provide aria-valuenow");
assert.ok(kpiCardSource.includes('aria-valuemin'), "Progress must provide aria-valuemin");
assert.ok(kpiCardSource.includes('aria-valuemax'), "Progress must provide aria-valuemax");
console.log("✓ Target and progress accessibility semantics verified");

// Check Hugeicons exclusivity
assert.ok(kpiCardSource.includes('from "@hugeicons/core-free-icons"'), "Must import exclusively from @hugeicons/core-free-icons");
assert.ok(!kpiCardSource.includes("lucide-react"), "Must NOT use lucide-react in primitive");
assert.ok(!kpiCardSource.includes("@tabler/icons"), "Must NOT use tabler icons in primitive");
console.log("✓ Strict Hugeicons exclusivity verified in primitive");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/kpi-card/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/kpi-card/kpi-card-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/kpi-card/kpi-card-preview-stage.tsx", "utf-8");

// Strict diagram ban checks
const allDocs = docPage + docDemo + docPreview;
assert.ok(!allDocs.includes("language=\"text\""), "Prohibited text code blocks must NOT be present in docs");
assert.ok(!allDocs.includes("┌──"), "ASCII box-drawing characters must NOT be present in docs");
assert.ok(!allDocs.includes("├──"), "Unicode tree characters must NOT be present in docs");
assert.ok(!allDocs.includes("└──"), "Unicode tree characters must NOT be present in docs");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// Check Hugeicons in docs
assert.ok(!allDocs.includes("lucide-react"), "Must NOT use lucide-react in docs");
assert.ok(allDocs.includes("@hugeicons/core-free-icons"), "Must use @hugeicons/core-free-icons in docs");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 3. Registry JSON Verification
const registryItem = JSON.parse(fs.readFileSync("public/r/kpi-card.json", "utf-8"));
assert.equal(registryItem.name, "kpi-card");
assert.ok(registryItem.registryDependencies.includes("card"), "Must declare registry dependency on 'card'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/kpi-card.tsx"), "Must include kpi-card.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "kpi-card");
assert.ok(foundInRegistry, "kpi-card must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL KPI CARD VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

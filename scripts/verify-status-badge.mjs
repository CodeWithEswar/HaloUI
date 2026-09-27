import assert from "node:assert/strict";
import fs from "node:fs";

console.log("=== HaloUI Data Display 07: Status Badge Verification Suite ===\n");

// 1. Primitive Source Verification
const statusBadgeSource = fs.readFileSync("components/ui/status-badge.tsx", "utf-8");

// Check Server Component compatibility: zero "use client", zero React state hooks
assert.ok(!statusBadgeSource.includes('"use client"'), "components/ui/status-badge.tsx must NOT contain 'use client'");
assert.ok(!statusBadgeSource.includes("'use client'"), "components/ui/status-badge.tsx must NOT contain 'use client'");
assert.ok(!statusBadgeSource.includes("useState"), "components/ui/status-badge.tsx must NOT use useState");
assert.ok(!statusBadgeSource.includes("useEffect"), "components/ui/status-badge.tsx must NOT use useEffect");
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// Check Badge architecture reuse
assert.ok(statusBadgeSource.includes('from "@/components/ui/badge"'), "Must import Badge from @/components/ui/badge");
assert.ok(statusBadgeSource.includes('<Badge'), "Must render <Badge in root component");
console.log("✓ Badge architecture reuse verified (specializes Badge without duplicating geometry)");

// Check Exported Types & Primitive
assert.ok(statusBadgeSource.includes("export function StatusBadge"), "Must export StatusBadge");
assert.ok(statusBadgeSource.includes("export type StatusTone"), "Must export StatusTone");
assert.ok(statusBadgeSource.includes("export type StatusSize"), "Must export StatusSize");
assert.ok(statusBadgeSource.includes("export interface StatusBadgeProps"), "Must export StatusBadgeProps");
console.log("✓ StatusBadge exports and types verified");

// Check Decoupled Semantic Tones
const tones = ["neutral", "positive", "warning", "critical", "info"];
for (const tone of tones) {
  assert.ok(statusBadgeSource.includes(`tone === "${tone}"`), `Must support tone '${tone}'`);
}
console.log("✓ All 5 decoupled semantic tones (neutral, positive, warning, critical, info) verified");

// Check Color Independence & Supplementary Indicators
assert.ok(statusBadgeSource.includes('aria-hidden="true"'), "Indicator dot and icon must be marked aria-hidden='true'");
assert.ok(statusBadgeSource.includes("data-slot=\"status-badge-dot\""), "Must support dot indicator slot");
console.log("✓ Color independence & accessible supplementary indicators verified");

// Check Sizing scales
assert.ok(statusBadgeSource.includes('size === "sm"'), "Must support small size");
assert.ok(statusBadgeSource.includes('size === "lg"'), "Must support large size");
console.log("✓ Sizing scales (sm, default, lg) verified");

// 2. Documentation Pages Verification
const docPage = fs.readFileSync("app/components/status-badge/page.tsx", "utf-8");
const docDemo = fs.readFileSync("app/components/status-badge/status-badge-demonstrations.tsx", "utf-8");
const docPreview = fs.readFileSync("app/components/status-badge/status-badge-preview-stage.tsx", "utf-8");

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
const registryItem = JSON.parse(fs.readFileSync("public/r/status-badge.json", "utf-8"));
assert.equal(registryItem.name, "status-badge");
assert.ok(registryItem.registryDependencies.includes("badge"), "Must declare registry dependency on 'badge'");
assert.ok(registryItem.files.some(f => f.path === "components/ui/status-badge.tsx"), "Must include status-badge.tsx");

const globalRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
const foundInRegistry = globalRegistry.items.find(i => i.name === "status-badge");
assert.ok(foundInRegistry, "status-badge must be listed in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL STATUS BADGE VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

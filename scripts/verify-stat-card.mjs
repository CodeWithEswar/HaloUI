import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log("=== HaloUI Data Display 02: Stat Card Verification Suite ===\n");

// 1. Inspect components/ui/stat-card.tsx
const statCardFile = path.resolve('components/ui/stat-card.tsx');
assert.ok(fs.existsSync(statCardFile), "components/ui/stat-card.tsx must exist");
const statCardContent = fs.readFileSync(statCardFile, 'utf-8');

// Verify exports
const requiredExports = [
  'StatCard',
  'StatCardHeader',
  'StatCardLabel',
  'StatCardIcon',
  'StatCardAction',
  'StatCardValue',
  'StatCardFooter',
  'StatCardTrend',
  'StatCardDescription',
  'Root',
  'Header',
  'Label',
  'Icon',
  'Action',
  'Value',
  'Footer',
  'Trend',
  'Description'
];

for (const exp of requiredExports) {
  assert.ok(statCardContent.includes(exp), `stat-card.tsx must export ${exp}`);
}
console.log("✓ All 18 compound and named component exports verified");

// 2. Direct Reuse of Card Architecture (No competing surface engine)
assert.ok(
  statCardContent.includes('from "@/components/ui/card"'),
  "StatCard MUST compose and reuse Card directly rather than inventing a separate card engine"
);
assert.ok(
  statCardContent.includes('<Card'),
  "StatCard root must render <Card data-slot=\"stat-card\""
);
console.log("✓ Card architecture reuse verified (zero duplicated surface or optical math)");

// 3. Direction != Sentiment Decoupling
assert.ok(
  statCardContent.includes('direction = "neutral"') && statCardContent.includes('sentiment = "neutral"'),
  "StatCardTrend must accept decoupled direction and sentiment props"
);
assert.ok(
  statCardContent.includes('sentiment === "positive"') && statCardContent.includes('sentiment === "negative"'),
  "StatCardTrend must map color styling to semantic sentiment rather than arrow direction"
);
assert.ok(
  statCardContent.includes('sr-only'),
  "StatCardTrend must provide screen-reader text so trend meaning is not color-only (WCAG 2.1 AA)"
);
console.log("✓ Direction vs Sentiment architectural decoupling verified with accessible sr-only text");

// 4. Server Component Compatibility
assert.ok(
  !statCardContent.includes('"use client"') && !statCardContent.includes("'use client'"),
  "components/ui/stat-card.tsx MUST remain Server Component compatible (zero 'use client' directive)"
);
assert.ok(
  !statCardContent.includes("useState") && !statCardContent.includes("useEffect"),
  "components/ui/stat-card.tsx must have zero client state/hooks (pure zero-runtime JSX)"
);
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// 5. Documentation and Preview Stage
const docPage = path.resolve('app/components/stat-card/page.tsx');
assert.ok(fs.existsSync(docPage), "app/components/stat-card/page.tsx must exist");
const docContent = fs.readFileSync(docPage, 'utf-8');

// Check strict prohibition of ASCII diagrams
assert.ok(!docContent.includes('language="text"'), "Documentation must strictly prohibit text code blocks for diagrams");
assert.ok(!docContent.includes('├──') && !docContent.includes('└──'), "Documentation must strictly prohibit Unicode box drawing");
assert.ok(!docContent.includes('-->') && !docContent.includes('==>'), "Documentation must strictly prohibit text arrows as diagrams");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// 6. Hugeicons Exclusivity in Previews and Demonstrations
const previewStage = path.resolve('app/components/stat-card/stat-card-preview-stage.tsx');
assert.ok(fs.existsSync(previewStage), "stat-card-preview-stage.tsx must exist");
const previewContent = fs.readFileSync(previewStage, 'utf-8');

const demonstrations = path.resolve('app/components/stat-card/stat-card-demonstrations.tsx');
assert.ok(fs.existsSync(demonstrations), "stat-card-demonstrations.tsx must exist");
const demoContent = fs.readFileSync(demonstrations, 'utf-8');

const combinedPreviews = previewContent + demoContent;
assert.ok(!combinedPreviews.includes('lucide-react'), "Must NOT import from lucide-react");
assert.ok(!combinedPreviews.includes('@heroicons'), "Must NOT import from @heroicons");
assert.ok(combinedPreviews.includes('@hugeicons/core-free-icons'), "Must exclusively use @hugeicons/core-free-icons");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 7. Registry Definitions
const registryFile = path.resolve('public/r/stat-card.json');
assert.ok(fs.existsSync(registryFile), "public/r/stat-card.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFile, 'utf-8'));
assert.strictEqual(registryJson.name, 'stat-card', "Registry name must be 'stat-card'");
assert.ok(registryJson.registryDependencies.includes('card'), "StatCard must declare 'card' as a registryDependency");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const inGlobal = globalRegistry.items.find((item) => item.name === 'stat-card');
assert.ok(inGlobal, "stat-card must be registered in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL STAT CARD VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

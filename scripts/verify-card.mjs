import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log("=== HaloUI Data Display 01: Card Verification Suite ===\n");

// 1. Inspect components/ui/card.tsx
const cardFile = path.resolve('components/ui/card.tsx');
assert.ok(fs.existsSync(cardFile), "components/ui/card.tsx must exist");
const cardContent = fs.readFileSync(cardFile, 'utf-8');

// Verify exports
const requiredExports = [
  'Card',
  'CardHeader',
  'CardTitle',
  'CardDescription',
  'CardAction',
  'CardContent',
  'CardFooter',
  'Root',
  'Header',
  'Title',
  'Description',
  'Action',
  'Content',
  'Footer'
];

for (const exp of requiredExports) {
  assert.ok(cardContent.includes(exp), `card.tsx must export ${exp}`);
}
console.log("✓ All 14 compound and named component exports verified");

// 2. Server Component Compatibility
assert.ok(
  !cardContent.includes('"use client"') && !cardContent.includes("'use client'"),
  "components/ui/card.tsx MUST remain Server Component compatible (zero 'use client' directive)"
);
assert.ok(
  !cardContent.includes("useState") && !cardContent.includes("useEffect"),
  "components/ui/card.tsx must have zero client state/hooks (pure zero-runtime JSX)"
);
console.log("✓ Server Component compatibility verified (zero client JS overhead)");

// 3. Material Strategy: Restrained for Data Display
assert.ok(
  !cardContent.includes("group/card halo-liquid-glass-surface"),
  "Card must NOT blindly apply heavy overlay glass (halo-liquid-glass-surface) to all surfaces"
);
assert.ok(
  cardContent.includes('intensity = "subtle"'),
  "Card must default to 'subtle' intensity for visual calm in dense dashboards"
);
assert.ok(
  cardContent.includes('variant = "default"'),
  "Card must support standard variants"
);
assert.ok(
  cardContent.includes('asChild = false'),
  "Card must support asChild for semantic polymorphism"
);
console.log("✓ Restrained Data Display material strategy verified (subtle default for dense dashboards)");

// 4. Static Card Neutrality
assert.ok(
  !cardContent.includes('tabIndex={0}') && !cardContent.includes('role="button"'),
  "Static Card must never force interactive roles or tabIndex on ordinary containers"
);
assert.ok(
  cardContent.includes("interactive = false"),
  "Card must default interactive to false"
);
console.log("✓ Static card semantic neutrality verified (no accidental interactive roles)");

// 5. Documentation and Preview Stage
const docPage = path.resolve('app/components/card/page.tsx');
assert.ok(fs.existsSync(docPage), "app/components/card/page.tsx must exist");
const docContent = fs.readFileSync(docPage, 'utf-8');

// Check strict prohibition of ASCII diagrams
assert.ok(!docContent.includes('language="text"'), "Documentation must strictly prohibit text code blocks for diagrams");
assert.ok(!docContent.includes('├──') && !docContent.includes('└──'), "Documentation must strictly prohibit Unicode box drawing");
assert.ok(!docContent.includes('-->') && !docContent.includes('==>'), "Documentation must strictly prohibit text arrows as diagrams");
console.log("✓ Documentation visual neutrality and strict diagram rules verified");

// 6. Hugeicons Exclusivity in Previews and Demonstrations
const previewStage = path.resolve('app/components/card/card-preview-stage.tsx');
assert.ok(fs.existsSync(previewStage), "card-preview-stage.tsx must exist");
const previewContent = fs.readFileSync(previewStage, 'utf-8');

const demonstrations = path.resolve('app/components/card/card-demonstrations.tsx');
assert.ok(fs.existsSync(demonstrations), "card-demonstrations.tsx must exist");
const demoContent = fs.readFileSync(demonstrations, 'utf-8');

const combinedPreviews = previewContent + demoContent;
assert.ok(!combinedPreviews.includes('lucide-react'), "Must NOT import from lucide-react");
assert.ok(!combinedPreviews.includes('@heroicons'), "Must NOT import from @heroicons");
assert.ok(combinedPreviews.includes('@hugeicons/core-free-icons'), "Must exclusively use @hugeicons/core-free-icons");
console.log("✓ Strict Hugeicons exclusivity verified in preview stages and demonstrations");

// 7. Registry Definitions
const registryFile = path.resolve('public/r/card.json');
assert.ok(fs.existsSync(registryFile), "public/r/card.json must exist");
const registryJson = JSON.parse(fs.readFileSync(registryFile, 'utf-8'));
assert.strictEqual(registryJson.name, 'card', "Registry name must be 'card'");
assert.ok(registryJson.dependencies.includes('@radix-ui/react-slot'), "Registry must declare @radix-ui/react-slot dependency");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const inGlobal = globalRegistry.items.find((item) => item.name === 'card');
assert.ok(inGlobal, "card must be registered in public/r/registry.json");
console.log("✓ Registry JSON definitions verified");

console.log("\n========================================================");
console.log("🎉 ALL CARD VERIFICATION CHECKS PASSED!");
console.log("========================================================\n");

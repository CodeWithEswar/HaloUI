import fs from 'node:fs';

console.log("=== Running Combined Regression: Empty State (19) & Key Value (20) ===\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Semantic Differentiation
console.log("1. Semantic Role & Purpose Differentiation:");
const emptyCode = fs.readFileSync('components/ui/empty-state.tsx', 'utf-8');
const kvCode = fs.readFileSync('components/ui/key-value.tsx', 'utf-8');

assert(emptyCode.includes('EmptyStateVisual') && emptyCode.includes('EmptyStateActions'), 'EmptyState provides full guidance anatomy with visual & action slots');
assert(kvCode.includes('KeyValueLabel') && kvCode.includes('KeyValueValue'), 'KeyValue provides compact label/value pair presentation');

// 2. Container Query Boundaries
console.log("\n2. Independent Container Query Boundaries:");
assert(emptyCode.includes('@container/empty-state'), 'EmptyState isolated by @container/empty-state');
assert(kvCode.includes('@container/key-value'), 'KeyValue isolated by @container/key-value');

// 3. Liquid Glass Architecture
console.log("\n3. HaloUI Liquid Glass Compliance:");
assert(emptyCode.includes('halo-intensity-subtle'), 'EmptyState applies subtle outer glass boundary');
assert(kvCode.includes('halo-intensity-subtle'), 'KeyValue applies restrained subtle glass when standalone');

// 4. Registry Parity
console.log("\n4. Registry & Distribution Parity:");
const registry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
assert(registry.items.some(i => i.name === 'empty-state'), 'empty-state in registry.json');
assert(registry.items.some(i => i.name === 'key-value'), 'key-value in registry.json');

// 5. Documentation Navigation Parity
console.log("\n5. Docs Navigation Parity:");
const nav = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(nav.includes('/components/empty-state') && nav.includes('/components/key-value'), 'Both components sequential in docsNavigation');

console.log(`\n=== Combined Regression Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("Empty State & Key Value combined regression PASSED!\n");
}

import fs from 'node:fs';

console.log("=== HALOUI CALLOUT VERIFICATION SUITE ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    passed++;
  } else {
    console.error(`✗ ${message}`);
    failed++;
  }
}

// 1. Files existence
assert(fs.existsSync('components/ui/callout.tsx'), "Callout component file exists");
assert(fs.existsSync('app/components/callout/layout.tsx'), "Callout docs layout exists");
assert(fs.existsSync('app/components/callout/page.tsx'), "Callout docs page exists");
assert(fs.existsSync('app/components/callout/callout-preview-stage.tsx'), "Callout preview stage exists");
assert(fs.existsSync('app/components/callout/callout-demonstrations.tsx'), "Callout demonstrations exists");
assert(fs.existsSync('public/r/callout.json'), "Callout registry JSON exists");

// 2. Component content checks
const calloutSrc = fs.readFileSync('components/ui/callout.tsx', 'utf-8');
assert(calloutSrc.includes('export function Callout'), "Exports Callout component");
assert(calloutSrc.includes('export function CalloutTitle'), "Exports CalloutTitle component");
assert(calloutSrc.includes('export function CalloutContent'), "Exports CalloutContent component");
assert(calloutSrc.includes('export function CalloutIcon'), "Exports CalloutIcon component");
assert(calloutSrc.includes('export const calloutVariants'), "Exports calloutVariants");
assert(calloutSrc.includes('@container/callout'), "Includes @container/callout container query");
assert(calloutSrc.includes('@hugeicons/core-free-icons'), "Imports from @hugeicons/core-free-icons");
assert(!calloutSrc.includes('lucide-react'), "Strictly NO lucide-react in callout.tsx");
assert(!calloutSrc.includes('window.innerWidth'), "Strictly NO window.innerWidth JS responsive detection");

// 3. Registry checks
const registryItem = JSON.parse(fs.readFileSync('public/r/callout.json', 'utf-8'));
assert(registryItem.name === 'callout', "Registry item name is callout");
assert(registryItem.dependencies.includes('@hugeicons/react'), "Registry dependencies include @hugeicons/react");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const foundInRegistry = globalRegistry.items.some(item => item.name === 'callout');
assert(foundInRegistry, "Callout is registered in public/r/registry.json");

// 4. Navigation check
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSrc.includes('/components/callout'), "Callout is registered in lib/docs/navigation.ts");

// 5. Preview stage dock placement check
const stageSrc = fs.readFileSync('app/components/callout/callout-preview-stage.tsx', 'utf-8');
assert(stageSrc.includes('controls='), "Callout preview stage passes controls to PreviewStageShell controls prop");

// 6. Test Live Route HTTP 200
console.log("Checking live dev server at http://localhost:3000/components/callout...");
try {
  const res = await fetch('http://localhost:3000/components/callout');
  assert(res.status === 200, `Live route /components/callout returned HTTP ${res.status}`);
} catch (err) {
  assert(false, `Could not reach live route: ${err.message}`);
}

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);

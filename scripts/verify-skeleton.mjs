import fs from 'node:fs';

console.log("=== HALOUI SKELETON VERIFICATION SUITE ===");

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
assert(fs.existsSync('components/ui/skeleton.tsx'), "Skeleton component file exists");
assert(fs.existsSync('app/components/skeleton/layout.tsx'), "Skeleton docs layout exists");
assert(fs.existsSync('app/components/skeleton/page.tsx'), "Skeleton docs page exists");
assert(fs.existsSync('app/components/skeleton/skeleton-preview-stage.tsx'), "Skeleton preview stage exists");
assert(fs.existsSync('app/components/skeleton/skeleton-demonstrations.tsx'), "Skeleton demonstrations exists");
assert(fs.existsSync('public/r/skeleton.json'), "Skeleton registry JSON exists");

// 2. Component content checks
const skeletonSrc = fs.readFileSync('components/ui/skeleton.tsx', 'utf-8');
assert(skeletonSrc.includes('export function Skeleton'), "Exports Skeleton component");
assert(skeletonSrc.includes('export const skeletonVariants'), "Exports skeletonVariants");
assert(skeletonSrc.includes('animate-pulse'), "Implements pulse animation variant");
assert(skeletonSrc.includes('halo-shimmer'), "Implements shimmer animation variant");
assert(skeletonSrc.includes('motion-reduce:animate-none'), "Halts animation under motion-reduce");
assert(skeletonSrc.includes('aria-hidden'), "Supports aria-hidden accessibility state");
assert(!skeletonSrc.includes('backdrop-blur'), "Zero per-fragment backdrop-blur layers");
assert(!skeletonSrc.includes('window.innerWidth'), "Strictly NO window.innerWidth JS responsive detection");
assert(!skeletonSrc.includes('isMobile'), "Strictly NO isMobile responsive flag");

// 3. Registry checks
const registryItem = JSON.parse(fs.readFileSync('public/r/skeleton.json', 'utf-8'));
assert(registryItem.name === 'skeleton', "Registry item name is skeleton");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const foundInRegistry = globalRegistry.items.some(item => item.name === 'skeleton');
assert(foundInRegistry, "Skeleton is registered in public/r/registry.json");

// 4. Navigation check
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSrc.includes('/components/skeleton'), "Skeleton is registered in lib/docs/navigation.ts");

// 5. Preview stage dock placement check
const stageSrc = fs.readFileSync('app/components/skeleton/skeleton-preview-stage.tsx', 'utf-8');
assert(stageSrc.includes('controls='), "Preview stage passes controls to PreviewStageShell controls prop");

// 6. Test Live Route HTTP 200
console.log("Checking live dev server at http://localhost:3000/components/skeleton...");
try {
  const res = await fetch('http://localhost:3000/components/skeleton');
  assert(res.status === 200, `Live route /components/skeleton returned HTTP ${res.status}`);
} catch (err) {
  assert(false, `Could not reach live route: ${err.message}`);
}

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);

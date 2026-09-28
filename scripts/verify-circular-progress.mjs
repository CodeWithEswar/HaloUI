import fs from 'node:fs';

console.log("=== HALOUI CIRCULAR PROGRESS VERIFICATION SUITE ===");

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
assert(fs.existsSync('components/ui/circular-progress.tsx'), "Circular Progress component file exists");
assert(fs.existsSync('app/components/circular-progress/layout.tsx'), "Circular Progress docs layout exists");
assert(fs.existsSync('app/components/circular-progress/page.tsx'), "Circular Progress docs page exists");
assert(fs.existsSync('app/components/circular-progress/circular-progress-preview-stage.tsx'), "Circular Progress preview stage exists");
assert(fs.existsSync('app/components/circular-progress/circular-progress-demonstrations.tsx'), "Circular Progress demonstrations exists");
assert(fs.existsSync('public/r/circular-progress.json'), "Circular Progress registry JSON exists");

// 2. Component content checks
const circularSrc = fs.readFileSync('components/ui/circular-progress.tsx', 'utf-8');
assert(circularSrc.includes('export function CircularProgress'), "Exports CircularProgress component");
assert(circularSrc.includes('export function CircularProgressLabel'), "Exports CircularProgressLabel component");
assert(circularSrc.includes('export const circularProgressVariants'), "Exports circularProgressVariants");
assert(circularSrc.includes('export const circularTrackVariants'), "Exports circularTrackVariants");
assert(circularSrc.includes('export const circularIndicatorVariants'), "Exports circularIndicatorVariants");
assert(circularSrc.includes('viewBox="0 0 100 100"'), "Employs scalable SVG coordinate viewBox");
assert(circularSrc.includes('2 * Math.PI * radius'), "Calculates circumference mathematically");
assert(circularSrc.includes('strokeDashoffset'), "Computes strokeDashoffset dynamically");
assert(circularSrc.includes('motion-reduce:transition-none'), "Implements reduced-motion transition override");
assert(circularSrc.includes('aria-hidden="true"'), "Marks internal SVG and center text aria-hidden");
assert(circularSrc.includes('role={role}'), "Applies accessible progressbar role");
assert(!circularSrc.includes('window.innerWidth'), "Strictly NO window.innerWidth JS responsive detection");
assert(!circularSrc.includes('isMobile'), "Strictly NO isMobile responsive flag");

// 3. Registry checks
const registryItem = JSON.parse(fs.readFileSync('public/r/circular-progress.json', 'utf-8'));
assert(registryItem.name === 'circular-progress', "Registry item name is circular-progress");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const foundInRegistry = globalRegistry.items.some(item => item.name === 'circular-progress');
assert(foundInRegistry, "Circular Progress is registered in public/r/registry.json");

// 4. Navigation check
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSrc.includes('/components/circular-progress'), "Circular Progress is registered in lib/docs/navigation.ts");

// 5. Preview stage dock placement check
const stageSrc = fs.readFileSync('app/components/circular-progress/circular-progress-preview-stage.tsx', 'utf-8');
assert(stageSrc.includes('controls='), "Preview stage passes controls to PreviewStageShell controls prop");

// 6. Test Live Route HTTP 200
console.log("Checking live dev server at http://localhost:3000/components/circular-progress...");
try {
  const res = await fetch('http://localhost:3000/components/circular-progress');
  assert(res.status === 200, `Live route /components/circular-progress returned HTTP ${res.status}`);
} catch (err) {
  assert(false, `Could not reach live route: ${err.message}`);
}

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);

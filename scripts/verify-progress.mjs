import fs from 'node:fs';

console.log("=== HALOUI PROGRESS VERIFICATION SUITE ===");

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
assert(fs.existsSync('components/ui/progress.tsx'), "Progress component file exists");
assert(fs.existsSync('app/components/progress/layout.tsx'), "Progress docs layout exists");
assert(fs.existsSync('app/components/progress/page.tsx'), "Progress docs page exists");
assert(fs.existsSync('app/components/progress/progress-preview-stage.tsx'), "Progress preview stage exists");
assert(fs.existsSync('app/components/progress/progress-demonstrations.tsx'), "Progress demonstrations exists");
assert(fs.existsSync('public/r/progress.json'), "Progress registry JSON exists");

// 2. Component content checks
const progressSrc = fs.readFileSync('components/ui/progress.tsx', 'utf-8');
assert(progressSrc.includes('export function Progress'), "Exports Progress component");
assert(progressSrc.includes('export function ProgressTrack'), "Exports ProgressTrack component");
assert(progressSrc.includes('export function ProgressIndicator'), "Exports ProgressIndicator component");
assert(progressSrc.includes('export function ProgressLabel'), "Exports ProgressLabel component");
assert(progressSrc.includes('export function ProgressValue'), "Exports ProgressValue component");
assert(progressSrc.includes('export function ProgressHeader'), "Exports ProgressHeader component");
assert(progressSrc.includes('@container/progress'), "Includes @container/progress container query");
assert(progressSrc.includes('motion-reduce:transition-none'), "Implements reduced-motion override");
assert(!progressSrc.includes('window.innerWidth'), "Strictly NO window.innerWidth JS responsive detection");
assert(!progressSrc.includes('isMobile'), "Strictly NO isMobile responsive flag");

// 3. Registry checks
const registryItem = JSON.parse(fs.readFileSync('public/r/progress.json', 'utf-8'));
assert(registryItem.name === 'progress', "Registry item name is progress");
assert(registryItem.dependencies.includes('@base-ui/react'), "Registry dependencies include @base-ui/react");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const foundInRegistry = globalRegistry.items.some(item => item.name === 'progress');
assert(foundInRegistry, "Progress is registered in public/r/registry.json");

// 4. Navigation check
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSrc.includes('/components/progress'), "Progress is registered in lib/docs/navigation.ts");

// 5. Preview stage dock placement check
const stageSrc = fs.readFileSync('app/components/progress/progress-preview-stage.tsx', 'utf-8');
assert(stageSrc.includes('controls='), "Progress preview stage passes controls to PreviewStageShell controls prop");

// 6. Test Live Route HTTP 200
console.log("Checking live dev server at http://localhost:3000/components/progress...");
try {
  const res = await fetch('http://localhost:3000/components/progress');
  assert(res.status === 200, `Live route /components/progress returned HTTP ${res.status}`);
} catch (err) {
  assert(false, `Could not reach live route: ${err.message}`);
}

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);

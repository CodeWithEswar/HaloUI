import fs from 'node:fs';

console.log("=== HALOUI SPINNER VERIFICATION SUITE ===");

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
assert(fs.existsSync('components/ui/spinner.tsx'), "Spinner component file exists");
assert(fs.existsSync('app/components/spinner/layout.tsx'), "Spinner docs layout exists");
assert(fs.existsSync('app/components/spinner/page.tsx'), "Spinner docs page exists");
assert(fs.existsSync('app/components/spinner/spinner-preview-stage.tsx'), "Spinner preview stage exists");
assert(fs.existsSync('app/components/spinner/spinner-demonstrations.tsx'), "Spinner demonstrations exists");
assert(fs.existsSync('public/r/spinner.json'), "Spinner registry JSON exists");

// 2. Component content checks
const spinnerSrc = fs.readFileSync('components/ui/spinner.tsx', 'utf-8');
assert(spinnerSrc.includes('export function Spinner'), "Exports Spinner component");
assert(spinnerSrc.includes('export const spinnerVariants'), "Exports spinnerVariants");
assert(spinnerSrc.includes('viewBox="0 0 24 24"'), "Employs clean 24x24 SVG coordinate viewBox");
assert(spinnerSrc.includes('currentColor'), "Supports currentColor inheritance");
assert(spinnerSrc.includes('animate-spin'), "Implements CSS continuous spin animation");
assert(spinnerSrc.includes('motion-reduce:animate-none'), "Halts animation under motion-reduce");
assert(spinnerSrc.includes('role={role}'), "Applies accessible status role");
assert(!spinnerSrc.includes('lucide-react'), "Strictly ZERO lucide-react dependencies");
assert(!spinnerSrc.includes('window.innerWidth'), "Strictly NO window.innerWidth JS responsive detection");
assert(!spinnerSrc.includes('isMobile'), "Strictly NO isMobile responsive flag");

// 3. Registry checks
const registryItem = JSON.parse(fs.readFileSync('public/r/spinner.json', 'utf-8'));
assert(registryItem.name === 'spinner', "Registry item name is spinner");

const globalRegistry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const foundInRegistry = globalRegistry.items.some(item => item.name === 'spinner');
assert(foundInRegistry, "Spinner is registered in public/r/registry.json");

// 4. Navigation check
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSrc.includes('/components/spinner'), "Spinner is registered in lib/docs/navigation.ts");

// 5. Preview stage dock placement check
const stageSrc = fs.readFileSync('app/components/spinner/spinner-preview-stage.tsx', 'utf-8');
assert(stageSrc.includes('controls='), "Preview stage passes controls to PreviewStageShell controls prop");

// 6. Test Live Route HTTP 200
console.log("Checking live dev server at http://localhost:3000/components/spinner...");
try {
  const res = await fetch('http://localhost:3000/components/spinner');
  assert(res.status === 200, `Live route /components/spinner returned HTTP ${res.status}`);
} catch (err) {
  assert(false, `Could not reach live route: ${err.message}`);
}

console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);

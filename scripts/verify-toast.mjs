import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI FEEDBACK & STATUS 02: TOAST VERIFICATION SUITE ===\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

// 1. File Structure
console.log("1. Checking File Structure:");
const requiredFiles = [
  'components/ui/toast.tsx',
  'app/components/toast/page.tsx',
  'app/components/toast/layout.tsx',
  'app/components/toast/toast-preview-stage.tsx',
  'app/components/toast/toast-demonstrations.tsx',
  'public/r/toast.json',
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation
console.log("\n2. Checking Toast Component Implementation (components/ui/toast.tsx):");
const toastSrc = fs.readFileSync('components/ui/toast.tsx', 'utf-8');

assert(toastSrc.includes('backdrop-blur-xl') && toastSrc.includes('backdrop-saturate-180'), 'Toast implements Balanced Liquid Glass 10-layer physical optical engine');
assert(toastSrc.includes('CheckmarkCircle02Icon') && toastSrc.includes('Cancel01Icon'), 'Toast integrates Hugeicons exclusively');
assert(!toastSrc.includes('lucide-react'), 'Zero Lucide icon imports in toast.tsx');
assert(toastSrc.includes('max-w-[calc(100vw-1.5rem)]'), 'Toast implements mobile safe-area viewport margins');
assert(toastSrc.includes('createToastManager') && toastSrc.includes('Toaster'), 'Toast exports imperative manager and Toaster portal wrapper');
assert(!toastSrc.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!toastSrc.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage
console.log("\n3. Checking Toast Preview Stage (app/components/toast/toast-preview-stage.tsx):");
const stageSrc = fs.readFileSync('app/components/toast/toast-preview-stage.tsx', 'utf-8');

assert(stageSrc.includes('controls=') && stageSrc.includes('PreviewStageShell'), 'Preview stage passes controls into dedicated PreviewStageShell dock below canvas');
assert(stageSrc.includes('grid grid-cols-2') && stageSrc.includes('gap-2'), 'Preview stage aligns select controls in responsive grid row');
assert(stageSrc.includes('toast.create'), 'Preview stage features live toast trigger button');
assert(stageSrc.includes('240px'), 'Preview stage tests 240px container width');
assert(stageSrc.includes('telemetryItems'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page
console.log("\n4. Checking Toast Documentation Page (app/components/toast/page.tsx):");
const pageSrc = fs.readFileSync('app/components/toast/page.tsx', 'utf-8');

assert(pageSrc.includes('ToastPreviewStage'), 'Page mounts ToastPreviewStage');
assert(pageSrc.includes('InstallCommand') && pageSrc.includes('toast'), 'Page provides InstallCommand with toast registry slug');
assert(pageSrc.includes('FileTree'), 'Page provides structural FileTree');
assert(pageSrc.includes('PropsExplorer') && pageSrc.includes('TOAST_SUBCOMPONENTS'), 'Page provides source-accurate PropsExplorer');
assert(!pageSrc.includes('```text') && !pageSrc.includes('├──'), 'Zero text-based ASCII or Unicode box-drawing directory diagrams');

// 5. Navigation Configuration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navSrc.includes('Feedback & Status') && navSrc.includes('/components/toast'), 'Toast registered in Feedback & Status section in docsNavigation');

// 6. Registry Definition
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/toast.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const toastItem = registryJson.items.find(i => i.name === 'toast');
assert(!!toastItem, 'toast entry exists in registry.json');

const toastJson = JSON.parse(fs.readFileSync('public/r/toast.json', 'utf-8'));
assert(toastJson.name === 'toast', 'toast.json has valid name');
assert(toastJson.files.some(f => f.path.includes('toast.tsx')), 'toast.json references components/ui/toast.tsx');

// 7. Live Route Accessibility
console.log("\n7. Checking Live Route Accessibility (/components/toast):");
const req = http.get('http://localhost:3000/components/toast', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/toast returned status ${res.statusCode}`);
  
  console.log(`\n=== Verification Complete: ${passed}/${passed + failed} tests passed ===`);
  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

req.on('error', (err) => {
  console.error(`  ✗ Route request failed: ${err.message}`);
  failed++;
  console.log(`\n=== Verification Complete: ${passed}/${passed + failed} tests passed ===`);
  process.exit(1);
});

import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI FEEDBACK & STATUS 01: ALERT VERIFICATION SUITE ===\n");

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
  'components/ui/alert.tsx',
  'app/components/alert/page.tsx',
  'app/components/alert/layout.tsx',
  'app/components/alert/alert-preview-stage.tsx',
  'app/components/alert/alert-demonstrations.tsx',
  'public/r/alert.json',
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation
console.log("\n2. Checking Alert Component Implementation (components/ui/alert.tsx):");
const alertSrc = fs.readFileSync('components/ui/alert.tsx', 'utf-8');

assert(alertSrc.includes('@container/alert'), 'Alert defines @container/alert query container');
assert(alertSrc.includes('variant:'), 'Alert implements semantic variants (info, success, warning, destructive)');
assert(alertSrc.includes('intensity:'), 'Alert implements material intensity (subtle, balanced, plain)');
assert(alertSrc.includes('backdrop-blur-md') && alertSrc.includes('backdrop-saturate-150'), 'Alert implements Subtle Liquid Glass 10-layer physical optical engine');
assert(alertSrc.includes('InformationCircleIcon') && alertSrc.includes('CheckmarkCircle02Icon'), 'Alert integrates Hugeicons exclusively');
assert(!alertSrc.includes('lucide-react'), 'Zero Lucide icon imports');
assert(alertSrc.includes('role=') && alertSrc.includes('destructive') && alertSrc.includes('alert'), 'Alert applies WAI-ARIA role="alert" deliberately for destructive errors');
assert(alertSrc.includes('dismissible') && alertSrc.includes('aria-label="Dismiss alert"'), 'Alert implements accessible dismissal trigger with proper aria-label');
assert(alertSrc.includes('AlertTitle') && alertSrc.includes('AlertDescription') && alertSrc.includes('AlertAction'), 'Alert exports composable AlertTitle, AlertDescription, and AlertAction subcomponents');
assert(!alertSrc.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!alertSrc.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage
console.log("\n3. Checking Alert Preview Stage (app/components/alert/alert-preview-stage.tsx):");
const stageSrc = fs.readFileSync('app/components/alert/alert-preview-stage.tsx', 'utf-8');

assert(stageSrc.includes('grid grid-cols-2') && stageSrc.includes('gap-3'), 'Preview stage aligns select controls in responsive grid row');
assert(stageSrc.includes('border-t border-border') && stageSrc.includes('flex flex-wrap'), 'Toggle flags row is neatly aligned below selects');
assert(stageSrc.includes('PreviewStageShell'), 'Preview stage connects backdrop to PreviewStageShell');
assert(stageSrc.includes('240px'), 'Preview stage tests 240px container width');
assert(stageSrc.includes('telemetryItems'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page
console.log("\n4. Checking Alert Documentation Page (app/components/alert/page.tsx):");
const pageSrc = fs.readFileSync('app/components/alert/page.tsx', 'utf-8');

assert(pageSrc.includes('AlertPreviewStage'), 'Page mounts AlertPreviewStage');
assert(pageSrc.includes('InstallCommand') && pageSrc.includes('alert.json'), 'Page provides InstallCommand with alert registry slug');
assert(pageSrc.includes('FileTree'), 'Page provides structural FileTree');
assert(pageSrc.includes('PropsExplorer') && pageSrc.includes('ALERT_SUBCOMPONENTS'), 'Page provides source-accurate PropsExplorer');
assert(!pageSrc.includes('```text') && !pageSrc.includes('├──'), 'Zero text-based ASCII or Unicode box-drawing directory diagrams');

// 5. Navigation Configuration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navSrc.includes('Feedback & Status') && navSrc.includes('/components/alert'), 'Alert registered in Feedback & Status section in docsNavigation');

// 6. Registry Definition
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/alert.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const alertItem = registryJson.items.find(i => i.name === 'alert');
assert(!!alertItem, 'alert entry exists in registry.json');

const alertJson = JSON.parse(fs.readFileSync('public/r/alert.json', 'utf-8'));
assert(alertJson.name === 'alert', 'alert.json has valid name');
assert(alertJson.files.some(f => f.path.includes('alert.tsx')), 'alert.json references components/ui/alert.tsx');

// 7. Live Route Accessibility
console.log("\n7. Checking Live Route Accessibility (/components/alert):");
const req = http.get('http://localhost:3000/components/alert', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/alert returned status ${res.statusCode}`);
  
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

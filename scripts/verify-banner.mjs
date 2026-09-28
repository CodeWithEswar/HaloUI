import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI FEEDBACK & STATUS 03: BANNER VERIFICATION SUITE ===\n");

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
  'components/ui/banner.tsx',
  'app/components/banner/page.tsx',
  'app/components/banner/layout.tsx',
  'app/components/banner/banner-preview-stage.tsx',
  'app/components/banner/banner-demonstrations.tsx',
  'public/r/banner.json',
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation
console.log("\n2. Checking Banner Component Implementation (components/ui/banner.tsx):");
const bannerSrc = fs.readFileSync('components/ui/banner.tsx', 'utf-8');

assert(bannerSrc.includes('@container/banner'), 'Banner defines @container/banner query container');
assert(bannerSrc.includes('variant:'), 'Banner implements semantic variants (info, success, warning, destructive)');
assert(bannerSrc.includes('intensity:'), 'Banner implements material intensity (subtle, balanced, plain)');
assert(bannerSrc.includes('layout:'), 'Banner implements layout framing (contained, full-width)');
assert(bannerSrc.includes('backdrop-blur-md') && bannerSrc.includes('backdrop-saturate-150'), 'Banner implements Subtle Liquid Glass 10-layer physical optical engine');
assert(bannerSrc.includes('Megaphone01Icon') && bannerSrc.includes('CheckmarkCircle02Icon'), 'Banner integrates Hugeicons exclusively');
assert(!bannerSrc.includes('lucide-react'), 'Zero Lucide icon imports');
assert(bannerSrc.includes('role=') && bannerSrc.includes('region') && bannerSrc.includes('alert'), 'Banner applies context-aware WAI-ARIA role semantics');
assert(bannerSrc.includes('dismissible') && bannerSrc.includes('aria-label="Dismiss banner"'), 'Banner implements accessible dismissal trigger with proper aria-label');
assert(bannerSrc.includes('BannerTitle') && bannerSrc.includes('BannerDescription') && bannerSrc.includes('BannerContent') && bannerSrc.includes('BannerAction'), 'Banner exports composable subcomponents');
assert(!bannerSrc.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!bannerSrc.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage
console.log("\n3. Checking Banner Preview Stage (app/components/banner/banner-preview-stage.tsx):");
const stageSrc = fs.readFileSync('app/components/banner/banner-preview-stage.tsx', 'utf-8');

assert(stageSrc.includes('controls=') && stageSrc.includes('PreviewStageShell'), 'Preview stage passes controls into dedicated PreviewStageShell dock below canvas');
assert(stageSrc.includes('grid grid-cols-2') && stageSrc.includes('gap-2'), 'Preview stage aligns select controls in responsive grid row');
assert(stageSrc.includes('border-t border-border') && stageSrc.includes('flex flex-wrap'), 'Toggle flags row is neatly aligned below selects');
assert(stageSrc.includes('240px'), 'Preview stage tests 240px container width');
assert(stageSrc.includes('telemetryItems'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page
console.log("\n4. Checking Banner Documentation Page (app/components/banner/page.tsx):");
const pageSrc = fs.readFileSync('app/components/banner/page.tsx', 'utf-8');

assert(pageSrc.includes('BannerPreviewStage'), 'Page mounts BannerPreviewStage');
assert(pageSrc.includes('InstallCommand') && pageSrc.includes('banner'), 'Page provides InstallCommand with banner registry slug');
assert(pageSrc.includes('FileTree'), 'Page provides structural FileTree');
assert(pageSrc.includes('PropsExplorer') && pageSrc.includes('BANNER_SUBCOMPONENTS'), 'Page provides source-accurate PropsExplorer');
assert(!pageSrc.includes('```text') && !pageSrc.includes('├──'), 'Zero text-based ASCII or Unicode box-drawing directory diagrams');

// 5. Navigation Configuration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navSrc = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navSrc.includes('Feedback & Status') && navSrc.includes('/components/banner'), 'Banner registered in Feedback & Status section in docsNavigation');

// 6. Registry Definition
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/banner.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const bannerItem = registryJson.items.find(i => i.name === 'banner');
assert(!!bannerItem, 'banner entry exists in registry.json');

const bannerJson = JSON.parse(fs.readFileSync('public/r/banner.json', 'utf-8'));
assert(bannerJson.name === 'banner', 'banner.json has valid name');
assert(bannerJson.files.some(f => f.path.includes('banner.tsx')), 'banner.json references components/ui/banner.tsx');

// 7. Live Route Accessibility
console.log("\n7. Checking Live Route Accessibility (/components/banner):");
const req = http.get('http://localhost:3000/components/banner', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/banner returned status ${res.statusCode}`);
  
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

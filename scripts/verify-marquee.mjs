import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI DATA DISPLAY 27: MARQUEE VERIFICATION SUITE ===");

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// 1. File Structure
console.log("\n1. Checking File Structure:");
const requiredFiles = [
  'components/ui/marquee.tsx',
  'app/components/marquee/page.tsx',
  'app/components/marquee/layout.tsx',
  'app/components/marquee/marquee-preview-stage.tsx',
  'app/components/marquee/marquee-demonstrations.tsx',
  'public/r/marquee.json'
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation Contracts
console.log("\n2. Checking Marquee Component Implementation (components/ui/marquee.tsx):");
const mContent = fs.readFileSync('components/ui/marquee.tsx', 'utf-8');

assert(mContent.includes('@container/marquee'), 'Marquee defines @container/marquee query container');
assert(mContent.includes('animate-halo-marquee'), 'Marquee uses pure CSS transform keyframe animation');
assert(mContent.includes('data-canonical="true"'), 'Marquee renders accessible canonical track for assistive tech');
assert(mContent.includes('data-clone="true"') && mContent.includes('aria-hidden="true"'), 'Clone tracks are marked aria-hidden for screen readers');
assert(mContent.includes('inert'), 'Clone tracks are set to inert to isolate keyboard focus targets');
assert(mContent.includes('motion-reduce:hidden'), 'Clone tracks are completely omitted under reduced-motion preference');
assert(mContent.includes('pauseOnHover'), 'Marquee supports hover pause state');
assert(mContent.includes('pauseOnFocus'), 'Marquee supports keyboard focus-within pause state');
assert(mContent.includes('variant === "glass"'), 'Marquee implements restrained liquid glass variant');
assert(mContent.includes('mask-image:linear-gradient'), 'Marquee implements optical edge fade masks');
assert(!mContent.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!mContent.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage Contracts
console.log("\n3. Checking Marquee Preview Stage (app/components/marquee/marquee-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/marquee/marquee-preview-stage.tsx', 'utf-8');

assert(previewContent.includes('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'), 'Preview stage aligns select controls in responsive grid row');
assert(previewContent.includes('border-t border-border/40'), 'Toggle flags row is neatly aligned below selects');
assert(previewContent.includes('backdrop={backdrop}'), 'Preview stage connects backdrop to PreviewStageShell');
assert(previewContent.includes('240'), 'Preview stage tests 240px container width');
assert(previewContent.includes('telemetry'), 'Preview stage provides real-time telemetry');
assert(previewContent.includes('simulateReducedMotion'), 'Preview stage provides dedicated reduced-motion simulation mode');

// 4. Documentation Page Contracts
console.log("\n4. Checking Marquee Documentation Page (app/components/marquee/page.tsx):");
const pageContent = fs.readFileSync('app/components/marquee/page.tsx', 'utf-8');

assert(pageContent.includes('<MarqueePreviewStage'), 'Page mounts MarqueePreviewStage');
assert(pageContent.includes('<InstallCommand registry="marquee"'), 'Page provides InstallCommand with marquee registry slug');
assert(pageContent.includes('<FileTree'), 'Page provides structural FileTree');
assert(pageContent.includes('<PropsExplorer'), 'Page provides source-accurate PropsExplorer');
assert(!pageContent.includes('language="text"'), 'Zero text-based ASCII architecture blocks');
assert(!pageContent.includes('├──') && !pageContent.includes('└──'), 'Zero Unicode box-drawing directory diagrams');

// 5. Navigation Registration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navContent.includes('href: "/components/marquee"'), 'Marquee registered in docsNavigation');

// 6. Registry Validation
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/marquee.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const marqueeJson = JSON.parse(fs.readFileSync('public/r/marquee.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'marquee'), 'marquee entry exists in registry.json');
assert(marqueeJson.name === 'marquee', 'marquee.json has valid name');
assert(marqueeJson.files.some(f => f.target === 'components/ui/marquee.tsx'), 'marquee.json references components/ui/marquee.tsx');

// 7. Route Accessibility Verification
console.log("\n7. Checking Live Route Accessibility (/components/marquee):");
const testReq = http.get('http://localhost:3000/components/marquee', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/marquee returned status ${res.statusCode}`);
  console.log(`\n=== Verification Complete: ${passedTests}/${totalTests} tests passed ===\n`);
  process.exit(res.statusCode === 200 && passedTests === totalTests ? 0 : 1);
});

testReq.on('error', (err) => {
  console.error("  ✗ FAIL: Dev server request failed:", err.message);
  process.exit(1);
});

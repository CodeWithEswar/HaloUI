import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI DATA DISPLAY 26: CAROUSEL VERIFICATION SUITE ===");

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
  'components/ui/carousel.tsx',
  'app/components/carousel/page.tsx',
  'app/components/carousel/layout.tsx',
  'app/components/carousel/carousel-preview-stage.tsx',
  'app/components/carousel/carousel-demonstrations.tsx',
  'public/r/carousel.json'
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation Contracts
console.log("\n2. Checking Carousel Component Implementation (components/ui/carousel.tsx):");
const cContent = fs.readFileSync('components/ui/carousel.tsx', 'utf-8');

assert(cContent.includes('@container/carousel'), 'Carousel defines @container/carousel query container');
assert(cContent.includes('useEmblaCarousel'), 'Carousel integrates proven Embla carousel engine');
assert(cContent.includes('ArrowLeft01Icon') && cContent.includes('ArrowRight01Icon'), 'Carousel uses Hugeicons exclusively');
assert(!cContent.includes('lucide-react'), 'Zero Lucide icon imports');
assert(cContent.includes('CarouselDots'), 'Carousel exports accessible CarouselDots pagination primitive');
assert(cContent.includes('position === "inset"') && cContent.includes('position === "edge"'), 'Navigation controls support inset and edge positioning');
assert(cContent.includes('variant === "glass"'), 'Navigation controls implement restrained liquid glass variant');
assert(!cContent.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!cContent.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage Contracts
console.log("\n3. Checking Carousel Preview Stage (app/components/carousel/carousel-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/carousel/carousel-preview-stage.tsx', 'utf-8');

assert(previewContent.includes('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'), 'Preview stage aligns select controls in responsive grid row');
assert(previewContent.includes('border-t border-border/40'), 'Toggle flags row is neatly aligned below selects');
assert(previewContent.includes('backdrop={backdrop}'), 'Preview stage connects backdrop to PreviewStageShell');
assert(previewContent.includes('240'), 'Preview stage tests 240px container width');
assert(previewContent.includes('telemetry'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page Contracts
console.log("\n4. Checking Carousel Documentation Page (app/components/carousel/page.tsx):");
const pageContent = fs.readFileSync('app/components/carousel/page.tsx', 'utf-8');

assert(pageContent.includes('<CarouselPreviewStage'), 'Page mounts CarouselPreviewStage');
assert(pageContent.includes('<InstallCommand registry="carousel"'), 'Page provides InstallCommand with carousel registry slug');
assert(pageContent.includes('<FileTree'), 'Page provides structural FileTree');
assert(pageContent.includes('<PropsExplorer'), 'Page provides source-accurate PropsExplorer');
assert(!pageContent.includes('language="text"'), 'Zero text-based ASCII architecture blocks');
assert(!pageContent.includes('├──') && !pageContent.includes('└──'), 'Zero Unicode box-drawing directory diagrams');

// 5. Navigation Registration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navContent.includes('href: "/components/carousel"'), 'Carousel registered in docsNavigation');

// 6. Registry Validation
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/carousel.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const carouselJson = JSON.parse(fs.readFileSync('public/r/carousel.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'carousel'), 'carousel entry exists in registry.json');
assert(carouselJson.name === 'carousel', 'carousel.json has valid name');
assert(carouselJson.files.some(f => f.target === 'components/ui/carousel.tsx'), 'carousel.json references components/ui/carousel.tsx');
assert(carouselJson.dependencies.includes('embla-carousel-react'), 'carousel declares embla-carousel-react dependency');

// 7. Route Accessibility Verification
console.log("\n7. Checking Live Route Accessibility (/components/carousel):");
const testReq = http.get('http://localhost:3000/components/carousel', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/carousel returned status ${res.statusCode}`);
  console.log(`\n=== Verification Complete: ${passedTests}/${totalTests} tests passed ===\n`);
  process.exit(res.statusCode === 200 && passedTests === totalTests ? 0 : 1);
});

testReq.on('error', (err) => {
  console.error("  ✗ FAIL: Dev server request failed:", err.message);
  process.exit(1);
});

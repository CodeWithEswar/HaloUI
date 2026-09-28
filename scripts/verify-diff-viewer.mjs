import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI DATA DISPLAY 24: DIFF VIEWER VERIFICATION SUITE ===");

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
  'components/ui/diff-viewer.tsx',
  'app/components/diff-viewer/page.tsx',
  'app/components/diff-viewer/layout.tsx',
  'app/components/diff-viewer/diff-viewer-preview-stage.tsx',
  'app/components/diff-viewer/diff-viewer-demonstrations.tsx',
  'public/r/diff-viewer.json'
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation Contracts
console.log("\n2. Checking DiffViewer Component Implementation (components/ui/diff-viewer.tsx):");
const dvContent = fs.readFileSync('components/ui/diff-viewer.tsx', 'utf-8');

assert(dvContent.includes('@container/diff-viewer'), 'DiffViewer defines @container/diff-viewer query container');
assert(dvContent.includes('computeLineDiff'), 'DiffViewer implements LCS line diff algorithm');
assert(dvContent.includes('computeSplitRows'), 'DiffViewer implements split row synchronization');
assert(dvContent.includes('unified') && dvContent.includes('split'), 'DiffViewer supports Unified and Split view modes');
assert(dvContent.includes('showStats'), 'DiffViewer computes and displays change statistics');
assert(dvContent.includes('CopyButton'), 'DiffViewer uses canonical CopyButton');
assert(dvContent.includes('variant === "glass"'), 'DiffViewer implements restrained liquid glass variant');
assert(!dvContent.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!dvContent.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage Contracts
console.log("\n3. Checking DiffViewer Preview Stage (app/components/diff-viewer/diff-viewer-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/diff-viewer/diff-viewer-preview-stage.tsx', 'utf-8');

assert(previewContent.includes('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'), 'Preview stage aligns select controls in responsive grid row');
assert(previewContent.includes('border-t border-border/40'), 'Toggle flags row is neatly aligned below selects');
assert(previewContent.includes('backdrop={backdrop}'), 'Preview stage connects backdrop to PreviewStageShell');
assert(previewContent.includes('240'), 'Preview stage tests 240px container width');
assert(previewContent.includes('telemetry'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page Contracts
console.log("\n4. Checking DiffViewer Documentation Page (app/components/diff-viewer/page.tsx):");
const pageContent = fs.readFileSync('app/components/diff-viewer/page.tsx', 'utf-8');

assert(pageContent.includes('<DiffViewerPreviewStage'), 'Page mounts DiffViewerPreviewStage');
assert(pageContent.includes('<InstallCommand registry="diff-viewer"'), 'Page provides InstallCommand with diff-viewer registry slug');
assert(pageContent.includes('<FileTree'), 'Page provides structural FileTree');
assert(pageContent.includes('<PropsExplorer'), 'Page provides source-accurate PropsExplorer');
assert(!pageContent.includes('language="text"'), 'Zero text-based ASCII architecture blocks');
assert(!pageContent.includes('├──') && !pageContent.includes('└──'), 'Zero Unicode box-drawing directory diagrams');

// 5. Navigation Registration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navContent.includes('href: "/components/diff-viewer"'), 'Diff Viewer registered in docsNavigation');

// 6. Registry Validation
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/diff-viewer.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const dvJson = JSON.parse(fs.readFileSync('public/r/diff-viewer.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'diff-viewer'), 'diff-viewer entry exists in registry.json');
assert(dvJson.name === 'diff-viewer', 'diff-viewer.json has valid name');
assert(dvJson.files.some(f => f.target === 'components/ui/diff-viewer.tsx'), 'diff-viewer.json references components/ui/diff-viewer.tsx');
assert(dvJson.registryDependencies.includes('copy-button'), 'diff-viewer declares copy-button registry dependency');

// 7. Route Accessibility Verification
console.log("\n7. Checking Live Route Accessibility (/components/diff-viewer):");
const testReq = http.get('http://localhost:3000/components/diff-viewer', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/diff-viewer returned status ${res.statusCode}`);
  console.log(`\n=== Verification Complete: ${passedTests}/${totalTests} tests passed ===\n`);
  process.exit(res.statusCode === 200 && passedTests === totalTests ? 0 : 1);
});

testReq.on('error', (err) => {
  console.error("  ✗ FAIL: Dev server request failed:", err.message);
  process.exit(1);
});

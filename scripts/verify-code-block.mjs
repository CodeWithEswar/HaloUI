import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI DATA DISPLAY 22: CODE BLOCK VERIFICATION SUITE ===");

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
  'components/ui/code-block.tsx',
  'app/components/code-block/page.tsx',
  'app/components/code-block/layout.tsx',
  'app/components/code-block/code-block-preview-stage.tsx',
  'app/components/code-block/code-block-demonstrations.tsx',
  'public/r/code-block.json'
];

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Required file exists: ${file}`);
}

// 2. Component Implementation Contracts
console.log("\n2. Checking CodeBlock Component Implementation (components/ui/code-block.tsx):");
const cbContent = fs.readFileSync('components/ui/code-block.tsx', 'utf-8');

assert(cbContent.includes('@container/code-block'), 'CodeBlock defines @container/code-block query container');
assert(cbContent.includes('<pre') && cbContent.includes('<code'), 'CodeBlock maintains semantic pre and code structure');
assert(cbContent.includes('showLineNumbers'), 'CodeBlock supports line numbers');
assert(cbContent.includes('aria-hidden="true"') && cbContent.includes('select-none'), 'Line numbers are unselectable and accessible');
assert(cbContent.includes('highlightLines'), 'CodeBlock supports line highlighting');
assert(cbContent.includes('wrap'), 'CodeBlock supports word wrapping');
assert(cbContent.includes('CopyButton'), 'CodeBlock uses canonical CopyButton');
assert(cbContent.includes('variant === "glass"'), 'CodeBlock implements restrained liquid glass variant');
assert(!cbContent.includes('window.innerWidth'), 'Zero JS window.innerWidth responsive detection in component');
assert(!cbContent.includes('useMediaQuery'), 'Zero JS useMediaQuery hook in component');

// 3. Preview Stage Contracts
console.log("\n3. Checking CodeBlock Preview Stage (app/components/code-block/code-block-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/code-block/code-block-preview-stage.tsx', 'utf-8');

assert(previewContent.includes('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'), 'Preview stage aligns select controls in responsive grid row');
assert(previewContent.includes('border-t border-border/40'), 'Toggle flags row is neatly aligned below selects');
assert(previewContent.includes('backdrop={backdrop}'), 'Preview stage connects backdrop to PreviewStageShell');
assert(previewContent.includes('240'), 'Preview stage tests 240px container width');
assert(previewContent.includes('telemetry'), 'Preview stage provides real-time telemetry');

// 4. Documentation Page Contracts
console.log("\n4. Checking CodeBlock Documentation Page (app/components/code-block/page.tsx):");
const pageContent = fs.readFileSync('app/components/code-block/page.tsx', 'utf-8');

assert(pageContent.includes('<CodeBlockPreviewStage'), 'Page mounts CodeBlockPreviewStage');
assert(pageContent.includes('<InstallCommand registry="code-block"'), 'Page provides InstallCommand with code-block registry slug');
assert(pageContent.includes('<FileTree'), 'Page provides structural FileTree');
assert(pageContent.includes('<PropsExplorer'), 'Page provides source-accurate PropsExplorer');
assert(!pageContent.includes('language="text"'), 'Zero text-based ASCII architecture blocks');
assert(!pageContent.includes('├──') && !pageContent.includes('└──'), 'Zero Unicode box-drawing directory diagrams');

// 5. Navigation Registration
console.log("\n5. Checking Navigation Configuration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navContent.includes('href: "/components/code-block"'), 'Code Block registered in docsNavigation');

// 6. Registry Validation
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/code-block.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const cbJson = JSON.parse(fs.readFileSync('public/r/code-block.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'code-block'), 'code-block entry exists in registry.json');
assert(cbJson.name === 'code-block', 'code-block.json has valid name');
assert(cbJson.files.some(f => f.target === 'components/ui/code-block.tsx'), 'code-block.json references components/ui/code-block.tsx');
assert(cbJson.registryDependencies.includes('copy-button'), 'code-block declares copy-button registry dependency');

// 7. Route Accessibility Verification
console.log("\n7. Checking Live Route Accessibility (/components/code-block):");
const testReq = http.get('http://localhost:3000/components/code-block', (res) => {
  assert(res.statusCode === 200, `HTTP GET /components/code-block returned status ${res.statusCode}`);
  console.log(`\n=== Verification Complete: ${passedTests}/${totalTests} tests passed ===\n`);
  process.exit(res.statusCode === 200 && passedTests === totalTests ? 0 : 1);
});

testReq.on('error', (err) => {
  console.error("  ✗ FAIL: Dev server request failed:", err.message);
  process.exit(1);
});

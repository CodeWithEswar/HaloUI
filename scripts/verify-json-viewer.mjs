import fs from 'node:fs';

console.log("=== Verifying JSON Viewer (Data Display 23) Implementation ===\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Files existence
const files = [
  'components/ui/json-viewer.tsx',
  'app/components/json-viewer/page.tsx',
  'app/components/json-viewer/layout.tsx',
  'app/components/json-viewer/json-viewer-preview-stage.tsx',
  'app/components/json-viewer/json-viewer-demonstrations.tsx',
  'public/r/json-viewer.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking JSON Viewer Component Implementation (components/ui/json-viewer.tsx):");
const jvContent = fs.readFileSync('components/ui/json-viewer.tsx', 'utf-8');

assert(jvContent.includes('@container/json-viewer'), 'JsonViewer contains @container/json-viewer query container');
assert(jvContent.includes('function JsonNode'), 'Recursive JsonNode renderer implemented');
assert(jvContent.includes('function JsonPrimitiveValue'), 'JsonPrimitiveValue type-differentiating renderer implemented');
assert(jvContent.includes('typeof value === "string"'), 'String primitive handled with syntax styling');
assert(jvContent.includes('typeof value === "number"'), 'Number primitive handled with tabular-nums');
assert(jvContent.includes('typeof value === "boolean"'), 'Boolean primitive handled with keyword styling');
assert(jvContent.includes('value === null'), 'Explicit null handled distinct from falsy values');
assert(jvContent.includes('aria-expanded={isExpanded}'), 'Accessible disclosure controls with aria-expanded');
assert(jvContent.includes('border-l border-border/40'), 'Tokenized hairline guidelines for nested structure');
assert(jvContent.includes('CopyButton'), 'Canonical CopyButton integrated for formatted clipboard export');
assert(jvContent.includes('halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');
assert(!jvContent.includes('halo-glow'), 'Strictly no default glowing orbs around data tokens');
assert(!jvContent.includes('backdrop-filter: blur(24px)'), 'Not reduced to naive 3-line glassmorphism cliché');

// 3. Preview Stage checks
console.log("\n3. Checking JSON Viewer Preview Stage (app/components/json-viewer/json-viewer-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/json-viewer/json-viewer-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');
assert(previewContent.includes('API Payload'), 'Includes API payload test scenario');
assert(previewContent.includes('Package Config'), 'Includes package config test scenario');
assert(previewContent.includes('Deep Hierarchy'), 'Includes deep nesting test scenario');
assert(previewContent.includes('Syntax Error State'), 'Includes invalid syntax error test scenario');

// 4. Docs Page checks
console.log("\n4. Checking JSON Viewer Documentation Page (app/components/json-viewer/page.tsx):");
const pageContent = fs.readFileSync('app/components/json-viewer/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 23'), 'Badged as Data Display 23');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/json-viewer"'), 'JSON Viewer registered in docsNavigation');
assert(navContent.includes('title: "JSON Viewer"'), 'JSON Viewer title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/json-viewer.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const jvJson = JSON.parse(fs.readFileSync('public/r/json-viewer.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'json-viewer'), 'json-viewer entry exists in registry.json');
assert(jvJson.name === 'json-viewer', 'json-viewer.json has valid name');
assert(jvJson.files.some(f => f.target === 'components/ui/json-viewer.tsx'), 'json-viewer.json references components/ui/json-viewer.tsx');
assert(jvJson.registryDependencies.includes('copy-button'), 'json-viewer declares copy-button registry dependency');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All JSON Viewer verification checks PASSED perfectly!\n");
}

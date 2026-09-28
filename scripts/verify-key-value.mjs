import fs from 'node:fs';

console.log("=== Verifying Key Value (Data Display 20) Implementation ===\n");

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
  'components/ui/key-value.tsx',
  'app/components/key-value/page.tsx',
  'app/components/key-value/layout.tsx',
  'app/components/key-value/key-value-preview-stage.tsx',
  'app/components/key-value/key-value-demonstrations.tsx',
  'public/r/key-value.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Key Value Component Implementation (components/ui/key-value.tsx):");
const kvContent = fs.readFileSync('components/ui/key-value.tsx', 'utf-8');

assert(kvContent.includes('@container/key-value'), 'KeyValue contains @container/key-value query container');
assert(kvContent.includes('KeyValue.Label = KeyValueLabel'), 'Compound attachment KeyValue.Label exists');
assert(kvContent.includes('KeyValue.Value = KeyValueValue'), 'Compound attachment KeyValue.Value exists');
assert(kvContent.includes('KeyValue.Group = KeyValueGroup'), 'Compound attachment KeyValue.Group exists');
assert(kvContent.includes('break-words min-w-0'), 'Values use break-words min-w-0 for narrow reflow');
assert(kvContent.includes('halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');

// 3. Preview Stage checks
console.log("\n3. Checking Key Value Preview Stage (app/components/key-value/key-value-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/key-value/key-value-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]'), 'Checkboxes styled in rounded-xl card tiles');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');

// 4. Docs Page checks
console.log("\n4. Checking Key Value Documentation Page (app/components/key-value/page.tsx):");
const pageContent = fs.readFileSync('app/components/key-value/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 20'), 'Badged as Data Display 20');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/key-value"'), 'Key Value registered in docsNavigation');
assert(navContent.includes('title: "Key Value"'), 'Key Value title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/key-value.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const kvJson = JSON.parse(fs.readFileSync('public/r/key-value.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'key-value'), 'key-value entry exists in registry.json');
assert(kvJson.name === 'key-value', 'key-value.json has valid name');
assert(kvJson.files.some(f => f.target === 'components/ui/key-value.tsx'), 'key-value.json references components/ui/key-value.tsx');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Key Value verification checks PASSED perfectly!\n");
}

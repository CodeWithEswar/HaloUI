import fs from 'node:fs';

console.log("=== Verifying Empty State (Data Display 19) Implementation ===\n");

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
  'components/ui/empty-state.tsx',
  'app/components/empty-state/page.tsx',
  'app/components/empty-state/layout.tsx',
  'app/components/empty-state/empty-state-preview-stage.tsx',
  'app/components/empty-state/empty-state-demonstrations.tsx',
  'public/r/empty-state.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Empty State Component Implementation (components/ui/empty-state.tsx):");
const emptyContent = fs.readFileSync('components/ui/empty-state.tsx', 'utf-8');

assert(emptyContent.includes('@container/empty-state'), 'EmptyState contains @container/empty-state query container');
assert(emptyContent.includes('EmptyState.Visual = EmptyStateVisual'), 'Compound attachment EmptyState.Visual exists');
assert(emptyContent.includes('EmptyState.Content = EmptyStateContent'), 'Compound attachment EmptyState.Content exists');
assert(emptyContent.includes('EmptyState.Title = EmptyStateTitle'), 'Compound attachment EmptyState.Title exists');
assert(emptyContent.includes('EmptyState.Description = EmptyStateDescription'), 'Compound attachment EmptyState.Description exists');
assert(emptyContent.includes('EmptyState.Actions = EmptyStateActions'), 'Compound attachment EmptyState.Actions exists');
assert(emptyContent.includes('break-words min-w-0'), 'Titles & descriptions use break-words min-w-0 for narrow reflow');
assert(emptyContent.includes('backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');

// 3. Preview Stage checks
console.log("\n3. Checking Empty State Preview Stage (app/components/empty-state/empty-state-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/empty-state/empty-state-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]'), 'Checkboxes styled in rounded-xl card tiles');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');

// 4. Docs Page checks
console.log("\n4. Checking Empty State Documentation Page (app/components/empty-state/page.tsx):");
const pageContent = fs.readFileSync('app/components/empty-state/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 19'), 'Badged as Data Display 19');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/empty-state"'), 'Empty State registered in docsNavigation');
assert(navContent.includes('title: "Empty State"'), 'Empty State title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/empty-state.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const emptyJson = JSON.parse(fs.readFileSync('public/r/empty-state.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'empty-state'), 'empty-state entry exists in registry.json');
assert(emptyJson.name === 'empty-state', 'empty-state.json has valid name');
assert(emptyJson.files.some(f => f.target === 'components/ui/empty-state.tsx'), 'empty-state.json references components/ui/empty-state.tsx');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Empty State verification checks PASSED perfectly!\n");
}

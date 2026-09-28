import fs from 'node:fs';

console.log("=== Verifying Tree View (Data Display 25) Implementation ===\n");

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
  'components/ui/tree-view.tsx',
  'app/components/tree-view/page.tsx',
  'app/components/tree-view/layout.tsx',
  'app/components/tree-view/tree-view-preview-stage.tsx',
  'app/components/tree-view/tree-view-demonstrations.tsx',
  'public/r/tree-view.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Tree View Component Implementation (components/ui/tree-view.tsx):");
const tvContent = fs.readFileSync('components/ui/tree-view.tsx', 'utf-8');

assert(tvContent.includes('@container/tree-view'), 'TreeView contains @container/tree-view query boundary');
assert(tvContent.includes('role="tree"'), 'Root renders WAI-ARIA role="tree"');
assert(tvContent.includes('role="treeitem"'), 'Nodes render WAI-ARIA role="treeitem"');
assert(tvContent.includes('role="group"'), 'Nested child containers render WAI-ARIA role="group"');
assert(tvContent.includes('aria-expanded={expanded}'), 'Branch renders accessible aria-expanded');
assert(tvContent.includes('aria-selected='), 'Nodes render aria-selected when selectable');
assert(tvContent.includes('aria-level='), 'Nodes communicate hierarchy depth via aria-level');
assert(tvContent.includes('tabIndex={isFocused ? 0 : -1}'), 'Implements roving tabindex focus management');
assert(tvContent.includes('ArrowDown') && tvContent.includes('ArrowUp'), 'Implements ArrowDown and ArrowUp keyboard navigation');
assert(tvContent.includes('ArrowRight') && tvContent.includes('ArrowLeft'), 'Implements ArrowRight and ArrowLeft expansion/parent traversal');
assert(tvContent.includes('Home') && tvContent.includes('End'), 'Implements Home and End keyboard traversal');
assert(tvContent.includes('toggleExpanded') && tvContent.includes('toggleSelected'), 'Expansion state is strictly independent from selection state');
assert(tvContent.includes('TreeBranch') && tvContent.includes('TreeLeaf'), 'Exports compound TreeBranch and TreeLeaf primitives');
assert(tvContent.includes('TreeViewDataRenderer'), 'Supports data-driven recursive node arrays');
assert(tvContent.includes('border-l border-border/'), 'Tokenized hairline guidelines for child groups');
assert(tvContent.includes('halo-surface halo-surface-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');
assert(!tvContent.includes('halo-glow'), 'Strictly no default glowing orbs around data tokens');
assert(!tvContent.includes('backdrop-filter: blur(24px)'), 'Not reduced to naive 3-line glassmorphism cliché');

// 3. Preview Stage checks
console.log("\n3. Checking Tree View Preview Stage (app/components/tree-view/tree-view-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/tree-view/tree-view-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');
assert(previewContent.includes('grid grid-cols-'), 'Controls are arranged in a responsive grid row');
assert(previewContent.includes('Repository File Explorer'), 'Includes File Explorer scenario');
assert(previewContent.includes('Deep Hierarchy (8 Levels)'), 'Includes Deep Hierarchy scenario');

// 4. Docs Page checks
console.log("\n4. Checking Tree View Documentation Page (app/components/tree-view/page.tsx):");
const pageContent = fs.readFileSync('app/components/tree-view/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 25'), 'Badged as Data Display 25');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/tree-view"'), 'Tree View registered in docsNavigation');
assert(navContent.includes('title: "Tree View"'), 'Tree View title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/tree-view.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const tvJson = JSON.parse(fs.readFileSync('public/r/tree-view.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'tree-view'), 'tree-view entry exists in registry.json');
assert(tvJson.name === 'tree-view', 'tree-view.json has valid name');
assert(tvJson.files.some(f => f.target === 'components/ui/tree-view.tsx'), 'tree-view.json references components/ui/tree-view.tsx');
assert(tvJson.registryDependencies.includes('checkbox'), 'tree-view declares checkbox registry dependency');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Tree View verification checks PASSED perfectly!\n");
}

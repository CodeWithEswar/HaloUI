import fs from 'node:fs';

console.log("=== Verifying Metric (Data Display 21) Implementation ===\n");

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
  'components/ui/metric.tsx',
  'app/components/metric/page.tsx',
  'app/components/metric/layout.tsx',
  'app/components/metric/metric-preview-stage.tsx',
  'app/components/metric/metric-demonstrations.tsx',
  'public/r/metric.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Metric Component Implementation (components/ui/metric.tsx):");
const metricContent = fs.readFileSync('components/ui/metric.tsx', 'utf-8');

assert(metricContent.includes('@container/metric'), 'Metric contains @container/metric query container');
assert(metricContent.includes('tabular-nums'), 'MetricValue enforces tabular-nums for consistent column alignment');
assert(metricContent.includes('Metric.Label = MetricLabel'), 'Compound attachment Metric.Label exists');
assert(metricContent.includes('Metric.Value = MetricValue'), 'Compound attachment Metric.Value exists');
assert(metricContent.includes('Metric.Unit = MetricUnit'), 'Compound attachment Metric.Unit exists');
assert(metricContent.includes('Metric.Description = MetricDescription'), 'Compound attachment Metric.Description exists');
assert(metricContent.includes('Metric.Delta = MetricDelta'), 'Compound attachment Metric.Delta exists');
assert(metricContent.includes('Metric.Group = MetricGroup'), 'Compound attachment Metric.Group exists');
assert(metricContent.includes('value !== undefined && value !== null'), 'Strict 0 handling: never coerces zero to falsy or placeholder');
assert(metricContent.includes('halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');
assert(!metricContent.includes('"use client"'), 'Server Component compatible: zero client-side JavaScript in primitive');
assert(!metricContent.includes('halo-glow'), 'Strictly no default glowing orbs around numeric glyphs');
assert(!metricContent.includes('backdrop-filter: blur(24px)'), 'Not reduced to naive 3-line glassmorphism cliché');

// 3. Preview Stage checks
console.log("\n3. Checking Metric Preview Stage (app/components/metric/metric-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/metric/metric-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');
assert(previewContent.includes('Zero (0) Valid Metric'), 'Includes explicit Zero (0) test scenario');
assert(previewContent.includes('Negative Offset (-45 ms)'), 'Includes explicit Negative number test scenario');
assert(previewContent.includes('High Precision (99.9999%)'), 'Includes high-precision test scenario');
assert(previewContent.includes('Large Value (1,234,567,890)'), 'Includes large value test scenario');

// 4. Docs Page checks
console.log("\n4. Checking Metric Documentation Page (app/components/metric/page.tsx):");
const pageContent = fs.readFileSync('app/components/metric/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 21'), 'Badged as Data Display 21');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/metric"'), 'Metric registered in docsNavigation');
assert(navContent.includes('title: "Metric"'), 'Metric title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/metric.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const metricJson = JSON.parse(fs.readFileSync('public/r/metric.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'metric'), 'metric entry exists in registry.json');
assert(metricJson.name === 'metric', 'metric.json has valid name');
assert(metricJson.files.some(f => f.target === 'components/ui/metric.tsx'), 'metric.json references components/ui/metric.tsx');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Metric verification checks PASSED perfectly!\n");
}

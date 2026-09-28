import fs from 'node:fs';
import path from 'node:path';

console.log("=== Verifying Timeline (Data Display 17) Implementation ===\n");

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
  'components/ui/timeline.tsx',
  'app/components/timeline/page.tsx',
  'app/components/timeline/layout.tsx',
  'app/components/timeline/timeline-preview-stage.tsx',
  'app/components/timeline/timeline-demonstrations.tsx',
  'public/r/timeline.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Timeline Component Implementation (components/ui/timeline.tsx):");
const timelineContent = fs.readFileSync('components/ui/timeline.tsx', 'utf-8');

assert(timelineContent.includes('<ol'), 'Timeline renders semantic ordered list (<ol>)');
assert(timelineContent.includes('<li'), 'TimelineItem renders semantic list item (<li>)');
assert(timelineContent.includes('@container/timeline'), 'Timeline contains @container/timeline query container');
assert(timelineContent.includes('Timeline.Item = TimelineItem'), 'Compound attachment Timeline.Item exists');
assert(timelineContent.includes('Timeline.Rail = TimelineRail'), 'Compound attachment Timeline.Rail exists');
assert(timelineContent.includes('Timeline.Marker = TimelineMarker'), 'Compound attachment Timeline.Marker exists');
assert(timelineContent.includes('Timeline.Connector = TimelineConnector'), 'Compound attachment Timeline.Connector exists');
assert(timelineContent.includes('Timeline.Content = TimelineContent'), 'Compound attachment Timeline.Content exists');
assert(timelineContent.includes('Timeline.Header = TimelineHeader'), 'Compound attachment Timeline.Header exists');
assert(timelineContent.includes('Timeline.Title = TimelineTitle'), 'Compound attachment Timeline.Title exists');
assert(timelineContent.includes('Timeline.Timestamp = TimelineTimestamp'), 'Compound attachment Timeline.Timestamp exists');
assert(timelineContent.includes('Timeline.Description = TimelineDescription'), 'Compound attachment Timeline.Description exists');
assert(timelineContent.includes('break-words min-w-0'), 'Titles & descriptions use break-words min-w-0 for narrow reflow');
assert(timelineContent.includes('backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');

// 3. Preview Stage checks
console.log("\n3. Checking Timeline Preview Stage (app/components/timeline/timeline-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/timeline/timeline-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]'), 'Checkboxes styled in rounded-xl card tiles');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');

// 4. Docs Page checks
console.log("\n4. Checking Timeline Documentation Page (app/components/timeline/page.tsx):");
const pageContent = fs.readFileSync('app/components/timeline/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 17'), 'Badged as Data Display 17');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/timeline"'), 'Timeline registered in docsNavigation');
assert(navContent.includes('title: "Timeline"'), 'Timeline title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/timeline.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const timelineJson = JSON.parse(fs.readFileSync('public/r/timeline.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'timeline'), 'timeline entry exists in registry.json');
assert(timelineJson.name === 'timeline', 'timeline.json has valid name');
assert(timelineJson.files.some(f => f.target === 'components/ui/timeline.tsx'), 'timeline.json references components/ui/timeline.tsx');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Timeline verification checks PASSED perfectly!\n");
}

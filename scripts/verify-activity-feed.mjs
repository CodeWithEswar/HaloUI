import fs from 'node:fs';
import path from 'node:path';

console.log("=== Verifying Activity Feed (Data Display 18) Implementation ===\n");

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
  'components/ui/activity-feed.tsx',
  'app/components/activity-feed/page.tsx',
  'app/components/activity-feed/layout.tsx',
  'app/components/activity-feed/activity-feed-preview-stage.tsx',
  'app/components/activity-feed/activity-feed-demonstrations.tsx',
  'public/r/activity-feed.json'
];

console.log("1. Checking Required Files:");
for (const file of files) {
  assert(fs.existsSync(file), `File exists: ${file}`);
}

// 2. Component Implementation checks
console.log("\n2. Checking Activity Feed Component Implementation (components/ui/activity-feed.tsx):");
const feedContent = fs.readFileSync('components/ui/activity-feed.tsx', 'utf-8');

assert(feedContent.includes('role = "feed"'), 'ActivityFeed renders semantic role="feed"');
assert(feedContent.includes('<article'), 'ActivityFeedItem renders semantic <article>');
assert(feedContent.includes('@container/activity-feed'), 'ActivityFeed contains @container/activity-feed query container');
assert(feedContent.includes('ActivityFeed.Item = ActivityFeedItem'), 'Compound attachment ActivityFeed.Item exists');
assert(feedContent.includes('ActivityFeed.Indicator = ActivityFeedIndicator'), 'Compound attachment ActivityFeed.Indicator exists');
assert(feedContent.includes('ActivityFeed.Content = ActivityFeedContent'), 'Compound attachment ActivityFeed.Content exists');
assert(feedContent.includes('ActivityFeed.Header = ActivityFeedHeader'), 'Compound attachment ActivityFeed.Header exists');
assert(feedContent.includes('ActivityFeed.Title = ActivityFeedTitle'), 'Compound attachment ActivityFeed.Title exists');
assert(feedContent.includes('ActivityFeed.Timestamp = ActivityFeedTimestamp'), 'Compound attachment ActivityFeed.Timestamp exists');
assert(feedContent.includes('ActivityFeed.Metadata = ActivityFeedMetadata'), 'Compound attachment ActivityFeed.Metadata exists');
assert(feedContent.includes('ActivityFeed.Actions = ActivityFeedActions'), 'Compound attachment ActivityFeed.Actions exists');
assert(feedContent.includes('ActivityFeed.Separator = ActivityFeedSeparator'), 'Compound attachment ActivityFeed.Separator exists');
assert(feedContent.includes('break-words min-w-0'), 'Titles & descriptions use break-words min-w-0 for narrow reflow');
assert(feedContent.includes('backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle'), 'Liquid glass variant uses restrained subtle Halo optical engine');

// 3. Preview Stage checks
console.log("\n3. Checking Activity Feed Preview Stage (app/components/activity-feed/activity-feed-preview-stage.tsx):");
const previewContent = fs.readFileSync('app/components/activity-feed/activity-feed-preview-stage.tsx', 'utf-8');

assert(!previewContent.includes('<input type="checkbox"'), 'Strictly zero raw <input type="checkbox"> used');
assert(previewContent.includes('<Checkbox'), 'Uses HaloUI themed <Checkbox>');
assert(previewContent.includes('rounded-xl border border-border/80 bg-card/75 shadow-2xs min-h-[42px]'), 'Checkboxes styled in rounded-xl card tiles');
assert(previewContent.includes('240'), 'Includes 240px container width simulation');
assert(previewContent.includes('iPhone 15 Pro (390px)'), 'Includes 390px mobile simulation');
assert(previewContent.includes('Desktop (1024px)'), 'Includes 1024px desktop simulation');

// 4. Docs Page checks
console.log("\n4. Checking Activity Feed Documentation Page (app/components/activity-feed/page.tsx):");
const pageContent = fs.readFileSync('app/components/activity-feed/page.tsx', 'utf-8');

assert(pageContent.includes('Data Display 18'), 'Badged as Data Display 18');
assert(pageContent.includes('PropsExplorer'), 'Includes PropsExplorer for typed API documentation');
assert(pageContent.includes('FileTree'), 'Includes FileTree component structure');
assert(pageContent.includes('InstallCommand'), 'Includes InstallCommand');
assert(!pageContent.match(/[├└│┌─]/), 'Strictly zero ASCII / box-drawing diagrams in documentation');

// 5. Navigation checks
console.log("\n5. Checking Navigation Registration (lib/docs/navigation.ts):");
const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

assert(navContent.includes('href: "/components/activity-feed"'), 'Activity Feed registered in docsNavigation');
assert(navContent.includes('title: "Activity Feed"'), 'Activity Feed title present in docsNavigation');

// 6. Registry checks
console.log("\n6. Checking Registry Definition (public/r/registry.json & public/r/activity-feed.json):");
const registryJson = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const feedJson = JSON.parse(fs.readFileSync('public/r/activity-feed.json', 'utf-8'));

assert(registryJson.items.some(i => i.name === 'activity-feed'), 'activity-feed entry exists in registry.json');
assert(feedJson.name === 'activity-feed', 'activity-feed.json has valid name');
assert(feedJson.files.some(f => f.target === 'components/ui/activity-feed.tsx'), 'activity-feed.json references components/ui/activity-feed.tsx');

console.log(`\n=== Verification Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Activity Feed verification checks PASSED perfectly!\n");
}

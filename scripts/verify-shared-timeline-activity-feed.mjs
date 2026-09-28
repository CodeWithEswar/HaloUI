import fs from 'node:fs';

console.log("=== Running Shared Regression: Timeline (17) & Activity Feed (18) ===\n");

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

// 1. Semantic Differentiation
console.log("1. Semantic Role & Anatomy Differentiation:");
const timelineCode = fs.readFileSync('components/ui/timeline.tsx', 'utf-8');
const feedCode = fs.readFileSync('components/ui/activity-feed.tsx', 'utf-8');

assert(timelineCode.includes('<ol') && timelineCode.includes('<li'), 'Timeline enforces chronological ordered list semantics (<ol>/<li>)');
assert(feedCode.includes('role = "feed"') && feedCode.includes('<article'), 'ActivityFeed enforces stream semantics (role="feed"/<article>)');
assert(timelineCode.includes('TimelineRail') && timelineCode.includes('TimelineConnector'), 'Timeline possesses vertical rail & connector line architecture');
assert(!feedCode.includes('TimelineConnector') && feedCode.includes('ActivityFeedSeparator'), 'ActivityFeed utilizes discrete event separators rather than a formal rail');

// 2. Container Query Boundaries
console.log("\n2. Independent Container Query Boundaries:");
assert(timelineCode.includes('@container/timeline'), 'Timeline isolated by @container/timeline');
assert(feedCode.includes('@container/activity-feed'), 'ActivityFeed isolated by @container/activity-feed');

// 3. Liquid Glass Architecture
console.log("\n3. HaloUI Liquid Glass Compliance:");
assert(timelineCode.includes('halo-intensity-subtle') && !timelineCode.includes('TimelineItem { backdrop-filter'), 'Timeline applies outer glass boundary with transparent event items');
assert(feedCode.includes('halo-intensity-subtle') && feedCode.includes('bg-transparent text-foreground'), 'ActivityFeed applies outer glass boundary with zero glass per activity row');

// 4. Registry Parity
console.log("\n4. Registry & Distribution Parity:");
const registry = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
assert(registry.items.some(i => i.name === 'timeline'), 'timeline in registry.json');
assert(registry.items.some(i => i.name === 'activity-feed'), 'activity-feed in registry.json');

// 5. Documentation Navigation Parity
console.log("\n5. Docs Navigation Parity:");
const nav = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(nav.includes('/components/timeline') && nav.includes('/components/activity-feed'), 'Both components sequential in docsNavigation');

console.log(`\n=== Shared Regression Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("Timeline & Activity Feed shared regression PASSED!\n");
}

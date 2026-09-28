import fs from 'node:fs';
import http from 'node:http';

console.log("==========================================================");
console.log("  HALOUI FEEDBACK & STATUS (01–10) MASTER REGRESSION SUITE");
console.log("==========================================================");

const COMPONENTS = [
  { slug: "alert", name: "Alert", file: "components/ui/alert.tsx", route: "/components/alert" },
  { slug: "toast", name: "Toast", file: "components/ui/toast.tsx", route: "/components/toast" },
  { slug: "banner", name: "Banner", file: "components/ui/banner.tsx", route: "/components/banner" },
  { slug: "callout", name: "Callout", file: "components/ui/callout.tsx", route: "/components/callout" },
  { slug: "progress", name: "Progress", file: "components/ui/progress.tsx", route: "/components/progress" },
  { slug: "circular-progress", name: "Circular Progress", file: "components/ui/circular-progress.tsx", route: "/components/circular-progress" },
  { slug: "spinner", name: "Spinner", file: "components/ui/spinner.tsx", route: "/components/spinner" },
  { slug: "skeleton", name: "Skeleton", file: "components/ui/skeleton.tsx", route: "/components/skeleton" },
  { slug: "loading-overlay", name: "Loading Overlay", file: "components/ui/loading-overlay.tsx", route: "/components/loading-overlay" },
  { slug: "status-indicator", name: "Status Indicator", file: "components/ui/status-indicator.tsx", route: "/components/status-indicator" },
];

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    passed++;
  } else {
    console.error(`✗ ${message}`);
    failed++;
  }
}

// 1. Files & Registry Check
console.log("\n[1/3] Checking Component Files & Registry Metadata...");
const registryIndex = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
const navSource = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');

for (const c of COMPONENTS) {
  assert(fs.existsSync(c.file), `${c.name} component file exists (${c.file})`);
  assert(fs.existsSync(`public/r/${c.slug}.json`), `${c.name} registry JSON exists (public/r/${c.slug}.json)`);
  assert(registryIndex.items.some(i => i.name === c.slug), `${c.name} is indexed in public/r/registry.json`);
  assert(navSource.includes(c.route), `${c.name} is registered in lib/docs/navigation.ts (${c.route})`);
}

// 2. Docs Architecture Check
console.log("\n[2/3] Checking Documentation Pages & Preview Stages...");
for (const c of COMPONENTS) {
  assert(fs.existsSync(`app${c.route}/page.tsx`), `${c.name} docs page exists (app${c.route}/page.tsx)`);
  assert(fs.existsSync(`app${c.route}/layout.tsx`), `${c.name} docs layout exists (app${c.route}/layout.tsx)`);
}

// 3. Live Server Endpoint Health Check
console.log("\n[3/3] Checking Dev Server Endpoints (http://localhost:3000)...");
async function checkRoute(route, name) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${route}`, (res) => {
      assert(res.statusCode === 200, `Live route ${route} (${name}) returned HTTP ${res.statusCode}`);
      resolve();
    });
    req.on("error", (err) => {
      assert(false, `Route ${route} failed with error: ${err.message}`);
      resolve();
    });
  });
}

async function runLiveChecks() {
  for (const c of COMPONENTS) {
    await checkRoute(c.route, c.name);
  }
  console.log(`\n==========================================================`);
  console.log(`  REGRESSION RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==========================================================`);
  process.exit(failed > 0 ? 1 : 0);
}

runLiveChecks();

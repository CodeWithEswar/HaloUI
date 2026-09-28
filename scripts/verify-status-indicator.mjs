import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI STATUS INDICATOR VERIFICATION SUITE ===");

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

// 1. File existence checks
const componentPath = 'components/ui/status-indicator.tsx';
const docsLayoutPath = 'app/components/status-indicator/layout.tsx';
const docsPagePath = 'app/components/status-indicator/page.tsx';
const previewStagePath = 'app/components/status-indicator/status-indicator-preview-stage.tsx';
const demosPath = 'app/components/status-indicator/status-indicator-demonstrations.tsx';
const registryJsonPath = 'public/r/status-indicator.json';

assert(fs.existsSync(componentPath), "Status Indicator component file exists");
assert(fs.existsSync(docsLayoutPath), "Status Indicator docs layout exists");
assert(fs.existsSync(docsPagePath), "Status Indicator docs page exists");
assert(fs.existsSync(previewStagePath), "Status Indicator preview stage exists");
assert(fs.existsSync(demosPath), "Status Indicator demonstrations exists");
assert(fs.existsSync(registryJsonPath), "Status Indicator registry JSON exists");

// 2. Component Source verification
const componentSource = fs.readFileSync(componentPath, 'utf-8');
assert(componentSource.includes("export function StatusIndicator("), "Exports StatusIndicator component");
assert(componentSource.includes("export const statusIndicatorVariants"), "Exports statusIndicatorVariants");
assert(componentSource.includes("export const statusIndicatorDotVariants"), "Exports statusIndicatorDotVariants");
assert(componentSource.includes("positive:"), "Supports positive intent");
assert(componentSource.includes("warning:"), "Supports warning intent");
assert(componentSource.includes("destructive:"), "Supports destructive intent");
assert(componentSource.includes("info:"), "Supports info intent");
assert(componentSource.includes("neutral:"), "Supports neutral intent");
assert(componentSource.includes("aria-hidden=\"true\""), "Marks decorative dot/icon aria-hidden=\"true\"");
assert(componentSource.includes("pulse = false"), "Dot is static by default (pulse=false)");
assert(componentSource.includes("@container/status-indicator"), "Employs CSS container query @container/status-indicator");
assert(!componentSource.includes("window.innerWidth"), "Strictly NO window.innerWidth JS responsive detection");
assert(!componentSource.includes("isMobile"), "Strictly NO isMobile responsive flag");

// 3. Registry & Navigation verification
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, 'utf-8'));
assert(registryJson.name === "status-indicator", "Registry item name is status-indicator");

const registryIndex = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
assert(registryIndex.items.some(i => i.name === "status-indicator"), "Status Indicator is registered in public/r/registry.json");

const navSource = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSource.includes("/components/status-indicator"), "Status Indicator is registered in lib/docs/navigation.ts");

// 4. PreviewStageShell & Hugeicons contract verification
const previewSource = fs.readFileSync(previewStagePath, 'utf-8');
assert(previewSource.includes("controls={"), "Preview stage passes controls to PreviewStageShell controls prop");
assert(!previewSource.includes("lucide-react"), "Strictly ZERO lucide-react icons in preview stage");
assert(previewSource.includes("@hugeicons/core-free-icons"), "Reuses canonical Hugeicons exclusively");

// 5. Live dev server check
console.log("Checking live dev server at http://localhost:3000/components/status-indicator...");
const req = http.get("http://localhost:3000/components/status-indicator", (res) => {
  assert(res.statusCode === 200, `Live route /components/status-indicator returned HTTP ${res.statusCode}`);
  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
});

req.on("error", (err) => {
  console.error("HTTP connection failed:", err.message);
  assert(false, "Dev server reached and responding");
  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
  process.exit(1);
});

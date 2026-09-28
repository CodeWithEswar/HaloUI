import fs from 'node:fs';
import http from 'node:http';

console.log("=== HALOUI LOADING OVERLAY VERIFICATION SUITE ===");

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
const componentPath = 'components/ui/loading-overlay.tsx';
const docsLayoutPath = 'app/components/loading-overlay/layout.tsx';
const docsPagePath = 'app/components/loading-overlay/page.tsx';
const previewStagePath = 'app/components/loading-overlay/loading-overlay-preview-stage.tsx';
const demosPath = 'app/components/loading-overlay/loading-overlay-demonstrations.tsx';
const registryJsonPath = 'public/r/loading-overlay.json';

assert(fs.existsSync(componentPath), "Loading Overlay component file exists");
assert(fs.existsSync(docsLayoutPath), "Loading Overlay docs layout exists");
assert(fs.existsSync(docsPagePath), "Loading Overlay docs page exists");
assert(fs.existsSync(previewStagePath), "Loading Overlay preview stage exists");
assert(fs.existsSync(demosPath), "Loading Overlay demonstrations exists");
assert(fs.existsSync(registryJsonPath), "Loading Overlay registry JSON exists");

// 2. Component Source verification
const componentSource = fs.readFileSync(componentPath, 'utf-8');
assert(componentSource.includes("export function LoadingOverlay("), "Exports LoadingOverlay component");
assert(componentSource.includes("export function LoadingOverlaySurface("), "Exports LoadingOverlaySurface presentation primitive");
assert(componentSource.includes("export const loadingOverlayVariants"), "Exports loadingOverlayVariants");
assert(componentSource.includes("role=\"status\""), "Declares role=\"status\" for screen reader awareness");
assert(componentSource.includes("aria-live=\"polite\""), "Declares aria-live=\"polite\" for non-disruptive announcements");
assert(componentSource.includes("inert="), "Applies standard HTML inert attribute for keyboard blocking");
assert(componentSource.includes("Spinner"), "Composes canonical HaloUI Spinner");
assert(componentSource.includes("@container/loading-overlay"), "Employs CSS container query @container/loading-overlay");
assert(!componentSource.includes("window.innerWidth"), "Strictly NO window.innerWidth JS responsive detection");
assert(!componentSource.includes("isMobile"), "Strictly NO isMobile responsive flag");

// 3. Registry & Navigation verification
const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, 'utf-8'));
assert(registryJson.name === "loading-overlay", "Registry item name is loading-overlay");
assert(registryJson.registryDependencies.includes("spinner"), "Registry declares dependency on spinner");

const registryIndex = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf-8'));
assert(registryIndex.items.some(i => i.name === "loading-overlay"), "Loading Overlay is registered in public/r/registry.json");

const navSource = fs.readFileSync('lib/docs/navigation.ts', 'utf-8');
assert(navSource.includes("/components/loading-overlay"), "Loading Overlay is registered in lib/docs/navigation.ts");

// 4. PreviewStageShell contract verification
const previewSource = fs.readFileSync(previewStagePath, 'utf-8');
assert(previewSource.includes("controls={"), "Preview stage passes controls to PreviewStageShell controls prop");
assert(!previewSource.includes("lucide-react"), "Strictly ZERO lucide-react icons in preview stage");

// 5. Live dev server check
console.log("Checking live dev server at http://localhost:3000/components/loading-overlay...");
const req = http.get("http://localhost:3000/components/loading-overlay", (res) => {
  assert(res.statusCode === 200, `Live route /components/loading-overlay returned HTTP ${res.statusCode}`);
  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
});

req.on("error", (err) => {
  console.error("HTTP connection failed:", err.message);
  assert(false, "Dev server reached and responding");
  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
  process.exit(1);
});

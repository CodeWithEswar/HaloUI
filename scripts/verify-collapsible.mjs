import fs from "node:fs";

console.log("=== Verifying Collapsible (Data Display 16) Implementation ===");

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failures++;
  }
}

// 1. Verify components/ui/collapsible.tsx
console.log("\n1. Verifying components/ui/collapsible.tsx...");
assert(fs.existsSync("components/ui/collapsible.tsx"), "components/ui/collapsible.tsx exists");
const collapsibleSource = fs.readFileSync("components/ui/collapsible.tsx", "utf-8");

assert(collapsibleSource.includes("@base-ui/react/collapsible"), "Uses Base UI primitive (@base-ui/react/collapsible)");
assert(!collapsibleSource.includes("lucide-react"), "Strictly zero Lucide icons");
assert(collapsibleSource.includes("@hugeicons/core-free-icons"), "Uses Hugeicons exclusively");
assert(collapsibleSource.includes("@container/collapsible"), "Uses container query @container/collapsible for automatic responsiveness");
assert(collapsibleSource.includes("break-words"), "Supports long trigger text wrapping with break-words");
assert(collapsibleSource.includes("min-w-0"), "Uses min-w-0 for flex child reflow");
assert(collapsibleSource.includes("variant === \"glass\""), "Implements restrained HaloUI Liquid Glass surface variant");
assert(collapsibleSource.includes("density === \"compact\""), "Implements compact density scale");
assert(collapsibleSource.includes("density === \"relaxed\""), "Implements relaxed density scale");
assert(collapsibleSource.includes("focus-visible:ring-2"), "Implements independent Halo Focus Ring");
assert(collapsibleSource.includes("Collapsible.Trigger = CollapsibleTrigger"), "Exports compound Collapsible.Trigger attachment");
assert(collapsibleSource.includes("Collapsible.Content = CollapsibleContent"), "Exports compound Collapsible.Content attachment");

// 2. Verify Documentation Suite
console.log("\n2. Verifying Documentation Suite...");
assert(fs.existsSync("app/components/collapsible/layout.tsx"), "app/components/collapsible/layout.tsx exists");
const layoutSource = fs.readFileSync("app/components/collapsible/layout.tsx", "utf-8");
assert(layoutSource.includes("DocsShell"), "layout.tsx wraps children in <DocsShell>");

assert(fs.existsSync("app/components/collapsible/collapsible-preview-stage.tsx"), "collapsible-preview-stage.tsx exists");
const stageSource = fs.readFileSync("app/components/collapsible/collapsible-preview-stage.tsx", "utf-8");
assert(stageSource.includes("PreviewStageShell"), "Preview stage uses PreviewStageShell");
assert(stageSource.includes("CONTAINER_WIDTH_OPTIONS"), "Preview stage includes container width simulation (240px to 1024px)");

assert(fs.existsSync("app/components/collapsible/collapsible-demonstrations.tsx"), "collapsible-demonstrations.tsx exists");
const demosSource = fs.readFileSync("app/components/collapsible/collapsible-demonstrations.tsx", "utf-8");
assert(demosSource.includes("240px"), "Demonstrations include explicit 240px narrow container reflow test");

assert(fs.existsSync("app/components/collapsible/page.tsx"), "app/components/collapsible/page.tsx exists");
const pageSource = fs.readFileSync("app/components/collapsible/page.tsx", "utf-8");
assert(pageSource.includes("PropsExplorer"), "Documentation page includes PropsExplorer");
assert(pageSource.includes("Data Display 16"), "Badged as Data Display 16");
assert(!pageSource.includes("├──") && !pageSource.includes("└──"), "Strictly zero ASCII / Unicode box-drawing trees");
assert(!pageSource.includes("language=\"text\""), "Zero text code block architecture diagrams");

// 3. Verify Registry & Navigation
console.log("\n3. Verifying Registry & Navigation...");
assert(fs.existsSync("public/r/collapsible.json"), "public/r/collapsible.json exists");
const collapsibleRegistry = JSON.parse(fs.readFileSync("public/r/collapsible.json", "utf-8"));
assert(collapsibleRegistry.name === "collapsible", "Registry item name is 'collapsible'");
assert(collapsibleRegistry.dependencies.some(d => d.includes("@base-ui/react")), "Registry dependencies include @base-ui/react");

const mainRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
assert(mainRegistry.items.some(i => i.name === "collapsible"), "public/r/registry.json contains collapsible");

const navigationSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert(navigationSource.includes("title: \"Collapsible\""), "lib/docs/navigation.ts registers Collapsible");
assert(navigationSource.includes("href: \"/components/collapsible\""), "lib/docs/navigation.ts links to /components/collapsible");

console.log("\n=======================================================");
if (failures === 0) {
  console.log("✓ ALL COLLAPSIBLE VERIFICATION CHECKS PASSED!");
  process.exit(0);
} else {
  console.error(`✗ ${failures} COLLAPSIBLE VERIFICATION CHECKS FAILED!`);
  process.exit(1);
}

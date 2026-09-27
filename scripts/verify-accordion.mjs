import fs from "node:fs";

console.log("=== Verifying Accordion (Data Display 15) Implementation ===");

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failures++;
  }
}

// 1. Verify components/ui/accordion.tsx
console.log("\n1. Verifying components/ui/accordion.tsx...");
assert(fs.existsSync("components/ui/accordion.tsx"), "components/ui/accordion.tsx exists");
const accordionSource = fs.readFileSync("components/ui/accordion.tsx", "utf-8");

assert(accordionSource.includes("@base-ui/react/accordion"), "Uses Base UI primitive (@base-ui/react/accordion)");
assert(!accordionSource.includes("lucide-react"), "Strictly zero Lucide icons");
assert(accordionSource.includes("@hugeicons/core-free-icons"), "Uses Hugeicons exclusively");
assert(accordionSource.includes("@container/accordion"), "Uses container query @container/accordion for automatic responsiveness");
assert(accordionSource.includes("break-words"), "Supports long trigger text wrapping with break-words");
assert(accordionSource.includes("min-w-0"), "Uses min-w-0 for flex child reflow");
assert(accordionSource.includes("variant === \"glass\""), "Implements restrained HaloUI Liquid Glass surface variant");
assert(accordionSource.includes("density === \"compact\""), "Implements compact density scale");
assert(accordionSource.includes("density === \"relaxed\""), "Implements relaxed density scale");
assert(accordionSource.includes("focus-visible:ring-2"), "Implements independent Halo Focus Ring");
assert(accordionSource.includes("Accordion.Item = AccordionItem"), "Exports compound Accordion.Item attachment");
assert(accordionSource.includes("Accordion.Trigger = AccordionTrigger"), "Exports compound Accordion.Trigger attachment");
assert(accordionSource.includes("Accordion.Content = AccordionContent"), "Exports compound Accordion.Content attachment");

// 2. Verify Documentation Suite
console.log("\n2. Verifying Documentation Suite...");
assert(fs.existsSync("app/components/accordion/layout.tsx"), "app/components/accordion/layout.tsx exists");
const layoutSource = fs.readFileSync("app/components/accordion/layout.tsx", "utf-8");
assert(layoutSource.includes("DocsShell"), "layout.tsx wraps children in <DocsShell>");

assert(fs.existsSync("app/components/accordion/accordion-preview-stage.tsx"), "accordion-preview-stage.tsx exists");
const stageSource = fs.readFileSync("app/components/accordion/accordion-preview-stage.tsx", "utf-8");
assert(stageSource.includes("PreviewStageShell"), "Preview stage uses PreviewStageShell");
assert(stageSource.includes("CONTAINER_WIDTH_OPTIONS"), "Preview stage includes container width simulation (240px to 1024px)");

assert(fs.existsSync("app/components/accordion/accordion-demonstrations.tsx"), "accordion-demonstrations.tsx exists");
const demosSource = fs.readFileSync("app/components/accordion/accordion-demonstrations.tsx", "utf-8");
assert(demosSource.includes("240px"), "Demonstrations include explicit 240px narrow container reflow test");

assert(fs.existsSync("app/components/accordion/page.tsx"), "app/components/accordion/page.tsx exists");
const pageSource = fs.readFileSync("app/components/accordion/page.tsx", "utf-8");
assert(pageSource.includes("PropsExplorer"), "Documentation page includes PropsExplorer");
assert(pageSource.includes("Data Display 15"), "Badged as Data Display 15");
assert(!pageSource.includes("├──") && !pageSource.includes("└──"), "Strictly zero ASCII / Unicode box-drawing trees");
assert(!pageSource.includes("language=\"text\""), "Zero text code block architecture diagrams");

// 3. Verify Registry & Navigation
console.log("\n3. Verifying Registry & Navigation...");
assert(fs.existsSync("public/r/accordion.json"), "public/r/accordion.json exists");
const accordionRegistry = JSON.parse(fs.readFileSync("public/r/accordion.json", "utf-8"));
assert(accordionRegistry.name === "accordion", "Registry item name is 'accordion'");
assert(accordionRegistry.dependencies.some(d => d.includes("@base-ui/react")), "Registry dependencies include @base-ui/react");

const mainRegistry = JSON.parse(fs.readFileSync("public/r/registry.json", "utf-8"));
assert(mainRegistry.items.some(i => i.name === "accordion"), "public/r/registry.json contains accordion");

const navigationSource = fs.readFileSync("lib/docs/navigation.ts", "utf-8");
assert(navigationSource.includes("title: \"Accordion\""), "lib/docs/navigation.ts registers Accordion");
assert(navigationSource.includes("href: \"/components/accordion\""), "lib/docs/navigation.ts links to /components/accordion");

console.log("\n=======================================================");
if (failures === 0) {
  console.log("✓ ALL ACCORDION VERIFICATION CHECKS PASSED!");
  process.exit(0);
} else {
  console.error(`✗ ${failures} ACCORDION VERIFICATION CHECKS FAILED!`);
  process.exit(1);
}

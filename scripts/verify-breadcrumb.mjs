import fs from 'fs';

console.log("--- Verifying Breadcrumb (Navigation 02) ---");

let allPassed = true;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    allPassed = false;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Source files check
const breadcrumbSourcePath = 'components/ui/breadcrumb.tsx';
assert(fs.existsSync(breadcrumbSourcePath), `${breadcrumbSourcePath} exists`);

const breadcrumbContent = fs.readFileSync(breadcrumbSourcePath, 'utf8');
assert(breadcrumbContent.includes('export {'), 'Exports block exists');
assert(breadcrumbContent.includes('Breadcrumb,'), 'Breadcrumb exported');
assert(breadcrumbContent.includes('BreadcrumbList,'), 'BreadcrumbList exported');
assert(breadcrumbContent.includes('BreadcrumbItem,'), 'BreadcrumbItem exported');
assert(breadcrumbContent.includes('BreadcrumbLink,'), 'BreadcrumbLink exported');
assert(breadcrumbContent.includes('BreadcrumbPage,'), 'BreadcrumbPage exported');
assert(breadcrumbContent.includes('BreadcrumbSeparator,'), 'BreadcrumbSeparator exported');
assert(breadcrumbContent.includes('BreadcrumbEllipsis,'), 'BreadcrumbEllipsis exported');
assert(!breadcrumbContent.includes('from "lucide-react"'), 'Zero Lucide imports in breadcrumb.tsx');
assert(breadcrumbContent.includes('from "@/lib/utils"'), 'Correct @/lib/utils cn import');

// 2. Registry definition check
const registryItemPath = 'public/r/breadcrumb.json';
assert(fs.existsSync(registryItemPath), `${registryItemPath} exists`);

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
assert(registryItem.name === 'breadcrumb', 'Registry item name is "breadcrumb"');
assert(registryItem.dependencies.includes('@base-ui/react'), 'Declared "@base-ui/react" dependency');
assert(registryItem.dependencies.includes('@hugeicons/core-free-icons'), 'Declared "@hugeicons/core-free-icons" dependency');
assert(registryItem.dependencies.includes('@hugeicons/react'), 'Declared "@hugeicons/react" dependency');

// 3. Central registry check
const centralRegistryPath = 'public/r/registry.json';
assert(fs.existsSync(centralRegistryPath), `${centralRegistryPath} exists`);
const centralRegistry = JSON.parse(fs.readFileSync(centralRegistryPath, 'utf8'));
const items = centralRegistry.items || centralRegistry;
const breadcrumbEntry = items.find(i => i.name === 'breadcrumb');
assert(!!breadcrumbEntry, 'breadcrumb registered in public/r/registry.json');

// 4. Docs shell files check
assert(fs.existsSync('app/components/breadcrumb/layout.tsx'), 'app/components/breadcrumb/layout.tsx exists');
assert(fs.existsSync('app/components/breadcrumb/page.tsx'), 'app/components/breadcrumb/page.tsx exists');
assert(fs.existsSync('app/components/breadcrumb/breadcrumb-preview-stage.tsx'), 'app/components/breadcrumb/breadcrumb-preview-stage.tsx exists');
assert(fs.existsSync('app/components/breadcrumb/breadcrumb-demonstrations.tsx'), 'app/components/breadcrumb/breadcrumb-demonstrations.tsx exists');

if (allPassed) {
  console.log("\n🎉 ALL BREADCRUMB CHECKS PASSED PERFECTLY!\n");
  process.exit(0);
} else {
  console.error("\n💥 SOME BREADCRUMB CHECKS FAILED!\n");
  process.exit(1);
}

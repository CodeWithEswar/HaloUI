import fs from 'fs';

console.log("--- Verifying Tabs (Navigation 01) ---");

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
const tabsSourcePath = 'components/ui/tabs.tsx';
assert(fs.existsSync(tabsSourcePath), `${tabsSourcePath} exists`);

const tabsContent = fs.readFileSync(tabsSourcePath, 'utf8');
assert(tabsContent.includes('export { Tabs, TabsList, TabsTrigger, TabsContent'), 'Tabs, TabsList, TabsTrigger, TabsContent exported');
assert(!tabsContent.includes('from "lucide-react"'), 'Zero Lucide imports in tabs.tsx');
assert(tabsContent.includes('from "@/lib/utils"'), 'Correct @/lib/utils cn import');

// 2. Registry definition check
const registryItemPath = 'public/r/tabs.json';
assert(fs.existsSync(registryItemPath), `${registryItemPath} exists`);

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
assert(registryItem.name === 'tabs', 'Registry item name is "tabs"');
assert(registryItem.dependencies.includes('@base-ui/react'), 'Declared "@base-ui/react" dependency');
assert(registryItem.dependencies.includes('class-variance-authority'), 'Declared "class-variance-authority" dependency');

// 3. Central registry check
const centralRegistryPath = 'public/r/registry.json';
assert(fs.existsSync(centralRegistryPath), `${centralRegistryPath} exists`);
const centralRegistry = JSON.parse(fs.readFileSync(centralRegistryPath, 'utf8'));
const items = centralRegistry.items || centralRegistry;
const tabsEntry = items.find(i => i.name === 'tabs');
assert(!!tabsEntry, 'tabs registered in public/r/registry.json');

// 4. Docs shell files check
assert(fs.existsSync('app/components/tabs/layout.tsx'), 'app/components/tabs/layout.tsx exists');
assert(fs.existsSync('app/components/tabs/page.tsx'), 'app/components/tabs/page.tsx exists');
assert(fs.existsSync('app/components/tabs/tabs-preview-stage.tsx'), 'app/components/tabs/tabs-preview-stage.tsx exists');
assert(fs.existsSync('app/components/tabs/tabs-demonstrations.tsx'), 'app/components/tabs/tabs-demonstrations.tsx exists');

if (allPassed) {
  console.log("\n🎉 ALL TABS CHECKS PASSED PERFECTLY!\n");
  process.exit(0);
} else {
  console.error("\n💥 SOME TABS CHECKS FAILED!\n");
  process.exit(1);
}

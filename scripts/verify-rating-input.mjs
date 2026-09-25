import fs from 'fs';
import path from 'path';

console.log('--- Verifying Rating Input (Forms & Fields 28) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files exist
const componentPath = path.join(process.cwd(), 'components/ui/rating-input.tsx');
check(fs.existsSync(componentPath), 'components/ui/rating-input.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const RatingInput ='), 'RatingInput root component exported');
check(componentContent.includes('export const RatingInputItem ='), 'RatingInputItem exported');
check(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports');
check(componentContent.includes('@hugeicons/core-free-icons'), 'Hugeicons core-free-icons imported');
check(componentContent.includes('role="radiogroup"'), 'W3C role="radiogroup" implemented');
check(componentContent.includes('role="radio"'), 'W3C role="radio" on rating items');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/rating-input.json');
check(fs.existsSync(registryItemPath), 'public/r/rating-input.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'rating-input', 'Registry item name is "rating-input"');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');
check(registryItem.dependencies.includes('@hugeicons/core-free-icons'), 'Declared @hugeicons/core-free-icons dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'rating-input'), 'rating-input registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/rating-input/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/rating-input/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/rating-input/page.tsx');
check(fs.existsSync(pagePath), 'app/components/rating-input/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/rating-input/rating-input-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/rating-input/rating-input-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/rating-input/rating-input-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/rating-input/rating-input-demonstrations.tsx exists');

// 4. Navigation ordering
const navPath = path.join(process.cwd(), 'lib/docs/navigation.ts');
const navContent = fs.readFileSync(navPath, 'utf8');
const colorPickerIndex = navContent.indexOf('title: "Color Picker"');
const ratingInputIndex = navContent.indexOf('title: "Rating Input"');
check(colorPickerIndex !== -1, 'Color Picker found in navigation');
check(ratingInputIndex > colorPickerIndex, 'Rating Input ordered after Color Picker (Position 28)');

console.log('\n🎉 ALL RATING INPUT CHECKS PASSED PERFECTLY!\n');

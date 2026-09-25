import fs from 'fs';
import path from 'path';

console.log('--- Verifying Date Range Picker (Forms & Fields 30) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/date-range-picker.tsx');
check(fs.existsSync(componentPath), 'components/ui/date-range-picker.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const DateRangePicker ='), 'DateRangePicker root component exported');
check(componentContent.includes('export const DateRangePickerTrigger ='), 'DateRangePickerTrigger exported');
check(componentContent.includes('export const DateRangePickerContent ='), 'DateRangePickerContent exported');
check(componentContent.includes('export function parseDateRange'), 'parseDateRange exported');
check(componentContent.includes('export function formatDateRange'), 'formatDateRange exported');
check(componentContent.includes('export function formatDisplayRange'), 'formatDisplayRange exported');
check(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in date-range-picker.tsx');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/date-range-picker.json');
check(fs.existsSync(registryItemPath), 'public/r/date-range-picker.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'date-range-picker', 'Registry item name is "date-range-picker"');
check(registryItem.registryDependencies.includes('calendar'), 'Declared "calendar" registry dependency');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'date-range-picker'), 'date-range-picker registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/date-range-picker/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/date-range-picker/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/date-range-picker/page.tsx');
check(fs.existsSync(pagePath), 'app/components/date-range-picker/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/date-range-picker/date-range-picker-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/date-range-picker/date-range-picker-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/date-range-picker/date-range-picker-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/date-range-picker/date-range-picker-demonstrations.tsx exists');

// 4. Navigation ordering
const navPath = path.join(process.cwd(), 'lib/docs/navigation.ts');
const navContent = fs.readFileSync(navPath, 'utf8');
const datePickerIndex = navContent.indexOf('title: "Date Picker"');
const dateRangePickerIndex = navContent.indexOf('title: "Date Range Picker"');
check(datePickerIndex !== -1, 'Date Picker found in navigation');
check(dateRangePickerIndex > datePickerIndex, 'Date Range Picker ordered after Date Picker (Position 30)');

console.log('\n🎉 ALL DATE RANGE PICKER CHECKS PASSED PERFECTLY!\n');

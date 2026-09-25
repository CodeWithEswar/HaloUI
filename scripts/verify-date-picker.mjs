import fs from 'fs';
import path from 'path';

console.log('--- Verifying Date Picker (Forms & Fields 29) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/date-picker.tsx');
check(fs.existsSync(componentPath), 'components/ui/date-picker.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const DatePicker ='), 'DatePicker root component exported');
check(componentContent.includes('export const DatePickerTrigger ='), 'DatePickerTrigger exported');
check(componentContent.includes('export const DatePickerContent ='), 'DatePickerContent exported');
check(componentContent.includes('export function parseDateOnly'), 'parseDateOnly exported');
check(componentContent.includes('export function formatDateOnly'), 'formatDateOnly exported');
check(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in date-picker.tsx');

const calendarPath = path.join(process.cwd(), 'components/ui/calendar.tsx');
const calendarContent = fs.readFileSync(calendarPath, 'utf8');
check(!calendarContent.includes('lucide-react'), 'Zero Lucide imports in calendar.tsx');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/date-picker.json');
check(fs.existsSync(registryItemPath), 'public/r/date-picker.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'date-picker', 'Registry item name is "date-picker"');
check(registryItem.registryDependencies.includes('calendar'), 'Declared "calendar" registry dependency');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'date-picker'), 'date-picker registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/date-picker/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/date-picker/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/date-picker/page.tsx');
check(fs.existsSync(pagePath), 'app/components/date-picker/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/date-picker/date-picker-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/date-picker/date-picker-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/date-picker/date-picker-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/date-picker/date-picker-demonstrations.tsx exists');

// 4. Navigation ordering
const navPath = path.join(process.cwd(), 'lib/docs/navigation.ts');
const navContent = fs.readFileSync(navPath, 'utf8');
const ratingInputIndex = navContent.indexOf('title: "Rating Input"');
const datePickerIndex = navContent.indexOf('title: "Date Picker"');
check(ratingInputIndex !== -1, 'Rating Input found in navigation');
check(datePickerIndex > ratingInputIndex, 'Date Picker ordered after Rating Input (Position 29)');

console.log('\n🎉 ALL DATE PICKER CHECKS PASSED PERFECTLY!\n');

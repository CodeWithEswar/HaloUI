import fs from 'fs';
import path from 'path';

console.log('--- Verifying Date Time Picker (Forms & Fields 32) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/date-time-picker.tsx');
check(fs.existsSync(componentPath), 'components/ui/date-time-picker.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const DateTimePicker ='), 'DateTimePicker root component exported');
check(componentContent.includes('export const DateTimePickerTrigger ='), 'DateTimePickerTrigger exported');
check(componentContent.includes('export const DateTimePickerContent ='), 'DateTimePickerContent exported');
check(componentContent.includes('export function parseLocalDateTime'), 'parseLocalDateTime exported');
check(componentContent.includes('export function formatLocalDateTime'), 'formatLocalDateTime exported');
check(componentContent.includes('export function formatDisplayDateTime'), 'formatDisplayDateTime exported');
check(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in date-time-picker.tsx');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/date-time-picker.json');
check(fs.existsSync(registryItemPath), 'public/r/date-time-picker.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'date-time-picker', 'Registry item name is "date-time-picker"');
check(registryItem.registryDependencies.includes('calendar'), 'Declared "calendar" registry dependency');
check(registryItem.registryDependencies.includes('time-picker'), 'Declared "time-picker" registry dependency');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'date-time-picker'), 'date-time-picker registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/date-time-picker/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/date-time-picker/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/date-time-picker/page.tsx');
check(fs.existsSync(pagePath), 'app/components/date-time-picker/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/date-time-picker/date-time-picker-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/date-time-picker/date-time-picker-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/date-time-picker/date-time-picker-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/date-time-picker/date-time-picker-demonstrations.tsx exists');

console.log('\n🎉 ALL DATE TIME PICKER CHECKS PASSED PERFECTLY!\n');

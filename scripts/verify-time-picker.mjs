import fs from 'fs';
import path from 'path';

console.log('--- Verifying Time Picker (Forms & Fields 31) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/time-picker.tsx');
check(fs.existsSync(componentPath), 'components/ui/time-picker.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const TimePicker ='), 'TimePicker root component exported');
check(componentContent.includes('export const TimePickerHourSegment ='), 'TimePickerHourSegment exported');
check(componentContent.includes('export const TimePickerMinuteSegment ='), 'TimePickerMinuteSegment exported');
check(componentContent.includes('export const TimePickerPeriodSegment ='), 'TimePickerPeriodSegment exported');
check(componentContent.includes('export function parseTimeString'), 'parseTimeString exported');
check(componentContent.includes('export function formatTimeString'), 'formatTimeString exported');
check(componentContent.includes('export function to12Hour'), 'to12Hour exported');
check(componentContent.includes('export function to24Hour'), 'to24Hour exported');
check(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in time-picker.tsx');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/time-picker.json');
check(fs.existsSync(registryItemPath), 'public/r/time-picker.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'time-picker', 'Registry item name is "time-picker"');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'time-picker'), 'time-picker registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/time-picker/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/time-picker/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/time-picker/page.tsx');
check(fs.existsSync(pagePath), 'app/components/time-picker/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/time-picker/time-picker-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/time-picker/time-picker-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/time-picker/time-picker-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/time-picker/time-picker-demonstrations.tsx exists');

// 4. Navigation ordering
const navPath = path.join(process.cwd(), 'lib/docs/navigation.ts');
const navContent = fs.readFileSync(navPath, 'utf8');
const dateRangeIndex = navContent.indexOf('title: "Date Range Picker"');
const timePickerIndex = navContent.indexOf('title: "Time Picker"');
check(dateRangeIndex !== -1, 'Date Range Picker found in navigation');
check(timePickerIndex > dateRangeIndex, 'Time Picker ordered after Date Range Picker (Position 31)');

console.log('\n🎉 ALL TIME PICKER CHECKS PASSED PERFECTLY!\n');

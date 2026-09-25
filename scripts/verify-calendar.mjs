import fs from 'fs';
import path from 'path';

console.log('--- Verifying Calendar (Forms & Fields 33) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/calendar.tsx');
check(fs.existsSync(componentPath), 'components/ui/calendar.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export { Calendar,'), 'Calendar component exported');
check(componentContent.includes('CalendarDayButton'), 'CalendarDayButton exported');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in calendar.tsx');
check(!componentContent.includes('from "@/components/ui/date-picker"') && !componentContent.includes('from "./date-picker"'), 'Zero date-picker imports in calendar.tsx (No reverse dependency)');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/calendar.json');
check(fs.existsSync(registryItemPath), 'public/r/calendar.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'calendar', 'Registry item name is "calendar"');
check(Array.isArray(registryItem.registryDependencies) && registryItem.registryDependencies.length === 0, 'Foundational primitive has no registry dependencies');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'calendar'), 'calendar registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/calendar/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/calendar/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/calendar/page.tsx');
check(fs.existsSync(pagePath), 'app/components/calendar/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/calendar/calendar-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/calendar/calendar-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/calendar/calendar-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/calendar/calendar-demonstrations.tsx exists');

console.log('\n🎉 ALL CALENDAR CHECKS PASSED PERFECTLY!\n');

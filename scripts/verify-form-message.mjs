import fs from 'fs';
import path from 'path';

console.log('--- Verifying Form Message (Forms & Fields 34) ---');

function check(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

// 1. Component files
const componentPath = path.join(process.cwd(), 'components/ui/form-message.tsx');
check(fs.existsSync(componentPath), 'components/ui/form-message.tsx exists');

const componentContent = fs.readFileSync(componentPath, 'utf8');
check(componentContent.includes('export const FormMessage ='), 'FormMessage component exported');
check(componentContent.includes('useFieldContext'), 'useFieldContext integrated');
check(!componentContent.includes('lucide-react'), 'Zero Lucide imports in form-message.tsx');

// 2. Registry files
const registryItemPath = path.join(process.cwd(), 'public/r/form-message.json');
check(fs.existsSync(registryItemPath), 'public/r/form-message.json exists');

const registryItem = JSON.parse(fs.readFileSync(registryItemPath, 'utf8'));
check(registryItem.name === 'form-message', 'Registry item name is "form-message"');
check(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

const masterRegistryPath = path.join(process.cwd(), 'public/r/registry.json');
check(fs.existsSync(masterRegistryPath), 'public/r/registry.json exists');
const masterRegistry = JSON.parse(fs.readFileSync(masterRegistryPath, 'utf8'));
const items = masterRegistry.items || masterRegistry;
check(items.some(item => item.name === 'form-message'), 'form-message registered in public/r/registry.json');

// 3. Documentation & Preview Stage
const layoutPath = path.join(process.cwd(), 'app/components/form-message/layout.tsx');
check(fs.existsSync(layoutPath), 'app/components/form-message/layout.tsx exists');

const pagePath = path.join(process.cwd(), 'app/components/form-message/page.tsx');
check(fs.existsSync(pagePath), 'app/components/form-message/page.tsx exists');

const stagePath = path.join(process.cwd(), 'app/components/form-message/form-message-preview-stage.tsx');
check(fs.existsSync(stagePath), 'app/components/form-message/form-message-preview-stage.tsx exists');

const demoPath = path.join(process.cwd(), 'app/components/form-message/form-message-demonstrations.tsx');
check(fs.existsSync(demoPath), 'app/components/form-message/form-message-demonstrations.tsx exists');

console.log('\n🎉 ALL FORM MESSAGE CHECKS PASSED PERFECTLY!\n');

import fs from 'fs';
import http from 'http';

async function verifyNumberField() {
  console.log('--- Verifying Number Field (Forms & Fields 20) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  // 1. Check Component Files
  const componentPath = 'components/ui/number-field.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export const NumberField ='), 'NumberField component exported');
  assert(componentContent.includes('export const NumberFieldGroup ='), 'NumberFieldGroup component exported');
  assert(componentContent.includes('export const NumberFieldInput ='), 'NumberFieldInput component exported');
  assert(componentContent.includes('export const NumberFieldIncrement ='), 'NumberFieldIncrement component exported');
  assert(componentContent.includes('export const NumberFieldDecrement ='), 'NumberFieldDecrement component exported');
  assert(!componentContent.includes('lucide-react'), 'Lucide icons are NOT used (Hugeicons exclusive)');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('allowWheelScrub={false}'), 'allowWheelScrub={false} enforced');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/number-field.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'number-field', 'Registry item name is "number-field"');
  assert(registryItem.dependencies.includes('@base-ui/react'), 'Declared "@base-ui/react" package dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'number-field'), 'number-field registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/number-field/layout.tsx',
    'app/components/number-field/page.tsx',
    'app/components/number-field/number-field-preview-stage.tsx',
    'app/components/number-field/number-field-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const inputOtpIdx = navContent.indexOf('/components/input-otp');
  const numberFieldIdx = navContent.indexOf('/components/number-field');
  assert(inputOtpIdx > 0, 'Input OTP found in navigation');
  assert(numberFieldIdx > inputOtpIdx, 'Number Field ordered after Input OTP (Position 20)');

  // 5. Test Live HTTP Endpoints
  const checkUrl = (urlPath) => {
    return new Promise((resolve) => {
      http.get(`http://localhost:3000${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({ status: res.statusCode, data });
        });
      }).on('error', (err) => {
        resolve({ status: 500, error: err.message });
      });
    });
  };

  const pageRes = await checkUrl('/components/number-field');
  assert(pageRes.status === 200, 'GET /components/number-field returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('Number Field'), 'Documentation page HTML contains "Number Field"');

  const registryRes = await checkUrl('/r/number-field.json');
  assert(registryRes.status === 200, 'GET /r/number-field.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL NUMBER FIELD VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyNumberField();

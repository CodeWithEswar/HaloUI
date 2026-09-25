import fs from 'fs';
import http from 'http';

async function verifyPhoneField() {
  console.log('--- Verifying Phone Field (Forms & Fields 22) ---');
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
  const componentPath = 'components/ui/phone-field.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export const PhoneField ='), 'PhoneField component exported');
  assert(componentContent.includes('libphonenumber-js'), 'Imports libphonenumber-js');
  assert(componentContent.includes('type="tel"'), 'Uses type="tel" for telephone semantics');
  assert(componentContent.includes('inputMode="tel"'), 'Uses inputMode="tel"');
  assert(componentContent.includes('autoComplete="tel-national"'), 'Uses autoComplete="tel-national"');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('HaloIcon'), 'Uses HaloIcon for chevrons (No Lucide)');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/phone-field.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'phone-field', 'Registry item name is "phone-field"');
  assert(registryItem.dependencies.includes('libphonenumber-js'), 'Declared "libphonenumber-js" package dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');
  assert(registryItem.registryDependencies.includes('halo-icon'), 'Declared "halo-icon" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'phone-field'), 'phone-field registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/phone-field/layout.tsx',
    'app/components/phone-field/page.tsx',
    'app/components/phone-field/phone-field-preview-stage.tsx',
    'app/components/phone-field/phone-field-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const currencyFieldIdx = navContent.indexOf('/components/currency-field');
  const phoneFieldIdx = navContent.indexOf('/components/phone-field');
  assert(currencyFieldIdx > 0, 'Currency Field found in navigation');
  assert(phoneFieldIdx > currencyFieldIdx, 'Phone Field ordered after Currency Field (Position 22)');

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

  const pageRes = await checkUrl('/components/phone-field');
  assert(pageRes.status === 200, 'GET /components/phone-field returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('Phone Field'), 'Documentation page HTML contains "Phone Field"');

  const registryRes = await checkUrl('/r/phone-field.json');
  assert(registryRes.status === 200, 'GET /r/phone-field.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL PHONE FIELD VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyPhoneField();

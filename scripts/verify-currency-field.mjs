import fs from 'fs';
import http from 'http';

async function verifyCurrencyField() {
  console.log('--- Verifying Currency Field (Forms & Fields 21) ---');
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
  const componentPath = 'components/ui/currency-field.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export const CurrencyField ='), 'CurrencyField component exported');
  assert(componentContent.includes('style: "currency"'), 'Uses style: "currency" in formatOptions');
  assert(componentContent.includes('currency = "USD"'), 'Defaults to currency = "USD"');
  assert(componentContent.includes('NumberFieldGroup'), 'Reuses NumberFieldGroup from number-field');
  assert(componentContent.includes('NumberFieldInput'), 'Reuses NumberFieldInput from number-field');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('allowWheelScrub={false}'), 'allowWheelScrub={false} enforced');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/currency-field.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'currency-field', 'Registry item name is "currency-field"');
  assert(registryItem.dependencies.includes('@base-ui/react'), 'Declared "@base-ui/react" package dependency');
  assert(registryItem.registryDependencies.includes('number-field'), 'Declared "number-field" registry dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'currency-field'), 'currency-field registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/currency-field/layout.tsx',
    'app/components/currency-field/page.tsx',
    'app/components/currency-field/currency-field-preview-stage.tsx',
    'app/components/currency-field/currency-field-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const numberFieldIdx = navContent.indexOf('/components/number-field');
  const currencyFieldIdx = navContent.indexOf('/components/currency-field');
  assert(numberFieldIdx > 0, 'Number Field found in navigation');
  assert(currencyFieldIdx > numberFieldIdx, 'Currency Field ordered after Number Field (Position 21)');

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

  const pageRes = await checkUrl('/components/currency-field');
  assert(pageRes.status === 200, 'GET /components/currency-field returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('Currency Field'), 'Documentation page HTML contains "Currency Field"');

  const registryRes = await checkUrl('/r/currency-field.json');
  assert(registryRes.status === 200, 'GET /r/currency-field.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL CURRENCY FIELD VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyCurrencyField();

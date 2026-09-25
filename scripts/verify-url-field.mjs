import fs from 'fs';
import http from 'http';

async function verifyURLField() {
  console.log('--- Verifying URL Field (Forms & Fields 23) ---');
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
  const componentPath = 'components/ui/url-field.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export const URLField ='), 'URLField component exported');
  assert(componentContent.includes('type="url"'), 'Uses type="url" for URL semantics');
  assert(componentContent.includes('inputMode="url"'), 'Uses inputMode="url"');
  assert(componentContent.includes('dir="ltr"'), 'Explicitly sets dir="ltr" for URL direction');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('HaloIcon'), 'Uses HaloIcon for decorative icon (No Lucide)');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/url-field.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'url-field', 'Registry item name is "url-field"');
  assert(registryItem.dependencies.includes('@hugeicons/core-free-icons'), 'Declared "@hugeicons/core-free-icons" dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');
  assert(registryItem.registryDependencies.includes('halo-icon'), 'Declared "halo-icon" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'url-field'), 'url-field registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/url-field/layout.tsx',
    'app/components/url-field/page.tsx',
    'app/components/url-field/url-field-preview-stage.tsx',
    'app/components/url-field/url-field-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const phoneFieldIdx = navContent.indexOf('/components/phone-field');
  const urlFieldIdx = navContent.indexOf('/components/url-field');
  assert(phoneFieldIdx > 0, 'Phone Field found in navigation');
  assert(urlFieldIdx > phoneFieldIdx, 'URL Field ordered after Phone Field (Position 23)');

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

  const pageRes = await checkUrl('/components/url-field');
  assert(pageRes.status === 200, 'GET /components/url-field returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('URL Field'), 'Documentation page HTML contains "URL Field"');

  const registryRes = await checkUrl('/r/url-field.json');
  assert(registryRes.status === 200, 'GET /r/url-field.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL URL FIELD VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyURLField();

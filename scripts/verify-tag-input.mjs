import fs from 'fs';
import http from 'http';

async function verifyTagInput() {
  console.log('--- Verifying Tag Input (Forms & Fields 24) ---');
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
  const componentPath = 'components/ui/tag-input.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export function TagInput(') || componentContent.includes('export const TagInput ='), 'TagInput compound component exported');
  assert(componentContent.includes('export function TagInputItem(') || componentContent.includes('export const TagInputItem ='), 'TagInputItem component exported');
  assert(componentContent.includes('export function TagInputItemRemove(') || componentContent.includes('export const TagInputItemRemove ='), 'TagInputItemRemove component exported');
  assert(componentContent.includes('export function TagInputInput(') || componentContent.includes('export const TagInputInput ='), 'TagInputInput component exported');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('HaloIcon'), 'Uses HaloIcon for cancel/remove icon (No Lucide)');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports');
  assert(componentContent.includes('Cancel01Icon'), 'Uses Cancel01Icon from @hugeicons/core-free-icons');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/tag-input.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'tag-input', 'Registry item name is "tag-input"');
  assert(registryItem.dependencies.includes('@hugeicons/core-free-icons'), 'Declared "@hugeicons/core-free-icons" dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');
  assert(registryItem.registryDependencies.includes('halo-icon'), 'Declared "halo-icon" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'tag-input'), 'tag-input registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/tag-input/layout.tsx',
    'app/components/tag-input/page.tsx',
    'app/components/tag-input/tag-input-preview-stage.tsx',
    'app/components/tag-input/tag-input-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const urlFieldIdx = navContent.indexOf('/components/url-field');
  const tagInputIdx = navContent.indexOf('/components/tag-input');
  assert(urlFieldIdx > 0, 'URL Field found in navigation');
  assert(tagInputIdx > urlFieldIdx, 'Tag Input ordered after URL Field (Position 24)');

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

  const pageRes = await checkUrl('/components/tag-input');
  assert(pageRes.status === 200, 'GET /components/tag-input returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('Tag Input'), 'Documentation page HTML contains "Tag Input"');

  const registryRes = await checkUrl('/r/tag-input.json');
  assert(registryRes.status === 200, 'GET /r/tag-input.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL TAG INPUT VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyTagInput();

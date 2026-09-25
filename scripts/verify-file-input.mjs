import fs from 'fs';
import http from 'http';

async function verifyFileInput() {
  console.log('--- Verifying File Input (Forms & Fields 25) ---');
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
  const componentPath = 'components/ui/file-input.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export const FileInput =') || componentContent.includes('export function FileInput('), 'FileInput component exported');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('type="file"'), 'Preserves native type="file"');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/file-input.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'file-input', 'Registry item name is "file-input"');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'file-input'), 'file-input registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/file-input/layout.tsx',
    'app/components/file-input/page.tsx',
    'app/components/file-input/file-input-preview-stage.tsx',
    'app/components/file-input/file-input-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const tagInputIdx = navContent.indexOf('/components/tag-input');
  const fileInputIdx = navContent.indexOf('/components/file-input');
  assert(tagInputIdx > 0, 'Tag Input found in navigation');
  assert(fileInputIdx > tagInputIdx, 'File Input ordered after Tag Input (Position 25)');

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

  const pageRes = await checkUrl('/components/file-input');
  assert(pageRes.status === 200, 'GET /components/file-input returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('File Input'), 'Documentation page HTML contains "File Input"');

  const registryRes = await checkUrl('/r/file-input.json');
  assert(registryRes.status === 200, 'GET /r/file-input.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL FILE INPUT VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyFileInput();

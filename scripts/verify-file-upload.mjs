import fs from 'fs';

async function verifyFileUpload() {
  console.log('--- Verifying File Upload (Forms & Fields 26) ---');
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
  const componentPath = 'components/ui/file-upload.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');

  assert(componentContent.includes('export function FileUpload('), 'FileUpload root component exported');
  assert(componentContent.includes('export const FileUploadDropzone ='), 'FileUploadDropzone exported');
  assert(componentContent.includes('export const FileUploadTrigger ='), 'FileUploadTrigger exported');
  assert(componentContent.includes('export function FileUploadList('), 'FileUploadList exported');
  assert(componentContent.includes('export const FileUploadItem ='), 'FileUploadItem exported');
  assert(componentContent.includes('export function FileUploadItemProgress('), 'FileUploadItemProgress exported');
  assert(componentContent.includes('export const FileUploadItemRemove ='), 'FileUploadItemRemove exported');

  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');
  assert(componentContent.includes('type="file"'), 'Preserves genuine native type="file"');
  assert(componentContent.includes('onDragEnter'), 'Dropzone drag-and-drop integrated');
  assert(componentContent.includes('AbortController'), 'Real AbortController cancellation supported');
  assert(!componentContent.includes('lucide-react'), 'Zero Lucide imports (Hugeicons exclusively)');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/file-upload.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'file-upload', 'Registry item name is "file-upload"');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  assert(fs.existsSync(mainRegistryPath), `${mainRegistryPath} exists`);
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'file-upload'), 'file-upload registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/file-upload/layout.tsx',
    'app/components/file-upload/page.tsx',
    'app/components/file-upload/file-upload-preview-stage.tsx',
    'app/components/file-upload/file-upload-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const fileInputIdx = navContent.indexOf('/components/file-input');
  const fileUploadIdx = navContent.indexOf('/components/file-upload');
  assert(fileInputIdx > 0, 'File Input found in navigation');
  assert(fileUploadIdx > fileInputIdx, 'File Upload ordered after File Input (Position 26)');

  // Summary
  if (failures === 0) {
    console.log('\n🎉 ALL FILE UPLOAD CHECKS PASSED PERFECTLY!\n');
  } else {
    console.error(`\n❌ VERIFICATION COMPLETED WITH ${failures} FAILURE(S)\n`);
    process.exit(1);
  }
}

verifyFileUpload().catch((err) => {
  console.error('Unexpected error running verification:', err);
  process.exit(1);
});

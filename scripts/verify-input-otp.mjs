import fs from 'fs';
import http from 'http';

async function verifyInputOtp() {
  console.log('--- Verifying Input OTP (Forms & Fields 19) ---');
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
  const componentPath = 'components/ui/input-otp.tsx';
  assert(fs.existsSync(componentPath), `${componentPath} exists`);
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  assert(componentContent.includes('export function InputOTP'), 'InputOTP component exported');
  assert(componentContent.includes('export function InputOTPGroup'), 'InputOTPGroup component exported');
  assert(componentContent.includes('export function InputOTPSlot'), 'InputOTPSlot component exported');
  assert(componentContent.includes('export function InputOTPSeparator'), 'InputOTPSeparator component exported');
  assert(!componentContent.includes('lucide-react'), 'Lucide icons are NOT used (Hugeicons exclusive)');
  assert(componentContent.includes('autoComplete="one-time-code"'), 'autoComplete="one-time-code" platform hint set');
  assert(componentContent.includes('useFieldControlProps'), 'useFieldControlProps integrated');

  // 2. Check Registry Artifacts
  const registryJsonPath = 'public/r/input-otp.json';
  assert(fs.existsSync(registryJsonPath), `${registryJsonPath} exists`);
  const registryItem = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));
  assert(registryItem.name === 'input-otp', 'Registry item name is "input-otp"');
  assert(registryItem.dependencies.includes('input-otp'), 'Declared "input-otp" package dependency');
  assert(registryItem.registryDependencies.includes('field'), 'Declared "field" registry dependency');

  const mainRegistryPath = 'public/r/registry.json';
  const mainRegistry = JSON.parse(fs.readFileSync(mainRegistryPath, 'utf8'));
  const items = mainRegistry.items || mainRegistry;
  assert(items.some(item => item.name === 'input-otp'), 'input-otp registered in public/r/registry.json');

  // 3. Check Documentation Files
  const docFiles = [
    'app/components/input-otp/layout.tsx',
    'app/components/input-otp/page.tsx',
    'app/components/input-otp/input-otp-preview-stage.tsx',
    'app/components/input-otp/input-otp-demonstrations.tsx',
  ];
  for (const file of docFiles) {
    assert(fs.existsSync(file), `${file} exists`);
  }

  // 4. Check Navigation Order
  const navContent = fs.readFileSync('lib/docs/navigation.ts', 'utf8');
  const sliderIdx = navContent.indexOf('/components/slider');
  const rangeSliderIdx = navContent.indexOf('/components/range-slider');
  const inputOtpIdx = navContent.indexOf('/components/input-otp');
  assert(sliderIdx > 0, 'Slider found in navigation');
  assert(rangeSliderIdx > sliderIdx, 'Range Slider ordered after Slider');
  assert(inputOtpIdx > rangeSliderIdx, 'Input OTP ordered after Range Slider');

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

  const pageRes = await checkUrl('/components/input-otp');
  assert(pageRes.status === 200, 'GET /components/input-otp returns 200 OK');
  assert(pageRes.data && pageRes.data.includes('Input OTP'), 'Documentation page HTML contains "Input OTP"');

  const registryRes = await checkUrl('/r/input-otp.json');
  assert(registryRes.status === 200, 'GET /r/input-otp.json returns 200 OK');

  if (failures === 0) {
    console.log('\n🎉 ALL INPUT OTP VERIFICATION CHECKS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} CHECKS FAILED!\n`);
    process.exit(1);
  }
}

verifyInputOtp();
